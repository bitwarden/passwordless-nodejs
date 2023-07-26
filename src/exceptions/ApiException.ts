import ProblemDetails from "../models/ProblemDetails";

export default class ApiException extends Error {
    private readonly _details: ProblemDetails;

    constructor(details: ProblemDetails) {
        super();
        this._details = details;
    }

    public get details(): ProblemDetails {
        return this._details;
    }
}