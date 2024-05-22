export const successListResponse = <T>(count: number, data: T[]) => ({
  count,
  data,
});

export const successResponse = <T>(data: T | null) => ({
  data,
});

export const errorResponse = <T>(message: string, error?: T) => ({
  message,
  error,
});

// export const validationErrorResponse = (
//   res: Response,
//   statusCode: number,
//   message: string,
//   errors: ValidationError[]
// ): Response<ValidationErrorResponse> => {
//   return res.status(statusCode).json({
//     status: false,
//     message,
//     errors,
//   });
// };
