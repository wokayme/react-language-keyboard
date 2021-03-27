import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useLanguageKeyboard } from './languageKeyboardHook';
import { RenderKeyboardDictionaryTable } from './storybook.helpers';
import { ReactLanguageKeyboardProvider } from './languageKeyboardProvider';

export default {
    title: 'Example/App'
} as Meta;

export const SpanishKeyBoardUsingHook: Story<unknown> = (args: unknown) => {
    const letterDictionary = {
        a: ['á'],
        e: ['é'],
        i: ['í'],
        o: ['ó'],
        '?': ['¿'],
        n: ['ñ'],
        u: ['ú', 'ü']
    };
    const htmlInput = useLanguageKeyboard(letterDictionary);
    return (
        <div>
            <h1>Spanish keyboard demo</h1>
            <h3>Letters can exchange for:</h3>
            <RenderKeyboardDictionaryTable letterDictionary={letterDictionary} />
            <input ref={htmlInput} />
        </div>
    );
};

const Mock = () => {
    const htmlInput = useLanguageKeyboard();
    return <input ref={htmlInput} />;
};
export const SpanishKeyBoardUsingContext: Story<unknown> = (args: unknown) => {
    const letterDictionary = {
        a: ['á'],
        e: ['é'],
        i: ['í'],
        o: ['ó'],
        '?': ['¿'],
        n: ['ñ'],
        u: ['ú', 'ü']
    };

    return (
        <div>
            <ReactLanguageKeyboardProvider letterDictionary={letterDictionary}>
                <Mock />
            </ReactLanguageKeyboardProvider>
        </div>
    );
};
