# Interview Scheduler
Interview Scheduler is a single-page that allows users to book an interview appointment through the app.

ReactJS, WebSocket and SASS were used to design front-end part of the website.

UseReducer,UseEffect and UseState hooks were used for state management.

WebSocket updates the website without refreshing.

Node js, Express js and POSTGRES for back-end part.

The app is currently deployed on Netlify with its POSTGRES database server on Heroku.
(https://5fdb4ff97aceef0007957bae--admiring-curran-a773c7.netlify.app/)

80% test coverage from JEST

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress Test

```sh
npm run cypress
```
## Final Product
 **No appointments**
!["No appointments"](https://github.com/WanjinYoo/scheduler/blob/master/images/empty.png)
  **Form**
!["Form"](https://github.com/WanjinYoo/scheduler/blob/master/images/form.png)
 **Invalid input**
!["Invalid input"](https://github.com/WanjinYoo/scheduler/blob/master/images/errorhandling.png)
 **Appoitnment Added**
!["Appoitnment Added"](https://github.com/WanjinYoo/scheduler/blob/master/images/added.png)
 **Confirmation Message**
!["Confirmation Message"](https://github.com/WanjinYoo/scheduler/blob/master/images/confirmation.png)
 **Deleted and remaing spot incremented by 1**
!["Desktop version"](https://github.com/WanjinYoo/scheduler/blob/master/images/deleted.png)
  **Fully booked**
!["Fully booked"](https://github.com/WanjinYoo/scheduler/blob/master/images/fullybooked.png)








## Dependencies
ClientSide
- axios
- classnames
- node-sass
- normalize
- react
- react-dom
- react-scripts
ServerSide
- body-parser
- cor
- dotenv
- express
- helment
- pg
- socket.io
- ws

