import { ICampaignsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = {
    id: number
    name: string
    startDate: Date
    endDate: Date
    userId: number
}

export class GetByIdCampaignUseCase {
    constructor(
        readonly userRepository: ICampaignsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const campaignById = await this.userRepository.getById(id)

        if(!campaignById){
            throw new NotFoundError('Campaign not found!')
        }

        return {
            id: campaignById.id,
            name: campaignById.name,
            startDate: campaignById.startDate,
            endDate: campaignById.endDate,
            userId: campaignById.userId
        }
    }
}