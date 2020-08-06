import React, { useEffect, useState } from 'react';

function copy(e) {
    let source = e.target,
        html = source.innerHTML,
        text = source.textContent;

    var input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    input.remove();

    source.innerHTML = 'Copied!';

    setTimeout(() => {
        source.innerHTML = html;
    }, 1000);

    fathom('trackGoal', 'D0KU4IIK', 0);
}

export default function InfoTabItem({ collector, appState }) {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        async function fetchData() {
            let info = await collector.getInfo(appState);

            setDisplayValue(info);
        }

        fetchData();
    }, [appState]);

    return (
        <div>
            <label>{collector.label}</label>
            <span title="Double click to copy"
                className={collector.className}
                onDoubleClick={copy} 
                dangerouslySetInnerHTML={{ __html: displayValue }}/>
        </div>
    );
}