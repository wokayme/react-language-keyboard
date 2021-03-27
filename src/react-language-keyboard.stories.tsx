import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useLanguageKeyboard } from './languageKeyboardHook';
import { RenderKeyboardDictionaryTable } from './storybook.helpers';

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
