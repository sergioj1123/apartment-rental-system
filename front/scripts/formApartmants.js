const formApartmants = document.querySelector(".apartmant-form");
import { mascara } from "./formsTenant.js";
import { setText } from "./popup.js";

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
    const response = await fetch("http://localhost:3001/newApartmant", {
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
    });
    const data = await response.json();
    if (data.msg == "ok") {
      window.location.reload(true);
    } else {
      setText(data.msg);
    }
  })();
});
