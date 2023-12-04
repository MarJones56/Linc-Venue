import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, Checkbox, Radio, RadioGroup, AccordionDetails, List, ListItem, ListItemText, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import 'moment-timezone';
import Header from './components/Header';

export default function AddActivity() {
  const { id } = useParams();
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedVenueLocation, setSelectedVenueLocation] = useState({
    city: '',
    state: ''
  });
  const [selectedVenueAddress, setSelectedVenueAddress] = useState('');
  const navigate = useNavigate();
  const [availability, setavailability] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityInfo, setActivityInfo] = useState('');
  const [timing, setTiming] = useState('');
  const [chargeable, setChargeable] = useState(false)
  const selectTimeslots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM','01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  const formattedTimeslots = selectTimeslots.map(timeslot => moment(timeslot, 'hh:mm A').format('hh:mm A'));
  const [showPopup, setShowPopup] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleActivityNameChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleActivityInfoChange = (event) => {
    setActivityInfo(event.target.value);
  };

  const handleavailabilityNameChange = (event) => {
    setavailability(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };

  const handleSelectedVenueChange = (event) => {
    const [id, location, address] = event.target.value.split('|');
    setSelectedVenue(id);
    setSelectedVenueLocation(location);
    setSelectedVenueAddress(address);
  };

  useEffect(() => {
    // Fetch venues from your backend API
    axios.get('http://localhost:5001/getallvenuesforselect')
      .then(res => {
        setVenues(res.data.venues); // Assuming your backend returns an array of venues
      })
      .catch(error => {
        console.error('Error fetching venues:', error);
      });
  }, []); 


  const PopupMessage = () => {
    return (
      <div className="popup">
        <p> Oops!! FILL OUT ALL FIELDS</p>
      </div>
    );
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(chargeable);
    if (!activityName || !activityInfo || !timing.length === 0 || !availability || !selectedVenue) {
      togglePopup();
      return;
    }
    console.log(selectedVenueLocation.city);
    console.log(user);
    console.log("BENJAMIN");
    axios.post('http://localhost:5001/addActivity',{
        name: activityName,
        venueid: selectedVenue,
        info:activityInfo,
        timeslot: timing,
        availability: availability,
        chargeable:chargeable,
        venueLocation: {
          city: selectedVenueLocation.city,
          state: selectedVenueLocation.state
        },
        venueAddress: selectedVenueAddress,
        current_user_id: user._id,
    }).then(res => {
        console.log(res)
        if (res.data.error){
            alert(res.data.error)
        } else {
          console.log("Successfully Addedd activity")
          navigate(`/dashboard`)
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}


  return (
    <div>
      <Header />
      <div className="add-venue-page">
      <div className="flex flex-col items-center justify-center h-screen bg-white p-3 rounded">
        <form onSubmit={handleSubmit} className="w-2/3 flex flex-col items-center">
          <h4 className="m-1 items-center">
            <b>Add a Activity!</b>
          </h4>
          <div className="centered-input mb-6">
            <label htmlFor='activity-name' className="block text-gray-700 font-bold mb-2">Activity Name:</label>
            <input
              id='activity-name'
              type='text'
              value={activityName}
              onChange={handleActivityNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="centered-input mb-6">
            <label htmlFor='activity-info' className="block text-gray-700 font-bold mb-2">Activity Info:</label>
            <input
              id='activity-info'
              type='text'
              value={activityInfo}
              onChange={handleActivityInfoChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="centered-input mb-6">
            <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">Acitivity's Venue:</label>
            <select
              id="venue"
              value={selectedVenue}
              onChange={(e) => {
                setSelectedVenue(e.target.value);
                // Assuming e.target.value contains the venue id
                const selectedVenue = venues.find((venue) => venue._id === e.target.value);
                setSelectedVenueLocation({
                  city: selectedVenue.location.city,
                  state: selectedVenue.location.state
                });

                // Assuming you want to set both venueAddress and current_user_id in state
                setSelectedVenueAddress(selectedVenue.address); // Assuming you have setVenueAddress function
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>Select Venue</option>
              {venues.map(venue => (
                <option key={venue._id} value={venue._id}>
                  {venue.name} - ({venue.type_of_venue})
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-6">
            <label className="block text-gray-70 font-bold mb-2">Venue:</label>
            <input
              id='venue' 
              type='text' 
              value={venue} 
              onChange={handleVenueChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />
          </div> */}
          {/* <div className="mb-6">
            <label className='block text-gray-700 font-bold mb-2'>Timing:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='timing'
              type="text"
              value={timing}
              onChange={handleTimingChange}
            />
          </div> */}
      <Accordion>
        <AccordionSummary className='m-6' expandIcon={<ExpandMoreIcon />}><b>Time Slot</b></AccordionSummary>
        <AccordionDetails>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={timing}
          onChange={handleTimingChange}
        >
          <List>
            {formattedTimeslots.map(value => {
              return (
                <ListItem key={value} className='p-0'>
                  <FormControlLabel value={value} control={<Radio />} label={value} />
                  {/* <ListItemText primary={value}/> */}
                </ListItem>
              );
            })}
          </List>
        </RadioGroup>
        </AccordionDetails>
      </Accordion>
          <div className="centered-input mb-6">
            <label className='block text-gray-700 font-bold mb-2'>Capacity:</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='availability'
              type="text"
              value={availability}
              onChange={handleavailabilityNameChange}
            />
          </div>
          <FormControlLabel control={<Checkbox className='bg-purple-600 hover:bg-purple-700 button-center' color='primary' checked={chargeable} onChange={(e) => setChargeable(e.target.checked)}/>} label="Chargable" />
          
          <div className="button-center" type="submit">
              <button className="button main-btn" type="submit" onClick={handleSubmit}>
                SUBMIT
              </button>

              {showPopup && <PopupMessage />}
            </div>
          {/* <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button> */}
        </form>
      </div>
    </div>
    </div>
  );
}