import React, { Component } from "react";
//more to do on this page.
export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>more content to add here!</h3>
                </header>
            </div>
        );
    }
}