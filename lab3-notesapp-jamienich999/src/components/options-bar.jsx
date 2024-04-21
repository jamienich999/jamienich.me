import React, { useState } from 'react';

function optionsBar({ onModeChange }) {
    const [activeOption, setActiveOption] = useState(null);

    const handleClick = (newMode) => {
        //alert(newMode + ' clicked!');
        setActiveOption(newMode);
        onModeChange(newMode);
    };

    return (
        <div className = "options-bar-container">
        <ul id = "options-bar">
            <li className={activeOption === 'Move' ? 'active' : ''} onClick={() => handleClick('Move')}>
                Move
            </li>

            <li className={activeOption === 'Edit' ? 'active' : ''} onClick={() => handleClick('Edit')}>
                Edit
            </li>

            <li className={activeOption === 'Delete' ? 'active' : ''} onClick={() => handleClick('Delete')}>
                Delete
            </li>

            <li className={activeOption === 'New' ? 'active' : ''} onClick={() => handleClick('New')}>
                New
            </li>
        </ul>
        </div>
    );
}

export default optionsBar;