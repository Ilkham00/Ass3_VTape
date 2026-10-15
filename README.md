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

## Forms and Validation (Assignment 4, Part 1)

### How to open the forms
Open `index.html` in a browser (internet is needed for Bootstrap and fonts). Contact form: menu -> Contacts. Registration form: menu -> Register.

### Tests

| # | Case | Test input | Expected result | Actual result |
|---|---|---|---|---|
| 1 | Contact: empty fields | all empty, Submit | all fields red | As expected |
| 2 | Contact: invalid email | `abc`, `user@domain`, `user@@example.com` | email red | As expected |
| 3 | Contact: name too short | `A` | name red | As expected |
| 4 | Contact: message too short / too long | `short`; paste 520 characters | red; only 500 kept | As expected |
| 5 | Contact: valid data | `Al`, `user@example.com`, `Hello, I would like a rock catalog.` | green, demo message | As expected |
| 6 | Register: empty required fields | all empty, Submit | 6 required fields red | As expected |
| 7 | Register: invalid email | `bad` | email red | As expected |
| 8 | Register: password shorter than 8 | `1234567` | password red | As expected |
| 9 | Register: passwords do not match | `12345678` and `12345679` | confirm red, turns green after correction | As expected |
| 10 | Register: no country | other fields valid, Submit | country red, no success message | As expected |
| 11 | Register: all required values valid | `Ilkham`, `Amirzhanov`, `ilkham@example.com`, `12345678` twice, Kazakhstan | demo message, form cleared | As expected |
| 12 | Register: Reset after errors | Submit empty, type `123` and `999`, Reset | values, colours and messages removed | As expected |
| 13 | Layout | 320, 375, 768, 1024, 1440 px | no horizontal scroll, name fields stacked on phone | As expected |

### Screenshots
Valid, invalid and responsive screenshots are in the `screenshots/` folder and in the report.

### Contributions
| Member | Contribution |
|---|---|
| Amirzhanov Ilkham | register.html, password check in js/forms.js |
| Alibaeva Zhanel | tests, this README, screenshots |
| Kussainova Aizada | form styles in css/, Register link in menu and footer |
| Zholdanova Elnura | contacts.html (Tasks 0-2) |