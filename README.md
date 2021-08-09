# Candid Candidates

This project is a basic front-end-only website mimicking a system for handling candidates in a corporate recruitment process. You can add, edit, and delete candidates. The project is built with `React` and `SCSS`. It uses `react-redux` and `redux-persist` to handle the state of candidates.

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

## Testing

This project uses Cypress to test all primary features through the UI and also has a small number of tests written in Jest for basic testing of the Redux reducer.

Cypress:

```
$ npx cypress open
```

Jest:

```
$ npm test
```

## Did you know?

I like surprising people with pieces of trivia :)

Did you know that you can reduce the load speed for Google Fonts by specifying the particular characters you need? For example, if you are only going to write "Candid Candidates" with a certain font, you can ask Google Fonts only to send you those characters. This is done by using the text-parameter, like so:

```
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap&text=Candidates" rel="stylesheet">
```