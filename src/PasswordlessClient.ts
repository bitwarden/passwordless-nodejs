import axios, { AxiosResponse, AxiosInstance, AxiosError } from "axios";
import IPasswordlessClient from "./IPasswordlessClient";
import PasswordlessOptions from "./PasswordlessOptions";
import ProblemDetails from "./models/ProblemDetails";
import ApiException from "./exceptions/ApiException";
import RegisterOptions from "./models/RegisterOptions";
import RegisterTokenResponse from "./models/RegisterTokenResponse";
import DeleteCredentialRequest from "./models/DeleteCredentialRequest";
import DeleteUserRequest from "./models/DeleteUserRequest";
import AliasPointer from "./models/AliasPointer";
import ListResponse from "./models/ListResponse";
import Credential from "./models/Credential";
import VerifiedUser from "./models/VerifiedUser";
import VerifyTokenRequest from "./models/VerifyTokenRequest";
import AddAliasRequest from "./models/AddAliasRequest";

export class PasswordlessClient implements IPasswordlessClient {
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
      (onRejected: AxiosError<ProblemDetails>) => {
        if (
          onRejected.response?.headers["content-type"] ===
          "application/problem+json"
        ) {
          throw new ApiException(onRejected.response.data);
        } else {
          const problemDetails: ProblemDetails = new ProblemDetails();
          problemDetails.status = onRejected.status;
          problemDetails.errorCode = "unexpected_error";
          problemDetails.title = onRejected.message;
          problemDetails.type = "https://docs.passwordless.dev/errors";
          throw new ApiException(problemDetails);
        }
      },
    );
  }

  addAliases = async (request: AddAliasRequest): Promise<void> =>
    this._httpClient.post("alias", request);

  createRegisterToken = async (
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse> =>
    this._httpClient
      .post("register/token", registerOptions)
      .then((response) => response.data);

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
}

export default PasswordlessClient;
