export default class RegisterOptions {
  public RegisterOptions(userId: string) {
    this.userId = userId;
  }

  userId!: string;

  displayName?: string;

  username?: string;

  attestation: string = "None";

  authenticatorType?: string;

  discoverable: boolean = true;

  userVerification: string = "Preferred";

  aliases?: string[];

  aliasHashing: boolean = true;

  expiresAt?: Date;
}
