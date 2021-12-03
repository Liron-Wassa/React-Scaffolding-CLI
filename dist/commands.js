"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtch = exports.rtc = void 0;
const path_1 = __importStar(require("path"));
const fs_1 = __importStar(require("fs"));
const constants_1 = require("./constants");
const getRootDirectory = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const path of module.paths) {
        try {
            const prospectivePkgJsonDir = (0, path_1.dirname)(path);
            yield fs_1.promises.access(path, fs_1.constants.F_OK);
            return prospectivePkgJsonDir;
        }
        catch (error) {
            console.error(error);
        }
        ;
    }
    ;
});
// Paths definitions
const rootProjectPath = path_1.default.join(__dirname, '..', '..', '..');
const rtcPath = path_1.default.join(rootProjectPath, 'rtc');
const rtcConfigPath = path_1.default.join(rootProjectPath, 'rtc', 'rtc.config.json');
const rtcTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates');
const componentTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates', 'component-template.txt');
const hookTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates', 'hook-template.txt');
const styleTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates', 'style-template.txt');
const componentTestTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates', 'component-test-template.txt');
const hookTestTemplatePath = path_1.default.join(rootProjectPath, 'rtc', 'rtc-templates', 'hook-test-template.txt');
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
