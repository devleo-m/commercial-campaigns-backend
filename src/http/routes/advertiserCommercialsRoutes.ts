import { Router } from 'express'
import { verifyJwt } from '../middleware/verify-jwt'
import { AdvertiserCommercialsController } from '../controllers'

const advertiserCommercialsRouter = Router()

advertiserCommercialsRouter.post('/advertiser-commercials', verifyJwt, AdvertiserCommercialsController.create)
advertiserCommercialsRouter.get('/advertiser-commercials', verifyJwt, AdvertiserCommercialsController.getAll)
advertiserCommercialsRouter.get('/advertiser-commercials/:id', verifyJwt, AdvertiserCommercialsController.getById)
advertiserCommercialsRouter.patch('/advertiser-commercials/:id', verifyJwt, AdvertiserCommercialsController.update)
advertiserCommercialsRouter.delete('/advertiser-commercials/:id', verifyJwt, AdvertiserCommercialsController.delete)

export { advertiserCommercialsRouter }