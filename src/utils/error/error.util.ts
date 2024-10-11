import { Response } from 'express'
import { errorEnum } from './error.enum'
import { IError } from './error.interface'
import { JsonWebTokenError } from 'jsonwebtoken'

export class ErrorUtil {
    public static handleError(message: string | Error) {
        if (message instanceof Error) {
            message = message.message
        }

        throw new Error(message)
    }

    public static stringfyError(message: string | Error, err: errorEnum) {
        if (message instanceof Error) {
            message = message.message
        }

        return JSON.stringify({ err, message })
    }

    public static parseError(error: Error, res: Response) {
        const message = error.message

        if (this.IsJsonString(message)) {
            const err: IError = JSON.parse(message)

            const name = errorEnum[err.err]

            res.status(err.err)

            const returnedError = {
                name,
                message: err.message,
                statusCode: err.err
            }

            return returnedError
        } else {

            if (error instanceof JsonWebTokenError) {
                res.status(errorEnum.UNAUTHORIZED)
                const returnedError = {
                    name: errorEnum[errorEnum.UNAUTHORIZED],
                    message: 'Token error',
                    statusCode: errorEnum.UNAUTHORIZED
                }

                return returnedError
            }

            res.status(errorEnum.UNKNOWN_ERROR)
            const returnedError = {
                name: errorEnum[errorEnum.UNKNOWN_ERROR],
                message,
                statusCode: errorEnum.UNKNOWN_ERROR
            }

            return returnedError
        }
    }

    private static IsJsonString(str: string) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }

        return true
    }
}
