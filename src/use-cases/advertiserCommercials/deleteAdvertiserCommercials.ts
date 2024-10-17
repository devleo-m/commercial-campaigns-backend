import { IAdvertiserCommercialsRepository } from '../../repositories/interfaces'
import { NotFoundError } from '../../utils/error/errors'

type Output = boolean

export class DeleteAdvertiserCommercialsUseCase {
    constructor(
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(id: number): Promise<Output> {
        const advertiserCommercialsById = await this.advertiserCommercialsRepository.getById(id)

        if(!advertiserCommercialsById){
            throw new NotFoundError('Advertiser commercial not found!')
        }

        const advertiserCommercialDeletedSuccess = await this.advertiserCommercialsRepository.delete(id)

        return advertiserCommercialDeletedSuccess
    }
}