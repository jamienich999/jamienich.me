import React, { useState } from 'react';

function Note({ id, mode }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSave = () => {
        // Save or update the note (implementation depends on your application)
    };

    const handleMouseDown = (e) => {
        handleMouseDown(id, e);
    }

    return (
        <div className="note" id={id}>
            {mode === 'Edit' ? (
                <>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={handleContentChange}
                    />
                </>
            ) : (
                <>
                    <h2>Title: {title}</h2>
                    <p>Content: {content}</p>
                </>
            )}
        </div>
    );
}

export default Note;
