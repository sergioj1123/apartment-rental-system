// Função que pega no backand quais são os Locatarios do banco
async function getAllTenants() {
  const response = await fetch("http://localhost:3001/getAllTenants");
  const data = await response.json();
  // chamando a função de preencher tabela
  data.forEach((element) => {
    CompleteTenants(element);
  });
}

// Função que pega no backand quais são os predios do banco
async function getAllBuildings() {
  const response = await fetch("http://localhost:3001/getAllBuildings");
  const data = await response.json();
  // chamando a função de preencher tabela
  data.forEach((element) => {
    completeBuildings(element);
  });
}

// Função que pega no backand quais são os apartamentos do banco
async function getAllApartmants() {
  const response = await fetch("http://localhost:3001/getAllApartmants");
  const data = await response.json();
  // chamando a função de preencher tabela
  data.forEach((element) => {
    if (element.tenant_id === null) {
      completeApartmantsEmpty(element);
    } else {
      completeApartmantsWithTenant(element);
    }
  });
}

// Função que pega o template HTML da tabela de locatario, para preenchimento
function CompleteTenants(data) {
  const table = document.querySelector(".tenants-template");
  const tableTemplate = document.querySelector("#tenants-template").content;
  const TableTr = tableTemplate
    .querySelector(".tenants-template__complete")
    .cloneNode(true);
  // Completando a tabela
  TableTr.querySelector(".tenants-template__name").textContent = data.name;
  TableTr.querySelector(".tenants-template__cpf").textContent = data.cpf;
  table.append(TableTr);
}

// Função que pega o template HTML da tabela de predios, para preenchimento
function completeBuildings(data) {
  const table = document.querySelector(".buildings-template");
  const tableTemplate = document.querySelector("#buildings-template").content;
  const TableTr = tableTemplate
    .querySelector(".buildings-template__complete")
    .cloneNode(true);
  // Completando a tabela
  TableTr.querySelector(".buildings-template__name").textContent = data.name;
  TableTr.querySelector(".buildings-template__street").textContent =
    data.street;
  TableTr.querySelector(".buildings-template__number").textContent =
    data.number;
  table.append(TableTr);
}

// Função que pega o template HTML da tabela de apartamentos que possuem inquilinos, para preenchimento
function completeApartmantsWithTenant(data) {
  const table = document.querySelector(".apartmants-template");
  const tableTemplate = document.querySelector("#apartmants-template").content;
  const TableTr = tableTemplate
    .querySelector(".apartmants-template__complete")
    .cloneNode(true);
  // Completando a tabela
  TableTr.querySelector(".apartmants-template__number").textContent =
    data.number;
  TableTr.querySelector(".apartmants-template__description").textContent =
    data.description;
  TableTr.querySelector(".apartmants-template__value").textContent =
    data.rent_value;
  TableTr.querySelector(".apartmants-template__numberRooms").textContent =
    data.number_rooms;
  TableTr.querySelector(".apartmants-template__cpf-morador").textContent =
    data.tenant_id;
  TableTr.querySelector(".apartmants-template__nome-predio").textContent =
    data.building_id;
  table.append(TableTr);
}

// Função que pega o template HTML da tabela de apartamentos que não possuem inquilinos, para preenchimento

function completeApartmantsEmpty(data) {
  const table = document.querySelector(".apartmants-empty-template");
  const tableTemplate = document.querySelector(
    "#apartmants-empty-template"
  ).content;
  const TableTr = tableTemplate
    .querySelector(".apartmants-empty-template__complete")
    .cloneNode(true);
  // Completando a tabela
  TableTr.querySelector(".apartmants-empty-template__number").textContent =
    data.number;
  TableTr.querySelector(".apartmants-empty-template__description").textContent =
    data.description;
  TableTr.querySelector(".apartmants-empty-template__value").textContent =
    data.rent_value;
  TableTr.querySelector(".apartmants-empty-template__numberRooms").textContent =
    data.number_rooms;
  TableTr.querySelector(".apartmants-empty-template__nome-predio").textContent =
    data.building_id;
  table.append(TableTr);
}

getAllTenants();
getAllBuildings();
getAllApartmants();

// module.exports.getAllTenants = getAllTenants;
