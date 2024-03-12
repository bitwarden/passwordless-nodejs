export class GenerateAuthenticationTokenRequest {
  constructor(userId: string, timeToLive?: number) {
    this.userId = userId;
    this.timeToLive = timeToLive;
  }

  userId: string;

  timeToLive?: number;
}

export default GenerateAuthenticationTokenRequest;
