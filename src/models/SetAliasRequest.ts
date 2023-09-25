export class SetAliasRequest {
  constructor(userId: string, aliases: string[] = [], hashing: boolean = true) {
    this.userId = userId;
    this.aliases = aliases;
    this.hashing = hashing;
  }

  public userId: string;

  /**
   * Aliases to add to the user. Existing aliases not included in this request will be removed.
   */
  public aliases: string[] = [];

  /**
   * Whether to hash the aliases before storing them.
   */
  public hashing: boolean = true;
}

export default SetAliasRequest;
