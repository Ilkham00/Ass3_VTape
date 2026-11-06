$(function () {
  const user = VT.getCurrentUser();

  if (user === null) {
    // гость видит это
    $('#profile-guest').prop('hidden', false);
    $('#profile-card').prop('hidden', true);
    return;
  }

  // залогиненный пользователь
  $('#profile-guest').prop('hidden', true);
  $('#profile-card').prop('hidden', false);

  $('#profile-name').text(user.firstName + ' ' + user.lastName);
  $('#profile-email').text(user.email);
  $('#profile-phone').text(user.phone || 'Not provided');
  $('#profile-country').text(user.country || 'Not provided');
  $('#profile-gender').text(user.gender || 'Not specified');
  $('#profile-genres').text(
    user.genres && user.genres.length ? user.genres.join(', ') : 'Not selected'
  );
  $('#profile-since').text(
    user.created ? new Date(user.created).toLocaleDateString('en-GB') : '—'
  );

  $('#logout-button').on('click', function () {
    VT.logout();
    window.location.href = 'login.html?loggedout=1';
  });
});