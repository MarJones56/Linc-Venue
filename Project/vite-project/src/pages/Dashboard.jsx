import { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./components/Header";
export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem('user'));
 
    const [modalOpen, setModalOpen] = useState(false);
 
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const [profileBanner, setProfileBanner] = useState(user.profileBanner);

    const [firstName, setFirstName] = useState(user.fname);

    const [lastName, setLastName] = useState(user.lname);

    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

    const [location, setLocation] = useState(user?.location);
 
    const [searchResult, setSearchResult] = useState([]);

    const [key, setKey] = useState("");
 
    useEffect(() => {

        const search = async () => {

            try {

                if (!key.trim()) {

                    setSearchResult([]);

                    return;

                }

                const res = await axios.get('http://localhost:5001/Dashboard', { params: { key: key, limit: 5 } });

                setSearchResult(res.data.data);

                console.log(res);

            } catch (error) {

                console.log(error);

            }

        };

        search();

    }, [key]);
 
    const handleOpenModal = () => {

        setModalOpen(true);

    };
 
    const handleCloseModal = () => {

        setModalOpen(false);

    };
 
    const handleSaveChanges = async () => {

        const updatedData = {

            userId: user._id,

            profilePicture: profilePicture,

            profileBanner: profileBanner,

            fname: firstName,

            lname: lastName,

            phoneNumber: phoneNumber,

            location: location

        };
 
        const userId = user._id;

        try {

            const res = await axios.put(`http://localhost:5001/user/` + user._id, updatedData);

            if (res.status === 200) {

                const userRes = await axios.get("http://localhost:5001/user/" + userId);

                if (userRes.status === 200) {

                    localStorage.setItem("user", JSON.stringify(userRes.data));

                    window.location.reload(true);

                }

            }

            setModalOpen(false);

        } catch (err) {

            console.log(err);

        }
    };
 
    return (

        <div>    

            <Header />

        <div>
            <div className="padding">

                <div>

                    <div className="card">

                        <div className="card-body">

                            <img className="profilepic" src={user?.profilePicture ? user.profilePicture : "./images/user.jpg"} alt="user"/>

                            <img className="profileBanner" src={user?.profileBanner ? user.profileBanner : "https://d360wc4uc6n3i9.cloudfront.net/assets/images/hero-bkg-764e08457f41a9cdc00603bd399e6195.jpg"}></img>

                            <div><br></br></div>

                            <h3 className="profile">{user.fname} {user.lname}</h3>

                            <p>@{user.username}</p>

                            <p className="profile">Artist</p>
 
                            <button onClick={handleOpenModal}>Edit Profile</button>

                            <dialog className="editProfileDialog" open={modalOpen} id="modal" >

                                <p><strong>Profile Picture: </strong><input type="text" defaultValue={user.profilePicture} id="profilePicInput" onChange={(e)=> setProfilePicture(e.target.value)}/></p>

                                <p><strong>Profile Banner: </strong><input type="text" defaultValue={user.profileBanner} id="profilePicInput" onChange={(e)=> setProfileBanner(e.target.value)}/></p>

                                <p><strong>First Name: </strong><input type="text" defaultValue={user.fname} id="firstNameInput" onChange={(e)=> setFirstName(e.target.value)}/></p>

                                <p><strong>Last Name: </strong><input type="text" defaultValue={user.lname} id="lastNameInput" onChange={(e)=> setLastName(e.target.value)}/></p>

                                <p><strong>Mobile Phone: </strong><input type="number" placeholder="Enter Phone Number" defaultValue={user?.phoneNumber} id="mobileInput" onChange={(e)=> setPhoneNumber(e.target.value)}/></p>

                                <p><strong>Location: </strong><input type="text" placeholder="Enter Phone Location" defaultValue={user?.location} id="locationInput" onChange={(e)=> setLocation(e.target.value)}/></p>  

                                <button onClick={handleSaveChanges}>Save</button>

                                <button onClick={handleCloseModal}>Cancel</button>
                            </dialog>

                        </div>

                    </div>

                </div>

            </div>
 
            <div className="padding">


                    <div className="card">

                        <div className="card-body little-profile">

                                <h3 className="m-b-0">Profile Information</h3>                                


                                {/* <button onClick={()=>{ alert('alert'); }}>edit</button> */}

                                {/* make it so when this button is clicked the user receives a pop up to insert whatever text to change the about section */}

                                <p>{user?.profileBio}</p>

                                <p><strong>Full name: </strong>{user.fname} {user.lname}</p>

                                <p><strong>Email: </strong>{user.email}</p>

                                {user.phoneNumber ? <p><strong>Mobile phone: </strong>{user?.phoneNumber}</p> : ""}
                                {user.location ? <p><strong>Location: </strong>{user?.location}</p>: ""}

                        </div>

                    </div>

                </div>
 
            <div className="padding">

                    <div className="card">

                        <div className="card-body little-profile">

                                <h3 className="m-b-0" title="All previous bookings come here">Booking History</h3>
                                <p>All previous bookings come here

                                </p>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    );

}
 
 

