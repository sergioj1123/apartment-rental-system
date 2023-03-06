const formLocationApartmants = document.querySelector(".apartmant-change-form");
import { mascara } from "./formsTenant.js";
import { setText } from "./popup.js";

formLocationApartmants.addEventListener("submit", (event) => {
  event.preventDefault();

  const cpf = mascara(document.querySelector(".cpfLocatario").value);
  const buildingName = document.querySelector(".buildingName").value;
  const apartmantNumber = document.querySelector(".apartmantNumber").value;

  (async () => {
    const response = await fetch("http://localhost:3001/location", {
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
    });
    const data = await response.json();
    if (data.msg == "ok") {
      window.location.reload(true);
    } else {
      setText(data.msg);
    }
  })();
});
