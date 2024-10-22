import { IAdvertiserCommercialCampaignAssociationsRepository } from "../../repositories/interfaces"
import { NotFoundError } from '../../utils/error/errors'

type Output = boolean

export class DeleteAdvertiserCommercialCampaignAssociations {

    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const advertiserCommercialCampaignAssociations = await this.advertiserCommercialCampaignAssociationsRepository.getById(id)

        if (!advertiserCommercialCampaignAssociations) {
            throw new NotFoundError('Association not found')
        }

        const deleteAdvertiserCommercialCampaignAssociations = await this.advertiserCommercialCampaignAssociationsRepository.delete(id)

        return deleteAdvertiserCommercialCampaignAssociations
    }
}