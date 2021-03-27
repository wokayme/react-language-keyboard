export const addKeyToLetterArray = (
    letterDictionary: Record<string, string[]>
): Record<string, string[]> =>
    Object.keys(letterDictionary).reduce((memo, key) => {
        memo[key] = [key, ...letterDictionary[key]];
        return memo;
    }, {});

export const setCaretPosition = (event: KeyboardEvent, caretPosition: number): void => {
    (event.target as HTMLInputElement).selectionStart = caretPosition + 1;
    (event.target as HTMLInputElement).selectionEnd = caretPosition + 1;
};

export const getCaretPosition = (event: KeyboardEvent): number => {
    return (event.target as HTMLInputElement).selectionStart - 1;
};

export const replaceLetterOnIndex = (
    text: string,
    indexToReplace: number,
    replaceForLetter: string
): string => {
    return text
        .split('')
        .map(function (letter, index) {
            return index === indexToReplace ? replaceForLetter : letter;
        })
        .join('');
};
