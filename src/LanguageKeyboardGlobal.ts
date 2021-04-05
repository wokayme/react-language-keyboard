import { useEffect, useMemo } from 'react';
import { addKeyToLetterArray } from './utils';
import { handleOnInput, handleKeyDown, handleKeyUp } from './utilsEventHandler';

interface LanguageKeyboardGlobalProps {
    letterDictionary: Record<string, string[]>;
    selector?: string[];
}

const inputEvent = (selector: string[]) => (e: Event) => {
    if (selector.includes((e.target as HTMLElement).tagName)) {
        handleOnInput();
    }
};

const keydownEvent = (selector: string[], letterReplacableDictionary: Record<string, string[]>) => (
    e: KeyboardEvent
) => {
    if (selector.includes((e.target as HTMLElement).tagName)) {
        handleKeyDown(letterReplacableDictionary)(e);
    }
};

const keyupEvent = (selector: string[]) => (e: KeyboardEvent) => {
    if (selector.includes((e.target as HTMLElement).tagName)) {
        handleKeyUp();
    }
};

export const LanguageKeyboardGlobal = ({
    letterDictionary,
    selector = ['TEXTAREA', 'INPUT']
}: LanguageKeyboardGlobalProps): null => {
    const letterReplacableDictionary = useMemo(() => addKeyToLetterArray(letterDictionary), [
        letterDictionary
    ]);

    useEffect(() => {
        const input = inputEvent(selector);
        const keydown = keydownEvent(selector, letterReplacableDictionary);
        const keyup = keyupEvent(selector);

        document.addEventListener('input', input);
        document.addEventListener('keydown', keydown);
        document.addEventListener('keyup', keyup);

        return () => {
            document.removeEventListener('input', input);
            document.removeEventListener('keydown', keydown);
            document.removeEventListener('keyup', keyup);
        };
    }, []);
    return null;
};
