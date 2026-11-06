// Form validation (contacts.html, register.html, login.html)
// jQuery handles the submit event, checks every field and shows a message under each field.
// Checked: required fields, email format, password length and complexity, phone number pattern.
// When all fields are valid, the function in VT.formHandlers (auth.js) decides what happens next.
// The contact form has no handler: it only shows a demonstration message.

$(function () {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9\s\-()]+$/; // digits, spaces, ( ) - and an optional + at the start

  // one check for every field: it returns an error text, or '' if the value is fine
  const checks = {
    'contact-name': makeNameCheck('name'),
    'first-name': makeNameCheck('first name'),
    'last-name': makeNameCheck('last name'),
    'contact-email': checkEmail,
    'register-email': checkEmail,
    'login-email': checkEmail,
    'contact-phone': makePhoneCheck(false), // optional on the contact form
    'phone': makePhoneCheck(true),          // required for sign up
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
    'password': checkPassword,
    'login-password': function (value) {
      // the log in form only needs a value; the rules are checked when the account is created
      return value === '' ? 'Please enter your password.' : '';
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

  // returns a check function for a phone field; "required" tells if an empty value is an error
  function makePhoneCheck(required) {
    return function (value) {
      if (value === '') {
        return required ? 'Please enter your phone number.' : '';
      }
      if (!phonePattern.test(value)) {
        return 'Use only digits, spaces and the signs + ( ) -.';
      }
      const digits = value.replace(/\D/g, '').length;
      if (digits < 10 || digits > 15) {
        return 'A phone number has 10 to 15 digits, for example +7 701 123 4567.';
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

  // the password needs at least 8 characters, a lower case letter, an upper case letter and a digit
  function checkPassword(value) {
    if (value === '') {
      return 'Please enter a password.';
    }
    const missing = [];
    if (value.length < 8) {
      missing.push('at least 8 characters');
    }
    if (!/[a-z]/.test(value)) {
      missing.push('a lower case letter');
    }
    if (!/[A-Z]/.test(value)) {
      missing.push('an upper case letter');
    }
    if (!/[0-9]/.test(value)) {
      missing.push('a digit');
    }
    if (missing.length > 0) {
      return 'The password needs ' + missing.join(', ') + '.';
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
    if (id !== 'password' && id !== 'confirm-password' && id !== 'login-password') {
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
    const $success = $form.find('.alert-success');

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

      // all fields are valid: sign up and log in have their own handler
      const handler = VT.formHandlers[$form.attr('id')];
      if (handler && handler($form) === false) {
        $success.stop(true, true).hide();
        return;
      }

      // valid: clear the fields and show the success message
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
