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

## Deployed Website
[https://ilkham00.github.io/Ass3_VTape/index.html]

## Repository
[https://github.com/Ilkham00/Ass3_VTape]

## Final Website (Assignment 6: jQuery and Completed Website)

### Purpose
VintageTape is a frontend-only concept website about the nostalgia of cassettes and CDs. Visitors read the idea, search and filter six playlist genres, keep a shortlist of favourites and send a demonstration enquiry. There is no backend: nothing is sent or stored on a server.

### How to open
Open `index.html` in a browser (no build step). jQuery 3.6.0 is included as `js/jquery-3.6.0.min.js`, so it works without a CDN. Internet is only needed for the fonts and Bootstrap CSS. The public version is the link above.

### File structure
```
index.html  idea.html  playlists.html  contacts.html  register.html
css/   style.css (main design)  responsive.css (screen sizes)  features.css (jQuery features, light theme)
js/    jquery-3.6.0.min.js  theme.js  welcome.js  faq.js  search.js  favourites.js  journey.js  forms.js
images/        pictures of the site
screenshots/   screenshots used in the report
```
jQuery is loaded first on every page, then the project scripts. All handlers are attached with `.on()` inside `$(function () { ... })`. There are no inline event attributes.

### Main user journey
Home (welcome message) -> Playlists (search and category filter, add genres to favourites) -> Contacts ("Add them to my message", validated demo form) -> demonstration confirmation. The confirmation is a frontend-only simulation and says so.

### Map of the jQuery features
| Task | Page | File | Events and jQuery methods |
|---|---|---|---|
| 1 - welcome message | index.html | js/welcome.js | `submit`, `input`, `.val()`, `$.trim()`, `.text()`, `.addClass()`, `.removeClass()` |
| 1 - light / dark theme | all pages | js/theme.js | `click`, `.toggleClass()`, `.hasClass()`, theme saved in `localStorage` |
| 2 - FAQ (4 items) | contacts.html | js/faq.js | `click`, `.slideToggle()`, `.stop(true, true)`, `.attr('aria-expanded')` |
| 2 - fading message | playlists.html | js/favourites.js | `.fadeIn()`, `.delay()`, `.fadeOut()` for "Added / Removed" |
| 3 - search + categories | playlists.html | js/search.js | `input`, `click`, `.each()`, `.toggleClass()`, "Showing N of 6", "No results found", Clear filters |
| 4 - favourites list | playlists.html | js/favourites.js | `submit`, delegated `.on('click', '.remove-button')` and `.on('click', '.add-favourite')`, `.append()`, `.remove()`, `.text()`, empty-state message |
| 5 - forms | contacts.html, register.html | js/forms.js | `submit`, `input`, `focusout`, `reset`, `.val()`, `.siblings()`, field-specific messages, demo confirmation with `.fadeIn()` |
| Journey | contacts.html | js/journey.js | reads the saved favourites and fills the message with `.val()` |

User text is always shown with `.text()`, never as HTML.

### Tests
Tested in Chrome (viewports 375, 768 and 1440 px, dark and light theme). Test cases with steps, expected and actual results are in the report.

| # | Case | Result |
|---|---|---|
| 1 | Welcome: empty / spaces / `  Ilkham  ` / `<b>Ann</b>` | pass |
| 2 | Theme stays after opening another page (all 5 pages) | pass |
| 3 | FAQ: open, close, independent items, Enter and Space | pass |
| 4 | FAQ: 10 fast clicks, no animation queue | pass |
| 5 | Search: case, spaces, `pop`, `zzz` ("No results found") | pass |
| 6 | Category + search together, All, Clear filters | pass |
| 7 | Favourites: empty and duplicate values rejected, HTML shown as text | pass |
| 8 | Favourites: delegated Remove, empty state after the last item, saved after reload | pass |
| 9 | Contact form: empty and invalid values, field-specific messages, no success | pass |
| 10 | Contact form: valid data, demo confirmation, fields reset | pass |
| 11 | Register form: password mismatch, country, valid data, Reset | pass |
| 12 | No horizontal scroll, no JavaScript errors on all pages | pass |

Second browser (Edge): _to be filled in by the team after the retest on the published site._

### Frontend-only limitations
Forms do not send anything and no account is created. The favourites list is saved only in the browser of the visitor (`localStorage`).

### Contributions
| Member | Implemented | Reviewed / tested |
|---|---|---|
| Amirzhanov Ilkham | welcome message (index.html, js/welcome.js), favourites list and fading message (js/favourites.js), register.html validation | contacts.html form, README |
| Alibaeva Zhanel | theme button and light theme (js/theme.js, css/features.css), idea.html, responsive checks | favourites list, accessibility check |
| Kussainova Aizada | search and category filter (playlists.html, js/search.js) | welcome message, test table |
| Zholdanova Elnura | FAQ slide effects (contacts.html, js/faq.js), contact form validation and journey (js/forms.js, js/journey.js) | search and category filter, report |
Repository history (commits per member) is the evidence of these contributions.
