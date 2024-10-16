import { ICampaignsRepository, IUserRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    name: string
    startDate: Date
    endDate: Date
    userId: number
}

type Output = {
    id: number
    name: string
    startDate: Date
    endDate: Date
    userId: number
}

export class UpdateCampaignUseCase {
    constructor(
        readonly userRepository: IUserRepository,
        readonly campaignRepository: ICampaignsRepository
    ) {}

    async execute(id: number, input: Input): Promise<Output> {
        const campaignById = await this.campaignRepository.getById(id)

        if(!campaignById){
            throw new NotFoundError('Campaign not found!')
        }

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

        const newCampaign = await this.campaignRepository.update(id, {
            name,
            startDate,
            endDate,
            userId
        })

        return {
            id: newCampaign.id,
            name: newCampaign.name,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            userId: newCampaign.userId
        }
    }
}