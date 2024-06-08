import { PORT } from './src/lib/settings';
import * as cli from 'next/dist/cli/next-dev';
cli.nextDev({
  port: PORT
}, 'default');
