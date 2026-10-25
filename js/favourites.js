// Task 4 - Create and remove elements (playlists.html)

var form = document.getElementById('favourites-form');
var input = document.getElementById('favourite-input');
var list = document.getElementById('favourite-list');
var count = document.getElementById('favourite-count');
var errorMessage = document.getElementById('favourite-error');

// shows the number of items (counted from the real list)
function updateCount() {
  count.textContent = 'Items: ' + list.children.length;
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); // the page is not reloaded

  var text = input.value.trim();

  // empty or only spaces is not allowed
  if (text === '') {
    errorMessage.textContent = 'Please type something before adding.';
    errorMessage.hidden = false;
    return;
  }
  errorMessage.hidden = true;

  // create the list item
  var item = document.createElement('li');
  item.className = 'favourite-item';

  var itemText = document.createElement('span');
  itemText.textContent = text;

  var removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'btn-reset remove-button';
  removeButton.textContent = 'Remove';
  removeButton.setAttribute('aria-label', 'Remove ' + text);

  // this button removes only its own item
  removeButton.addEventListener('click', function () {
    item.remove();
    updateCount();
  });

  item.append(itemText);
  item.append(removeButton);
  list.append(item);

  input.value = '';
  input.focus();
  updateCount();
});
