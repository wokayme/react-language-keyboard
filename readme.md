# React-language-keyboard
[![npm version](https://badge.fury.io/js/react-language-keyboard.svg)](https://badge.fury.io/js/react-language-keyboard) ![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

Add language support on your website to every keyboard on desktop device

### Live demo for Spanish keyboard
https://wokayme.github.io/react-language-keyboard

### How it works
Define letter set which replacment should be trigger when enter key and hold unitll you get correct letter.

## Instalation
`npm i react-language-keyboard`

------------


### Global Use
```
// import LanguageKeyboardGlobal in main app file
import { LanguageKeyboardGlobal } from 'react-language-keyboard';

// define letterDictionary
const SpanishKeyBoard = {
        a: ['á'],
        e: ['é'],
        i: ['í'],
        o: ['ó'],
        '?': ['¿'],
        n: ['ñ'],
        u: ['ú', 'ü']
    };

// Use in your react app
const App = ()=>{
    return <>
		<LanguageKeyboardGlobal letterDictionary={SpanishKeyBoard} />
		<input />
	</>
}
```

### Use as hook

```
// import useLanguageKeyboard
import { useLanguageKeyboard } from 'react-language-keyboard';

// define letterDictionary 
const SpanishKeyBoard = {
	a: ['á'],
	e: ['é'],
	i: ['í'],
	o: ['ó'],
	'?': ['¿'],
	n: ['ñ'],
	u: ['ú', 'ü']
};

// Use in your component
const Component = ()=>{
    const htmlInput = useLanguageKeyboard(SpanishKeyBoard);
    return <input ref={htmlInput} />
}
```

#### If you want to avoid passing letterDictionary to hook every time
You can define it in context provider in the main folder of your app and every hook will dynamicly use context value
```
// import ReactLanguageKeyboardProvider
import { ReactLanguageKeyboardProvider } from 'react-language-keyboard';

// define letterDictionary 
const SpanishKeyBoard = {
	a: ['á'],
	e: ['é'],
	i: ['í'],
	o: ['ó'],
	'?': ['¿'],
	n: ['ñ'],
	u: ['ú', 'ü']
};

// Wrap Your application
const App = ()=>{
    return <ReactLanguageKeyboardProvider letterDictionary={SpanishKeyBoard}>
		<Component />
    </ReactLanguageKeyboardProvider>
}


const Component = ()=>{
    // component automaticly has access to Spanish Keyboard context
    const htmlInput = useLanguageKeyboard();
    return <input ref={htmlInput} />
}
```
