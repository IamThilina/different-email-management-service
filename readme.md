# different-email-management-service

## Contents
- [Introduction](#introduction)
- [Project Structure](#structure)
- [Developer Guide](#dev-guide)

***

### Introduction
This is a REST API to support email management. Industry standard technologies have been adopted to each aspect of this project. They are

1. Language - Node Js 
2. Framework - Express Js 
3. Dependency Manager - Yarn 
4. Transpiler - Babel 
5. Linter - EsLint 
6. Formatter - Prettier 
7. Task Runner - Gulp 
8. API Documentation - Swagger
9. Source Documentation - EsDoc 
10. Unit Test Framework - Jest 
11. DB - Mongo 
12. Logger - Bunyan 

***

### Project Structure

```bash
├── src - (source folder)
│   ├── app - (all application specific files resides here)
│   │   ├── routers - (all sub level routers reside here)
│   │   |   └── email (email related routes hadling router)
│   │   ├── controllers (all business logic controllers resides here)
│   │   |   └── email (email related business logic hadling controller)
│   │   ├── services (all fine granular business logic handling required by controllers are done here)
│   │   |   └── email (email related fine granular business logic handler)
│   │   ├── daos (all database related files resides here)
│   │   |   └── mongo (all mongo related files resides here)
│   │   |   |   └── email (all data access files/models related to email collection)
│   │   ├── errorHandlers (all error scenarios related to business logic are handled here)
│   │   |   └── email (all error scenarios related to email business logic are handled here)
│   │   ├── clients (all external api consumers)
│   │   |   └── email (sendgrid api consumer)
│   │   ├── crons (all cron related files resides here)
│   │   |   ├── email (all cron jobs relates to emails)
│   │   |   └── index.js (single place to init & control all cron jobs)
│   │   ├── helpers (all helper modules resides here)
│   │   |   ├── constants.js (all app related constants are defined here)
│   │   |   └── decorator.js (all cross project helper methods are defined here)
│   │   ├── middleware (all middleware related to app resides here)
│   │   |   ├── 404Handler.js (404 error handler)
│   │   |   ├── errorHandler.js (ultimate error handler)
│   │   |   └── reqResLogger.js (express req,res logger)
│   │   └── router.js (base router of the application)
│   ├── configs (all app related configs resides here)
│   │   ├── index.json (load env specific configs required to run the application)
│   │   └── schema.json (joi schema for app config object)
│   ├── utils (all non-app specific utilities resides here)
│   │   └── logger.js (confgiure & inti app logger)
│   ├── .eslintrc (source level linting rules)
│   ├── app.js (apply all middleware & router in order)
│   ├── daemon.js (bootstrap everything required to start the app server)
│   └── server.js (spin up the express/http server and listen on given port)
├── dist (distribution folder)
├── node_modules (all dependencies)
├── es-doc (es-doc report)
├── .babelrc (transpilling rules)
├── .env (all application/environment specific configs)
├── coverage (unit/integration test reports)
├── .esdoc.json (source documentation rules)
├── .eslintignore (files to be ingnored by eslint)
├── .eslintrc (app level linting rules)
├── .gitignore (files to be ignored by git)
├── .prettierrc (source formatting rules)
├── gulpfile.js (all automated dev tasks)
├── jest.config.js (test framework configs)
├── package.json (dependency declaration)
├── readme.md (proect read me guide)
├── swagger.json (api documentation)
└── yarn.lock (track dependency changes)
```

***

### Developer Guide
#### prerequisite
1. node 8
2. yarn

#### how to start the application
1. copy the `.env` file to project directory
2. build the project using `yarn build`
3. start the project using `yarn start`

***
