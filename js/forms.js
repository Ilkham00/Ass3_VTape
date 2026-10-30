// Task 5 - Validate a website form (contacts.html and register.html)
// jQuery handles the submit event, checks every field and shows a message for each field.
// Nothing is sent anywhere: a valid form only shows a demonstration message.

$(function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // one check for every field: it returns an error text, or '' if the value is fine
  const checks = {
    'contact-name': makeNameCheck('name'),
    'first-name': makeNameCheck('first name'),
    'last-name': makeNameCheck('last name'),
    'contact-email': checkEmail,
    'register-email': checkEmail,
    'contact-message': function (value) {
      if (value === '') {
        return 'Please write a message.';
      }
      if (value.length < 10) {
        return 'The message is too short: write at least 10 characters.';
      }
      if (value.length > 500) {
        return 'The message is too long: use at most 500 characters.';
      }
      return '';
    },
    'password': function (value) {
      if (value === '') {
        return 'Please enter a password.';
      }
      if (value.length < 8) {
        return 'The password must have at least 8 characters.';
      }
      return '';
    },
    'confirm-password': function (value) {
      if (value === '') {
        return 'Please repeat the password.';
      }
      if (value !== $('#password').val()) {
        return 'The passwords do not match.';
      }
      return '';
    },
    'country': function (value) {
      if (value === '') {
        return 'Please choose your country.';
      }
      return '';
    }
  };

  // returns a check function for a name field; the label is used in the messages
  function makeNameCheck(label) {
    return function (value) {
      if (value === '') {
        return 'Please enter your ' + label + '.';
      }
      if (value.length < 2) {
        return 'Your ' + label + ' must have at least 2 characters.';
      }
      return '';
    };
  }

  function checkEmail(value) {
    if (value === '') {
      return 'Please enter your email.';
    }
    if (!emailPattern.test(value)) {
      return 'Enter an email like name@example.com.';
    }
    return '';
  }

  const fieldSelector = '.form-control, .form-select';

  // checks one field and shows or clears its message; returns true if the field is valid
  function validateField($field) {
    const id = $field.attr('id');
    const check = checks[id];
    if (!check) {
      return true;
    }

    // passwords keep their spaces, other fields are trimmed
    let value = $field.val();
    if (id !== 'password' && id !== 'confirm-password') {
      value = $.trim(value);
    }

    const error = check(value);
    const $feedback = $field.siblings('.invalid-feedback');

    if (error !== '') {
      $feedback.text(error);
      $field.removeClass('is-valid').addClass('is-invalid').attr('aria-invalid', 'true');
      return false;
    }
    $field.removeClass('is-invalid').addClass('is-valid').attr('aria-invalid', 'false');
    return true;
  }

  function clearState($form) {
    $form.find(fieldSelector).removeClass('is-valid is-invalid').removeAttr('aria-invalid');
  }

  $('.needs-validation').each(function () {
    const $form = $(this);
    const $success = $form.find('.alert');

    $success.hide();

    // connect every error text with its field for screen readers
    $form.find(fieldSelector).each(function () {
      const $feedback = $(this).siblings('.invalid-feedback');
      $feedback.attr('id', this.id + '-error');
      $(this).attr('aria-describedby', this.id + '-error');
    });

    $form.on('submit', function (event) {
      event.preventDefault(); // no page reload
      let firstInvalid = null;

      $form.find(fieldSelector).each(function () {
        if (!validateField($(this)) && firstInvalid === null) {
          firstInvalid = $(this);
        }
      });

      if (firstInvalid !== null) {
        // invalid data never shows the success message
        $success.stop(true, true).hide();
        firstInvalid.trigger('focus');
        return;
      }

      // valid: clear the fields and show the demonstration message
      $form[0].reset();
      clearState($form);
      $success.stop(true, true).hide().fadeIn(300);
    });

    // while the user is typing, a field that was already checked is checked again
    $form.on('input change', fieldSelector, function () {
      const $field = $(this);
      if ($field.hasClass('is-invalid') || $field.hasClass('is-valid')) {
        validateField($field);
      }
      // the confirmation depends on the password
      if (this.id === 'password') {
        const $confirm = $('#confirm-password');
        if ($confirm.hasClass('is-invalid') || $confirm.hasClass('is-valid')) {
          validateField($confirm);
        }
      }
    });

    // when the user leaves a field with some text, it is checked
    $form.on('focusout', fieldSelector, function () {
      if ($.trim($(this).val()) !== '') {
        validateField($(this));
      }
    });

    // Reset button: remove all messages
    $form.on('reset', function () {
      clearState($form);
      $success.stop(true, true).hide();
    });
  });
});
