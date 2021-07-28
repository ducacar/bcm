const form = document.getElementById('form');
form.addEventListener("change", () => {
    document.getElementById('submit').disabled = !form.checkValidity()
});

(function () {
    'use strict'
   const forms = document.querySelectorAll('.contact-form')
    Array.from(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


  