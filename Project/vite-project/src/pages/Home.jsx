import {Link, useNavigate} from 'react-router-dom'
import Header from "./components/Header";



function Home() {
    return (
        
        <div>
            <Header />
            <div className="banner">
                <div className="left-banner">
                    <h1><b>Art Viewing Done Right</b></h1>
                    <h3>Example text for the website</h3>
                    <p>example description of the website</p>
                    <div className="btn">
                    <button className="button main-btn">Learn More</button>
                    <button className="button secondary-btn">Sign Up</button>
                    </div>
                </div>
                <div className="left-banner">
                    <img src="./images/art2.jpg"/>
                </div>
            </div>
        </div>
    );

}export default Home;