"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("./commands");
commander_1.program.version('1.0.0');
commander_1.program.command('rtc <fileName>')
    .action(commands_1.rtc)
    .description('Create component template');
commander_1.program.command('rtch <fileName>')
    .action(commands_1.rtch)
    .description('Create custom hook template');
commander_1.program.parse();
