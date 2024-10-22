import { IAdvertiserCommercialCampaignAssociationsRepository, ICampaignsRepository , IAdvertiserCommercialsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'
import { Transaction } from 'sequelize'
import { sequelize as database  } from 'commercial-campaigns-db/out/database'

type Input = {
    campaignId: number
    commercialId: number
    startDate: Date
    endDate: Date
}

type Output = {
    id: number
}

export const createSequelizeTransaction = async () => {
    return await database.transaction()
}
export class CreateAdvertiserCommercialCampaignAssociationsUseCase {
    constructor(
        readonly advertiserCommercialCampaignAssociationsRepository: IAdvertiserCommercialCampaignAssociationsRepository,
        readonly campaignRepository: ICampaignsRepository,
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const transaction: Transaction = await createSequelizeTransaction()
        try {
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
            }, transaction);

            await transaction.commit()

            return {
                id: advertiserCommercialCampaignAssociations.id,
            }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
        
    }
}