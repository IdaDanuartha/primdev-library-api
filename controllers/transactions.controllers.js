import prisma from "../database/config.database.js";

export const getAllTransactions = async (req, res) => {
    const transactions = await prisma.transactions.findMany()

    res.json(transactions)
}

export const getTransactionById = async (req, res) => {
    const { id } = req.params

    const transaction = await prisma.transactions.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
    }

    res.json(transaction)
}

export const createTransaction = async (req, res) => {
    const transactionData = {}
    Object.assign(transactionData, req.body)

    const { error } = await prisma.transactions.create({
        data: transactionData
    })

    if (error) {
        return res.status(500).json({ message: 'Error adding transaction', error })
    }

    res.status(201).json({ message: 'Transaction added', transaction: transactionData })
}

export const updateTransaction = async (req, res) => {
    const { id } = req.params

    // Check is transaction exists before attempting update
    const transaction = await prisma.transactions.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
    }

    Object.assign(transaction, req.body)

    // Update the transaction with new data
    const updatedTransaction = await prisma.transactions.update({
        where: {
            id: parseInt(id)
        },
        data: transaction
    })

    res.json({ message: 'Transaction updated', transaction: updatedTransaction })
}

export const deleteTransaction = async (req, res) => {
    const { id } = req.params

    // Check is transaction exists before attempting delete
    const transaction = await prisma.transactions.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' })
    }

    const { error } = await prisma.transactions.delete({
        where: {
            id: parseInt(id)
        }
    })

    if (error) {
        return res.status(500).json({ message: 'Error deleting transaction', error })
    }

    res.json({ message: 'Transaction deleted' })
}