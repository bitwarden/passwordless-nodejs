import Converters from "../Converters";

export default class CredentialDescriptor {
    public id: string = '';

    public getId(): Uint8Array {
        return Converters.base64UrlToUint8Array(this.id);
    }
}