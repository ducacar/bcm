
const contactForm = document.querySelector('.contact-form');

let company = document.getElementById('company');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let number = document.getElementById('number')
let from = document.getElementById('from');
let to = document.getElementById('to');
let message = document.getElementById('message');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = {
        company: company.value,
        email: email.value,
        number: number.value,
        subject: subject.value,
        from: from.value,
        to: to.value,
        message: message.value
    }
    let xhr = new XMLHttpRequest;
    xhr.open('POST', '/bcmtransportrs' || '/bcmtransporten')
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert ('Request sent/Upit uspešno poslat!');
            location.reload();
            company.value  = '';
            email.value  = '';
            number.value  = '';
            subject.value  = '';
            from.value  = '';
            to.value  = '';
            message.value  = '';
        }else{
            alert('Something went wrong, please try again / Nešto nije u redu, molim Vas pokušajte ponovo!')
            location.reload();
        }
        
    }
    

    xhr.send(JSON.stringify(formData));


})

