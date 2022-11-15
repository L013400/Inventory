import oracledb from 'oracledb'
import dotenv from "dotenv"

dotenv.config()

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionString: process.env.DATABASE_CONNECTION_STRING
}

let db;

async function createConnection() {
    return new Promise((resolve, reject) => {
        oracledb.getConnection(config, (err, connection) => {
            if (err)
                reject(err)
            else
                resolve(connection)
        })
    })
}

async function execute(query) {
    if (!db) {
        db = await createConnection();
    }
    return new Promise((resolve, reject)=>{
        db.execute(query,[], {autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT } ,(err, results) => {
            if (err)
                reject(err)
            else
                resolve(results.rows);
        })
    })
    
}



export default execute;