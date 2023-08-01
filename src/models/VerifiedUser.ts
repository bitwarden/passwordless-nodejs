import Converters from "../Converters";

export class VerifiedUser {
  userId!: string;

  credentialId!: string;

  public getCredentialId(): Uint8Array {
    return Converters.base64UrlToUint8Array(this.credentialId);
  }

  success: boolean = false;

  timestamp?: Date;

  rpid?: string;

  origin?: string;

  device?: string;

  country?: string;

  nickname?: string;

  expiresAt?: Date;

  tokenId?: string;

  type?: string;
}

export default VerifiedUser;
