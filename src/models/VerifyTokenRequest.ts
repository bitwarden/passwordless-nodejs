export default class VerifyTokenRequest {
    constructor(token: string) {
        this.token = token;
    }

    token: string;
    rpid?: string;
    serverName?: string;
    origin?: string;
}