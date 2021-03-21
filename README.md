# Candid Candidates

This project is a basic website mimicking a recruitment system. You can add, edit, and delete candidates. The project uses React and SCSS.

## Installation

Simply install the repo, run `npm install` followed by `npm start`, and you should be good to go.

## Data

This project does not use a database and your data is not shared with any other party. Rather, all the data you see is stored in your `localStorage`. Fifty random candidates are generated when you visit the website for the first time. More candidates can be added and existing candidates edited, though all data will be lost when your `localStorage` clears. As such, you can also reset the data easily by clearing the storage and reloading the site, which can be done in your browser's console like so:

```
localStorage.clear();
location.reload();
```