import { ICampaignsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = {
    lines: {
        id: number,
        name: string,
        startDate: Date,
        endDate: Date
        userId: number
    }[],
    total: number
};
export class GetAllCampaignUseCase {
    constructor(
        readonly campaignRepository: ICampaignsRepository
    ) {}

    async execute(): Promise<Output> {
        const campaigns = await this.campaignRepository.getAll({}, [])

        const returnResults: Output['lines'] = []

        for (const campaign of campaigns) {
            returnResults.push({
                id: campaign.id,
                name: campaign.name,
                startDate: campaign.startDate,
                endDate: campaign.endDate,
                userId: campaign.userId
            })
        }

        return {
            lines: returnResults,
            total: campaigns.length
        }
    }
}