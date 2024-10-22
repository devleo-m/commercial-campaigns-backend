import { IAdvertiserCommercialCampaignAssociationsRepository, ICampaignsRepository , IAdvertiserCommercialsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Input = {
    campaignId?: number
    commercialId?: number
    startDate?: Date
    endDate?: Date
}

type Output = {
    id: number
    campaignId: number
    commercialId: number
    startDate: Date
    endDate: Date
}

export class UpdateAdvertiserCommercialCampaignAssociationsUseCase {
    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository,
        readonly campaignsRepository: ICampaignsRepository,
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(id: number, input: Input): Promise<Output> {
        const advertiserCommercialCampaignAssociationById = await this.advertiserCommercialCampaignAssociationsRepository.getById(id)

        if (!advertiserCommercialCampaignAssociationById) {
            throw new NotFoundError('Advertiser Commercial Campaign Association not found')
        }

        const { campaignId, commercialId, startDate, endDate } = input

        const verifyCampaign = await this.campaignsRepository.getById(campaignId || advertiserCommercialCampaignAssociationById.campaignId)
        const verifyCommercial = await this.advertiserCommercialsRepository.getById(commercialId || advertiserCommercialCampaignAssociationById.commercialId)

        if (!verifyCampaign) {
            throw new NotFoundError('Campaign not found')
        }

        if (!verifyCommercial) {
            throw new NotFoundError('Commercial not found')
        }

        if (startDate && endDate && startDate > endDate) {
            throw new NotFoundError('Invalid date')
        }

        if (startDate && startDate < new Date()) {
            throw new NotFoundError('Date must be in the future')
        }

        const advertiserCommercialCampaignAssociation = await this.advertiserCommercialCampaignAssociationsRepository.update(id, {
            campaignId: campaignId || advertiserCommercialCampaignAssociationById.campaignId,
            commercialId: commercialId || advertiserCommercialCampaignAssociationById.commercialId,
            startDate: startDate || advertiserCommercialCampaignAssociationById.startDate,
            endDate: endDate || advertiserCommercialCampaignAssociationById.endDate
        })

        return {
            id: advertiserCommercialCampaignAssociation.id,
            campaignId: advertiserCommercialCampaignAssociation.campaignId,
            commercialId: advertiserCommercialCampaignAssociation.commercialId,
            startDate: advertiserCommercialCampaignAssociation.startDate,
            endDate: advertiserCommercialCampaignAssociation.endDate
        }
    }
}