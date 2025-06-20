const db = require('../db/knex');

const getBookings = async (req, res) => {
    try {
        const bookings = await db('booking_detail')
            .select('*')
            .join('booking', 'booking_detail.booking_id', 'booking.id');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
}

const getBooking = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Booking ID is required' });
        }
        const booking = await db('booking')
            .where({ id })
            .first();

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
}

const postBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        
        if (!bookingData) {
            return res.status(400).json({ error: 'Booking data is required' });
        }

        const [newBooking] = await db('booking')
            .insert(bookingData)
            .returning('*');

        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
}

const patchBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Booking ID is required' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Update data is required' });
        }

        // First check if booking exists
        const existingBooking = await db('booking')
            .where({ id })
            .first();

        if (!existingBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Update the booking
        const [updatedBooking] = await db('booking')
            .where({ id })
            .update(updateData)
            .returning('*');

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
}

module.exports = {
    getBookings,
    getBooking,
    postBooking,
    patchBooking
};