import { IAdvertiserCommercialsRepository, IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    name?: string
    color?: string
    userId?: number
}

type Output = {
    id: number
    name: string
    color: string
    userId: number
}

export class UpdateAdvertiserCommercialsUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(id: number, input: Input): Promise<Output> {
        const advertiserCommercialById = await this.advertiserCommercialsRepository.getById(id)

        if(!advertiserCommercialById){
            throw new NotFoundError('advertiser commercial not found!')
        }

        const { name, color, userId } = input

        if (name && name.length < 3) {
            throw new NotFoundError('Invalid name')
        }

        if (color && color.length < 3) {
            throw new NotFoundError('Invalid color')
        }

        const verifyUserId = await this.userRepository.getById(userId || advertiserCommercialById.userId)

        if (!verifyUserId) {
            throw new NotFoundError('User not found')
        }

        const newAdvertiserCommercials = await this.advertiserCommercialsRepository.update(id, {
            name,
            color,
            userId
        })

        return {
            id: newAdvertiserCommercials.id,
            name: newAdvertiserCommercials.name,
            color: newAdvertiserCommercials.color,
            userId: newAdvertiserCommercials.userId
        }
    }
}