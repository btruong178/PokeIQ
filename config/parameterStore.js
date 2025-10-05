import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';


const ssmClient = new SSMClient({ region: process.env.AWS_REGION || 'us-east-1' });


export const getParameter = async (paramName) => {
  try {
    console.log(`Fetching parameter: ${paramName}`);
    const command = new GetParameterCommand({ Name: paramName, WithDecryption: true });
    const response = await ssmClient.send(command);
    console.log(`Parameter fetched successfully: ${paramName}`);
    return response.Parameter.Value;
  } catch (error) {
    console.error(`Error fetching parameter ${paramName}:`, error);
    throw error;
  }
};

console.log(await getParameter('/pokeiq/database/DATABASE_URL'));