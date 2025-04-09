import pkg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';
const { Pool } = pkg;

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.backend') });


// Parse DATABASE_URL (e.g., postgres://user:pass@host:port/database)
const dbUrl = new URL(process.env.DATABASE_URL);
if (!dbUrl) {
    console.error('DATABASE_URL is not set in .env file');
    process.exit(1);
}
const pool = new Pool({
    user: dbUrl.username,
    host: dbUrl.hostname,
    database: dbUrl.pathname.slice(1),
    password: dbUrl.password,
    port: dbUrl.port,
});

const poolData = {
    user: dbUrl.username,
    host: dbUrl.hostname,
    database: dbUrl.pathname.slice(1),
    password: dbUrl.password,
    port: dbUrl.port,
};
console.log('DB Connection Details(db.js):', poolData);


// Check if the database connection is established
pool.query('SELECT NOW()', (err, res) => {
    console.log("--------------------------------\nFrom db.js\n--------------------------------");
    if (err) {
        console.error('Database connection error(db.js):', err.stack);
        // Exit the process if the connection fails
        console.log("--------------------------------");
        console.error('Exiting process due to DB connection error(db.js)');
        // Close the pool and exit the process
        pool.end(() => {
            console.log('Pool has ended(db.js)');
            process.exit(1);
        });
    } else {
        console.log('DB Connection Established(db.js):', res.rows[0]);
    }
    console.log("--------------------------------");
});

export default pool;