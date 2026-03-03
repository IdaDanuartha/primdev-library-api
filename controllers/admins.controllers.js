import prisma from "../database/config.database.js";

export const getAllAdmins = async (req, res) => {
    const admins = await prisma.admins.findMany()

    res.json(admins)
}

export const getAdminById = async (req, res) => {
    const { id } = req.params

    const admin = await prisma.admins.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
    }

    res.json(admin)
}

export const createAdmin = async (req, res) => {
    const adminData = {}
    Object.assign(adminData, req.body)

    const { error } = await prisma.admins.create({
        data: adminData
    })

    if (error) {
        return res.status(500).json({ message: 'Error adding admin', error })
    }

    res.status(201).json({ message: 'Admin added', admin: adminData })
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params

    // Check is admin exists before attempting update
    const admin = await prisma.admins.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
    }

    Object.assign(admin, req.body)

    // Update the admin with new data
    const updatedAdmin = await prisma.admins.update({
        where: {
            id: parseInt(id)
        },
        data: admin
    })

    res.json({ message: 'Admin updated', admin: updatedAdmin })
}

export const deleteAdmin = async (req, res) => {
    const { id } = req.params

    // Check is admin exists before attempting delete
    const admin = await prisma.admins.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
    }

    const { error } = await prisma.admins.delete({
        where: {
            id: parseInt(id)
        }
    })

    if (error) {
        return res.status(500).json({ message: 'Error deleting admin', error })
    }

    res.json({ message: 'Admin deleted successfully' })
}