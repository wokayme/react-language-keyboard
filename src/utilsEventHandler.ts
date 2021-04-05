import { replaceLetterOnIndex, setCaretPosition, getCaretPosition } from './utils';

let holdTimeout: NodeJS.Timeout | undefined;
let letterChangeInterval: NodeJS.Timeout | undefined;
let hold: boolean;
let clickedLetter: string;
const waitForLetter = 500;

export const handleOnInput = (): void => {
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
    if (clickedLetter === event.key) {
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
            const newValue = replaceLetterOnIndex(
                value,
                caretPosition,
                letterDictionary[clickedLetter][currentIndex]
            );
            (event.target as HTMLInputElement).value = newValue;

            currentIndex =
                letterDictionary[clickedLetter].length <= currentIndex + 1 ? 0 : currentIndex + 1;
            setCaretPosition(event, caretPosition);

            const newevent = new Event('input', { bubbles: true });

            const tracker = ((event.target as unknown) as {
                _valueTracker: { setValue: (target: EventTarget) => void };
            })?._valueTracker;

            if (tracker && event.target !== null) {
                tracker.setValue(event.target);
            }

            event.target?.dispatchEvent(newevent);
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
    clickedLetter = '';
};
