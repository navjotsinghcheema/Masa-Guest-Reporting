import React from 'react';
import { Col, Card } from 'react-bootstrap';

class Guest extends React.Component {
    constructor(props) {
        super(props);    
        this.getUniqueTags = this.getUniqueTags.bind(this);
    }

    getUniqueTags() {
        //Removing duplicate tags by creating a set from given array and destructuring it back to a new array
        return [...new Set(this.props.info.tags)]
    }

    render() {
        return (
            <Col lg={4} md={6} sm={12} xs={12}>
                {/* To Add jitter to the containing div */}
                <Col lg={12} xs={12}>
                    {this.props.info ?                         
                        <Card className="mt-2">
                            <Card.Body>
                                <Card.Title>
                                    <strong className="mr-1">{this.props.info.first_name}</strong> 
                                    {this.props.info.last_name}
                                </Card.Title>
                                <table className="guest-info-table">
                                    <tbody>
                                        {this.props.blueprintIdKeys.map((key, index) => {
                                            if (!["first_name", "last_name", "tags", "id"].includes(key) 
                                                    && this.props.info[key]) {
                                                if (!(this.props.allowMarketingToggle && key == "allow_marketing")) {
                                                    //do not show marketing true information when the user filters marketing only guests                                                    
                                                    return (
                                                        <tr key={index}>
                                                            <td>{this.props.blueprintTypes[key].label}</td>
                                                            <td className="pl-2">
                                                                {/* {this.props.info[key]} */}
                                                                {key == 'allow_marketing' ?
                                                                    '' + this.props.info[key]
                                                                    : this.props.info[key]
                                                                }
                                                            </td>
                                                        </tr>   
                                                    )
                                                }
                                            }
                                        })}                               
                                    </tbody>
                                </table>
                                <ul className="tags-list">
                                    {this.getUniqueTags() ? 
                                        this.getUniqueTags().map((tag,index) => {
                                            return <li className="tag" key={index} >{tag}</li>
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