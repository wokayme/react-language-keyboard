import React from 'react';

interface RenderKeyboardDictionaryTableProps {
    letterDictionary: Record<string, string[]>;
}
export const RenderKeyboardDictionaryTable = ({
    letterDictionary
}: RenderKeyboardDictionaryTableProps): JSX.Element => {
    const columnStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        padding: '10px'
    } as const;

    return (
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '20px 0' }}>
            <thead>
                <tr>
                    <th style={columnStyle}>Letter to hold</th>
                    {Object.keys(letterDictionary).map((letter, index) => (
                        <th style={columnStyle} key={index}>
                            {letter}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={columnStyle}>Possible replacment</td>
                    {Object.keys(letterDictionary).map((letter, index) => (
                        <td style={columnStyle} key={index}>
                            {letterDictionary[letter].join(',')}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};
