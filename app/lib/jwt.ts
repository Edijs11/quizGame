// Imports
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interfaces
interface SignOption {
  expiresIn?: string | number;
}

// Default token expiration date.
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1h',
};

// Function to create jwt.
export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  // Get secret key.
  const secret_key = process.env.SECRET_KEY;

  // Create token.
  const token = jwt.sign(payload, secret_key!, options);

  // Return the token.
  return token;
}

// Function to verify jwt.
export function verifyJwt(token: string) {
  try {
    // Get secret key.
    const secret_key = process.env.SECRET_KEY;
    // Verify secret key.
    const decoded = jwt.verify(token, secret_key!);

    // Return if jwt is valid
    return decoded as JwtPayload;
  } catch (error) {
    // If jwt is not valid, log the error.
    console.log(error);

    // And return null.
    return null;
  }
}
