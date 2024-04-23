import React, {useState, useEffect} from 'react';
import OptionsBar from './components/options-bar'
import Note from './components/note';
import db, { onNotesValueChange } from './services/datastore';

export default function MyApp() {
    const [notes, setNotes] = useState(new Map());
    useEffect(() => {
        onNotesValueChange(setNotes);
        // Subscribe to real-time updates from Firestore
        // const unsubscribe = db.collection('notes').onSnapshot(snapshot => {
        //     const updatedNotes = new Map();
        //     snapshot.forEach(doc => {
        //         updatedNotes.set(doc.id, doc.data());
        //     });
        //     setNotes(updatedNotes);
        // });

        // return () => unsubscribe();
        //figure smth out
    }, []);

    const [mode, setMode] = useState('Move');
    const [draggedNote, setDraggedNote] = useState(null);

    const handleModeChange = (newMode) => {
        setMode(newMode);
        console.log(newMode);
    };

    const handleDocumentClick = (e) => {
        if(mode === 'New' && !e.target.closest('.note') && !e.target.closest('.active')) {
            createNewNote(e);
        }
    };

    const handleNoteMouseDown = (noteID) => {
        if(mode === 'Move') {
            setDraggedNote(noteID);
        }
    };

    const handleNoteMouseMove = (e) => {
        if (draggedNote) {
            const note = document.getElementById(draggedNote);
            if (note) {
                const rect = note.getBoundingClientRect();
                note.style.left = `${rect.left + e.movementX}px`;
                note.style.top = `${rect.top + e.movementY}px`;
            }
        }
    };
    
    const handleNoteMouseUp = () => {
        if (draggedNote) {
            setDraggedNote(null);
        }
    };

    const handleNoteClick = (noteID) => {
        if (mode === 'Delete') {
            deleteNoteById(noteID);
        } 
    };

    const deleteNoteById = (noteId) => {
        const noteRef = db.ref(`notes/${noteId}`); // Reference to the specific note
        noteRef.remove()
        .then(() => console.log("Note deleted successfully"))
        .catch(error => console.error("Error deleting note:", error));
    };

    const createNewNote = (clickEvent) => {
        if (mode === 'New') {
            const newNoteRef = db.ref('notes').push(); // Generate a new unique key for the note
            const newNoteKey = newNoteRef.key;
            const newNoteData = {
                input: 'New Note',
                textarea: 'put content here',
                x: clickEvent.clientX,
                y: clickEvent.clientY
            };
            newNoteRef.set(newNoteData)
                .then(() => console.log("New note created successfully"))
                .catch(error => console.error("Error creating note:", error));
        }
    };

    const handleSaveEdits = (noteId, newTitle, newContent) => {
        const noteRef = db.ref(`notes/${noteId}`); // Reference to the specific note
        noteRef.update({
            input: newTitle,
            textarea: newContent
        })
        .then(() => console.log("Note updated successfully"))
        .catch(error => console.error("Error updating note:", error));
    };

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('mousemove', handleNoteMouseMove);
        document.addEventListener('mouseup', handleNoteMouseUp);
    
        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('mousemove', handleNoteMouseMove);
            document.removeEventListener('mouseup', handleNoteMouseUp);
        };
      }, [mode, draggedNote]);

    return (
        <div>
            <h1>Welcome to the Notes App!</h1>
            <OptionsBar mode={mode} onModeChange={handleModeChange} />  
            {[...notes.keys()].map((noteId) => (
                <Note
                    key={noteId} // Use the noteId as the key
                    id={noteId} // Pass the noteId as the id
                    onClick={() => handleNoteClick(noteId)} // Pass noteId to handleNoteClick
                    onMouseDown={() => handleNoteMouseDown(noteId)} // Pass noteId to handleNoteMouseDown
                    onMouseMove={handleNoteMouseMove} // Pass handleNoteMouseMove as a prop
                    onMouseUp={handleNoteMouseUp} // Pass handleNoteMouseUp as a prop
                    onSaveEdits={handleSaveEdits}
                    mode={mode}
                    style={{ left: `${notes.get(noteId).x}px`, top: `${notes.get(noteId).y}px` }} // Access note properties using noteId
                    />
            ))}     
        </div>
    );
}