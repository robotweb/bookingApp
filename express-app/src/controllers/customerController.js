const db = require('../db/knex');

const getCustomers = async (req, res) => {
    try {
        const team = req.query.team;
        const customers = await db('customer').select('*').where("team_id","=",team);
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
}

const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        const customer = await db('customer')
            .where({ id })
            .first();

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
}

const postCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        
        if (!customerData) {
            return res.status(400).json({ error: 'Customer data is required' });
        }

        const [newCustomer] = await db('customer')
            .insert(customerData)
            .returning('*');

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
}

const patchCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Update data is required' });
        }

        // First check if customer exists
        const existingCustomer = await db('customer')
            .where({ id })
            .first();

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Update the customer
        const [updatedCustomer] = await db('customer')
            .where({ id })
            .update(updateData)
            .returning('*');

        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Failed to update customer' });
    }
}

module.exports = {
    getCustomers,
    getCustomer,
    postCustomer,
    patchCustomer
};
