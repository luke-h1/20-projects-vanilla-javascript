const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// SHOW ERR MSG
function showError(input, message) {
  const formControl = input.parentElement;
  // console.log(formControl)
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// SHOW SUCCESS MSG
function showSuccess(input) {
  const formControl = input.parentElement;
  // console.log(formControl)
  formControl.className = 'form-control success';
}

// EMAIL REGEX VALIDATOR
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSuccess(input)
    
  }else{
    showError(input, 'Email is not valid')
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`); // loop thru id and show err
    } else {
      showSuccess(input);
    }
  });
}

// CHECK INPUT LENGTH

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}


// CHECK PASSWORDS MATCH 
function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, 'Passwords do not match')
  }
}


// GET FIELD NAME
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // adding rest of word w/out first letter
}

// FORM EVENT LISTENER
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email); 
  checkPasswordMatch(password, password2)
});
