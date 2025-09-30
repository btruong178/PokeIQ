import axios from 'axios';
import pool from '../db.js';
import { logError, capitalizeFirstLetter } from './api-utilities.js';

// API URLs
const TYPE_BASE_URL = 'https://pokeapi.co/api/v2/type/';

// Function to fetch Type data
export const fetchTypeData = async (typeID) => {
    try {
        let damageRelationsDictionary = {};
        const response = await axios.get(`${TYPE_BASE_URL}${typeID}`);
        const { damage_relations, name } = response.data;
        const typeName = capitalizeFirstLetter(name);
        Object.entries(damage_relations).forEach(([key, value]) => {
            damageRelationsDictionary[key] = value.map(t => t.name);
        });
        return { damageRelationsDictionary, typeName };
    } catch (error) {
        logError(error);
        throw error;
    }
};

// Function to add Types data to the database
export const addToTypesDB = async () => {
    try {
        console.log("Adding types data to the 'types' database...");
        for (let i = 1; i <= 18; i++) {
            const { damageRelationsDictionary, typeName } = await fetchTypeData(i);
            await pool.query('INSERT INTO types (name, damage_relations) VALUES ($1, $2) RETURNING *', [typeName, damageRelationsDictionary]);
        }
        console.log('Types data added to the database successfully!');
    } catch (error) {
        logError(error);
    }
}

addToTypesDB();