import Attestation from "./enums/Attestation";
import UserVerification from "./enums/UserVerification";

export class RegisterOptions {
  public RegisterOptions(userId: string) {
    this.userId = userId;
  }

  userId!: string;

  displayName?: string;

  username?: string;

  attestation: Attestation = Attestation.NONE;

  authenticatorType?: string;

  discoverable: boolean = true;

  userVerification: UserVerification = UserVerification.PREFERRED;

  aliases?: string[];

  aliasHashing: boolean = true;

  expiresAt?: Date;
}

export default RegisterOptions;
