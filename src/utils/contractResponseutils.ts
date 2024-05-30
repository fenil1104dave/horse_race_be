import HttpStatusCode from "./HTTPStatusCode";
import { globalContract } from "./initContracts";
import {
    errorResponse,
    successListResponse,
    successResponse,
} from "./responseUtils";

export const createItemResponses = <T>() => ({
    [HttpStatusCode.CREATED]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
    [HttpStatusCode.INTERNAL_SERVER_ERROR]:
        globalContract.type<ReturnType<typeof errorResponse>>(),
});

export const getAllItemsResponses = <T>() => ({
    [HttpStatusCode.OK]:
        globalContract.type<ReturnType<typeof successListResponse<T>>>(),
});

export const getItemByIdResponse = <T>() => ({
    [HttpStatusCode.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
});

export const deleteItemByIdResponse = <T>() => ({
    [HttpStatusCode.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
});

export const updateItemByIdResponse = <T>() => ({
    [HttpStatusCode.OK]:
        globalContract.type<ReturnType<typeof successResponse<T>>>(),
    [HttpStatusCode.BAD_REQUEST]: globalContract.type<string>(),
});
