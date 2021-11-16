"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtch = exports.rtc = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
// Paths definitions
const rtcPath = path_1.default.resolve('rtc');
const rtcConfigPath = path_1.default.resolve('rtc', 'rtc.config.json');
const rtcTemplatePath = path_1.default.resolve('rtc', 'rtc-templates');
const componentTemplatePath = path_1.default.resolve('rtc', 'rtc-templates', 'component-template.txt');
const hookTemplatePath = path_1.default.resolve('rtc', 'rtc-templates', 'hook-template.txt');
const styleTemplatePath = path_1.default.resolve('rtc', 'rtc-templates', 'style-template.txt');
const componentTestTemplatePath = path_1.default.resolve('rtc', 'rtc-templates', 'component-test-template.txt');
const hookTestTemplatePath = path_1.default.resolve('rtc', 'rtc-templates', 'hook-test-template.txt');
const checkIfRequiredFilesExist = (paths) => {
    paths.forEach(path => {
        if (!fs_1.default.existsSync(path))
            throw new Error(`Missing required file: ${path}`);
    });
};
const validateFileExtension = (extension) => {
    if (typeof extension !== 'string')
        throw new Error('Invalid file extension: file extension must be a string!');
    if (!constants_1.ValidFileExtension[extension])
        throw new Error('Invalid file extension: file extension should be all in lowercase and can be one of the following values, (js, jsx, tsx)!');
    return extension;
};
const validateStyleExtension = (extension) => {
    if (typeof extension !== 'string')
        throw new Error('Invalid style extension: style extension must be a string!');
    if (!constants_1.ValidStyleExtension[extension])
        throw new Error('Invalid style extension: style extension should be all in lowercase and can be one of the following values, (css, sass, js, jsx, tsx)!');
    return extension;
};
const checkIfFileAlreadyExists = (path) => {
    if (fs_1.default.existsSync(path))
        throw new Error('Conflict: file already exists!');
};
const createComponentTemplate = (fileName) => {
    checkIfRequiredFilesExist([rtcPath, rtcConfigPath, rtcTemplatePath, componentTemplatePath]);
    const config = JSON.parse(fs_1.default.readFileSync(rtcConfigPath, 'utf8'));
    const fileExtension = validateFileExtension(config['file-extension']);
    const styleExtension = validateStyleExtension(config['style-extension']);
    const currentDirectory = path_1.default.resolve(process.cwd());
    console.log(currentDirectory, __dirname);
    const componentTemplate = fs_1.default.readFileSync(componentTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
    const folderPath = `${currentDirectory}/${fileName}`;
    checkIfFileAlreadyExists(folderPath);
    fs_1.default.mkdirSync(`${currentDirectory}/${fileName}`);
    fs_1.default.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.${fileExtension}`, componentTemplate);
    if (fs_1.default.existsSync(styleTemplatePath)) {
        const styleTemplate = fs_1.default.readFileSync(styleTemplatePath, 'utf8');
        fs_1.default.writeFileSync(`${currentDirectory}/${fileName}/${fileName}Styles.${styleExtension}`, styleTemplate);
    }
    ;
    if (fs_1.default.existsSync(componentTestTemplatePath)) {
        const testTemplate = fs_1.default.readFileSync(componentTestTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
        fs_1.default.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.spec.${fileExtension}`, testTemplate);
    }
    ;
};
const rtc = (fileName) => {
    const firstLetter = fileName[0];
    const errorMessage = 'Invalid name: component name must start with an uppercase letter!';
    try {
        if (!isNaN(parseInt(firstLetter)) || firstLetter !== firstLetter.toUpperCase())
            throw new Error(errorMessage);
        createComponentTemplate(fileName);
    }
    catch (error) {
        console.error(error);
    }
    ;
};
exports.rtc = rtc;
const createHookTemplate = (fileName) => {
    checkIfRequiredFilesExist([rtcPath, rtcConfigPath, rtcTemplatePath, hookTemplatePath]);
    const config = JSON.parse(fs_1.default.readFileSync(rtcConfigPath, 'utf8'));
    const fileExtension = validateFileExtension(config['file-extension']);
    const currentDirectory = path_1.default.resolve(process.cwd());
    const hookTemplate = fs_1.default.readFileSync(hookTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
    const folderPath = `${currentDirectory}/${fileName}`;
    checkIfFileAlreadyExists(folderPath);
    fs_1.default.mkdirSync(`${currentDirectory}/${fileName}`);
    fs_1.default.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.${fileExtension}`, hookTemplate);
    if (fs_1.default.existsSync(hookTestTemplatePath)) {
        const testTemplate = fs_1.default.readFileSync(hookTestTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
        fs_1.default.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.spec.${fileExtension}`, testTemplate);
    }
    ;
};
const rtch = (fileName) => {
    const firstThreeLetters = fileName.substr(0, 3);
    const useKeyWord = 'use';
    const errorMessage = 'Invalid name: custom hook name must start with a "use" keyword!';
    try {
        if (firstThreeLetters !== useKeyWord)
            throw new Error(errorMessage);
        createHookTemplate(fileName);
    }
    catch (error) {
        console.error(error);
    }
    ;
};
exports.rtch = rtch;
