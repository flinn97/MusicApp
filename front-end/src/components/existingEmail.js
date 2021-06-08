import React, { useState } from 'react';
import Epopup from './existingPopup.js';
//Allows me to create another popup if an account for a student entered allready exits. This is an edge case problem solution.
function ExistingEmail(props) {
    const [isOpen, setIsOpen] = useState(true);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        props.handleClose();
    }
    const isDouble = () => {
        props.doubleAccount();
        togglePopup();
    }
    const separated = () => {
        props.separate();
        togglePopup();
    }

    return <div>
        
        {isOpen && <Epopup 
            handleClose={togglePopup}
            doubleAccount={isDouble}
            separate={separated}
            
        />}
    </div>
}

export default ExistingEmail;