import { program } from 'commander';

import { rtc, rtch } from './commands';

program.version('1.0.0');

program.command('rtc <fileName>')
.action(rtc)
.description('Create component template');

program.command('rtch <fileName>')
.action(rtch)
.description('Create custom hook template');

program.parse();
