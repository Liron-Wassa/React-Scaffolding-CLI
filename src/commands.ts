import path from 'path';
import fs from 'fs';

import { ValidFileExtension, ValidStyleExtension } from './constants';

// Paths definitions
const rtcPath = path.resolve('rtc');
const rtcConfigPath = path.resolve('rtc', 'rtc.config.json');
const rtcTemplatePath = path.resolve('rtc', 'rtc-templates');
const componentTemplatePath = path.resolve('rtc', 'rtc-templates', 'component-template.txt');
const hookTemplatePath = path.resolve('rtc', 'rtc-templates', 'hook-template.txt');
const styleTemplatePath = path.resolve('rtc', 'rtc-templates', 'style-template.txt');
const componentTestTemplatePath = path.resolve('rtc', 'rtc-templates', 'component-test-template.txt');
const hookTestTemplatePath = path.resolve('rtc', 'rtc-templates', 'hook-test-template.txt');

const checkIfRequiredFilesExist = (paths: string[]) => {
    paths.forEach(path => {
        if (!fs.existsSync(path)) throw new Error(`Missing required file: ${path}`);
    });
};

const validateFileExtension = (extension: ValidFileExtension) => {
    if (typeof extension !== 'string') throw new Error('Invalid file extension: file extension must be a string!');
    if (!ValidFileExtension[extension]) throw new Error('Invalid file extension: file extension should be all in lowercase and can be one of the following values, (js, jsx, tsx)!');

    return extension;
};

const validateStyleExtension = (extension: ValidStyleExtension) => {
    if (typeof extension !== 'string') throw new Error('Invalid style extension: style extension must be a string!');
    if (!ValidStyleExtension[extension]) throw new Error('Invalid style extension: style extension should be all in lowercase and can be one of the following values, (css, sass, js, jsx, tsx)!');

    return extension;
};

const checkIfFileAlreadyExists = (path: string) => {
    if (fs.existsSync(path)) throw new Error('Conflict: file already exists!');
};

const createComponentTemplate = (fileName: string) => {
    checkIfRequiredFilesExist([rtcPath, rtcConfigPath, rtcTemplatePath, componentTemplatePath]);

    const config = JSON.parse(fs.readFileSync(rtcConfigPath, 'utf8'));
    const fileExtension: string = validateFileExtension(config['file-extension']);
    const styleExtension: string = validateStyleExtension(config['style-extension']);

    const currentDirectory = path.resolve(process.cwd());
    const componentTemplate = fs.readFileSync(componentTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
    const folderPath = `${currentDirectory}/${fileName}`;

    checkIfFileAlreadyExists(folderPath);

    fs.mkdirSync(`${currentDirectory}/${fileName}`);
    fs.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.${fileExtension}`, componentTemplate);

    if (fs.existsSync(styleTemplatePath)) {
        const styleTemplate = fs.readFileSync(styleTemplatePath, 'utf8');
        fs.writeFileSync(`${currentDirectory}/${fileName}/${fileName}Styles.${styleExtension}`, styleTemplate);
    };

    if (fs.existsSync(componentTestTemplatePath)) {
        const testTemplate = fs.readFileSync(componentTestTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
        fs.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.spec.${fileExtension}`, testTemplate);
    };
};

const rtc = (fileName: string) => {
    const firstLetter: string= fileName[0];
    const errorMessage: string = 'Invalid name: component name must start with an uppercase letter!';

    try {
        if (!isNaN(parseInt(firstLetter)) || firstLetter !== firstLetter.toUpperCase()) throw new Error(errorMessage);
        createComponentTemplate(fileName);
    } catch (error) {
        console.error(error);
    };
};

const createHookTemplate = (fileName: string) => {
    checkIfRequiredFilesExist([rtcPath, rtcConfigPath, rtcTemplatePath, hookTemplatePath]);

    const config = JSON.parse(fs.readFileSync(rtcConfigPath, 'utf8'));
    const fileExtension: string = validateFileExtension(config['file-extension']);

    const currentDirectory = path.resolve(process.cwd());
    const hookTemplate = fs.readFileSync(hookTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
    const folderPath = `${currentDirectory}/${fileName}`;

    checkIfFileAlreadyExists(folderPath);

    fs.mkdirSync(`${currentDirectory}/${fileName}`);
    fs.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.${fileExtension}`, hookTemplate);

    if (fs.existsSync(hookTestTemplatePath)) {
        const testTemplate = fs.readFileSync(hookTestTemplatePath, 'utf8').replace(/{{fileName}}/g, fileName);
        fs.writeFileSync(`${currentDirectory}/${fileName}/${fileName}.spec.${fileExtension}`, testTemplate);
    };
};

const rtch = (fileName: string) => {
    const firstThreeLetters: string = fileName.substr(0, 3);
    const useKeyWord: string = 'use';
    const errorMessage: string = 'Invalid name: custom hook name must start with a "use" keyword!';

    try {
        if (firstThreeLetters !== useKeyWord) throw new Error(errorMessage);
        createHookTemplate(fileName);
    } catch (error) {
        console.error(error);
    };
};

export {
    rtc,
    rtch
};
