import express from 'express'
import booksRouter from './books.routes.js'
import adminsRouter from './admins.routes.js'
import transactionsRouter from './transactions.routes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use(booksRouter)
router.use(adminsRouter)
router.use(transactionsRouter)

export default router