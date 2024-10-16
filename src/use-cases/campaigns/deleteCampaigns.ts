import { ICampaignsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = boolean

export class DeleteCampaignUseCase {
    constructor(
        readonly campaignRepository: ICampaignsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const campaignById = await this.campaignRepository.getById(id)

        if(!campaignById){
            throw new NotFoundError('Campaign not found!')
        }

        const campaignDeletedSuccess = await this.campaignRepository.delete(id)

        return campaignDeletedSuccess
    }
}