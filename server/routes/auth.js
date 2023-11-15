import express from 'express'
import { showRegistrationPage } from '../controllers/auth-controller'

const router = express.Router()

router.get('/register', showRegistrationPage)

export default router