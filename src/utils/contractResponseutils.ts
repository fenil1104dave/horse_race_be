import { globalContract } from "./initContracts";
import {
    errorResponse,
    successListResponse,
    successResponse,
} from "./responseUtils";
import { ClientError, ServerError, SuccessStatus } from "./statusCodes";

export const createItemResponses = <T>() => ({
    [SuccessStatus.CREATED]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
    [ServerError.INTERNAL_SERVER_ERROR]:
        globalContract.type<ReturnType<typeof errorResponse>>(),
});

export const getAllItemsResponses = <T>() => ({
    [SuccessStatus.OK]:
        globalContract.type<ReturnType<typeof successListResponse<T>>>(),
});

export const getItemByIdResponse = <T>() => ({
    [SuccessStatus.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
});

export const deleteItemByIdResponse = <T>() => ({
    [SuccessStatus.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
});

export const updateItemByIdResponse = <T>() => ({
    [SuccessStatus.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
    [ClientError.BAD_REQUEST]: globalContract.type<string>(),
});
