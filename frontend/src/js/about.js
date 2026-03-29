/**
 * @file
 * About component for PokeIQ.
 */

import '../css/About.css'
import { Container, Row, Col } from 'react-bootstrap';

/**
 * @memberof module:Pages
 * @description
 * Component that serves as the about page for PokeIQ. <br>
 * @returns {JSX.Element} About component
 */

function About() {
    return (
        <Container fluid className='about-page background'>
            <Row>
                <Col className="about-text">
                    <h1>About</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default About;