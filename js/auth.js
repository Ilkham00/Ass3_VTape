// Authentication simulation (all pages)
// There is no backend, so users and the current session are kept in localStorage.
// WARNING: the password is saved as plain text only because this is a school simulation.
// A real website must never do this (the server stores a password hash).

const VT = {};

VT.USERS_KEY = 'vintagetape-users';
VT.SESSION_KEY = 'vintagetape-session';

// reads JSON from localStorage; returns the fallback if nothing is saved or storage is blocked
VT.read = function (key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
};

VT.write = function (key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

VT.getUsers = function () {
  const users = VT.read(VT.USERS_KEY, []);
  return Array.isArray(users) ? users : [];
};

// emails are compared in lower case
VT.findUser = function (email) {
  const wanted = String(email).toLowerCase();
  return VT.getUsers().filter(function (user) {
    return user.email === wanted;
  })[0] || null;
};

VT.addUser = function (user) {
  const users = VT.getUsers();
  users.push(user);
  return VT.write(VT.USERS_KEY, users);
};

VT.getCurrentUser = function () {
  const email = VT.read(VT.SESSION_KEY, null);
  return email ? VT.findUser(email) : null;
};

VT.login = function (email) {
  return VT.write(VT.SESSION_KEY, String(email).toLowerCase());
};

VT.logout = function () {
  try {
    localStorage.removeItem(VT.SESSION_KEY);
  } catch (error) {
    // nothing to remove
  }
};

// What happens after a form is valid. forms.js calls the function with the id of the form.
// Return true  -> forms.js shows the green success message and resets the form.
// Return false -> forms.js stops (the handler already showed its own message or left the page).
VT.formHandlers = {

  'register-form': function ($form) {
    const email = $.trim($('#register-email').val()).toLowerCase();

    // one account for one email
    if (VT.findUser(email)) {
      $('#register-email')
        .removeClass('is-valid').addClass('is-invalid').attr('aria-invalid', 'true')
        .siblings('.invalid-feedback').text('This email is already registered. Please log in.');
      $('#register-email').trigger('focus');
      return false;
    }

    const genres = $form.find('input[name="genres"]:checked').map(function () {
      return $(this).val();
    }).get();
    const genderLabel = $form.find('input[name="gender"]:checked').next('label').text();

    const saved = VT.addUser({
      firstName: $.trim($('#first-name').val()),
      lastName: $.trim($('#last-name').val()),
      email: email,
      phone: $.trim($('#phone').val()),
      password: $('#password').val(),
      gender: genderLabel === '' ? 'Not specified' : genderLabel,
      genres: genres,
      country: $('#country option:selected').text(),
      created: new Date().toISOString()
    });

    if (!saved) {
      $('#register-error').text('Your browser blocks local storage, so the account could not be saved.').prop('hidden', false);
      return false;
    }

    $('#register-error').prop('hidden', true);
    // after a short pause the visitor goes to the log in page
    setTimeout(function () {
      window.location.href = 'login.html?registered=1';
    }, 1500);
    return true;
  },

  'login-form': function () {
    const email = $.trim($('#login-email').val()).toLowerCase();
    const password = $('#login-password').val();
    const user = VT.findUser(email);

    // the same message for a wrong email and a wrong password
    if (user === null || user.password !== password) {
      $('#login-notice').prop('hidden', true);
      $('#login-error').text('Wrong email or password. Please try again.').prop('hidden', false);
      $('#login-password').val('').trigger('focus');
      return false;
    }

    VT.login(email);
    window.location.href = 'profile.html';
    return false;
  }
};



// запускаем после загрузки DOM
$(function () {
  const loggedIn = VT.getCurrentUser() !== null;

  // Register и Log in прячем, когда пользователь вошёл
  $('[data-auth="out"]').prop('hidden', loggedIn);
});
