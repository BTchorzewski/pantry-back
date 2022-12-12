# The pantry app 1.0.0

The pantry app allows you to manage food products in your refrigerators and pantries. It provides tools to keep your
products fresh and help you not waste food. Receive information about products that are near expiry date.

#### Be aware that a client side application is being developed. It will be finished as soon as possible.

## Technology stack
- [Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Node.js](https://nodejs.org/en/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [Swagger](https://swagger.io/) - Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - A library to help you hash passwords.
- [Typescript](https://www.typescriptlang.org/docs/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance.
- [Typeorm](https://typeorm.io/) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- [Nodemailer](https://nodemailer.com/about/) - Nodemailer is a module for Node.js applications to allow easy as cake email sending.
- [JSON Web Token](https://jwt.io/) - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.

## Run api locally

The api is using Node.js v16.

Clone the project

```bash
  git clone https://github.com/BTchorzewski/pantry-back.git
```

Go to the project directory

```bash
  cd pantry-back
```

Install dependencies

```bash
  npm install
  
  or 
  
  npm install --force
 ```

Start the server

```bash
  npm run start:dev
```

### SMTP server for the user registration feature.
Start a SMTP server only if you want to test user registration feature.
You can use the docker image that is indicated below or your own local smtp server for development.

If you want to use the smtp server, don't change an email configuration in a config file.
A client side for the rnwood/smtp4dev is available at http://localhost:3003/

```
docker run --rm -it -p 3003:80 -p 2525:25 rnwood/smtp4dev
```
you might have to 'sudo' before docker commend if you are using linux.

### Authentication and Authorization
JSON web token authentication and authorization are implemented however for developing purpose authorization feature can be disabled by uncomment and comment specific decorators.
The application uses access tokens as `bearer` value in a header and refresh tokens as a cookie. 
Important! Import a user table from the requirements' folder is compulsory because the application is mocking authorization.

Feel free to disabled authorization by commenting pointed decorators: `@UseGuards(AccessJwtGuard)` and `@UserId() userId,` and uncommenting `@MockedUserId() userId,` in the pantry controller.





## API Reference

An api can be tested by Swagger on http://localhost:3001/api after running tha application.

