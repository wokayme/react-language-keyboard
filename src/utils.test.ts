import { addKeyToLetterArray, replaceLetterOnIndex } from './utils';

describe('addKeyToLetterArray', () => {
    test('empty object', () => {
        expect(addKeyToLetterArray({})).toEqual({});
    });
    test('correct added key to array', () => {
        expect(addKeyToLetterArray({ c: ['a', 'b'] })).toEqual({ c: ['c', 'a', 'b'] });
    });
});

describe('replaceLetterOnIndex', () => {
    test('Replace one letter for second', () => {
        expect(replaceLetterOnIndex('hello', 1, 'i')).toEqual('hillo');
    });
    test('Replace letter on index not existing on string', () => {
        console.log(replaceLetterOnIndex('', 1, 'i'));
        expect(replaceLetterOnIndex('', 1, 'i')).toEqual('');
    });
});
