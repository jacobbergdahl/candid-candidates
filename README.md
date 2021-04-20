# Candid Candidates

This project is a basic front-end-only website mimicking a system for handling candidates in corporate recruitment processes. You can add, edit, and delete candidates. The project is built with `React` and `SCSS`. It uses `react-redux` and `redux-persist` to handle the state of candidates.

You can view a live version of the website on https://wonderful-hugle-b863c2.netlify.app/.

## Installation

```
$ git clone https://github.com/jacobbergdahl/candid-candidates.git
$ cd candid-candidates/
$ npm install
$ npm start
```

## Data

Three hundred random candidates are generated when you visit the website for the first time. These candidates are unique to you. The project does not use a database and your data is not shared with any other party. Rather, all the data you see is stored in your `localStorage` through `redux-persist`.