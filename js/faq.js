// Task 2 - Show and hide information (contacts.html)

var questions = document.querySelectorAll('.faq-question');

for (var i = 0; i < questions.length; i++) {
  questions[i].addEventListener('click', function () {
    var button = this;
    var answer = document.getElementById(button.getAttribute('aria-controls'));

    // each answer works on its own
    if (answer.hidden) {
      answer.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    } else {
      answer.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

// The questions are <button> elements, so Enter and Space also work from the keyboard.
