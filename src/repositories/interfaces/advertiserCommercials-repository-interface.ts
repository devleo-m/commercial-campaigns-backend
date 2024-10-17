import { IAdvertiserCommercials } from "commercial-campaigns-db/out/interface"

export interface CreateAdvertiserCommercialsDto {
    name: string
    color: string
    userId: number
}

export interface UpdateAdvertiserCommercialsDto {
    name?: string
    color?: string
    userId?: number
}

export interface IAdvertiserCommercialsRepository{
    create(advertiserCommercialData: CreateAdvertiserCommercialsDto): Promise<IAdvertiserCommercials>
    getAll(where: object, orderBy: any[]): Promise<IAdvertiserCommercials[]>
    getById(id: number): Promise<IAdvertiserCommercials | null>
    update(id: number, advertiserCommercialData: UpdateAdvertiserCommercialsDto): Promise<IAdvertiserCommercials>
    delete(id: number): Promise<boolean>
}