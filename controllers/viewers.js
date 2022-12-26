const router = require('express').Router();
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.PROD_DATABASE_HOST,
        user: process.env.PROD_DATABASE_USERNAME,
        password: process.env.PROD_DATABASE_PASSWORD,
        database: process.env.PROD_DATABASE
      },
    searchPath:['knex','public']
});

// GET: Fetch all views from the database
router.get('/', async (req, res) => {
    db.select('*')
        .from('viewers')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});
router.put('/add-viewer/', (req, res) => {
    const { email, timestamp, geo_dat,app} = req.body
        
    db('viewers')
        .insert({
            email,
            timestamp,
            geo_dat,
            app
        })
        .then(() => {
            console.log(`viewer ${req.body} Added`);
            return res.json({ msg: 'Viewer Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router;