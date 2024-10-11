import { errorEnum } from './error.enum'
import { ErrorUtil } from './error.util'

export class UnauthorizedError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.UNAUTHORIZED))
    }
}

export class InternalServerError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.INTERNAL_SERVER_ERROR))
    }
}

export class NotFoundError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.NOT_FOUND))
    }
}

export class MethodNotAllowedError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.METHOD_NOT_ALLOWED))
    }
}

export class ForbiddenError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.FORBIDDEN))
    }
}

export class BadRequestError extends Error {
    constructor(err: string | Error) {
        super(ErrorUtil.stringfyError(err, errorEnum.BAD_REQUEST))
    }
}
