const db = require('../db/knex');

const home = (req, res) => {
    res.json({ message: 'Express Api' });
};

const checkdb = async (req, res) => {
    try {
        const [rows] = await db.raw('SELECT NOW() as now');
        res.json({ message: 'Connected to MySQL via Knex!', timestamp: rows[0].now });
    } catch (error) {
        console.error('DB Error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = { 
    home, 
    checkdb
};