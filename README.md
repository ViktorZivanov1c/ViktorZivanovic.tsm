# Notebook — Programming Class Portfolio

A clean, dark, IDE-inspired portfolio site for tracking assignments
and homework from a programming class. Built as static HTML/CSS/JS —
no build step, no framework, deploys directly to GitHub Pages.

Live structure: a **Home** page, an **Assignments** page, and a
**Homework** page (with downloadable project ZIPs), all driven by a
few small data files so the site is easy to keep up to date all year.

---

## Quick start

1. Open `assets/js/config.js` and replace the placeholder values
   (`[FIRST NAME]`, `[SCHOOL]`, etc.) with your own information.
2. Open the site — either double-click `index.html`, or serve the
   folder locally (`python3 -m http.server`, then visit
   `http://localhost:8000`).
3. Add your own assignments and homework (see below).
4. Push to GitHub and turn on **GitHub Pages** for the repo
   (Settings → Pages → deploy from the `main` branch, root folder).

No build tools, no `npm install` — every file is loaded directly by
the browser.

---

## Project structure

```
.
├── index.html                 Home page
├── assignments.html           Assignments page
├── homework.html               Homework page
├── README.md
└── assets/
    ├── css/
    │   └── style.css          All site styling
    ├── js/
    │   ├── config.js           ← your personal info (edit this)
    │   ├── data-assignments.js ← your assignments (edit this)
    │   ├── data-homework.js    ← your homework (edit this)
    │   └── render.js           Shared rendering logic (rarely needs edits)
    ├── img/
    │   ├── assignments/        Assignment screenshots
    │   └── homework/            Homework screenshots
    └── files/
        └── *.zip                Downloadable homework project archives
```

---

## Editing your personal info

Everything lives in **`assets/js/config.js`**. Change a value once
and it updates everywhere it appears on the site (sidebar, homepage,
page titles):

```js
const SITE_CONFIG = {
  firstName: "[FIRST NAME]",
  lastName: "[LAST NAME]",
  username: "[USERNAME]",
  school: "[SCHOOL]",
  grade: "[GRADE]",
  teacher: "[TEACHER]",
  bio: "…",
  technologies: ["C#", "HTML", "CSS", "JavaScript"],
  links: { github: "https://github.com/[USERNAME]", email: "" }
};
```

You never need to touch the HTML files to update this information —
elements that display it are simply marked with `data-cfg="..."`
attributes that `render.js` fills in automatically.

---

## Adding an assignment

Open **`assets/js/data-assignments.js`** and add a new object to the
`ASSIGNMENTS` array:

```js
{
  number: 6,
  lesson: 6,
  title: "Arrays",
  date: "2026-10-06",
  description: "Stored a list of scores in an array and computed the average.",
  technologies: ["C#", "Arrays"],
  screenshots: ["assets/img/assignments/06-arrays.png"]
}
```

1. Drop your screenshot(s) into `assets/img/assignments/`.
2. Reference the file path(s) in the `screenshots` array (more than
   one is fine — the first is shown on the card, and any can be
   opened full-size).
3. Save. The Assignments page picks it up automatically — no other
   code changes needed.

## Adding a homework entry

Open **`assets/js/data-homework.js`** and add a new object to the
`HOMEWORK` array:

```js
{
  number: 4,
  title: "Simple To-Do List",
  date: "2026-10-12",
  description: "A console to-do list with add, complete, and remove.",
  technologies: ["C#", "Collections"],
  screenshot: "assets/img/homework/04-todo.png",
  zip: "assets/files/homework-04-todo.zip",
  zipSize: "9 KB"
}
```

1. Zip your full project folder and place it in `assets/files/`.
2. Drop a screenshot into `assets/img/homework/`.
3. Point `zip` and `screenshot` at those file paths.

The ZIP is a **plain download** — the site never executes uploaded
code, it just links to the file.

---

## Design notes

- Dark, editor-inspired theme (sidebar navigation, monospace accents
  for numbers/labels/tags) built to read as a working developer
  notebook rather than a template.
- Fully responsive: the sidebar collapses into a top bar with a menu
  toggle under ~860px.
- Search + technology filters on both the Assignments and Homework
  pages.
- No frameworks or build step — easy to host anywhere that serves
  static files, including GitHub Pages.

## Credits

The general concept — a running notebook of class assignments and
homework with a download system — was inspired by a classmate's
project. This is an independent rebuild: all code, content, data,
and screenshots here are original placeholders belonging to this
project, with no assignments, screenshots, or personal information
copied from anyone else's work.

## License

Feel free to use this as a starting point for your own class
notebook. No attribution required.
