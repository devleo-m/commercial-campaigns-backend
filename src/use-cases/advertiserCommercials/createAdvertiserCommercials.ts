import { IAdvertiserCommercialsRepository, IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    name: string
    color: string
    userId: number
}

type Output = {
    id: number
}

export class CreateAdvertiserCommercialsUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const { name, color, userId } = input

        if (name.length < 3) {
            throw new NotFoundError('Invalid name')
        }

        if (color.length < 3) {
            throw new NotFoundError('Invalid color')
        }

        const verifyUserId = await this.userRepository.getById(userId)

        if (!verifyUserId) {
            throw new NotFoundError('User not found')
        }

        const newAdvertiserCommercials = await this.advertiserCommercialsRepository.create({
            name,
            color,
            userId
        })

        return {
            id: newAdvertiserCommercials.id
        }
    }
}