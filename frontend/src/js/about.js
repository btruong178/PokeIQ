/**
 * @file
 * About component for PokeIQ
 * @module About
 * @component
 */

import '../css/About.css'
import { Container, Row, Col } from 'react-bootstrap';

/**
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