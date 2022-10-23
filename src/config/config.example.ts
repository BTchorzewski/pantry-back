export const config = {
  corsOrigin: undefined,
  appPort: 3001,
  db: {
    host: 'localhost',
    port: 3306,
    username: 'username',
    password: 'password',
    database: 'database',
  },
  jwt: {
    accessToken: 'access token secrete key',
    refreshToken: 'refresh token secrete key',
  },
  // Important! email properties are set up for the smtp server from the documentation.
  // change it if you want to use your own smtp server.
  email: {
    host: 'localhost',
    port: 2525,
    auth: {
      user: 'test@test.pl',
      password: 'password',
    },
  },
};
