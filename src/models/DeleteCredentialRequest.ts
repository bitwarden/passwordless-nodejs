import Converters from "../Converters";

export default class DeleteCredentialRequest {
    constructor(credentialId: Uint8Array) {
        this.credentialId = Converters.uint8ArrayToBase64Url(credentialId);
    }

    credentialId: string;
}