# JEEVA AI Assigment

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- MongoDB (or any other database of your choice)
- React.js 

## Setup
Clone the project

```bash
  git clone https://github.com/namanjangid2002/Jeeva-AI-Assigment.git
```

Go to the project directory

```bash
  cd Jeeva-AI-Assigment
```
#### Backend
```bash
  cd Backend
```
```bash
  npm i
``` 
#### Environment Variables

To run this project, you will need to add the following environment variables to your config.env file in `/data`

`PORT`: `Your Backend Port`

`FRONTEND_URI`:`Your React App Url`

#### Setup MongoDB

- Setup MongoDB Database using MongoDB Atlas.
- Update the MONGO URL in `/data/database.js` 
```bash
  mongoose.connect("<MONGO DB URL>", {
        dbName: "Form-Data-JEEVA-AI",
    
  ...
```
### Run Backend
```bash
  npm start
```

#### Frontend
```bash
  cd Frontend
  cd jeevaai
```
```bash
  npm i
``` 
Update proxy in the `package.json`

```bash
  ...
  "proxy": <Your Node.js Backend URL>,
  ...
```
### Run Frontend
```bash
  npm start
```