export interface SuccessResult<T> {
    status: true;
  
    message: string;
    data: T;
  }
  
  export interface ErrorResult {
    status: false;
    errorMessage: string;
  }
  
  export type ApiResponse<T> = SuccessResult<T> | ErrorResult;
  