import React from 'react';
import { Row } from 'react-bootstrap'

import Guest from './Guest';

class GuestGrid extends React.Component {
    constructor(props) {
        super(props);
        this.mapBlueprint = this.mapBlueprint.bind(this);
        this.guestDataCheck = this.guestDataCheck.bind(this);        
    }

    mapBlueprint() {
        let blueprintTypes = {};
        let blueprintIdKeys = [];

        this.props.metadata.payload.map( p => {
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

    // To avoid rendering elements with data formatting issues (A type check alternative to using Typescript)
    guestDataCheck(guest) {
        let dataFormatAsExpected = true;
        const {blueprintTypes, blueprintIdKeys} = this.mapBlueprint();
        
        blueprintIdKeys.map(key => {            
            if (!(guest[key] == null 
                    || guest[key]) == blueprintTypes[key].type
                    || guest.type == "array" && Array.isArray(guest[key])) {
                //Since JavaScript considers typeof array as an object, it has to be handled seprately
                dataFormatAsExpected = false;                
                console.error(`type of ${guest[key]}: ${typeof(guest[key])}`)
            }
        });

        return dataFormatAsExpected;
    }

    render() {
        return (
            <Row>
                {
                    Array.isArray(this.props.guests) && this.props.guests.length > 0 ? 
                        this.props.guests.map((guest, index) => {
                            if (this.guestDataCheck(guest)) {
                                const {blueprintTypes, blueprintIdKeys} = this.mapBlueprint();
                                return (<Guest key={index} 
                                               info={guest} 
                                               blueprintTypes={blueprintTypes} 
                                               blueprintIdKeys={blueprintIdKeys} />)                            
                        }}) 
                        : ''
                }        
            </Row>
        )
    }
}

export default GuestGrid;