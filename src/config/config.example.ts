export interface Confing {
  corsOrigin: string | undefined;
  appPort: number;
  db: {
    host: string;
    port: 3306;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    accessToken: {
      key: string;
      expiresIn: string;
    };
    refreshToken: {
      key: string;
      expiresIn: string;
    };
  };
  // Important! email properties are set up for the smtp server from the documentation.
  // change it if you want to use your own smtp server.
  email: {
    host: string;
    port: 2525;
    auth: {
      user: string;
      password: string;
    };
  };
}

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
    accessToken: {
      key: 'access token secrete key',
      expiresIn: '10m',
    },
    refreshToken: {
      key: 'refresh token secrete key',
      expiresIn: '15d',
    },
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
} as Confing;
