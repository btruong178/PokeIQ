import '../css/Homepage.css'
import pokeball from '../css/images/pokeball-thumbnail.png'
import HrLine from './hr-line'

function Homepage() {
    return (
        <>
            {/* Welcome Section */}
            <div className="section background">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={pokeball} alt="Pokeball" className="pokeball"></img>
                                <h1 className="welcome">Welcome</h1>
                                <img src={pokeball} alt="Pokeball" className="pokeball"></img>
                            </div>
                            <HrLine />
                            <p className="introduction">
                                PokeQuiz is a collection of many
                                Pokemon related quizzes. Test your knowledge about Pokemon and
                                become the Pokemon Master.
                                Challenge your friends and see who knows the most about the world of Pokemon.
                                Enjoy a variety of quizzes and have fun!
                            </p>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={pokeball} alt="Pokeball" className="pokeball"></img>
                                <h1 className="welcome">Get Started</h1>
                                <img src={pokeball} alt="Pokeball" className="pokeball"></img>
                            </div>
                            <HrLine />
                            <p className="introduction">
                                Begin by selecting a quiz from the navigation bar located at the top left of the page.
                                The icon with three horizontal lines will open the navigation bar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;