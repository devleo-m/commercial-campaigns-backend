import { IAdvertiserCommercialCampaignAssociationsRepository, ICampaignsRepository , IAdvertiserCommercialsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    campaignId: number
    commercialId: number
    startDate: Date
    endDate: Date
}

type Output = {
    id: number
    campaignId: number
    commercialId: number
    startDate: Date
    endDate: Date
}

export class CreateAdvertiserCommercialCampaignAssociationsUseCase {
    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository,
        readonly campaignRepository: ICampaignsRepository,
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const { campaignId, commercialId, startDate, endDate } = input

        const verifyCampaign = await this.campaignRepository.getById(campaignId)
        const verifyCommercial = await this.advertiserCommercialsRepository.getById(commercialId)

        if (!verifyCampaign) {
            throw new NotFoundError('Campaign not found')
        }

        if (!verifyCommercial) {
            throw new NotFoundError('Commercial not found')
        }

        if (startDate > endDate) {
            throw new NotFoundError('Invalid date')
        }

        const advertiserCommercialCampaignAssociations = await this.advertiserCommercialCampaignAssociationsRepository.create({
            campaignId,
            commercialId,
            startDate,
            endDate
        })

        return {
            id: advertiserCommercialCampaignAssociations.id,
            campaignId: advertiserCommercialCampaignAssociations.campaignId,
            commercialId: advertiserCommercialCampaignAssociations.commercialId,
            startDate: advertiserCommercialCampaignAssociations.startDate,
            endDate: advertiserCommercialCampaignAssociations.endDate
        }
    }
}