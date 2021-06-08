import React, { Component } from "react";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Epopup extends Component {


    render() {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <p>This email address you have entered already has a student associated with it. Would you like to combine accounts or keep seperate. Note: if kept seperate you must create a seperate password for this student.</p>
                    <div>
                        <button className="btn btn-primary btn-block" value="submit" onClick={this.props.doubleAccount}>Combine</button>
                        <button className="btn btn-primary btn-block" value="submit" onClick={this.props.separate}>keep Seperate</button>
                    </div>

                    
                    

                        
                </div>
            </div>

        )
    }
};

export default Epopup;