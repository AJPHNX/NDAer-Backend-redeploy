const express = require('express');
const path = require('path');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();
//!-----OLD CODE------
// const db = knex({
    //     client: 'pg',
    //     connection:process.env.PG_URI,
    //     searchPath:['knex','public']
    // });
    
//!-----OLD CODE------

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build'))) //!FOR DEPLOY
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '..', 'build'))) 


// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

//Contorllers & Routes
app.use('/docs', require('./controllers/docs'))
app.use('/signers', require('./controllers/signers'))

// app.get('/', (req, res) => {
//     res.send('test');
// })
//!-----OLD CODE------
// // GET: Fetch all signers from the database
// app.get('/', (req, res) => {
    //     db.select('*')
    //         .from('signers')
    //         .then((data) => {
        //             console.log(data);
        //             res.json(data);
        //         })
        //         .catch((err) => {
            //             console.log(err);
            //         });
            // });
            // app.post('/add-signer', (req, res) => {
                //     const {first_name, middle_name, last_name, suffix, alias, address, city,
                //         state_or,zip,email, phone, signed, confirmed, openModal, timestamp, user_id, pass_id} = req.body
                //     db('signers')
                //         .insert({
                    //             user_id,
                    //             pass_id,
                    //             first_name,
                    //             middle_name,
                    //             last_name,
                    //             suffix,
                    //             alias,
                    //             address,
                    //             city,
                    //             state_or,
                    //             zip,
                    //             email,
                    //             phone,
                    //             timestamp,
                    //         })
                    //         .then(() => {
                        //             console.log(`Signer ${first_name} ${last_name} Added`);
                        //             return res.json({ msg: 'Signer Added' });
                        //         })
                        //         .catch((err) => {
                            //             console.log(err);
                            //         });
                            // });
//!-----OLD CODE------
const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));