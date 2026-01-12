// auth/interfaces/jwt-payload.interface.ts
export interface JwtPayloadWithRole {
  id: string;
  email: string;
  role: string;
  lastName: string;
  firstName: string;
}
