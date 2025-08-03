// const iconMenu = document.querySelector(".icon-menu");
// iconMenu.addEventListener("click", () => {
//   iconMenu.classList.toggle("menu-open");
//   document.documentElement.classList.toggle("menu-open");
// });

document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".icon-menu")) {
    document.body.classList.toggle("menu-open");
  }
}
