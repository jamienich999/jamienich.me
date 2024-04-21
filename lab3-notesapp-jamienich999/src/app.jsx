import React, {useState} from 'react';
import OptionsBar from './components/options-bar'

export default function MyApp() {
    const [mode, setMode] = useState('Move');
    const [draggedNote, setDraggedNote] = useState(null);

    const handleModeChange = (newMode) => {
        setMode(newMode);
        console.log(newMode);
    };

    const handleDocumentClick = (e) => {
        if(mode === 'New' && !e.target.closest('.note')) {
            console.log('Creating a new note');
            createNewNote(e);
        }
    };

    const handleNoteMouseDown = (noteID, e) => {
        e.stopPropagation();
        console.log(mode);
        //if(mode === 'Move') {
            setDraggedNote(noteID);
            e.currentTarget.style.cursor = 'grabbing';
        //}
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
        if(mode === 'Delete') {
            const noteToRemove = document.getElementById(noteID);
            if (noteToRemove) {
                noteToRemove.remove();
            }
        }
    };

    const createNewNote = (clickEvent) => {
        if(mode === 'New'){
            const newNote = document.createElement('div');
            const noteID = `note-${Date.now()}`;

            newNote.id = noteID;
            newNote.classList.add('note');
            newNote.style.position = 'absolute';
            newNote.style.left = `${clickEvent.clientX}px`;
            newNote.style.top = `${clickEvent.clientY}px`;
            newNote.textContent = 'New Note';
            newNote.addEventListener('mousedown', (event) => handleNoteMouseDown(noteID, event));
            newNote.addEventListener('click', (event) => handleNoteClick(noteID, event));

            document.body.appendChild(newNote);
        }
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
            <OptionsBar mode={mode} onModeChange={handleModeChange} />         
        </div>
    );
}