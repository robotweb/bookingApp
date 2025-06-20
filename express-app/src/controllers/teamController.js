const db = require('../db/knex');

const getTeams = async (req, res) => {
    try {
        const teams = await db('team').select('*');
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
}

const getTeam = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        const team = await db('team')
            .where({ id })
            .first();

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ error: 'Failed to fetch team' });
    }
}

const postTeam = async (req, res) => {
    try {
        const teamData = req.body;
        
        if (!teamData) {
            return res.status(400).json({ error: 'Team data is required' });
        }

        const [newTeam] = await db('team')
            .insert(teamData)
            .returning('*');

        res.status(201).json(newTeam);
    } catch (error) {
        console.error('Error adding team:', error);
        res.status(500).json({ error: 'Failed to create team' });
    }
}

const patchTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Team ID is required' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'Update data is required' });
        }

        // First check if team exists
        const existingTeam = await db('team')
            .where({ id })
            .first();

        if (!existingTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Update the team
        const [updatedTeam] = await db('team')
            .where({ id })
            .update(updateData)
            .returning('*');

        res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ error: 'Failed to update team' });
    }
}

module.exports = {
    getTeams,
    getTeam,
    postTeam,
    patchTeam
};
