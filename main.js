const $ = document.querySelector.bind(document)

const form = $('form')
const username = $('#username')
const email = $('#email')
const password = $('#password')
const password2 = $('#password2')

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
    const small = formControl.querySelector('small')
	small.innerText = ''
}

// Check required fields
function checkEmptyError(inputArr){
    let isRequired = false
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
            isRequired = true
        }else{
            showSuccess(input)
        }
    })

    return isRequired
}


// Check email is valid
function checkRegexEmail(input){
    const regexEmail = 
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regexEmail.test(input.value.trim())){
       showSuccess(input)
    } else{
       showError(input, 'Email is not valid')
    }   
}

// Check input length
function checkLenght(input, min, max){
    if(input.value.length < min){
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        )
    }else if(input.value.length > max){
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        )
    }else{
        showSuccess(input)
    }
}

// Check passwords match
function checkMatchPassword(password, confirmPassword){
    if(password.value !== confirmPassword.value){
        showError(confirmPassword, 'Password do not match')
    }
}

// Get filedname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listenrs
form.addEventListener('submit',function(e) {
    e.preventDefault()

    if(!checkEmptyError([username, email, password, password2])) {
        checkLenght(username, 3, 15)
        checkLenght(password, 6, 25)
        checkRegexEmail(email)
        checkMatchPassword(password, password2)
    }

})