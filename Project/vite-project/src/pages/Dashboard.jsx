// import { useState, useEffect } from "react";
// import axios from 'axios'
// import Header from "./components/Header";

// export default function Dashboard() {

//     const [searchResult, setSearchResult] = useState([]);
//     const [key, setKey] = useState("");
//     useEffect(() => {
//         const search = async () => {
//             try {
//                 if (!key.trim()) {
//                     setSearchResult([])
//                     return
//                 }
//                 const res = await axios.get('https://marcus-latest-nov8-2o8p.onrender.com/Dashboard', {params: {key: key, limit: 5}})
//                 setSearchResult(res.data.data)
//                 console.log(res)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         search()
//     }, [key])

//     return (
//         <div>
//             <Header />
//         <div className="padding">
//     <div className="col-md-8">
//         <div className="card"> <img className="card-img-top" src="./images/background.jpg" alt="Card image cap"/>
//             <div className="card-body little-profile text-center">
//                 <div className="pro-img"><img src="./images/user.jpg" alt="user"/></div>
//                 <h3 className="m-b-0">Blank User</h3>
//                 <p>Artist</p> <button className="button main-btn">Follow</button>
//                 <div className="row text-center m-t-20">
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
// );

// // };
// import { useState, useEffect, useContext } from "react";
// import axios from 'axios'
// import Header from "./components/Header";
// import { UserContext } from './components/UserContext';


// export default function Dashboard() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     console.log(user);
//     //const user = JSON.parse(localStorage.getItem('user'));

//     // const [searchResult, setSearchResult] = useState([]);
//     // const [key, setKey] = useState("");
//     // useEffect(() => {
//     //     const search = async () => {
//     //         try {
//     //             if (!key.trim()) {
//     //                 setSearchResult([])
//     //                 return
//     //             }
//     //             const res = await axios.get('https://working-art-gallery-server.onrender.com/Dashboard', {params: {key: key, limit: 5}})
//     //             setSearchResult(res.data.data)
//     //             console.log(res)
//     //         } catch (error) {
//     //             console.log(error)
//     //         }
//     //     }
//     //     search()
//     // }, [key])

//     return (
//         <div>
            
//             <Header />
//         <div>


//             <div className="padding">
//                 <div>
//                     <div class="card">
//                         <div class="card-body">
//                             <img className="profilepic" src="./images/user.jpg" alt="user"/><div><br></br></div>
//                             <h3 className="profile">Signed in as {user.username}</h3>
//                             <p className="profile">Regular User</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//             <div class="padding">
//                     <div class="card">
//                         <div class="card-body little-profile">
//                                 <h3 class="m-b-0">Profile Information</h3>                                
//                                 {/* <button onClick={()=>{ alert('alert'); }}>edit</button> */}
//                                 {/* make it so when this button is clicked the user receives a pop up to insert whatever text to change the about section */}
//                                 <p>HI, I'm John Doe. Decisions: If you can't decide, the answer is no.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
//                                     dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
//                                     in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
//                                     laborum.
//                                 </p>
//                                 <p><strong>Full name: </strong>{user.fname} {user.lname}</p>
//                                 <p><strong>Mobile phone: </strong>012 345 6789</p>
//                                 <p><strong>Email: </strong>{user.email}</p>
//                                 <p><strong>Location: </strong>{user?.location}</p>
//                                 <p><strong>Social: </strong>John Doe</p>  
//                         </div>
//                     </div>
//                 </div>

//             <div class="padding">
//                     <div class="card">
//                         <div class="card-body little-profile">
//                                 <h3 class="m-b-0" title="All previous bookings come here">Booking History</h3>
//                                 <p>All previous bookings come here
//                                 </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
// );

// };

// import { useState, useEffect } from "react";
// import axios from 'axios';
// import Header from "./components/Header";

// export default function Dashboard() {
//     const user = JSON.parse(localStorage.getItem('user'));

//     const [modalOpen, setModalOpen] = useState(false);

//     const [profilePicture, setProfilePicture] = useState(user.profilePicture);
//     const [profileBanner, setProfileBanner] = useState(user.profileBanner);
//     const [firstName, setFirstName] = useState(user.fname);
//     const [lastName, setLastName] = useState(user.lname);
//     const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
//     const [location, setLocation] = useState(user?.location);

//     const [searchResult, setSearchResult] = useState([]);
//     const [key, setKey] = useState("");

//     useEffect(() => {
//         const search = async () => {
//             try {
//                 if (!key.trim()) {
//                     setSearchResult([]);
//                     return;
//                 }
//                 const res = await axios.get('http://localhost:5000/Dashboard', { params: { key: key, limit: 5 } });
//                 setSearchResult(res.data.data);
//                 console.log(res);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         search();
//     }, [key]);

