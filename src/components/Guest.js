import React from 'react';

class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            blueprintTypes: {}
        }
        this.datacheck = this.datacheck.bind(this);
        this.mapBlueprint = this.mapBlueprint.bind(this);
    }
    componentDidMount() {
        if (this.datacheck()) {
            const { blueprintTypes } = this.mapBlueprint();
            this.setState({
                info: this.props.info,
                blueprintTypes: blueprintTypes
            })
        }
    }
    componentDidUpdate() {
        if (this.datacheck()) {
            const { blueprintTypes } = this.mapBlueprint();
            if (!(this.props.info == this.state.info)) {
                this.setState({
                    info: this.props.info,
                    blueprintTypes: blueprintTypes
                })
            }
        }
    }

    mapBlueprint() {
        let blueprintTypes = {};
        let blueprintIdKeys = [];

        this.props.blueprint.payload.map( p => {
            blueprintIdKeys.push(p.id);
            blueprintTypes[p.id] = {
                "label": p.label,
                "type": p.type
            }            
        });    

        return {
            "blueprintTypes": blueprintTypes,
            "blueprintIdKeys": blueprintIdKeys
        };
    }

    datacheck() {
        let testResult = true;
        const {blueprintTypes, blueprintIdKeys} = this.mapBlueprint();
        
        blueprintIdKeys.map(key => {            
            if (this.props.info[key] == null 
                    || typeof(this.props.info[key]) == blueprintTypes[key].type
                    || (blueprintTypes[key].type == "array" && Array.isArray(this.props.info[key]))) {
                // console.log("true")
                //Since JavaScript considers typeof array as an object, it has to be handled seprately
            } else {                
                testResult = false;                
                console.error(`type of ${this.props.info[key]}: ${typeof(this.props.info[key])}`)
            }
        });

        return testResult;
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    {/* To Add jitter to the containing div */}
                    <div className="card col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card-body">
                            <h5 className="card-title">
                                <strong>Firstname</strong> Lastname
                            </h5>
                            <table>
                                {/* {this.props.blueprint.payload.map()} */}
                            </table>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Guest;