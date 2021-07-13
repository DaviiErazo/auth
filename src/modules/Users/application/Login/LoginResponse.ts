import { JWTToken, RefreshToken } from "../../domain/jwt";

type LoginResponse = {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
};

export default LoginResponse;
