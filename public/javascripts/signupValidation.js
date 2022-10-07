console.log("hai")
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const password = document.getElementById("password");
const email = document.getElementById("email")
const password2 = document.getElementById("passwordConfirm")
form.addEventListener('submit', e => {
    e.preventDefault();
    validateInput();
});

const setError = (element) => {
     const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = element => {
     const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInput = () => {

    const fnameValue = firstName.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const emailValue = email.value.trim();
    if (fnameValue === '') {
        setError(fname)
        // red

    }
    else {
        // green
        setSuccess(fname);
    }
    if (EmailValue === '') {
        setError(Email)
        // red

        // }
        // else if (EmailValue !== '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/') {
        //     setError(Email, 'enter valid email');
    }
    else {
        // green
        setSuccess(Email);
    }
    if (passwordValue === '') {
        setError(password)
        // red

    } else if (passwordValue.length < 9) {
        setError(password);

    }
    else {
        // green
        setSuccess(password);
    }
    if (password2Value === '') {
        setError(password2)
        // red
    } else if (passwordValue !== password2Value) {
        setError(password2)
    }
    else {
        // green
        setSuccess(password2);
    }
}

