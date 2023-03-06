const popup = document.querySelector(".popup");
const button = popup.querySelector(".popup__close");
const textPopup = popup.querySelector(".popup__information");

// Função para deixar a tela visivel
export function openScreen() {
  popup.style.display = "flex";
}

export function closeScreen() {
  popup.style.display = "none";
}

export function setText(text) {
  openScreen();
  textPopup.textContent = text;
}

button.addEventListener("click", closeScreen);
