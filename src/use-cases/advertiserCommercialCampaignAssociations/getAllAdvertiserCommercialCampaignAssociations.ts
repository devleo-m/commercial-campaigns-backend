import { IAdvertiserCommercialCampaignAssociationsRepository } from "../../repositories/interfaces";

type Output = {
    lines: {
        id: number,
        campaignId: number,
        commercialId: number,
        startDate: Date,
        endDate: Date
    }[],
    total: number
}

export class GetAllAdvertiserCommercialCampaignAssociationsUseCase {
    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository
    ) {}

    async execute(): Promise<Output> {
        const advertiserCommercialCampaignAssociations = await this.advertiserCommercialCampaignAssociationsRepository.getAll({}, [])

        const returnResults: Output['lines'] = []

        for (const advertiserCommercialCampaignAssociation of advertiserCommercialCampaignAssociations) {
            returnResults.push({
                id: advertiserCommercialCampaignAssociation.id,
                campaignId: advertiserCommercialCampaignAssociation.campaignId,
                commercialId: advertiserCommercialCampaignAssociation.commercialId,
                startDate: advertiserCommercialCampaignAssociation.startDate,
                endDate: advertiserCommercialCampaignAssociation.endDate
            })
        }

        return {
            lines: returnResults,
            total: advertiserCommercialCampaignAssociations.length
        }
    }
}