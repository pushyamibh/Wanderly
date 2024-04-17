import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./AddBucketlist.css"

export function AddBucketlist() {
  
  const { username } = useParams();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [minDestBudget, setMinDestBudget] = useState('');
  const [maxDestBudget, setMaxDestBudget] = useState('');
  const [minVlogBudget, setMinVlogBudget] = useState('');
  const [maxVlogBudget, setMaxVlogBudget] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [vlogs, setVlogs] = useState([]);
  const [destname,setDestname]= useState('');

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const tagsResponse = await axios.get('http://127.0.0.1:4343/tags');
      console.log(tagsResponse.data)
      setTags(tagsResponse.data.tag);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleAdd= async()=>{
    try {

      await axios.post('http://127.0.0.1:4343/bucket_list', { username, destname});
      
    } catch (error) {
      console.error('Adding to bucket list failed:', error);
    }
  };
  const handleFilter = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:4343/add-bucketlist/search', {
        selectedTag,
        minDestBudget,
        maxDestBudget,
        minVlogBudget,
        maxVlogBudget
      });
      console.log(selectedTag)
      setDestinations(response.data.destinations);
      setVlogs(response.data.vlogs);
    } catch (error) {
      console.error('Error fetching destinations and vlogs:', error);
    }
  };

  // useEffect(() => {
  //   fetchDestinationsAndVlogs();
  // }, [minDestBudget, maxDestBudget, minVlogBudget, maxVlogBudget]);

  return (
    <div className="Bucketlist-container">
        <nav>
          <span className="Logo">Wanderly !</span>
          <span className="username">{username}</span>
        </nav>
        <div className= "header-container">
          <h1 className='heading'>Bucket List</h1>
        </div>
        <div className='filter-container'>
        <input
            type="text"
            placeholder="Enter your Desired Destination"
            value={destname}
            onChange={(e) => setDestname(e.target.value)}
            
          />
           <button
          onClick={handleAdd} type="submit" className="button-feild">
          Let's Go!!
        </button>
        </div>
        <div className='filter-container'>
        <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="select-feild"
          >
            <option value="">Select Tag</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Min Dest. Budget"
            value={minDestBudget}
            onChange={(e) => setMinDestBudget(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Max Dest. Budget"
            value={maxDestBudget}
            onChange={(e) => setMaxDestBudget(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mr-2"
          />
           <input
            type="text"
            placeholder="Min Vlog Budget"
            value={minVlogBudget}
            onChange={(e) => setMinVlogBudget(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Max Vlog Budget"
            value={maxVlogBudget}
            onChange={(e) => setMaxVlogBudget(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mr-2"
          />
           <button
          onClick={handleFilter}
          className="button-feild"
        >
          Filter
        </button>

        </div>
        <div class="Content-Container">
          <div className="left-side">
            <div className="Header">
              <h3 class="side-heading">Destinations</h3>
        
            </div>
            <div className="destination-list">
              {
                destinations.length > 0
                  ?
                  destinations.map(destination => (
                    <div key={destination.id} className="destination-container">
                      <img className="dest-image" src={destination.image_url} alt={destination.title} />
                      <div className='destination-details'>
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                      <h4>{destination.country} ${destination.estimated_budget}</h4>
                      <p>{destination.description}</p>
                        </div>
                    </div>
                  ))
                  :
                  <span class="No-items">No Items Yet!</span>
              }
              {/* <input
          type="text"
          placeholder="Enter place"
          onChange={(e) => setDestname(e.target.value)}
        />
        <button onClick={() => handleAddBucketListItem(destname)}>Add</button> */}
            </div>

          </div>
          <div className="right-side">
            <div className="destination-list">
            <div className="Header">
              <h3 class="side-heading">Vlogs</h3>
              </div>
              {vlogs.map(vlog => (
                <div className="destination-container" key={vlog.id}>
                  <img className="dest-image" src={vlog.image_url} alt={vlog.title} />
                  <div className='destination-details'>
                  <h3>{vlog.title} </h3>
                  <h4>{vlog.destname},${vlog.budget}</h4>
                  <p>{vlog.description}</p>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
    </div>
  );
};

 
