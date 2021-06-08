import React, { useState } from 'react';
import Popup from './addStudent.js';
//allows me to create a dialog box to pop up for adding students with names and emails.
function AddStudent(props) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    
    return <div>
        <input
            className="btn btn-primary btn-block"
            type="button"
            value="Add Student"
            onClick={togglePopup}
        />
        {isOpen && <Popup handleChange={props.handleChange} 
            AddStudents={props.addStudentButton}
            handleClose={togglePopup}
        />}
    </div>
}

export default AddStudent;