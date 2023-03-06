const form = document.querySelector(".tenants-form");
import { setText } from "./popup.js";
// Envia novo Locatario
function TestaCPF(cpf) {
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11) return false;
  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
  } else return false;
}

export function mascara(v) {
  v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector(".tenants-name").value;
  let cpf = document.querySelector(".tenants-cpf").value;
  if (TestaCPF(cpf)) {
    cpf = mascara(cpf);
    (async () => {
      const response = await fetch("http://localhost:3001/newTenant", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          cpf: cpf,
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
  } else {
    setText("Esse CPF não é valido, favor inserir um CPF valido!");
  }
});
