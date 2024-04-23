import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Note({ id, onClick, onMouseDown, onSaveEdits, mode, style }) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('New Note');
    const [content, setContent] = useState('Insert Content Here!');

    const handleNoteClick = () => {
        if(mode === 'Edit'){
            setEditMode(true);
        }
        onClick(id);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSave = () => {
        if (editMode && mode === 'Edit') {
            onSaveEdits(id, title, content);
            setEditMode(false); // Set editMode to false after onSaveEdits
        }
    }

    return (
        <div className="note" id={id} onClick={handleNoteClick} style={style} onMouseDown={() => onMouseDown(id)}>
            {editMode && mode == 'Edit' ? (
                <>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        type = "text"
                        placeholder="Content"
                        value={content}
                        onChange={handleContentChange}
                    />
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleSave();
                    }}>
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h2>{title}</h2>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </>
            )}
        </div>
    );
}

export default Note;
