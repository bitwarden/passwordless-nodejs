import AliasPointer from "./models/AliasPointer";
import Credential from "./models/Credential";
import VerifiedUser from "./models/VerifiedUser";
import RegisterTokenResponse from "./models/RegisterTokenResponse";
import UsersCount from "./models/UsersCount";
import RegisterOptions from "./models/RegisterOptions";

export default interface IPasswordlessClient {
  listAliases(userId: string): Promise<AliasPointer[]>;

  deleteCredential(id: Uint8Array): Promise<void>;
  listCredentials(userId: string): Promise<Credential[]>;

  createRegisterToken(
    registerOptions: RegisterOptions,
  ): Promise<RegisterTokenResponse>;
  verifyToken(verifyToken: string): Promise<VerifiedUser | null>;

  deleteUser(userId: string): Promise<void>;
  getUsersCount(): Promise<UsersCount>;
}
