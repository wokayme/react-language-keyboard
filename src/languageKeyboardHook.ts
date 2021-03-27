import { useEffect, useRef, useMemo, useContext } from 'react';
import {
    addKeyToLetterArray,
    replaceLetterOnIndex,
    setCaretPosition,
    getCaretPosition
} from './utils';
import { ReactLanguageKeyboardContext } from './languageKeyboardProvider';

let holdTimeout: NodeJS.Timeout | undefined;
let letterChangeInterval: NodeJS.Timeout | undefined;
let hold: boolean;
let clickedLetter: string;
const waitForLetter = 200;

const handleOnInput = () => {
    holdTimeout = setTimeout(function () {
        hold = true;
    }, waitForLetter);
};

const preventPuttingMoreLettersWhenKeyIsHolded = (event: KeyboardEvent) => {
    event.preventDefault();
};

const handleKeyDown = (letterDictionary: Record<string, string[]>) => (event: KeyboardEvent) => {
    if (hold) {
        preventPuttingMoreLettersWhenKeyIsHolded(event);
    }
    clickedLetter = event.key;
    const value = (event.target as HTMLInputElement).value;
    const caretPosition = getCaretPosition(event);
    const isLetterReplacable = letterDictionary[clickedLetter];
    const isReplaceIntervalNotDefined = !letterChangeInterval;

    if (hold && isLetterReplacable && isReplaceIntervalNotDefined) {
        let currentIndex = 0;
        letterChangeInterval = setInterval(function () {
            (event.target as HTMLInputElement).value = replaceLetterOnIndex(
                value,
                caretPosition,
                letterDictionary[clickedLetter][currentIndex]
            );

            currentIndex =
                letterDictionary[clickedLetter].length <= currentIndex + 1 ? 0 : currentIndex + 1;
            setCaretPosition(event, caretPosition);
        }, waitForLetter);
    }
};

const handleKeyUp = () => {
    if (holdTimeout) {
        clearTimeout(holdTimeout);
    }
    if (letterChangeInterval) {
        clearInterval(letterChangeInterval);
    }
    hold = false;
    letterChangeInterval = undefined;
};

export const useLanguageKeyboard = (
    letterDictionary: Record<string, string[]> = {}
): React.MutableRefObject<HTMLInputElement | null> => {
    const { letterDictionary: letterDictionaryFromContext } = useContext(
        ReactLanguageKeyboardContext
    );

    const letterReplacableDictionary = useMemo(
        () =>
            Object.keys(letterDictionary).length > 0
                ? addKeyToLetterArray(letterDictionary)
                : letterDictionaryFromContext,
        [letterDictionary, letterDictionaryFromContext]
    );

    const htmlElementRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (htmlElementRef.current) {
            htmlElementRef.current.addEventListener('input', handleOnInput);
            htmlElementRef.current.addEventListener(
                'keydown',
                handleKeyDown(letterReplacableDictionary)
            );
            htmlElementRef.current.addEventListener('keyup', handleKeyUp);
        }
    }, [htmlElementRef]);

    return htmlElementRef;
};
