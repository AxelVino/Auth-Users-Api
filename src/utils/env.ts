const jwtA = process.env.JWT_REMO;
const jwtR = process.env.JWT_ROMULO;

if (!jwtA || !jwtR) {
  throw new Error("Missing JWT secrets in .env");
}

export const JWT_REMO: string = jwtA;
export const JWT_ROMULUS: string = jwtR;
