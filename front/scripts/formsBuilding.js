const formBuilding = document.querySelector(".building-form");

formBuilding.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector(".nameBuilding").value;
  const street = document.querySelector(".streetBuilding").value;
  const number = document.querySelector(".numberBuilding").value;
  (async () => {
    await fetch("http://localhost:3001/newBuilding", {
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
    })
      .then((res) => res.json())
      .then((res) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  })();
});
