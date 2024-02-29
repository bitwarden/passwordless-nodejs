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
import SetAliasRequest from "./models/SetAliasRequest";
import SendMagicLinkRequest from "./models/SendMagicLinkRequest";
import GenerateAuthenticationTokenRequest from "./models/GenerateAuthenticationTokenRequest";
import GeneratedAuthenticationTokenResponse from "./models/GeneratedAuthenticationTokenResponse";

/**
 * Passwordless SDK client.
 */
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

  /**
   * @inheritDoc
   */
  setAliases = async (request: SetAliasRequest): Promise<void> =>
    this._httpClient.post("alias", request);

  /**
   * @inheritDoc
   */
  createRegisterToken = async (
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse> =>
    this._httpClient
      .post("register/token", registerOptions)
      .then((response) => response.data);

  /**
   * @inheritDoc
   */
  deleteCredential = (credentialId: Uint8Array): Promise<void> => {
    if (!credentialId) {
      throw new Error("'credentialId' is empty or was not specified.");
    }
    const request = new DeleteCredentialRequest(credentialId);
    return this._httpClient.post("credentials/delete", request);
  };

  /**
   * @inheritDoc
   */
  deleteUser = (userId: string): Promise<void> => {
    const request = new DeleteUserRequest(userId);
    return this._httpClient.post("users/delete", request);
  };

  /**
   * @inheritDoc
   */
  listAliases = (userId: string): Promise<AliasPointer[]> =>
    this._httpClient
      .get<ListResponse<AliasPointer>>(`alias/list?userid=${userId}`)
      .then(
        (response: AxiosResponse<ListResponse<AliasPointer>>) =>
          response.data.values,
      );

  /**
   * @inheritDoc
   */
  listCredentials = (userId: string): Promise<Credential[]> =>
    this._httpClient
      .get<ListResponse<Credential>>(`credentials/list?userid=${userId}`)
      .then(
        (response: AxiosResponse<ListResponse<Credential>>) =>
          response.data.values,
      );

  /**
   * @inheritDoc
   */
  verifyToken = (verifyToken: string): Promise<VerifiedUser | null> => {
    const request = new VerifyTokenRequest(verifyToken);
    return this._httpClient
      .post("signin/verify", request)
      .then((response: AxiosResponse<VerifiedUser>) => response.data)
      .catch(() => null);
  };

  /**
   * @inheritDoc
   */
  sendMagicLink = (request: SendMagicLinkRequest): Promise<void> =>
    this._httpClient.post("magic-link/send", request);

  /**
   * @inheritDoc
   */
  generateAuthenticationToken = (
    request: GenerateAuthenticationTokenRequest,
  ): Promise<GeneratedAuthenticationTokenResponse | null> =>
    this._httpClient
      .post("signin/generate-token", request)
      .then(
        (response: AxiosResponse<GeneratedAuthenticationTokenResponse>) =>
          response.data,
      )
      .catch(() => null);
}

export default PasswordlessClient;
