import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' });

const getParameter = async (paramName) => {
  try {
    console.log(`Fetching parameter: ${paramName}`);
    const command = new GetParameterCommand({ Name: paramName, WithDecryption: true });
    const response = await ssmClient.send(command);
    console.log(`✓ Parameter fetched successfully: ${paramName}`);
    return response.Parameter.Value;
  } catch (error) {
    console.error(`✗ Error fetching parameter ${paramName}:`, error.message);
    throw error;
  }
};

const createEnvFiles = async () => {
  try {
    console.log('Starting to fetch parameters from AWS Parameter Store...\n');

    // Fetch all parameters
    const [postgresUser, postgresDb, postgresPassword, databaseUrl, port] = await Promise.all([
      getParameter('/pokeiq/database/POSTGRES_USER'),
      getParameter('/pokeiq/database/POSTGRES_DB'),
      getParameter('/pokeiq/database/POSTGRES_PASSWORD'),
      getParameter('/pokeiq/database/DATABASE_URL'),
      getParameter('/pokeiq/backend/PORT'),
    ]);

    // Create .env.backend content
    const backendEnvContent = `DATABASE_URL="${databaseUrl}"
PORT=${port}`;

    // Create .env.db content
    const dbEnvContent = `POSTGRES_USER=${postgresUser}
POSTGRES_DB=${postgresDb}
POSTGRES_PASSWORD=${postgresPassword}`;

    // Write files to root directory
    const rootDir = path.join(__dirname, '..');
    const backendEnvPath = path.join(rootDir, '.env.backend');
    const dbEnvPath = path.join(rootDir, '.env.db');
    fs.writeFileSync(backendEnvPath, backendEnvContent);
    fs.writeFileSync(dbEnvPath, dbEnvContent);

    console.log('\n✓ Environment files created successfully!');
    console.log(`  - ${backendEnvPath}`);
    console.log(`  - ${dbEnvPath}`);
  } catch (error) {
    console.error('\n✗ Failed to create environment files:', error.message);
    process.exit(1);
  }
};

createEnvFiles();