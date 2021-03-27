import React, { useMemo } from 'react';
import { addKeyToLetterArray } from './utils';

export const ReactLanguageKeyboardContext = React.createContext<{
    letterDictionary: Record<string, string[]>;
}>({
    letterDictionary: {}
});

ReactLanguageKeyboardContext.displayName = 'ReactLanguageKeyboard';

export const ReactLanguageKeyboardConsumer = ReactLanguageKeyboardContext.Consumer;

interface ReactLanguageKeyboardProviderProps {
    letterDictionary: Record<string, string[]>;
    children?: React.ReactNode;
}

export const ReactLanguageKeyboardProvider = ({
    letterDictionary = {},
    children
}: ReactLanguageKeyboardProviderProps): JSX.Element => {
    const contextValue = useMemo(
        () => ({ letterDictionary: addKeyToLetterArray(letterDictionary) }),
        []
    );
    return (
        <ReactLanguageKeyboardContext.Provider value={contextValue}>
            {children}
        </ReactLanguageKeyboardContext.Provider>
    );
};
