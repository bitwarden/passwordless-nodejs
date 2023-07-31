import AliasPointer from "./models/AliasPointer";
import Credential from "./models/Credential";
import RegisterOptions from "./models/RegisterOptions";
import RegisterTokenResponse from "./models/RegisterTokenResponse";
import VerifiedUser from "./models/VerifiedUser";

export interface IPasswordlessClient {
  listAliases(userId: string): Promise<AliasPointer[]>;

  deleteCredential(id: Uint8Array): Promise<void>;
  listCredentials(userId: string): Promise<Credential[]>;

  createRegisterToken(
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse>;
  verifyToken(verifyToken: string): Promise<VerifiedUser | null>;

  deleteUser(userId: string): Promise<void>;
}

export default IPasswordlessClient;
