# Welcome to Purp Todos Frontend Repo

Just a simple purple todo app.

## About the stack

The app is built with, in the frontend, create-react-app (CRA), react-redux (Redux), react-query, some tailwind (as for the project jsx is more convenient as it is used both in React and React Native), in the backend, with NestJS, Passport, NodeMailer. 

Why CRA over Next.js?

Do not get me wrong, I love Next.js. However, **CRA** was choosen over Next.js as I was easier to implement mobile-like navigation (i.e., stacks and separated navigators). Let me illustrate, **Next.js** by default uses a file-system based router, which would mean significant boiler-plate to implement things as **private routes**. In contrast with CRA I could leverage React Router and build **two distinct BrowserRouters (Routers)**, one for the LoggedIn users and another for LoggedOut users.

## Learn More

You can learn more in about the project in this google doc. https://docs.google.com/document/d/1CGovQpVLyKUJX1btDI72kCfcPwfx0j4DAr9bsVpy9UE/edit?usp=sharing
