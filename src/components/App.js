import React from 'react';

import GuestsData from '../data/guests.json';
import '../sass/index.scss';
import { Row, Col, Container, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

import GuestGrid from './GuestGrid';

let headerStyles = {
    margin: '0 auto',
    textTransform: 'uppercase',
    letterSpacing: '0.71rem'
};

const Header = () => (    
    <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
        <Container>
            <Navbar.Brand href="#" style={headerStyles}>
                <span>Cafe</span> 
                <span style={{marginLeft: '10%'}}>Masa</span>
            </Navbar.Brand>
        </Container>
    </Navbar>
);

const Footer = () => (
    <div className="footer">
        <Container>
            &copy; Cafe MASA | This app was built only for demo purposes
        </Container>
    </div>
);

class App extends React.Component {  

    constructor(props) {
        super(props);        
        this.state = {
            metadata: {},
            guests: [],
            sortingFactor: 'Visit Count',
            sortingOrder: 'Descending',
            filterMarketingAllowed: false    
        };
        this.changeDateFormat = this.changeDateFormat.bind(this);
        this.sortGuests = this.sortGuests.bind(this);
        this.filterGuests = this.filterGuests.bind(this);
        this.updateDataSort = this.updateDataSort.bind(this);
    }        

    componentDidMount() {
        this.setState({
            metadata: GuestsData["meta-data"],
            guests: GuestsData.data
        }, () => {
            this.sortGuests();
        });
    }
    
    componentWillUnmount() {
        this.setState({
            guests: {}
        })
    }

    sortGuests() { 
        let factor = '', order = this.state.sortingOrder;

        this.state.metadata.payload.map(p => {
            if (p.label.toLowerCase() == this.state.sortingFactor.toLowerCase()) {
                factor = p.id;
                console.log("yeehaa")
            }
        })

        if (['visit_count', 'total_spend'].includes(factor) && ['Ascending', 'Descending'].includes(order)) {
            let sortedData = this.state.guests.sort((a,b) => {
                return (factor == 'visit_count' ?
                      order == 'Ascending' ?
                        a.visit_count - b.visit_count
                        : b.visit_count - a.visit_count
                    : order == 'Ascending' ?
                        a.total_spend - b.total_spend
                        : b.total_spend - a.total_spend
                )
            });

            this.setState({
                guests: sortedData
            })
        }
    }

    filterGuests() {
        this.setState({
          filterMarketingAllowed: !this.state.filterMarketingAllowed
        },() => {
            if (this.state.filterMarketingAllowed) {                
                this.setState({
                    guests: GuestsData.data.filter(guest => guest.allow_marketing)
                })
            } else {
                this.setState({
                    guests: GuestsData.data
                })
            }
        });
    }

    updateDataSort(eventKey) {
        if (["Visit Count", "Total Spend"].includes(eventKey)) {
            this.setState({
                sortingFactor: eventKey
            }, () => this.sortGuests())
        } else if (["Ascending", "Descending"].includes(eventKey)) {
            this.setState({
                sortingOrder: eventKey
            }, () => this.sortGuests())
        }
    }

    changeDateFormat(dateString) {
        const date = new Date(dateString); //the given date is in ISO format
        
        //date.Month() returns months with values 0-11
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    render() {
        return (
        <div id="App">   
            <Header />
            <div id="App-body" style={{marginTop: '6rem'}}>
                <Container>
                    <div className="mb-5">
                        <h2>Guest Information</h2>
                        <p className="helper-text">
                            Last updated: <span className="font-italic">{this.changeDateFormat(this.state.metadata.last_update)}</span>
                        </p>
                    </div>
                    <Row className="mb-3">
                        <Col lg={6} xs={12}>
                            <div className='custom-control custom-switch'>                        
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='toggleMarketingAllowedSwitch'
                                onChange={this.filterGuests}
                                readOnly
                                />         
                                <label className='custom-control-label' htmlFor='toggleMarketingAllowedSwitch'>
                                    Filter Marketing Allowed
                                </label>               
                            </div>
                            <p className="helper-text">
                                Showing {this.state.guests.length} results
                            </p>
                        </Col>
                        <Col lg={6} xs={12}>
                            <Row className="dropdown-container">
                                <DropdownButton 
                                    id="dropdown-factor" 
                                    className="masa-dropdown"
                                    onSelect={this.updateDataSort} 
                                    title={"Sort By: " + this.state.sortingFactor}>
                                    <Dropdown.Item eventKey="Visit Count" as="button">Visit Count</Dropdown.Item>
                                    <Dropdown.Item eventKey="Total Spend" as="button">Total spend</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton 
                                    id="dropdown-order" 
                                    className="masa-dropdown"
                                    onSelect={this.updateDataSort} 
                                    title={"Order By: " + this.state.sortingOrder}>
                                    <Dropdown.Item eventKey="Ascending" as="button">Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="Descending" as="button">Descending</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                        </Col>
                    </Row>
                    
                    <GuestGrid 
                        metadata={this.state.metadata} 
                        guests={this.state.guests} 
                        allowMarketingToggle={this.state.filterMarketingAllowed}/>
                </Container>                
            </div>   
            <Footer />         
        </div>
        );
    }
}

export default App;