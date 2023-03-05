const formApartmants = document.querySelector(".apartmant-form");
import { mascara } from "./formsTenant.js";

formApartmants.addEventListener("submit", (event) => {
  event.preventDefault();

  const number = document.querySelector(".numberApartmant").value;
  const description = document.querySelector(".descriptionApartmant").value;
  const value = document.querySelector(".RentValueApartmant").value;
  const rooms = document.querySelector(".numberRoomsApartmant").value;
  let cpf = document.querySelector(".cpfMoradorApartmant").value;
  const namebuilding = document.querySelector(".nameBuildingApartmant").value;
  if (cpf != null && cpf !== undefined) {
    cpf = mascara(cpf);
  }
  console.log(cpf);
  (async () => {
    await fetch("http://localhost:3001/newApartmant", {
      method: "POST",
      body: JSON.stringify({
        number: number,
        description: description,
        value: value,
        rooms: rooms,
        cpf: cpf,
        namebuilding: namebuilding,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  })();
});
