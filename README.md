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

## DOM Manipulation and Events (Assignment 5, Part 1)

### How to open
Open `index.html` in a browser (internet is needed for fonts and Bootstrap on the form pages). Every feature has a label "Task N" on the page.

### Features
| Task | Page | Files | What it does |
|---|---|---|---|
| Task 0 - welcome message | index.html | js/welcome.js | name input and button, shows a welcome message (empty or spaces: helpful message) |
| Task 1 - light / dark theme | all pages (button in the header) | js/theme.js, css/features.css | `classList.toggle('light-theme')`, button text shows the next action; choice saved in `localStorage`, so it stays on all pages |
| Task 2 - FAQ | contacts.html | js/faq.js | 4 question buttons show and hide their answers, `aria-expanded` is updated |
| Task 3 - live search | playlists.html | js/search.js | filters the 6 genre cards on the `input` event, shows the count and "No results found" |
| Task 4 - favourites list | playlists.html | js/favourites.js | form adds items (`submit`, `preventDefault`), each item has its own Remove button, item count |

Plain JavaScript is used in external files with `defer` and `addEventListener()`. User text is shown with `textContent`.

### Tests
Tested in Chromium on 24 October 2026.

| # | Case | Test input | Expected result | Actual result |
|---|---|---|---|---|
| 1 | Task 0: empty name | nothing / three spaces, click the button | message "Please enter your name first." | As expected |
| 2 | Task 0: name with spaces | `  Ilkham  ` | "Welcome to VintageTape, Ilkham!" | As expected |
| 3 | Task 0: HTML in the name | `<b>Bob</b>` | shown as plain text | As expected |
| 4 | Task 1: theme | click the theme button twice | light theme, then the original dark theme; button text changes each time; the chosen theme stays when another page is opened | As expected on all 5 pages |
| 5 | Task 2: open and close | click question 2, then 3, then 2 again | answers open and close independently, `aria-expanded` matches | As expected |
| 6 | Task 2: keyboard | Tab to a question, Enter / Space | answer opens / closes | As expected |
| 7 | Task 3: search | `  RoCk ` | 1 card shown, "Showing 1 of 6 genres" | As expected |
| 8 | Task 3: search `pop` | `pop` | Noise Pop, k-pop and J-pop shown (3 of 6) | As expected |
| 9 | Task 3: nothing found | `zzz` | 0 cards, "No results found" | As expected |
| 10 | Task 3: clear search | empty field | all 6 cards, message hidden | As expected |
| 11 | Task 4: empty text | nothing / spaces, Add or Enter | nothing added, error message | As expected |
| 12 | Task 4: add items | `Rock`, `<i>Indie</i>`, `k-pop` | 3 items, "Items: 3", no page reload | As expected |
| 13 | Task 4: remove | Remove on the middle item, then the others | only that item is removed, count is correct each time | As expected |
| 14 | Layout | 320, 375, 768, 1024, 1440 px | no horizontal scroll on all pages | As expected |

### Contributions
| Member | Contribution |
|---|---|
| Amirzhanov Ilkham | Task 0 (index.html, js/welcome.js), Task 4 (favourites list, js/favourites.js) |
| Alibaeva Zhanel | Task 1 (js/theme.js, light theme in css/features.css), tests and screenshots |
| Kussainova Aizada | Task 3 (search on playlists.html, js/search.js) |
| Zholdanova Elnura | Task 2 (FAQ buttons on contacts.html, js/faq.js) |
