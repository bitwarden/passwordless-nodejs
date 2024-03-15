export class SendMagicLinkRequest {
  constructor(
    emailAddress: string,
    urlTemplate: string,
    userId: string,
    timeToLive?: number,
  ) {
    this.emailAddress = emailAddress;
    this.urlTemplate = urlTemplate;
    this.userId = userId;
    this.timeToLive = timeToLive;
  }

  emailAddress: string;

  urlTemplate: string;

  userId: string;

  timeToLive?: number;
}

export default SendMagicLinkRequest;
