import ProblemDetails from "../models/ProblemDetails";

export class ApiException extends Error {
  private _details: ProblemDetails;

  constructor(details: ProblemDetails) {
    super();
    this._details = details;
  }

  public get details(): ProblemDetails {
    return this._details;
  }
}

export default ApiException;
