import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useLanguageKeyboard } from './languageKeyboardHook';
import { RenderKeyboardDictionaryTable } from './storybook.helpers';
import { ReactLanguageKeyboardProvider } from './languageKeyboardProvider';
import { LanguageKeyboardGlobal } from './LanguageKeyboardGlobal';

export default {
    title: 'LanguageKeyBoard'
} as Meta;

export const useLanguageKeyboardHook: Story<unknown> = () => {
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
            <h1>useLanguageKeyboardHook</h1>
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
export const useLanguageKeyboardHookWithContext: Story<unknown> = () => {
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
            <h1>useLanguageKeyboardHook use letterDictionary from context</h1>
            <h3>Letters can exchange for:</h3>
            <RenderKeyboardDictionaryTable letterDictionary={letterDictionary} />
            <ReactLanguageKeyboardProvider letterDictionary={letterDictionary}>
                <Mock />
            </ReactLanguageKeyboardProvider>
        </div>
    );
};
export const GlobalUse: Story<unknown> = () => {
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
            <h1>
                Use your custome keyboard in every input and textarea in every place of your website
            </h1>
            <h3>Letters can exchange for:</h3>
            <RenderKeyboardDictionaryTable letterDictionary={letterDictionary} />
            <LanguageKeyboardGlobal letterDictionary={letterDictionary} />
            <input />
            <br />
            <textarea />
        </div>
    );
};
