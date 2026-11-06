// Log in page (login.html): small messages that depend on how the visitor arrived.

$(function () {
  // a visitor who is already logged in goes straight to the profile
  if (VT.getCurrentUser() !== null) {
    window.location.href = 'profile.html';
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get('registered') === '1') {
    $('#login-notice').text('Your account was created. Please log in.').prop('hidden', false);
  }
  if (params.get('loggedout') === '1') {
    $('#login-notice').text('You are logged out.').prop('hidden', false);
  }

  // the old error disappears when the visitor starts typing again
  $('#login-form').on('input', '.form-control', function () {
    $('#login-error').prop('hidden', true);
  });
});
