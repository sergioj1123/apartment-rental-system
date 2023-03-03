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

  // fetch("/http://localhost:3001/login", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     name: name,
  //     password: password,
  //   }),
  //   headers: { "Content-Type": "application/json" },
  // }).then(async (resp) => {
  //   var status = await resp.text();
  //   console.log(status);
  //   if (status == "conectado") {
  //     location.href = "/acesso-restrito/acesso.html";
  //   } else {
  //     alert("nome e senha invalidos!!");
  //   }
  // });
}
