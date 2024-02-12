export default (() => {
  const cookie = document.querySelector(".cookie");
  const buttonCloseCookie = cookie.querySelector(".button-close");
  const acceptButton = cookie.querySelector(".button__cookie");
  const declineButton = cookie.querySelector(".button__cookie_decline");

  const closeCookie = () => {
    cookie.classList.toggle("show");
  };

  setTimeout(closeCookie, 5000);

  buttonCloseCookie.addEventListener("click", closeCookie);
  acceptButton.addEventListener("click", closeCookie);
  declineButton.addEventListener("click", closeCookie);
})();
