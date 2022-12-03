const Pool = require('pg').Pool
// require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
// let username = "ajph03nix@gmail.com"
function getUserDocs(username){ 
    pool.query(`SELECT * FROM docs WHERE '${username}'=ANY(disc_party)`)
    
    .then((res) => {console.log(res); })
}

export {getUserDocs}


// function getUserDocs(){
//     axios.get("http://localhost:5005/docs/", {...docs})
//     .then((res) => {console.log(res); })
// }