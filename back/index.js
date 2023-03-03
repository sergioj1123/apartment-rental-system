const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const database = require("./database/db");
// Verifica se existem as tabelas no banco
const User = require("./database/user");
const Tenant = require("./database/tenant");
const Building = require("./database/building");
const Apartment = require("./database/apartment");

// configurando o bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Populando o banco

function newUser(enteringName, enteringPassword, enteringAdmin) {
  const user = User.create({
    name: enteringName,
    password: enteringPassword,
    admin: enteringAdmin,
  });
}

function newTenant(enteringName, enteringCPF) {
  const tenant = Tenant.create({
    name: enteringName,
    cpf: enteringCPF,
  });
}

function newBuilding(enteringName, enteringNumber, enteringStreet) {
  const building = Building.create({
    name: enteringName,
    number: enteringNumber,
    street: enteringStreet,
  });
}

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

  // Povoando o banco
  newUser("admin", "123", true);
  newUser("normal", "123", false);
  newBuilding("Edificio Central", "1", "Rua numero 1");
  newBuilding("Edificio ao lado do Central", "2", "Rua numero 2");
  newTenant("Sergio Felix", "123-456-789-09");
  newTenant("Teste1", "123-456-789-09");
  newTenant("Teste2", "123-456-789-09");
  newTenant("Teste3", "123-456-789-09");
  newApartment("1", "Apartamento de 100 m", 1000, 5, "", 1);
  newApartment("2", "Apartamento de 200 m", 2000, 4, 1, 1);
})();

// (async () => {
//   const teste = await User.findAll();
//   app.listen(3001, () => {
//     console.log(teste);
//   });
// })();

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.use(express.json());
// app.use(cors());

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
