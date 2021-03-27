import { useEffect, useRef, useMemo } from 'react';

const addKeyToLetterArray = (letterDictionary: Record<string, string[]>) =>
    Object.keys(letterDictionary).reduce((memo, key) => {
        memo[key] = [key, ...letterDictionary[key]];
        return memo;
    }, {});

let holdTimeout;
let letterChangeInterval;
let hold;
let clickedLetter;
const waitForLetter = 200;

const handleOnInput = () => {
    holdTimeout = setTimeout(function () {
        hold = true;
    }, waitForLetter);
};

const preventPuttingMoreLettersWhenKeyIsHolded = (event: KeyboardEvent) => {
    event.preventDefault();
};

const getCaretPosition = (event: KeyboardEvent) => {
    return (event.target as HTMLInputElement).selectionStart - 1;
};

const setCaretPosition = (event: KeyboardEvent, caretPosition) => {
    (event.target as HTMLInputElement).selectionStart = caretPosition + 1;
    (event.target as HTMLInputElement).selectionEnd = caretPosition + 1;
};

const replaceLetterOnIndex = (text: string, indexToReplace: number, replaceForLetter: string) => {
    return text
        .split('')
        .map(function (letter, index) {
            return index === indexToReplace ? replaceForLetter : letter;
        })
        .join('');
};

const handleKeyDown = (letterDictionary) => (event: KeyboardEvent) => {
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
    clearTimeout(holdTimeout);
    clearInterval(letterChangeInterval);
    hold = false;
    letterChangeInterval = undefined;
};

export const useLanguageKeyboard = (
    letterDictionary: Record<string, string[]> = {}
): React.MutableRefObject<HTMLInputElement> => {
    const letterReplacableDictionary = useMemo(() => addKeyToLetterArray(letterDictionary), []);

    const htmlElementRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (htmlElementRef.current) {
            const handleKeyDownCached = handleKeyDown(letterReplacableDictionary);
            htmlElementRef.current.addEventListener('input', handleOnInput);
            htmlElementRef.current.addEventListener('keydown', handleKeyDownCached);
            htmlElementRef.current.addEventListener('keyup', handleKeyUp);

            return () => {
                htmlElementRef.current.removeEventListener('input', handleOnInput);
                htmlElementRef.current.removeEventListener('keydown', handleKeyDownCached);
                htmlElementRef.current.removeEventListener('keyup', handleKeyUp);
            };
        }
    }, [htmlElementRef]);

    return htmlElementRef;
};
