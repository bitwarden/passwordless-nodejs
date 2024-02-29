export class GenerateAuthenticationTokenRequest {
  constructor(userId: string) {
    this.userId = userId;
  }

  userId: string;

  timeToLive?: number;
}

export default GenerateAuthenticationTokenRequest;
