const db = require('../db/knex');

const getServices = async (req, res) => {
    try {
        const services = await db('service').select('*');
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
}

const getServiceTypes = async (req,res) => {
    try{
        const serviceTypes = await db('service_type').select('*');
        res.status(200).json(serviceTypes);
    }catch(error){
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
}

const getService = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        const service = await db('service')
            .where({ id })
            .first();

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
}

const getServiceType = async (req,res) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        const service = await db('service_type')
            .where({ id })
            .first();

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(service);
    }catch(error){

    }
}

const postService = async (req, res) => {
    try {
        const serviceData = req.body;
        
        if (!serviceData) {
            return res.status(400).json({ error: 'Service data is required' });
        }

        const [newService] = await db('service')
            .insert(serviceData)
            .returning('*');

        res.status(201).json(newService);
    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ error: 'Failed to create service' });
    }
}

const patchService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Update data is required' });
        }

        // First check if service exists
        const existingService = await db('service')
            .where({ id })
            .first();

        if (!existingService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        // Update the service
        const [updatedService] = await db('service')
            .where({ id })
            .update(updateData)
            .returning('*');

        res.status(200).json(updatedService);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
}

module.exports = {
    getServices,
    getService,
    getServiceTypes,
    getServiceType,
    postService,
    patchService
};
