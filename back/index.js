const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

const database = require("./database/db");
// Verifica se existem as tabelas no banco
const User = require("./database/user");
const Tenant = require("./database/tenant");
const Building = require("./database/building");
const Apartment = require("./database/apartment");

// configurando o bodyParser e Cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Função para adicionar novo usuario
function newUser(enteringName, enteringPassword, enteringAdmin) {
  const user = User.create({
    name: enteringName,
    password: enteringPassword,
    admin: enteringAdmin,
  });
}

// Função para cadastrar novo locatario
function newTenant(enteringName, enteringCPF) {
  const tenant = Tenant.create({
    name: enteringName,
    cpf: enteringCPF,
  });
}

// Função para cadastrar novo prédio/condominio
function newBuilding(enteringName, enteringNumber, enteringStreet) {
  const building = Building.create({
    name: enteringName,
    number: enteringNumber,
    street: enteringStreet,
  });
}

// Função para cadastrar novo apartamento
function newApartment(
  enteringNumber,
  enteringDescription,
  enteringRentValue,
  enteringNumberRooms,
  enteringTenant,
  enteringApartment
) {
  // caso possua inquilino irá ser inserido junto ao inquilino, mas caso não tenha ele não será inserido no banco
  if (enteringTenant != "") {
    const apartment = Apartment.create({
      number: enteringNumber,
      description: enteringDescription,
      rent_value: enteringRentValue,
      number_rooms: enteringNumberRooms,
      tenant_id: enteringTenant,
      building_id: enteringApartment,
    });
  } else {
    const apartment = Apartment.create({
      number: enteringNumber,
      description: enteringDescription,
      rent_value: enteringRentValue,
      number_rooms: enteringNumberRooms,
      building_id: enteringApartment,
    });
  }
}

(async () => {
  // Sincronizando o banco
  await database.sync();

  // Povoando o banco com algumas informações caso esteja vazio;
  const base = await User.findAll();
  if (Object.keys(base).length === 0) {
    newUser("admin", "123", true);
    newUser("normal", "123", false);
    newBuilding("Edificio Central", "1", "Rua numero 1");
    newBuilding("Edificio ao lado do Central", "2", "Rua numero 2");
    newTenant("Teste 1", "123.456.789-09");
    newTenant("Teste 2", "578.776.027-15");
    newTenant("Teste 5", "698.833.166-23");
    newTenant("Teste 3", "556.773.746-79");
    newTenant("Teste 4", "338.230.758-88");
    newApartment("1", "Apartamento de 100 m", 1000, 5, "", 1);
    newApartment("2", "Apartamento de 200 m", 2000, 4, 1, 1);
  }
})();

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.post("/login", (req, res) => {
  const userForm = req.body.name;
  const passwordform = req.body.password;
  (async () => {
    const admin = await User.findAll({
      where: { name: userForm, password: passwordform, admin: true },
    });
    if (Object.keys(admin).length === 0) {
      res.send("Não existe esse usuario");
    } else {
      res.send("Funções liberadas");
    }
  })();
});

// Função para preencher tabela de locatarios
app.get("/getAllTenants", (req, res) => {
  (async () => {
    const allTenants = await Tenant.findAll({ order: ["name"] });
    res.send(allTenants);
  })();
});

// Função para preencher tabela de predios/condominios
app.get("/getAllBuildings", (req, res) => {
  (async () => {
    const allBuildings = await Building.findAll({ order: ["name"] });
    res.send(allBuildings);
  })();
});

// Função para preencher tabela de apartamentos
app.get("/getAllApartmants", (req, res) => {
  (async () => {
    const getAllApartmants = await Apartment.findAll();
    for (let i = 0; i < getAllApartmants.length; i++) {
      const buildingName = await Building.findOne({
        where: { id: getAllApartmants[i].building_id },
      });
      const tenantName = await Tenant.findOne({
        where: { id: getAllApartmants[i].tenant_id },
      });
      getAllApartmants[i].building_id = buildingName.name;
      if (getAllApartmants[i].tenant_id != null) {
        getAllApartmants[i].tenant_id = tenantName.cpf;
      }
    }
    res.send(getAllApartmants);
  })();
});

// Botão de inserção de inquilino
app.post("/newTenant", (req, res) => {
  (async () => {
    const allTenants = await Tenant.findAll({
      where: { cpf: req.body.cpf },
    });
    if (Object.keys(allTenants).length === 0) {
      newTenant(req.body.name, req.body.cpf);
      res.send({ msg: "ok" });
    } else {
      res.send({ msg: "CPF já cadastrado como Locatário!" });
    }
  })();
});

