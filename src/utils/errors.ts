import HttpStatusCode from "./HTTPStatusCode";

export type Status = keyof typeof HttpStatusCode;

export class UnauthorizedError extends Error {
    status: Status;
    constructor(message: string, status: Status = "UNAUTHORIZED") {
        super(message);
        this.name = "UnauthorizedError";
        this.status = status;
    }
}

export class ValidationError extends Error {
    status: Status;
    constructor(message: string, status: Status = "BAD_REQUEST") {
        super(message);
        this.name = "ValidationError";
        this.status = status;
    }
}

export class ResourceNotFoundError extends Error {
    status: Status;
    constructor(message: string, status: Status = "NOT_FOUND") {
        super(message);
        this.name = "ResourceNotFound.";
        this.status = status;
    }
}

export class InternalServerError extends Error {
    status: Status;
    constructor(message: string, status: Status = "INTERNAL_SERVER_ERROR") {
        super(message);
        this.name = "InternalServerError.";
        this.status = status;
    }
}

export class ResourceAlreadyExistError extends Error {
    status: Status;
    constructor(message: string, status: Status = "CONFLICT") {
        super(message);
        this.name = "ResourceAlreadyExist.";
        this.status = status;
    }
}

export type FormattedErrorParam =
    | ResourceAlreadyExistError
    | InternalServerError
    | ResourceNotFoundError
    | ValidationError
    | UnauthorizedError;
