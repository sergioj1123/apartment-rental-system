(async () => {
  const database = require("./database/db");
  // Verifica se existem as tabelas no banco
  const User = require("./database/user");
  const Tenant = require("./database/tenant");
  const Building = require("./database/building");
  const Apartment = require("./database/apartment");

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

  await database.sync();

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
