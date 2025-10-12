import pkg from "pg";
const {Pool} = pkg;
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "Sayat2001",
    database: "db_site"
});