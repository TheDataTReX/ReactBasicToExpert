import React, { useState, useEffect } from 'react';

function ResourceList() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setResources(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? <p>Cargando...</p> : (
                <ul>
                    {resources.map(resource => (
                        <li key={resource.id}>{resource.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ResourceList;
