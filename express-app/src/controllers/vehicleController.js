const db = require('../db/knex');

const getVehicles = async (req, res) => {
    try {
        const vehicles = await db('vehicle').select('*');
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
}

const getVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Vehicle ID is required' });
        }

        const vehicle = await db('vehicle')
            .where({ id })
            .first();

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle' });
    }
}

const postVehicle = async (req, res) => {
    try {
        const vehicleData = req.body;
        
        if (!vehicleData) {
            return res.status(400).json({ error: 'Vehicle data is required' });
        }

        const [newVehicle] = await db('vehicle')
            .insert(vehicleData)
            .returning('*');

        res.status(201).json(newVehicle);
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
}

const patchVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Vehicle ID is required' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Update data is required' });
        }

        // First check if vehicle exists
        const existingVehicle = await db('vehicle')
            .where({ id })
            .first();

        if (!existingVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Update the vehicle
        const [updatedVehicle] = await db('vehicle')
            .where({ id })
            .update(updateData)
            .returning('*');

        res.status(200).json(updatedVehicle);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ error: 'Failed to update vehicle' });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Vehicle ID is required' });
        }

        // First check if vehicle exists
        const existingVehicle = await db('vehicle')
            .where({ id })
            .first();

        if (!existingVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Delete the vehicle
        await db('vehicle')
            .where({ id })
            .del();

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ error: 'Failed to delete vehicle' });
    }
}

module.exports = {
    getVehicles,
    getVehicle,
    postVehicle,
    patchVehicle,
    deleteVehicle
};

