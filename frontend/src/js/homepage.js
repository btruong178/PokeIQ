import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import pokeball from '../css/images/luxuryball.png'
import '../css/Homepage.css'

function Homepage() {
    return (
        <section className="section background">
            <Container fluid className="py-5">
                {/* Welcome Section */}
                <Row className="text-center mb-4">
                    <Col xs={12}>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <Image src={pokeball} alt="Pokeball" className="pokeball mx-2" />
                            <h1 className="welcome mb-0">Welcome</h1>
                            <Image src={pokeball} alt="Pokeball" className="pokeball transform-Y mx-2" />
                        </div>
                        <hr className="hr-line mx-auto" />
                    </Col>
                    <Col xs={12} md={{ span: 8, offset: 2 }}>
                        <p className="introduction">
                            PokeIQ is a collection of many Pokémon-related quizzes. Test your knowledge about Pokémon and increase your PokeIQ. Challenge your friends and see who knows the most about the world of Pokémon. Enjoy a variety of quizzes and have fun!
                        </p>
                    </Col>
                </Row>

                {/* Get Started Section */}
                <Row className="text-center mt-5 mb-4">
                    <Col xs={12}>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <Image src={pokeball} alt="Pokeball" className="pokeball mx-2" />
                            <h1 className="welcome mb-0">Get Started</h1>
                            <Image src={pokeball} alt="Pokeball" className="pokeball transform-Y mx-2" />
                        </div>
                        <hr className="hr-line mx-auto" />
                    </Col>
                    <Col xs={12} md={{ span: 8, offset: 2 }}>
                        <p className="introduction">
                            Begin by selecting a quiz from the navigation bar located at the top left of the page. The icon with three horizontal lines will open the navigation bar.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Homepage