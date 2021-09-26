![Logo](https://res.cloudinary.com/rupamcloud/image/upload/v1632588318/logo512_vkauoz.png)

# Aashroy

Mapping the homless and helping them

## Frontend Tech Stack

**Client:** React, TailwindCSS

## Run Locally / Development Setup

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## To Build for Production

To build the frontend run

```bash
  npm run build
```

## Features

- Progressive Web App (PWA)
- Interactive Maps
- Data visualisation
- Responsive

## Configuring MapBox

## Configuring Constants

Set up the constants before starting running the project. Constans can also be changed to quickly edit the site :

- [auth.constants.js](src/constants/auth.constants.js) : contains the Google Oauth client ID and the redirect url for Oauth
- [crimeReport.constants.js](src/constants/crimeReport.constants.js) : set the crime types for crime report form and set the maximum photo a user can upload at a time.
- [donation.constants.js](src/constants/donation.constants.js) : set the types of donations available at donation form and set the maximum photo a user can upload at a time.
- [footer.constants.js](src/constants/footer.constats.js) : set the social media, service and contact details to be showed at the footer.
- [generalUserForm.constants.js](src/constants/generalUserForm.constants.js) : set the age groups, gender categories and the photo limit to how many a user can upload at once at the homeless report form
- [global.constants.js](src/constants/global.constants.js) : set the root endpoint of the api of the backend server.
- [table.constants.js](src/constants/table.constants.js) : configure the data coulmns for the table used in data visualisation at NGO's end points.

## Contributors

- [Debashish Gogoi](https://github.com/Devzard)
- [Forheen Ahmed](https://github.com/Forheen)
- [Rishparn Gogoi](https://github.com/RG-404)
- [Rupam Jyoti Das](https://github.com/rupam2001)

## Link to live demo

[https://aashroy.herokuapp.com/](https://aashroy.herokuapp.com/)
