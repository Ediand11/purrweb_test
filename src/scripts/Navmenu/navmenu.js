export default (() => {
  const nav = document.querySelector(".nav");
  const navButton = nav.querySelector(".nav__button_mobile");
  const navMenu = nav.querySelector(".nav__menu");
  const buttonCloseNavMenu = navMenu.querySelector(".button-close");

  const headerButton = document.querySelectorAll(".header__superNavItem-link");
  const navButtonDesktop = nav.querySelector(".nav__button");
  const navLinks = nav.querySelector(".nav__links-apps");

  const toggleNavbar = () => {
    navMenu.classList.toggle("open-nav-menu");
  };

  const showActiveButton = () => {
    if (headerButton[0].classList.contains("active")) {
      navButtonDesktop.classList.add("show");
      navLinks.classList.remove("show");
    } else {
      navButtonDesktop.classList.remove("show");
      navLinks.classList.add("show");
    }
  };

  const changeActive = (e) => {
    if (e.target.classList.contains("active")) {
      return;
    }
    if (headerButton[0].classList.contains("active")) {
      headerButton[0].classList.toggle("active");
    } else {
      headerButton[1].classList.toggle("active");
    }

    e.target.classList.toggle("active");
    showActiveButton();
  };

  showActiveButton();

  navButton.addEventListener("click", toggleNavbar);
  buttonCloseNavMenu.addEventListener("click", toggleNavbar);

  headerButton.forEach((button) => {
    button.addEventListener("click", changeActive);
  });
})();
