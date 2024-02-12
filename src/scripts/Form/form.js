export default (() => {
  const buttonsSales = document.querySelectorAll(".button__sales");
  const formPopup = document.querySelector(".form-popup");
  const form = formPopup.querySelector(".form");
  const buttonsCloseForm = form.querySelector(".button-close");
  const formButton = form.querySelector(".button-form");
  const success = formPopup.querySelector(".success");

  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");

  const togglePopup = () => {
    formPopup.classList.toggle("show");
  };

  buttonsSales.forEach((button) => {
    button.addEventListener("click", togglePopup);
  });

  buttonsCloseForm.addEventListener("click", togglePopup);

  formPopup.addEventListener("click", togglePopup);
  form.addEventListener("click", (e) => e.stopPropagation());

  const validateRequiredFields = () => {
    const activeField = event.target;
    const value = activeField.value.trim();
    const errorMessage = activeField.nextElementSibling;

    if (value === "") {
      activeField.classList.add("form__input_error");
      errorMessage.style.display = "block";
    } else {
      activeField.classList.remove("form__input_error");
      errorMessage.style.display = "none";
    }

    const isValid = [name, email, phone].every((field) => field.value.trim() !== "");

    formButton.disabled = !isValid;
  };

  const inputs = [name, email, phone];

  inputs.forEach((input) => {
    input.addEventListener("input", validateRequiredFields);
  });

  const prefixNumber = (str) => {
    phone.classList.remove("flag_russian");

    if (str === "7") {
      phone.classList.add("flag_russian");
      return "7 (";
    }
    if (str === "8") {
      return "8 (";
    }
    if (str === "9") {
      return "7 (9";
    }
    return "7 (";
  };

  const validatePhone = () => {
    const cleanedValue = phone.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result = phone.value.includes("+8") || phone.value[0] === "8" ? "" : "+";

    for (let i = 0; i < Math.min(cleanedValue.length, numberLength); i++) {
      switch (i) {
        case 0:
          result += prefixNumber(cleanedValue[i]);
          continue;
        case 4:
          result += ") ";
          break;
        case 7:
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += cleanedValue[i];
    }

    phone.value = result;
  };

  phone.addEventListener("input", validatePhone);

  formButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "none";
    success.classList.toggle("show");
  });
})();
