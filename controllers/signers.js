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
    const {first_name, middle_name, last_name, suffix, alias, address, city, state_or,zip,email, phone, signed, confirmed, openModal, timestamp, user_id, pass_id,doc_id, geo_dat,doc64} = req.body
        
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
            geo_dat,
            doc64,
        })
        .then(() => {
            console.log(`Signer ${first_name} ${last_name} Added`);
            return res.json({ msg: 'Signer Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});
router.put('/update-signer/', (req, res) => {
    let signer = req.query.signer
    let d_id = req.query.doc_id
    const {first_name, middle_name, last_name, suffix, alias, address, city, state_or,zip,email, phone, signed, confirmed, openModal, timestamp, user_id, pass_id,doc_id, geo_dat,doc64} = req.body
        console.log("[Backend] req.body: ",req.body)
    db('signers')
        .update({
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
            geo_dat,
            doc64
        })
        .whereRaw(`email = '${signer}' AND doc_id ='${d_id}'`)
        .then(() => {
            console.log(`Signer ${email} Updated with`, req.body);
            return res.json({ msg: 'Signer Updated' });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;