import React from 'react';

import Guest from './Guest';

class GuestGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                {
                    Array.isArray(this.props.guests) && this.props.guests.length > 0 ? 
                    this.props.guests.map((guest, index) => {
                        return <Guest key={index} info={guest} blueprint={this.props.metadata} />})
                        : 'naaah'
                    }                
            </div>
        )
    }
}

export default GuestGrid;