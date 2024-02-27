import DeleteUserRequest from "./DeleteUserRequest";

export class SendMagicLinkRequest {
  constructor(emailAddress: string, urlTemplate: string, userId: string) {
    this.emailAddress = emailAddress;
    this.urlTemplate = urlTemplate;
    this.userId = userId;
  }

  emailAddress: string;

  urlTemplate: string;

  userId: string;

  timeToLive?: number;
}

export default SendMagicLinkRequest;
