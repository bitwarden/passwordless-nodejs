export class DeleteUserRequest {
  constructor(userId: string) {
    this.userId = userId;
  }

  userId!: string;
}

export default DeleteUserRequest;
