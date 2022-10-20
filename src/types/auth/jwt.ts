export interface JwtPayload {
  id: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface InvalidLoginRes {
  statusCode: number;
  message: string;
}
