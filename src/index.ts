import { config } from 'dotenv';
import { join } from 'path';

const env = join(process.cwd(), 'environments', '.env');

// Load environment variables
config({ path: env });
