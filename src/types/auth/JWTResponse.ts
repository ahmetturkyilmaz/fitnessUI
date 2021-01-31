export interface JWTResponse {
  accessToken: string,
  type: string,
  id: string,
  email: string,
  name: string,
  surname: string,
  roles: string[]
}