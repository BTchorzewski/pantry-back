# The pantry app

The pantry app allows you to manage food products in your refrigerator and pantries. It provides tools to keep your
products fresh and help you not waste food. Receive information about products that are nearing expiration. Generate PDF
reports of products that are nearing expiration. Determine expiration dates of products. Receive notification about
expiration.
#### Be aware that a client side application is being developed. It will be finished as soon as possible.
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
You can use the docker image that is below or your own local smtp server for development.

If you want to use the smtp server, don't change an email configuration in a config file.
A client side for the rnwood/smtp4dev is available at http://localhost:3003/

```
docker run --rm -it -p 3003:80 -p 2525:25 rnwood/smtp4dev
```
you might have to 'sudo' before docker commend if you are using linux.

### Authentication and Authorization
JSON web token authentication and authorization are implemented however for developing purpose authorization feature is disabled.
Important! Import a user table from the requirements' folder is compulsory because the application is mocking authorization.

Feel free to check authorization by uncommenting `@UseGuards(AccessJwtGuard)` and `@UserId() userId,` and commenting `@MockedUserId() userId,` in the pantry controller.





## API Reference

An api can be tested by Swagger on http://localhost:3001/api



### Authentication

#### Login

```http
  POST /auth/login
  Accept: application/json
  Content-Type: application/json
```

| JSON Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. A user login |
| `password` | `string` | **Required**. A user password. |

```http 
  POST JSON Response
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NTk5MjI1OSwiZXhwIjoxNjY1OTkzMTU5fQ.HZREaVRzId1UTb4BihDF0SVJXb2HXrXD-pSC6ZHgs78",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NTk5MjI1OSwiZXhwIjoxNjY3MjAxODU5fQ.JMgg2HQknXuxoLpGDtrrZkCe3u6_hHuQEC_pYuNCZ8Q"
  }
```

#### Logout

```http
  GET /auth/logout
  
  Accept: application/json
  Authorization: Bearer {access token}
```

```
POST JSON Response
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Your are logged out."
}
```