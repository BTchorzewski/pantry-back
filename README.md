# The pantry app

The pantry app allows you to manage food products in your refrigerator and pantries. It provides tools to keep your
products fresh and help you not waste food. Receive information about products that are nearing expiration. Generate PDF
reports of products that are nearing expiration. Determine expiration dates of products. Receive notification about
expiration.

## Run Locally

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
```

Start the server

```bash
  npm run start:dev
```

Start the SMTP server only if you want to test user registration feature.

```
docker run --rm -it -p 3003:80 -p 2525:25 rnwood/smtp4dev
```

## API Reference

### Authentication

#### Login

```http
  POST /auth/login
  Accept: application/json
  Content-Type: application/json
```

| JSON Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. A user login |
| `password` | `string` | **Required**. A user password. |

```http 
  POST JSON Response
  HTTP/1.1 200 OK
  Content-Type: application/json

  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NTk5MjI1OSwiZXhwIjoxNjY1OTkzMTU5fQ.HZREaVRzId1UTb4BihDF0SVJXb2HXrXD-pSC6ZHgs78",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NTk5MjI1OSwiZXhwIjoxNjY3MjAxODU5fQ.JMgg2HQknXuxoLpGDtrrZkCe3u6_hHuQEC_pYuNCZ8Q"
  }
     OR
  {
    "statusCode": 401,
    "message": "Unauthorized"
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

    OR

{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
#### Get item

```http
 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.