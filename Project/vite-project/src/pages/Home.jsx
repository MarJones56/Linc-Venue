import {Link, useNavigate} from 'react-router-dom'
import Header from "./components/Header";
//import BannerBackground from './images/bak.jpg';//'../assets/bak.jpg';


function Home() {
    return (
        
        <div>
            <Header />
            <div className="home-page">
              <div className="banner">
                <div className="left-banner">
                    <h1><b>Art Viewing Done Right</b></h1>
                    {/* <h3>Example text for the website</h3> */}
                    <p>
                    LinCVenue is a centralized and efficient solution for artists, curators, gallery owners, 
                    and art enthusiasts to discover, book, and manage art-related spaces and events. 
                    Our teams believe that art and connecting to people who share that interset is an 
                    integral part of our society. LinCVenue strives to support small emerging arts who 
                    have a hard time finding suitable venues to showcase their work.
                    </p>
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
        </div>
    );

}export default Home;