//     const handleOpenModal = () => {
//         setModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setModalOpen(false);
//     };

//     const handleSaveChanges = async () => {
//         const updatedData = {
//             userId: user._id,
//             profilePicture: profilePicture,
//             profileBanner: profileBanner,
//             fname: firstName,
//             lname: lastName,
//             phoneNumber: phoneNumber,
//             location: location
//         };

//         const userId = user._id;
//         try {
//             const res = await axios.put(`http://localhost:5000/user/` + user._id, updatedData);
//             if (res.status === 200) {
//                 const userRes = await axios.get("http://localhost:5000/user/" + userId);
//                 if (userRes.status === 200) {
//                     localStorage.setItem("user", JSON.stringify(userRes.data));
//                     window.location.reload(true);
//                 }
//             }
//             setModalOpen(false);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div>    
//             <Header />
//         <div>
//             <div className="padding">
//                 <div>
//                     <div className="card">
                        
//                         <div className="card-body">
//                             <img className="profilepic" src={user?.profilePicture ? user.profilePicture : "./images/user.jpg"} alt="user"/>
//                             <img className="profileBanner" src={user?.profileBanner ? user.profileBanner : "https://d360wc4uc6n3i9.cloudfront.net/assets/images/hero-bkg-764e08457f41a9cdc00603bd399e6195.jpg"}></img>
//                             <div><br></br></div>
//                             <h3 className="profile">{user.fname} {user.lname}</h3>
//                             <p>@{user.username}</p>
//                             <p className="profile">Artist</p>

//                             <button onClick={handleOpenModal}>Edit Profile</button>
//                             <dialog className="editProfileDialog" open={modalOpen} id="modal" >
//                                 <p><strong>Profile Picture: </strong><input type="text" defaultValue={user.profilePicture} id="profilePicInput" onChange={(e)=> setProfilePicture(e.target.value)}/></p>
//                                 <p><strong>Profile Banner: </strong><input type="text" defaultValue={user.profileBanner} id="profilePicInput" onChange={(e)=> setProfileBanner(e.target.value)}/></p>
//                                 <p><strong>First Name: </strong><input type="text" defaultValue={user.fname} id="firstNameInput" onChange={(e)=> setFirstName(e.target.value)}/></p>
//                                 <p><strong>Last Name: </strong><input type="text" defaultValue={user.lname} id="lastNameInput" onChange={(e)=> setLastName(e.target.value)}/></p>
//                                 <p><strong>Mobile Phone: </strong><input type="number" placeholder="Enter Phone Number" defaultValue={user?.phoneNumber} id="mobileInput" onChange={(e)=> setPhoneNumber(e.target.value)}/></p>
//                                 <p><strong>Location: </strong><input type="text" placeholder="Enter Phone Location" defaultValue={user?.location} id="locationInput" onChange={(e)=> setLocation(e.target.value)}/></p>  
//                                 <button onClick={handleSaveChanges}>Save</button>
//                                 <button onClick={handleCloseModal}>Cancel</button>

//                             </dialog>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="padding">
//                     <div className="card">
//                         <div className="card-body little-profile">
//                                 <h3 className="m-b-0">Profile Information</h3>                                
//                                 {/* <button onClick={()=>{ alert('alert'); }}>edit</button> */}
//                                 {/* make it so when this button is clicked the user receives a pop up to insert whatever text to change the about section */}
//                                 <p>{user?.profileBio}</p>
//                                 <p><strong>Full name: </strong>{user.fname} {user.lname}</p>
//                                 <p><strong>Email: </strong>{user.email}</p>
//                                 {user.phoneNumber ? <p><strong>Mobile phone: </strong>{user?.phoneNumber}</p> : ""}
//                                 {user.location ? <p><strong>Location: </strong>{user?.location}</p>: ""}
//                         </div>
//                     </div>
//                 </div>

//             <div className="padding">
//                     <div className="card">
//                         <div className="card-body little-profile">
//                                 <h3 className="m-b-0" title="All previous bookings come here">Booking History</h3>
//                                 <p>All previous bookings come here
//                                 </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
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
 
    // useEffect(() => {

    //     const search = async () => {

    //         try {

    //             if (!key.trim()) {

    //                 setSearchResult([]);

    //                 return;

    //             }

    //             const res = await axios.get('http://localhost:5000/Dashboard', { params: { key: key, limit: 5 } });

    //             setSearchResult(res.data.data);

    //             console.log(res);

    //         } catch (error) {

    //             console.log(error);

    //         }

    //     };

    //     search();

    // }, [key]);
 
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

            const res = await axios.put(`http://localhost:5000/user/` + user._id, updatedData);

            if (res.status === 200) {

                const userRes = await axios.get("http://localhost:5000/user/" + userId);

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
 
 

