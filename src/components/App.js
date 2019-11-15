import React from 'react';

import GuestsData from '../data/guests.json';
import '../sass/index.scss';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import GuestGrid from './GuestGrid';

let headerStyles = {
    margin: '0 auto',
    textTransform: 'uppercase',
    letterSpacing: '0.71rem'
};

const Header = () => (    
    <Navbar expand="lg" variant="light" bg="light" fixed="true">
        <Container>
            <Navbar.Brand href="#" style={headerStyles}>
                <span>Cafe</span> 
                <span style={{marginLeft: '10%'}}>Masa</span>
            </Navbar.Brand>
        </Container>
    </Navbar>
);

class App extends React.Component {  

    constructor(props) {
        super(props);        
        this.state = {
            metadata: {},
            guests: {}
        }
    }        

    componentDidMount() {
        this.setState({
            metadata: GuestsData["meta-data"],
            guests: GuestsData.data
        });
    }
    
    componentWillUnmount() {
        this.setState({
            guests: {}
        })
    }

    render() {
        return (
        <div id="App">   
            <Header />
            <div id="App-body" className="mt-5">
                <Container>
                    Application...
                    
                    <GuestGrid metadata={this.state.metadata} guests={this.state.guests} />
                </Container>                
            </div>            
        </div>
        );
    }
}

export default App;