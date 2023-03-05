const formLocationApartmants = document.querySelector(".apartmant-change-form");
import { mascara } from "./formsTenant.js";

formLocationApartmants.addEventListener("submit", (event) => {
  event.preventDefault();

  const cpf = mascara(document.querySelector(".cpfLocatario").value);
  const buildingName = document.querySelector(".nameBuilding").value;
  const apartmantNumber = document.querySelector(".apartmantNumber").value;

  (async () => {
    await fetch("http://localhost:3001/location", {
      method: "POST",
      body: JSON.stringify({
        cpf: cpf,
        buildingName: buildingName,
        apartmantNumber: apartmantNumber,
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
