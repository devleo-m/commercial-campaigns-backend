import { IAdvertiserCommercialsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = {
    id: number
    name: string
    color: string
    userId: number
}

export class GetByIdAdvertiserCommercialsUseCase {
    constructor(
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const advertiserCommercialById = await this.advertiserCommercialsRepository.getById(id)

        if(!advertiserCommercialById){
            throw new NotFoundError('Advertiser commercial not found!')
        }

        return {
            id: advertiserCommercialById.id,
            name: advertiserCommercialById.name,
            color: advertiserCommercialById.color,
            userId: advertiserCommercialById.userId
        }
    }
}