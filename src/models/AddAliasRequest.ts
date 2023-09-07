export class AddAliasRequest {
  constructor(userId: string, aliases: string[], hashing: boolean = true) {
    this.userId = userId;
    this.aliases = aliases;
    this.hashing = hashing;
  }

  public userId: string;

  public aliases: string[];

  public hashing: boolean = true;
}

export default AddAliasRequest;
