import CredentialDescriptor from "./CredentialDescriptor";
import Converters from "../Converters";

export default class Credential {
    public descriptor!: CredentialDescriptor;

    public publicKey!: string;

    public getPublicKey(): Uint8Array {
        return Converters.base64UrlToUint8Array(this.publicKey);
    }

    public userHandle!: string;

    public getUserHandle(): Uint8Array {
        return Converters.base64UrlToUint8Array(this.userHandle);
    }

    public signatureCounter?: number;
    public attestationFmt?: string;
    public createdAt?: Date;
    public aaGuid?: string;
    public lastUsedAt?: Date;
    public rpid?: string;
    public origin?: string;
    public country?: string;
    public device?: string;
    public nickname?: string;
    public userId?: string;
}