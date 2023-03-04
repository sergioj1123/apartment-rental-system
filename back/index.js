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
    newTenant("Sergio Felix", "123-456-789-09");
    newTenant("A", "123-456-789-09");
    newTenant("Teste1", "123-456-789-09");
    newTenant("Teste2", "123-456-789-09");
    newTenant("Teste3", "123-456-789-09");
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
    res.send(getAllApartmants);
  })();
});

app.post("/newTenant", (req, res) => {
  (async () => {
    const allTenants = await Tenant.findAll({
      where: { cpf: req.body.cpf },
    });
    if (Object.keys(allTenants).length === 0) {
      newTenant(req.body.name, req.body.cpf);
      res.send("Inserido com sucesso");
    } else {
      res.send("CPF já cadastrado no banco");
    }
  })();
});
