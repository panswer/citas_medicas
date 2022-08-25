import mysql from 'mysql';

/**
 * @type {import('mysql').Connection|null}
 */
let conection = null;

class DB {
    session;
    constructor() {
        if (conection) {
            conection.connect();
        } else {
            conection = mysql.createConnection({
                host: process.env.DB_HOST || 'db',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            conection.connect();
        }

        this.session = conection;
    }
}

export default DB;