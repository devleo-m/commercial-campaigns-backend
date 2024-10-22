import { Router } from 'express'
import { verifyJwt } from '../middleware/verify-jwt'
import { CampaignsController } from '../controllers'

const campaignsRouter = Router()

campaignsRouter.post('/campaigns', verifyJwt, CampaignsController.createCampaign)
campaignsRouter.get('/campaigns', verifyJwt, CampaignsController.getAllCampaigns)
campaignsRouter.get('/campaigns/:id', verifyJwt, CampaignsController.getByIdCampaign)
campaignsRouter.patch('/campaigns/:id', verifyJwt, CampaignsController.updateCampaign)
campaignsRouter.delete('/campaigns/:id', verifyJwt, CampaignsController.deleteCampaign)

export { campaignsRouter }