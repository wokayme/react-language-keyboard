import { useEffect, useRef, useMemo, useContext } from 'react';
import { addKeyToLetterArray } from './utils';
import { handleOnInput, handleKeyDown, handleKeyUp } from './utilsEventHandler';
import { ReactLanguageKeyboardContext } from './languageKeyboardProvider';

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
