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
app.use('/viewers', require('./controllers/viewers'))

app.get('/*', (req, res) => {
    // res.send('test');
    // res.sendFile(path.join(__dirname, '../build', 'index.html'))
    // res.sendFile(path.join(__dirname, '../build', 'index.html'))
    // res.sendFile('index.html', {root: 'public'});
    res.sendFile('index.html', {root: './'});
})

// app.use('/documents', require('../src/components/documents'))
// app.use('/nda', require('../src/components/nda'))
// app.use('/register', require('../src/components/register'))
// app.use('/dashboard', require('../src/components/dashboard'))
// app.use('/createDoc', require('../src/components/createDoc'))
// app.use('/disc_view_doc', require('../src/components/disc_view_doc'))
// app.use('/complete', require('../src/components/complete'))
// app.use('/nda_complete', require('../src/components/nda_complete'))
// app.use('/exit', require('../src/components/exit'))
// app.use('/error', require('../src/components/error'))
// app.use('/print', require('../src/components/print'))
// app.use('/print', require('../src/components/signers'))


// app.get('/documents', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
//     res.redirect()
// })
// app.get('/nda', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/register', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/dashboard', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/createDoc', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/disc_view_doc', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/complete', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/nda_complete', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/exit', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/error', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/print', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('/', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
// app.get('*', (req, res) => {
//     // res.send('test');
//     res.sendFile(path.join(__dirname, 'src/components', 'error'))
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
const URL = process.env.BASE_URL
app.listen(port, () => console.log(`Server running on port ${port}, ${URL}:${port}`));