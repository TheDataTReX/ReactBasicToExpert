import React, { useState } from 'react';

function Dictionary() {
    const [word, setWord] = useState('');
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSynonyms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSynonyms(data.map((item: any) => item.word));
        } catch (error) {
            console.error("Error fetching synonyms:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const text = await file.text();
            setWord(text.trim()); // Establecemos la palabra extraída en nuestro estado
        }
    }

    const downloadSynonyms = () => {
        const blob = new Blob([synonyms.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'synonyms.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a word..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => handleFileChange(e)}               
            />
            <button onClick={fetchSynonyms}>Find Synonyms</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {synonyms.length > 0 && (
                <div>
                    <h2>Synonyms for "{word}":</h2>
                    <ul>
                        {synonyms.map(syn => <li key={syn}>{syn}</li>)}
                    </ul>
                    <button onClick={downloadSynonyms}>Download Synonyms</button>
                </div>
            )}
        </div>
    );
}

export default Dictionary;
