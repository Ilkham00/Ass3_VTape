# VintageTape

**Topic:** Vintage music playlist Website
Memory-themed playlist catalog. Nostalgia for cassettes and CDs - curated playlists instead of endless algorithm feeds.

## Team
Group: MT-2503
| Name              |
|-------------------|
| Amirzhanov Ilkham |
| Alibaeva Zhanel   |
| Kussainova Aizada |
| Zholdanova Elnura |

## Page Ownership

| Page              | File             | Responsible Member  |
|-------------------|------------------|---------------------|
| Home              | index.html       | Amirzhanov Ilkham   |
| Idea              | idea.html        | Alibaeva Zhanel     |
| Playlists         | playlists.html   | Kussainova Aizada   |
| Contacts          | contacts.html    | Zholdanova Elnura   |
| Register          | register.html    | Amirzhanov Ilkham   |
| Log in            | login.html       | Amirzhanov Ilkham   |
| Profile           | profile.html     | Amirzhanov Ilkham   |

## Deployed Website
[https://ilkham00.github.io/Ass3_VTape/index.html]

## Repository
[https://github.com/Ilkham00/Ass3_VTape]

## Final Project

### Purpose and target users
VintageTape is a frontend-only website about the nostalgia of cassettes and CDs. It is made for music fans who like a calmer, more personal way to find music. Visitors read the idea, search and filter six playlist genres, keep a shortlist of favourites, hear sample tracks from a public API, and create a simulated account with a profile page. There is no backend: nothing is sent to a server.

### How to open
Open `index.html` in a browser (no build step). jQuery 3.6.0 is included as `js/jquery-3.6.0.min.js`, so it works without a CDN. Internet is needed for the fonts, the Bootstrap CSS and the iTunes API. The public version is the link above.

### File structure
```
index.html  idea.html  playlists.html  contacts.html  register.html  login.html  profile.html
css/   style.css (main design)  responsive.css (screen sizes)  features.css (jQuery features, light mode, effects)
js/    jquery-3.6.0.min.js  theme.js  auth.js  welcome.js  faq.js  search.js  favourites.js
       api.js  journey.js  forms.js  login-page.js  profile.js
images/        pictures of the site
```
jQuery is loaded first on every page, then the project scripts. All handlers are attached with `.on()` inside `$(function () { ... })`. There are no inline event attributes.

### Requirements checklist
| Requirement | Where it is done |
|---|---|
| At least 3 connected pages | 7 pages, the same navigation on all of them |
| Responsive (Flexbox, Grid, Bootstrap) | `css/style.css`, `css/responsive.css`; checked at 375, 768 and 1440 px |
| Hosting | GitHub Pages (link above) |
| Light and dark mode, saved | switch in the navigation, `js/theme.js`, `localStorage` key `vintagetape-theme` |
| Sign Up / Log In / Profile | `js/auth.js`, `register.html`, `login.html`, `profile.html`, `localStorage` |
| Form validation (email, password, required, phone) | `js/forms.js`, messages under the fields |
| Search / filter, results saved | `js/search.js`, `localStorage` key `vintagetape-search` |
| Animated buttons and UI effects | `css/features.css` (hover, press, card scale, switch icon spin), jQuery slide and fade |
| External API (bonus) | `js/api.js`, iTunes Search API with `fetch()` and `async/await` |
| Accessibility and navigation | same nav everywhere, alt text, H1 > H2 > H3, keyboard, `aria-*` |

### Main user journey
Home (welcome message) -> Playlists (search and category filter, add genres to favourites, sample tracks) -> Register (create an account) -> Log in -> Profile (details, favourites and last search) -> Contacts ("Add them to my message", validated demo form).

### Map of the jQuery features
| Feature | Page | File | Events and jQuery methods |
|---|---|---|---|
| Welcome message | index.html | js/welcome.js | `submit`, `input`, `.val()`, `$.trim()`, `.text()`, `.addClass()`, `.removeClass()` |
| Light / dark switch | all pages | js/theme.js | `click`, `.toggleClass()`, `.hasClass()`, `.attr('aria-checked')`, saved in `localStorage` |
| Sign Up, Log In, Profile | register, login, profile | js/auth.js, js/profile.js, js/login-page.js | `submit`, `.prop('hidden')`, `.text()`, `localStorage` users and session |
| Navigation by login state | all pages | js/auth.js | `[data-auth]`, `.prop('hidden')` |
| FAQ (4 items) | contacts.html | js/faq.js | `click`, `.slideToggle()`, `.stop(true, true)`, `.attr('aria-expanded')` |
| Fading message | playlists.html | js/favourites.js | `.fadeIn()`, `.delay()`, `.fadeOut()` |
| Search + categories | playlists.html | js/search.js | `input`, `click`, `.each()`, `.toggleClass()`, saved in `localStorage` |
| Favourites list | playlists.html | js/favourites.js | `submit`, delegated `.on('click', '.remove-button')` and `.on('click', '.add-favourite')`, `.append()`, `.remove()`, `.text()` |
| Forms | contacts, register, login | js/forms.js | `submit`, `input`, `change`, `focusout`, `reset`, `.val()`, `.siblings()`, `.trigger('focus')` |
| API sample tracks | playlists.html | js/api.js | `submit`, `fetch()`, `async/await`, `.append()`, `.attr()`, `.text()` |
| Journey | contacts.html | js/journey.js | reads the saved favourites and fills the message with `.val()` |

User text is always shown with `.text()`, never as HTML.

### Validation rules
| Field | Rule |
|---|---|
| Required fields | not empty, names at least 2 characters |
| Email | `name@example.com` pattern; on sign up not used by another account |
| Password (sign up) | at least 8 characters, with a lower case letter, an upper case letter and a digit; the confirmation must match |
| Phone | digits, spaces and `+ ( ) -`, 10 to 15 digits; required on sign up, optional on the contact form |

### Tests
Testing was performed in Google Chrome at 375, 768 and 1440 px, dark and light mode. Test cases with steps and results are in the report.

| # | Case | Result |
|---|---|---|
| 1 | Sign Up: empty form, 7 field messages, focus on the first field | pass |
| 2 | Phone: wrong and correct formats | pass |
| 3 | Password complexity: message lists what is missing | pass |
| 4 | Sign Up: valid data is saved, redirect to Log in; same email is rejected | pass |
| 5 | Log In: empty, unknown email, wrong password, success to Profile | pass |
| 6 | Profile: details shown, guest message, HTML shown as text, Log out | pass |
| 7 | Navigation changes by login state, the same HTML on all pages | pass |
| 8 | Contact form: optional phone | pass |
| 9 | Search and category saved and restored, Clear filters removes it | pass |
| 10 | API: list, empty answer, server error, no network | pass |
| 11 | Mode switch with mouse and keyboard, stays on all 7 pages | pass |
| 12 | Welcome, FAQ, favourites, search (earlier features) | pass |
| 13 | No horizontal scroll, no JavaScript errors, no missing files | pass |

### Frontend-only limitations
Accounts are only a simulation. Users and the session are saved in `localStorage` of the visitor's browser, and the password is saved as plain text because this is a school project. A real website needs a backend and password hashing. The contact form does not send anything.

### Contributions
| Member | Implemented | Reviewed / tested |
|---|---|---|
| Amirzhanov Ilkham | welcome message (index.html, js/welcome.js), favourites list and fading message (js/favourites.js), Sign Up, Log In and Profile (js/auth.js, login.html, profile.html), validation of the register and login forms | contacts.html form, README |
| Alibaeva Zhanel | light / dark switch (js/theme.js, css/features.css), animated buttons, idea.html, responsive checks | favourites list, accessibility check |
| Kussainova Aizada | search and category filter with saved search (playlists.html, js/search.js), iTunes API (js/api.js) | welcome message, test table |
| Zholdanova Elnura | FAQ slide effects (contacts.html, js/faq.js), contact form validation and journey (js/forms.js, js/journey.js) | search and category filter, report |
