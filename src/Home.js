import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './home.css';
export function Home() {
  const { username } = useParams();
  const [bucketList, setBucketList] = useState([]);
  const [vlogs, setVlogs] = useState([]);
  const [destname, setDestname] = useState();
  useEffect(() => {
    fetchBucketList();
    fetchVlogs();
  }, []);

  const fetchBucketList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4343/bucket_list/' + username);

      setBucketList(response.data.bucket_list);
    } catch (error) {
      console.error('Error fetching bucket list:', error);
    }
  };

  const fetchVlogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4343/vlogs');
      setVlogs(response.data.vlogs);
    } catch (error) {
      console.error('Error fetching vlogs:', error);
    }
  };

  const handleAddBucketListItem = async (destname) => {
    try {
      const response = await axios.post('http://127.0.0.1:4343/bucket_list', { username, destname });
      setBucketList([...bucketList, response.data]);
    } catch (error) {
      console.error('Error adding bucket list item:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="Inner-container">
        <nav>
          <span className="Logo">Wanderly !</span>
          <span className="username">{username}</span>
        </nav>

        <div class="Tagline-container">
          <span className="TagLine">Where Dreams Roam Free...</span>
          <span className="Tagline2">Explore Your Bucket List Destinations!</span>
        </div>

        <div class="Content-Container">
          <div className="left-side">
            <div className="Header">
              <h3 class="side-heading">Bucket List</h3>
              <button type="button" className="Link-btn">
                <Link to={`/add-bucketlist/${username}`} class="Link">Add Bucket List</Link>
              </button>
            </div>
            <div className="bucket-list">
              {
                bucketList.length > 0
                  ?
                  <ul className='List'>
                    {bucketList.map(item => (
                      <li key={item.id}>{item.destname}</li>
                    ))}
                  </ul>
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
            <div className="vlogs">
              <h3 class="side-heading">Vlogs</h3>
              <button type="button" className="Link-btn">
                <Link to="add-vlog" class="Link">Add Vlog</Link>
              </button>
              {vlogs.map(vlog => (
                <div className="vlog-card" key={vlog.id}>
                  <img className="vlog-image" src={vlog.image_url} alt={vlog.title} />
                  <div className='vlog-details'>
                    <h3>{vlog.title}</h3>
                    <h4>{vlog.destname} </h4>
                    <p>{vlog.description}</p>
                
                  </div>
                  

                  {/* Add more details as needed */}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




