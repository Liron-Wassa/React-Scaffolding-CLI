import { program } from 'commander';
import fs from 'fs';
import path from 'path';

import { rtc } from './commands';

program.version('1.0.0');

program.command('rtc <fileName>').action(rtc);

// program.option('-t, --template <type>', 'set extension of component file, default is ".tsx"', '.tsx');
// program.option('-st, --styled-template <type>', 'set style template for component, default is "styled-component"', 'styled-component');

// console.log(`template: ${program.opts().t}`);

program.parse();
