import axios, { isAxiosError, AxiosResponse, AxiosInstance } from "axios";
import RegisterTokenResponse from "./models/RegisterTokenResponse";
import IPasswordlessClient from "./IPasswordlessClient";
import RegisterOptions from "./models/RegisterOptions";
import AliasPointer from "./models/AliasPointer";
import Credential from "./models/Credential";
import VerifiedUser from "./models/VerifiedUser";
import ProblemDetails from "./models/ProblemDetails";
import ApiException from "./exceptions/ApiException";
import VerifyTokenRequest from "./models/VerifyTokenRequest";
import DeleteUserRequest from "./models/DeleteUserRequest";
import ListResponse from "./models/ListResponse";
import PasswordlessOptions from "./PasswordlessOptions";
import DeleteCredentialRequest from "./models/DeleteCredentialRequest";
import UsersCount from "./models/UsersCount";

export default class PasswordlessClient implements IPasswordlessClient {
  private readonly _httpClient!: AxiosInstance;

  constructor(secret: string, options: PasswordlessOptions) {
    this._httpClient = axios.create({
      baseURL: options?.baseUrl || "https://v4.passwordless.dev",
      headers: {
        ApiSecret: secret,
      },
    });
    this._httpClient.interceptors.response.use(
      (onFulfilled) => onFulfilled,
      (onRejected) => {
        if (
          onRejected.response.headers["content-type"] ===
          "application/problem+json"
        ) {
          throw new ApiException(onRejected.response.data);
        }
        return onRejected;
      },
    );
  }

  createRegisterToken = async (
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse> =>
    this._httpClient
      .post("register/token", registerOptions)
      .then((response) => response.data)
      .catch((error) => {
        if (isAxiosError(error) && error.response) {
          const details = error.response?.data as ProblemDetails;
          throw new ApiException(details);
        }
      });

  deleteCredential = (credentialId: Uint8Array): Promise<void> => {
    if (!credentialId) {
      throw new Error("'credentialId' is empty or was not specified.");
    }
    const request = new DeleteCredentialRequest(credentialId);
    return this._httpClient.post("credentials/delete", request);
  };

  deleteUser = (userId: string): Promise<void> => {
    const request = new DeleteUserRequest(userId);
    return this._httpClient.post("users/delete", request);
  };

  listAliases = (userId: string): Promise<AliasPointer[]> =>
    this._httpClient
      .get<ListResponse<AliasPointer>>(`alias/list?userid=${userId}`)
      .then(
        (response: AxiosResponse<ListResponse<AliasPointer>>) =>
          response.data.values,
      );

  listCredentials = (userId: string): Promise<Credential[]> =>
    this._httpClient
      .get<ListResponse<Credential>>(`credentials/list?userid=${userId}`)
      .then(
        (response: AxiosResponse<ListResponse<Credential>>) =>
          response.data.values,
      );

  verifyToken = (verifyToken: string): Promise<VerifiedUser | null> => {
    const request = new VerifyTokenRequest(verifyToken);
    return this._httpClient
      .post("signin/verify", request)
      .then((response: AxiosResponse<VerifiedUser>) => response.data)
      .catch(() => null);
  };

  getUsersCount = (): Promise<UsersCount> =>
    this._httpClient
      .get("users/count")
      .then((response: AxiosResponse<UsersCount>) => response.data);
}
