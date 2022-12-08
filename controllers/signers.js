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

// GET: Fetch all signers from the database
router.get('/', async (req, res) => {
    db.select('*')
        .from('signers')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});
router.post('/add-signer', (req, res) => {
    const {first_name, middle_name, last_name, suffix, alias, address, city, state_or,zip,email, phone, signed, confirmed, openModal, timestamp, user_id, pass_id,doc_id} = req.body
        
    db('signers')
        .insert({
            // user_id,
            pass_id,
            first_name,
            middle_name,
            last_name,
            suffix,
            alias,
            address,
            city,
            state_or,
            zip,
            email,
            phone,
            timestamp,
            doc_id,
        })
        .then(() => {
            console.log(`Signer ${first_name} ${last_name} Added`);
            return res.json({ msg: 'Signer Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;