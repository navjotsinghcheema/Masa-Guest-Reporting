import React from 'react';
import { Col, Card } from 'react-bootstrap';

class Guest extends React.Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <Col lg={4} md={4} sm={6} xs={12}>
                {/* To Add jitter to the containing div */}
                <Col lg={12} xs={12}>
                    {this.props.info ?                         
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <strong>{this.props.info.first_name}</strong> 
                                    {this.props.info.last_name}
                                </Card.Title>
                                <table>
                                    <tbody>
                                        {this.props.blueprintIdKeys.map((key, index) => {
                                            if (!["first_name", "last_name", "tags", "id"].includes(key) 
                                                    && this.props.info[key]) {
                                                return (
                                                    <tr key={index}>
                                                        <td>{this.props.blueprintTypes[key].label}</td>
                                                        <td>{this.props.info[key]}</td>
                                                    </tr>   
                                                )
                                            }
                                        })}                               
                                    </tbody>
                                </table>
                                <ul>
                                    {this.props.info.tags ? 
                                        this.props.info.tags.map((tag,index) => {
                                            return <li key={index} >{tag}</li>
                                        })
                                        : ''
                                    }
                                </ul>
                            </Card.Body>
                        </Card>                        
                        : ''
                    }                    
                </Col>
            </Col>            
        )
    }
}

export default Guest;