// Botão de inserção de predios
app.post("/newBuilding", (req, res) => {
  (async () => {
    const allBuilding = await Building.findAll({
      where: { name: req.body.name },
    });
    if (Object.keys(allBuilding).length === 0) {
      newBuilding(req.body.name, req.body.number, req.body.street);
      res.send({ msg: "ok" });
    } else {
      res.send({ msg: "O nome desse prédio/condomínio já foi cadastrado!" });
    }
  })();
});

// Botão de inserção de apartamentos
app.post("/newApartmant", (req, res) => {
  (async () => {
    // verifica se existe um predio com o nome que esta sendo relacionado pelo nome, recuperando o ID do predio
    const buildingName = await Building.findOne({
      where: { name: req.body.namebuilding },
    });
    const cpfTenant = await Tenant.findOne({
      where: { cpf: req.body.cpf },
    });
    const numberAllApartmants = await Apartment.findAll({
      where: { number: req.body.number },
    });
    // verifica se existe um predio com o nome que esta sendo relacionado pelo nome, recuperando o ID do predio
    if (req.body.cpf) {
      // Caso o campo CPF tenha sido preenchido, mas não encontrou nenhuma relação entre o CPF inserido e os que possuem no ImageBitmapRenderingContext, o sistema não inser
      if (cpfTenant == null && cpfTenant == undefined) {
        res.send({
          msg: "CPF não cadastrado como inquilino, para alocar o imóvel é nescessário cadastrar o inquilino.",
        });
        return;
      }
    }
    if (buildingName != null && buildingName !== undefined) {
      let alredyHaveNumberApartmant = false;

      if (Object.keys(numberAllApartmants).length != 0) {
        numberAllApartmants.map((element) => {
          if (element.building_id == buildingName.id) {
            alredyHaveNumberApartmant = true;
          }
        });
      }
      if (alredyHaveNumberApartmant == true) {
        res.send({
          msg: "Já existe esse número de apartamento cadastrado no prédio/condomínio inserido!",
        });
        return;
      }
      if (buildingName.id)
        if (!req.body.cpf) {
          newApartment(
            req.body.number,
            req.body.description,
            req.body.value,
            req.body.rooms,
            "",
            buildingName.id
          );
        } else {
          newApartment(
            req.body.number,
            req.body.description,
            req.body.value,
            req.body.rooms,
            cpfTenant.id,
            buildingName.id
          );
        }
      res.send({ msg: "ok" });
    } else {
      res.send({ msg: "Prédio/condomínio não cadastrado no sistema" });
    }
  })();
});

// Botão de locação de apartamento
app.post("/location", (req, res) => {
  (async () => {
    // verifica se existe um predio com o nome que esta sendo relacionado pelo nome, recuperando o ID do predio
    const buildingName = await Building.findOne({
      where: { name: req.body.buildingName },
    });
    const cpfTenant = await Tenant.findOne({
      where: { cpf: req.body.cpf },
    });
    const apartmantNumber = await Apartment.findAll({
      where: { number: req.body.apartmantNumber },
    });
    if (cpfTenant == null && cpfTenant == undefined) {
      res.send({
        msg: "CPF não cadastrado como inquilino, para alocar o imóvel é nescessário cadastrar o inquilino.",
      });
      return;
    }

    if (buildingName == null && buildingName == undefined) {
      res.send({ msg: "Prédio/condomínio não cadastrado no sistema" });
      return;
    }
    // Variavel que criei para controlar caso não o número do apartamento não pertença ao nome do predio inserido
    let buildingNumberNotFound = true;
    if (Object.keys(apartmantNumber).length === 0) {
      res.send({
        msg: "Número do apartamento não cadastrado para o prédio/condomínio inserido!",
      });
      return;
    } else {
      apartmantNumber.map((element) => {
        if (element.building_id == buildingName.id) {
          buildingNumberNotFound = false;
          if (element.tenant_id == null && element.tenant_id == undefined) {
            element.tenant_id = cpfTenant.id;
            element.save();
            res.send({ msg: "ok" });
          } else {
            res.send({ msg: "O apartamento inserido já possui inquilino." });
          }
        }
      });
    }
    if (buildingNumberNotFound == true) {
      res.send({ msg: "Número do prédio não pertence ao predio inserido." });
    }
  })();
});
