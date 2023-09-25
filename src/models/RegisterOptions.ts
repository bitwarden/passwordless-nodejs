import Attestation from "./enums/Attestation";
import UserVerification from "./enums/UserVerification";
import AuthenticatorAttachment from "./enums/AuthenticatorAttachment";

export class RegisterOptions {
  public RegisterOptions(userId: string) {
    this.userId = userId;
  }

  userId!: string;

  /**
   * A human-palatable name for the account, which should be chosen by the user. Used in Browser UI's and never stored on the server.
   */
  displayName?: string;

  /**
   * Required. A human-palatable identifier for a user account. It is intended only for display, i.e., aiding the user in determining the difference between user accounts with similar displayNames. Used in Browser UI's and never stored on the server
   */
  username?: string;

  /**
   * WebAuthn's attestation conveyance preference.
   */
  attestation: Attestation = Attestation.NONE;

  /**
   * WebAuthn authenticator attachment modality. Can be "any" (default), "platform", which triggers client device-specific options Windows Hello, FaceID, or TouchID, or "cross-platform", which triggers roaming options like security keys.
   */
  authenticatorType?: AuthenticatorAttachment;

  /**
   * If 'true', creates a client-side Discoverable Credential that allows sign in without needing a username.
   */
  discoverable: boolean = true;

  /**
   * Allows choosing preference for requiring User Verification (biometrics, pin code etc.) when authenticating
   */
  userVerification: UserVerification = UserVerification.PREFERRED;

  /**
   * A array of aliases for the userId, such as an email or username. Used to initiate a signin on the client side with the signinWithAlias() method. An alias must be unique to the userId. Defaults to being empty.
   */
  aliases?: string[];

  /**
   * When set to true, the aliases will only be stored in a hashed state.
   */
  aliasHashing: boolean = true;

  /**
   * Timestamp (UTC) when the registration token should expire. By default, current time + 120 seconds.
   */
  expiresAt?: Date;
}

export default RegisterOptions;
