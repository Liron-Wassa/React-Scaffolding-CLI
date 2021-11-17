#!/usr/bin/env node

import { program } from 'commander';

import { rtc, rtch } from './commands';

program.version('1.0.0')
.description('A CLI for creating react component');

program.command('rtc <fileName>')
.action(rtc)
.description('Create component template');

program.command('rtch <fileName>')
.action(rtch)
.description('Create custom hook template');

program.parse();
