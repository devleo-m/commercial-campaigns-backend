import { Router } from 'express'
import { verifyJwt } from '../middleware/verify-jwt'
import { AdvertiserCommercialCampaignAssociationsController } from '../controllers'

const advertiserCommercialCampaignAssociationsRouter = Router()

advertiserCommercialCampaignAssociationsRouter.post('/advertiser-commercials-campaigns', verifyJwt, AdvertiserCommercialCampaignAssociationsController.create)
advertiserCommercialCampaignAssociationsRouter.get('/advertiser-commercials-campaigns', verifyJwt, AdvertiserCommercialCampaignAssociationsController.getAll)
advertiserCommercialCampaignAssociationsRouter.get('/advertiser-commercials-campaigns/:id', verifyJwt, AdvertiserCommercialCampaignAssociationsController.getById)
advertiserCommercialCampaignAssociationsRouter.patch('/advertiser-commercials-campaigns/:id', verifyJwt, AdvertiserCommercialCampaignAssociationsController.update)
advertiserCommercialCampaignAssociationsRouter.delete('/advertiser-commercials-campaigns/:id', verifyJwt, AdvertiserCommercialCampaignAssociationsController.delete)

export { advertiserCommercialCampaignAssociationsRouter }