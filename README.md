# Red-Binder

## NOTE:
I am currently moving this project over to docker so it may not function correctly over the next two days so that you do not have to worry about what port the  backend or the expo server is being hosted on 

## Project Summary

An ios/android application that can help someone who needs to manage medications for multiple people in a household.

## Developers

Ryan Moon

## Installation Instructions

- Clone the repo

- From the root folder run :
    - npm run install to install yarn, the expo CLI and the required packages for the backend and for the server

- Run the app:
    - npm run development

- Open the app on mobile
    - Download the app ```Expo Go``` for the AppStore/PlayStore
    - open the QR scanner for your respective device and scan the QR code in the terminal

## Images

<img src="./images/Binders.png" alt="List of binders associated with the user account">
<img src="./images/Calendar.png" alt="Display calendar showing what days medications are marked for refill">
<img src="./images/CreateBinderScreen.png" alt="displays the screen for the create binder view">
<img src="./images/Fluffers.png" alt="displays the screen that is shown when a binder is select">
<img src="./images/MedicationsScreen.png" alt="displays all medications associated with a user">
<img src="./images/SelectedMedicationScreen.png" alt="displays the edit medication screen">
<img src="./images/UpdateRefill.png" alt="displays the update Refill popup that displays when you are on the calendar">

## Tech Stack

- written with: Typescript

- What libraries are used: React Native, expo, apollo-server-express, bcrypt, mongoose, body-parser, cors, dotenv,
  express, graphql,
  graphql-upload, jsonwebtoken, morgan, multer, ts-node, buffer, date-fns, expo (various expo packages),
  apollo-link-error, apollo-upload-client, lodash, graphql, @react-native-community/datetimepicker, react-navigation (
  various react navigation packages)

## User Story

- As someone who manages the medications of my family, I want a phone application that will help remind me when I need
  to refill prescriptions and who's prescription it belongs to.

## MVP (Minimum Viable Product)

- RedBinder will be a react native project that allows users to create an account, create profiles for individual family
  members. Adds medications specific to the family member, and view when the medication is due for refill on a calendar.

## Stretch Goals

- Include the ability to check for medication interactions, and schedule dosages for individual medications that will
  remind the owner of the app using push notifications.



