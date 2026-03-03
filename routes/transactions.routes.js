import { Router } from 'express'
import { Joi, validate } from 'express-validation'
import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from '../controllers/transactions.controllers.js'

const router = Router()

const transactionValidation = {
    body: Joi.object({
        bookId: Joi.number().integer().required(),
        userId: Joi.number().integer().required(),
        type: Joi.string().valid('borrow', 'return').required()
    })
}

const updateTransactionValidation = {
    body: Joi.object({
        bookId: Joi.number().integer(),
        userId: Joi.number().integer(),
        type: Joi.string().valid('borrow', 'return')
    })
}

router.get('/transactions', getAllTransactions)
router.get('/transactions/:id', getTransactionById)
router.post('/transactions', validate(transactionValidation), createTransaction)
router.put('/transactions/:id', validate(updateTransactionValidation), updateTransaction)
router.delete('/transactions/:id', deleteTransaction)

export default router