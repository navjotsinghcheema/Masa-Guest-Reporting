import React from 'react';

class Guest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 class="card-title">
                        <strong>Firstname</strong> Lastname
                    </h5>
                </div>
            </div>
        )
    }
}

export default Guest;