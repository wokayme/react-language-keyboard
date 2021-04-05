import { replaceLetterOnIndex, setCaretPosition, getCaretPosition } from './utils';

let holdTimeout: NodeJS.Timeout | undefined;
let letterChangeInterval: NodeJS.Timeout | undefined;
let hold: boolean;
let clickedLetter: string;
const waitForLetter = 500;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleOnInput = (event: Event) => {
    if (clickedLetter !== (event as KeyboardEvent).key) {
        handleKeyUp();
    }

    holdTimeout = setTimeout(function () {
        hold = true;
    }, waitForLetter);
};

export const preventPuttingMoreLettersWhenKeyIsHolded = (event: KeyboardEvent): void => {
    event.preventDefault();
};

export const handleKeyDown = (letterDictionary: Record<string, string[]>) => (
    event: KeyboardEvent
): void => {
    if (hold) {
        preventPuttingMoreLettersWhenKeyIsHolded(event);
    } else {
        clickedLetter = event.key;
    }
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

export const handleKeyUp = (): void => {
    if (holdTimeout) {
        clearTimeout(holdTimeout);
    }
    if (letterChangeInterval) {
        clearInterval(letterChangeInterval);
    }
    hold = false;
    letterChangeInterval = undefined;
};
