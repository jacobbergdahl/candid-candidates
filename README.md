# Candid Candidates

This project is a basic website mimicking a system for handling candidates in corporate recruitment processes. You can add, edit, and delete candidates. The project is built with React and SCSS.

You can view a live version of the website on https://wonderful-hugle-b863c2.netlify.app/.

## Installation

```
$ git clone https://github.com/jacobbergdahl/candid-candidates.git
$ cd candid-candidates/
$ npm install
$ npm start
```

## Data

Fifty random candidates are generated when you visit the website for the first time. These candidates are unique to your session. The project does not use a database and your data is not shared with any other party. Rather, all the data you see is stored in your `localStorage`. More candidates can be added and existing candidates can be edited, though all data will be lost when your `localStorage` clears. As such, you can also reset the data easily by clearing the storage and reloading the site, which can be done in your browser's console like so:

```
localStorage.clear();
location.reload();
```
