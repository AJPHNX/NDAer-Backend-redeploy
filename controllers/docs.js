
const router = require('express').Router();
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

// const db = knex({
//     client: 'pg',
//     connection:process.env.PG_URI,
//     searchPath:['knex','public']
// });
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
const test_doc =  {
    id: 0, 
    type:'Dev Thang', 
    subject:"stuff",
    disc_party:'ajph03nix@gmail.com', 
    sign_party:[''], 
    type:'NDA', 
    status:'active',
    state:"NC",
    county:"USA",
    duration:"12",
    on_behalf:"n/a"
}
// let username = "ajph03nix@gmail.com"

// GET: Fetch all signers from the database
router.get('/', async (req, res) => {
    db.select('*')
        .from('docs2')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// ---GET disclosing party docs------
router.get('/get-doc/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    db.select('*')
    // .from(`docs`)// 
    // .fromRaw(`"docs" WHERE "disc_party"`, user)
    .from('docs2')
    .where('id', id)
    .timeout(1000)
    .then((data) => {
        console.log(`Getting Doc based on id:`, id)
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });
});
router.get('/get-disc-docs/', async (req, res) => {
    let user = req.query.email
    db.select('*')
    // .from(`docs`)// 
    // .fromRaw(`"docs" WHERE "disc_party"`, user)
    .from('docs2')
    .where('disc_party','like',`%${user}%`)
    .timeout(1000)
    .then((data) => {
        console.log(`Getting the  discloser docs for:`,{user})
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });
});

// ---GET signing party docs------
router.get('/get-sign-docs/', async (req, res) => {
    let user = req.query.email
    db.select('*')
    .from('docs2')
    .whereRaw(`'${user}' = ANY (sign_party)`)
    // .join('doc_signers AS ds', 'ds.doc_id', 'd.id')
    // .join('signers AS s', 's.doc_id','d.id')
    // .join('doc_signer', 'doc_signer.id', 'doc_signer.sig_username')
    // .select('doc2.id', 'signers.email', 'posts.contents')
    // .where(`email`, '=', user)
    // .where({sig_username : user},{id : doc_id})

    // .join('docs2', 'doc2.id', 'docs2.id')
    
    // .join('signers', 'signers.doc_id', 'posts.user_id')
    // .select('doc2.id', 'signers.email', 'posts.contents')
    // .where({user_id: id})
    //? ----Find all rows WHERE user in sign_party
    //? ----Find all Docs WHERE the {signers.doc_id}
    // .whereRaw(`"${user}" = FIND_IN_SET(sign_party)`)
    
    // .where(`%${user}% in sign_party`)
   
    .timeout(2000)
    .then((data) => {
        console.log(`Getting signer docs for:`,{user})
        console.log(data);
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.put('/add-doc-signer/', (req, res) => {
    let doc_id = parseInt(req.query.id)
    const  s_username = req.body.sig_username
    console.log("req.body", req.body)
   console.log("doc_id:", doc_id)
   console.log("username:", s_username)
   db("doc_signers")
    .insert({ 
        doc_id : req.body,doc_id,
        sig_username : s_username
        })

    .then(() => {
        console.log(`Document #${doc_id} - added signer ${s_username}.`,);
        return res.json({ msg: 'Doc Updated' });
    })
    .catch((err) => {
        console.log(err);
    });
  
  });
router.put('/update-doc-signers/', (req, res) => {
    let doc_id = parseInt(req.query.id)
    const { name, disc_party, sign_party, type, status, state, county, duration,on_behalf, descr, subject,born_on, viewers,id } = req.body
    console.log("doc_id:", doc_id)
    db("docs2")
    .where({ "id": doc_id  })
    .update({ sign_party})
    //   .where("id",doc_id )
//   .where(id.toString() == doc_id.toString() )
//   .where( Number(id) == Number(doc_id) )
    // .update({//req.body)
            // name,
            // type, 
            // subject,
            // disc_party, 
            // on_behalf,
            // state,
            // county,
            // duration,
            // status,
            // descr,
            // born_on,
            // sign_party:'{"' + data.labelG.join('","') + '"}', 
            // sign_party, 
            // viewers,
    // })
        .then(() => {
            console.log(`Document ${type} #${id} - ${name} updated to: \n`,req.body);
            return res.json({ msg: 'Doc Updated' });
        })
        .catch((err) => {
            console.log(err);
        });

});




router.post('/add-doc', (req, res) => {
    const { name, disc_party, sign_party, type, status, state, county, duration,on_behalf, descr, subject,born_on, viewers } = req.body
   
    db('docs2')
        .insert({
            name,
            type, 
            subject,
            disc_party, 
            on_behalf,
            state,
            county,
            duration,
            status,
            descr,
            born_on,
            sign_party, 
            viewers,
        })
        .then(() => {
            console.log(`Document ${type} - ${name} Added`);
            return res.json({ msg: 'Doc Added' });
        })
        .catch((err) => {
            console.log(err);
        });

});

module.exports = router;