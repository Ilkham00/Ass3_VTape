// Task 0 - Select elements and update content (index.html)

var nameInput = document.getElementById('name-input');
var welcomeButton = document.getElementById('welcome-button');
var welcomeMessage = document.querySelector('#welcome-message');

welcomeButton.addEventListener('click', function () {
  // read the value and remove spaces at the start and the end
  var name = nameInput.value.trim();

  if (name === '') {
    welcomeMessage.textContent = 'Please enter your name first.';
  } else {
    // textContent is used (not innerHTML), so the text is shown as plain text
    welcomeMessage.textContent = 'Welcome to VintageTape, ' + name + '!';
  }
});
