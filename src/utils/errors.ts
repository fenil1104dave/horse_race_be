import { HTTPStatusCode } from "@ts-rest/core";
import HttpStatusCode from "./HTTPStatusCode";
import { errorResponse } from "./responseUtils";

export type Status = keyof typeof HttpStatusCode;

export class UnauthorizedError extends Error {
    status: HTTPStatusCode;
    constructor(message: string, status: HTTPStatusCode = 401) {
        super(message);
        this.name = "UnauthorizedError";
        this.status = status;
    }
}

export class ValidationError extends Error {
    status: HTTPStatusCode;
    constructor(message: string, status: HTTPStatusCode = 400) {
        super(message);
        this.name = "ValidationError";
        this.status = status;
    }
}

export class ResourceNotFoundError extends Error {
    status: HTTPStatusCode;
    constructor(message: string, status: HTTPStatusCode = 404) {
        super(message);
        this.name = "ResourceNotFound.";
        this.status = status;
    }
}

export class InternalServerError extends Error {
    status: HTTPStatusCode;
    constructor(message: string, status: HTTPStatusCode = 500) {
        super(message);
        this.name = "InternalServerError.";
        this.status = status;
    }
}

export class ResourceAlreadyExistError extends Error {
    status: HTTPStatusCode;
    constructor(message: string, status: HTTPStatusCode = 409) {
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

export type FormattedErrorResponse = {
    status: number;
    body: ReturnType<typeof errorResponse>;
};

export const formattedError = (
    error: FormattedErrorParam
): FormattedErrorResponse => {
    return {
        status: error.status,
        body: errorResponse(error.message, error.name),
    };
};
