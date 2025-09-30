import pool from '../db.js';
import { logError } from './api-utilities.js';

const LINE_SEPARATOR = '----------------------------------------';

// Logging utility
export const logError = (error) => {
    console.error('Error Details from attempting to fetch PokeAPI Data: ', error);
    console.error(LINE_SEPARATOR);
    if (error?.response) {
        console.error('Error Response Data: ', error.response.data);
        console.error('Error Response Status: ', error.response.status);
        console.error('Error Response Headers: ', error.response.headers);
    } else if (error?.request) {
        console.error('Error Request Data: ', error.request);
    } else {
        console.error('Error Message: ', error?.message);
    }
    console.error(LINE_SEPARATOR);
};

// Capitalize helper
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const showPokemonDBstructure = async () => {
    try {
        const result = await pool.query('SELECT * FROM pokemon');
        console.log(result.rows);
    } catch (error) {
        logError(error);
    }
};
const showTypesDBstructure = async () => {
    try {
        const result = await pool.query('SELECT * FROM types');
        console.log(result.rows);
    } catch (error) {
        logError(error);
    }
};

const checkIfPokemonDBisPopulated = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM pokemon');
        if (result.rows[0].count > 0) {
            console.log('DB is already populated');
            await deleteDataAndResetAlterSequence();
            return true;
        } else {
            console.log('DB is empty');
            return false;
        }
    } catch (error) {
        logError(error);
    }
};

// Function to check if the database connection is established function
const checkDBConnection = () => {
    console.log('Pool Credentials:', pool.options);
}

const deleteDataAndResetAlterSequence = async () => {
    try {
        console.log('Deleting data from the database...');
        await pool.query('DELETE FROM pokemon');
        await pool.query('DELETE FROM types');
        console.log('Resetting auto-increment IDs...');
        await pool.query('ALTER SEQUENCE pokemon_id_seq RESTART WITH 1');
        await pool.query('ALTER SEQUENCE types_id_seq RESTART WITH 1');
    } catch (error) {
        logError(error);
    }
};


