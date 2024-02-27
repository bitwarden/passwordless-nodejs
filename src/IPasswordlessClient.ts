import AliasPointer from "./models/AliasPointer";
import Credential from "./models/Credential";
import RegisterOptions from "./models/RegisterOptions";
import RegisterTokenResponse from "./models/RegisterTokenResponse";
import VerifiedUser from "./models/VerifiedUser";
import SetAliasRequest from "./models/SetAliasRequest";
import SendMagicLinkRequest from "./models/SendMagicLinkRequest";

/**
 * Passwordless SDK client interface.
 */
export interface IPasswordlessClient {
  /**
   * Adds aliases for a user. Removes any existing aliases not included in this request.
   * @param request
   */
  setAliases(request: SetAliasRequest): Promise<void>;

  /**
   * Lists all aliases for a user.
   * @param userId
   */
  listAliases(userId: string): Promise<AliasPointer[]>;

  /**
   * Deletes a credential
   * @param id
   */
  deleteCredential(id: Uint8Array): Promise<void>;

  /**
   * Lists all credentials for a user.
   * @param userId
   */
  listCredentials(userId: string): Promise<Credential[]>;

  /**
   * Creates a registration token for a user used for registration.
   * @param registerOptions
   */
  createRegisterToken(
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse>;

  /**
   * Verifies a token and returns the user if the token is valid.
   * @param verifyToken
   */
  verifyToken(verifyToken: string): Promise<VerifiedUser | null>;

  /**
   * Deletes a user and all associated data.
   * @param userId
   */
  deleteUser(userId: string): Promise<void>;

  /**
   * Sends a magic link to the user's email.
   * @param request magic link containing details about the magic link to send
   */
  sendMagicLink(request: SendMagicLinkRequest): Promise<void>;
}

export default IPasswordlessClient;
