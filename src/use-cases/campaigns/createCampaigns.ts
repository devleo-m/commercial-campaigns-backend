import { ICampaignsRepository, IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    name: string,
    startDate: Date,
    endDate: Date,
    userId: number
}

type Output = {
    id: number,
}

export class CreateCampaignUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly campaignRepository: ICampaignsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const { name, startDate, endDate, userId } = input

        if (name.length < 3) {
            throw new NotFoundError('Invalid name')
        }

        if (startDate > endDate) {
            throw new NotFoundError('Invalid date')
        }

        if (startDate < new Date()) {
            throw new NotFoundError('Date must be in the future')
        }

        const verifyUserId = await this.userRepository.getById(userId)

        if (!verifyUserId) {
            throw new NotFoundError('User not found')
        }

        const newCampaign = await this.campaignRepository.create({
            name,
            startDate,
            endDate,
            userId
        })

        return {
            id: newCampaign.id
        }
    }
}