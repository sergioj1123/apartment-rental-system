function login(evt) {
  const name = document.querySelector(".login-form__name").value;
  const password = document.querySelector(".login-form__password").value;

  console.log(
    JSON.stringify({
      name: name,
      password: password,
    })
  );
  if (name == "" || password == "") {
    return alert("Insira um usuario e senha");
  }
  fetch("login", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      password: password,
    }),
    headers: { "content-type": "aplication/json" },
  }).then(async (resp) => {
    const status = await resp.text();
    console.log(status);
    if (status == "conectado") {
      location.href = "/pages/inside.html";
    } else {
      alert("Usuario ou senha incorretos");
    }
  });
}
