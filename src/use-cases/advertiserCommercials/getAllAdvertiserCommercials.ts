import { IAdvertiserCommercialsRepository } from '../../repositories/interfaces'

type Output = {
    lines: {
        id: number,
        name: string,
        color: string,
        userId: number
    }[],
    total: number
};
export class GetAllAdvertiserCommercialsUseCase {
    constructor(
        readonly advertiserCommercialsRepository: IAdvertiserCommercialsRepository
    ) {}

    async execute(): Promise<Output> {
        const advertiserCommercials = await this.advertiserCommercialsRepository.getAll({}, [])

        const returnResults: Output['lines'] = []

        for (const advertiserCommercial of advertiserCommercials) {
            returnResults.push({
                id: advertiserCommercial.id,
                name: advertiserCommercial.name,
                color: advertiserCommercial.color,
                userId: advertiserCommercial.userId
            })
        }

        return {
            lines: returnResults,
            total: advertiserCommercials.length
        }
    }
}