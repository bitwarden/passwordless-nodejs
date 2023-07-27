export default class DeleteUserRequest {
  constructor(userId: string) {
    this.userId = userId;
  }

  userId!: string;
}
