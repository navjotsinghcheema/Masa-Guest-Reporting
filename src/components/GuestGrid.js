import React from 'react';

class GuestGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    {/* To Add jitter to the containing div */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {this.props.guests.map((guest, index) => {
                            <Guest key={index} data={guest} blueprint={metadata} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GuestGrid;