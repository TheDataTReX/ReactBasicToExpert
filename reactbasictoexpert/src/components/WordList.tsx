import React, { useState, useEffect } from 'react';

function WordList() {
    const [word, setWord] = useState("amor");
    const [relatedWords, setRelatedWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (word) {
            fetch(`https://api.datamuse.com/words?rel_syn=${word}&max=10`)
                .then(response => response.json())
                .then(data => {
                    setRelatedWords(data);
                    setLoading(false);
                });
        }
    }, [word]);

    return (
        <div>
            <input
                type="text"
                value={word}
                onChange={e => setWord(e.target.value)}
                placeholder="Introduce una palabra..."
            />
            <button onClick={() => setLoading(true)}>Buscar</button>

            {loading ? <p>Cargando...</p> : (
                <ul>
                    {relatedWords.map(item => (
                        <li key={item.word}>{item.word}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WordList;
