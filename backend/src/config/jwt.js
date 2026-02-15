export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = "1d";

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is missing. Using fallback.");
}

export default JWT_SECRET;