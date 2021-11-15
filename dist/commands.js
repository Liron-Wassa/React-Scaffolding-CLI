"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtc = void 0;
const rtc = (fileName) => {
    const firstLetter = fileName[0];
    const firstThreeLetters = fileName.substr(0, 3);
    const useKeyWord = 'use';
    const errorMessage = 'filename must start with an uppercase letter, it only can be lowercase when creating a custom hook e.g. (useHook)!';
    if (firstLetter !== firstLetter.toUpperCase() && firstThreeLetters !== useKeyWord)
        throw new Error(errorMessage);
    console.log(fileName);
};
exports.rtc = rtc;
