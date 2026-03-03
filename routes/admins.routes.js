import { Router } from 'express'
import { Joi, validate } from 'express-validation'
import {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from '../controllers/admins.controllers.js'

const router = Router()

const adminValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}

const updateAdminValidation = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6)
    })
}

router.get('/admins', getAllAdmins)
router.get('/admins/:id', getAdminById)
router.post('/admins', validate(adminValidation), createAdmin)
router.put('/admins/:id', validate(updateAdminValidation), updateAdmin)
router.delete('/admins/:id', deleteAdmin)

export default router