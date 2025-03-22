import { ApolloError } from "@apollo/client";

export type CustomErrors = "INVALID_OTP" | "USER_NOT_FOUND" | "UNKNOWN_ERROR";
export type CustomGraphQlError = {
  code: CustomErrors;
  message: string;
};

export const getGraphQlError = (error: ApolloError): CustomGraphQlError => {
  if (
    error.networkError &&
    typeof error.networkError === "object" &&
    "result" in error.networkError &&
    typeof error.networkError.result === "object" &&
    error.networkError.result !== null &&
    "errors" in error.networkError.result &&
    Array.isArray(error.networkError.result.errors) &&
    error.networkError.result.errors.length > 0 &&
    "extensions" in error.networkError.result.errors[0]
  ) {
    return {
      code: error.networkError.result.errors[0].extensions
        ?.code as CustomErrors,
      message: error.networkError.result.errors[0].message,
    };
  } else {
    return {
      code: "UNKNOWN_ERROR",
      message: "An unknown error occurred.",
    };
  }
};
