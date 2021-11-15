import fs from 'fs';
import path from 'path';

enum ValidFileExtension {
    js = 'js',
    jsx = 'jsx',
    tsx = 'tsx',
};

const validateFileExtension = (extension: ValidFileExtension) => {
    if (typeof extension !== 'string') throw new Error('Invalid file extension: file extension must be a string');
    if (!ValidFileExtension[extension]) throw new Error('Invalid file extension: file extension should be all in lowercase and can be one of the following values, (js, jsx, tsx)');

    return extension;
};

enum ValidStyleExtension {
    js = 'js',
    jsx = 'jsx',
    tsx = 'tsx',
    css = 'css',
    sass = 'sass',
};

const validateStyleExtension = (extension: ValidStyleExtension) => {
    if (typeof extension !== 'string') throw new Error('Invalid style extension: style extension must be a string');
    if (!ValidStyleExtension[extension]) throw new Error('Invalid style extension: style extension should be all in lowercase and can be one of the following values, (css, sass, js, jsx, tsx)');

    return extension;
};

const createTemplate = (fileName: string) => {
    const config = JSON.parse(fs.readFileSync('rtc.config.json', 'utf8'));
    const fileExtension: string = validateFileExtension(config['file-extension']);
    const styleExtension: string = validateStyleExtension(config['style-extension']);

    const componentTemplate = fs.readFileSync(path.resolve('rtc-templates', 'component-template.txt'), 'utf8').replace(/{{fileName}}/g, fileName);
    const styleTemplate = fs.readFileSync(path.resolve('rtc-templates', 'style-template.txt'), 'utf8');
    const testTemplate = fs.readFileSync(path.resolve('rtc-templates', 'test-template.txt'), 'utf8').replace(/{{fileName}}/g, fileName);

    // const currentDirectory = path.basename(path.resolve(process.cwd()));

    fs.mkdirSync(`${fileName}`);
    fs.writeFileSync(`${fileName}/${fileName}.${fileExtension}`, componentTemplate);
    fs.writeFileSync(`${fileName}/${fileName}Styles.${styleExtension}`, styleTemplate);
    fs.writeFileSync(`${fileName}/${fileName}.spec.${fileExtension}`, testTemplate);
};

const rtc = (fileName: string) => {
    const firstLetter: string= fileName[0];
    // const firstThreeLetters: string = fileName.substr(0, 3);
    // const useKeyWord: string = 'use';
    const errorMessage: string = 'component name must start with an uppercase letter!';

    try {
        if (firstLetter !== firstLetter.toUpperCase()) throw new Error(errorMessage);
        createTemplate(fileName);
    } catch (error) {
        console.error(error);
    };
};

export {
    rtc
};
