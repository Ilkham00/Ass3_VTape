// Forms for contacts.html and register.html

var forms = document.querySelectorAll('.needs-validation');

for (var i = 0; i < forms.length; i++) {
  var form = forms[i];

  // when the form is sent
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // nothing is sent anywhere

    var currentForm = event.target;
    var message = currentForm.querySelector('.alert');

    if (!currentForm.checkValidity()) {
      // show red / green feedback for all fields
      currentForm.classList.add('was-validated');
      message.classList.add('d-none');
    } else {
      // valid: show the demo message and clear the sample data
      currentForm.reset();
      currentForm.classList.remove('was-validated');
      message.classList.remove('d-none');
    }
  });

  // Reset button: remove feedback and the message
  form.addEventListener('reset', function (event) {
    event.target.classList.remove('was-validated');
    event.target.querySelector('.alert').classList.add('d-none');
    var confirm = document.getElementById('confirm-password');
    if (confirm) {
      confirm.setCustomValidity('');
    }
  });
}

// Password check (only on register.html)
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

function checkPasswords() {
  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity(''); // error is cleared after correction
  }
}

if (password && confirmPassword) {
  password.addEventListener('input', checkPasswords);
  confirmPassword.addEventListener('input', checkPasswords);
}
