const emailInput = document.getElementById("email");
const loginRedirect = document.getElementById('sign-in-button');
const loginRedirect2 = document.getElementById('sign-in-button2');

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== "") {
        emailInput.classList.add('filled');
    } else {
        emailInput.classList.remove('filled');
    }
})

loginRedirect.addEventListener('click', () => {
    window.location.href = "login.html";
})

loginRedirect2.addEventListener('click', () => {
    window.location.href = "login.html";
})