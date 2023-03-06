const formBuilding = document.querySelector(".building-form");
import { setText } from "./popup.js";

formBuilding.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector(".nameBuilding").value;
  const street = document.querySelector(".streetBuilding").value;
  const number = document.querySelector(".numberBuilding").value;
  (async () => {
    const response = await fetch("http://localhost:3001/newBuilding", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        street: street,
        number: number,
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
