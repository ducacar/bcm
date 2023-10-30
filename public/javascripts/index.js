const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let company = document.getElementById("company");
  let email = document.getElementById("email");
  let number = document.getElementById("number");
  let subject = document.getElementById("subject");
  let from = document.getElementById("from");
  let to = document.getElementById("to");
  let message = document.getElementById("message");

  let formData = {
    company: company.value,
    email: email.value,
    number: number.value,
    subject: subject.value,
    from: from.value,
    to: to.value,
    message: message.value,
  };
  try {
    const response = await fetch("/bcmtransportrs" || "/bcmtransporten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 200) {
      showNotification(data.message, "alert-success");
      clearForm();
    } else {
      showNotification(data.message, "alert-danger");
    }
  } catch (error) {
    console.error(error);
    showNotification("Something went wrong, please try again.", "alert-danger");
  }
});

function showNotification(message, alertClass) {
  const notificationBox = document.createElement("div");
  notificationBox.className = `alert ${alertClass} alert-dismissible fade show`;
  notificationBox.setAttribute("role", "alert");
  notificationBox.innerHTML = `
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        ${message}
    `;

  const formContainer = document.querySelector(".form-container");
  formContainer.appendChild(notificationBox);
}

function clearForm() {
  let company = document.getElementById("company");
  let email = document.getElementById("email");
  let number = document.getElementById("number");
  let subject = document.getElementById("subject");
  let from = document.getElementById("from");
  let to = document.getElementById("to");
  let message = document.getElementById("message");

  company.value = "";
  email.value = "";
  number.value = "";
  subject.value = "";
  from.value = "";
  to.value = "";
  message.value = "";
}
