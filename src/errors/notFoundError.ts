import { AppError } from "./appError";
export class NotFoundError extends AppError{
    constructor(message = "Resource not Found"){
        super(message,404);
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
}