import { IAdvertiserCommercialCampaignAssociationsRepository } from "../../repositories/interfaces";
import { NotFoundError } from '../../utils/error/errors'

type Output = {
    id: number,
    campaignId: number,
    commercialId: number,
    startDate: Date,
    endDate: Date
}

export class GetByIdAdvertiserCommercialCampaignAssociationsUseCase {
    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const advertiserCommercialCampaignAssociations = await this.advertiserCommercialCampaignAssociationsRepository.getById(id)

        if (!advertiserCommercialCampaignAssociations) {
            throw new NotFoundError('Association not found')
        }

        return {
            id: advertiserCommercialCampaignAssociations.id,
            campaignId: advertiserCommercialCampaignAssociations.campaignId,
            commercialId: advertiserCommercialCampaignAssociations.commercialId,
            startDate: advertiserCommercialCampaignAssociations.startDate,
            endDate: advertiserCommercialCampaignAssociations.endDate
        }
    }
}