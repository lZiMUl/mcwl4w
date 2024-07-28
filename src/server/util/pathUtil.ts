// Import basic dependencies
import { join, resolve } from 'path';

// Export method
export default (args: string): string => join(resolve(), args);
