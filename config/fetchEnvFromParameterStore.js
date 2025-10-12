import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ssmClient = new SSMClient({ region: process.env.AWS_REGION });


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
    const [port, tableNames] = await Promise.all([
      getParameter('/pokeiq/backend/PORT'),
      getParameter('/pokeiq/dynamodb/tableNames')
    ]);

    // Create .env.backend content
    const backendEnvContent = `${tableNames}
PORT=${port}`;

    // Create .env.frontend content
    const frontendContent = `REACT_APP_API_URL=http://localhost:${port}`;


    // Root directory
    const rootDir = path.join(__dirname, '..');
    // Env file paths
    const backendEnvPath = path.join(rootDir, '.env.backend');
    const dbEnvPath = path.join(rootDir, '.env.db');
    const frontendEnvPath = path.join(rootDir, '.env.frontend');
    // Write to .env files
    fs.writeFileSync(frontendEnvPath, frontendContent);
    fs.writeFileSync(backendEnvPath, backendEnvContent);

    console.log('\n✓ Environment files created successfully!');
    console.log(`  - ${backendEnvPath}`);
    console.log(`  - ${dbEnvPath}`);
  } catch (error) {
    console.error('\n✗ Failed to create environment files:', error.message);
    process.exit(1);
  }
};

createEnvFiles();