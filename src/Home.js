import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './home.css';
export function Home() {
  const { username } = useParams();
  const [bucketList, setBucketList] = useState([]);
  const [vlogs, setVlogs] = useState([]);
  const [destname, setDestname] = useState();
  const [selectedDestName, setSelectedDestName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
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

  const handleBucketListItemClick = async (destname) => {
    try {
      const response = await axios.post('http://127.0.0.1:4343/selected-vlogs', { destname });
      setVlogs(response.data.vlogs);
      setSelectedDestName(destname);
    } catch (error) {
      console.error('Error fetching vlogs:', error);
    }
  };

  const handleAddReview = async (username, destname, rating, comment,index) => {
    try {
      if (!rating) {
        console.error('Please provide a rating');
        return;
      }
      if (!comment) {
        console.error('Please provide a comment');
        return;
      }

      // Assuming you have an API endpoint to add reviews
      await axios.post('http://127.0.0.1:4343/add-review', {
        username,
        destname,
        rating,
        comment
      });
      setVlogs(prevVlogs => {
        const updatedVlogs = [...prevVlogs];
        updatedVlogs[index].comment = '';
        updatedVlogs[index].rating = 0;
        return updatedVlogs;
      });
  
      setRating(0);
      setComment('');
      // Refresh vlogs after adding a review
      if (!selectedDestName) {
        await fetchVlogs();
      } 
      else {
      await handleBucketListItemClick(selectedDestName);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  // Function to handle change in rating input
  // const handleRatingChange = (event) => {
  //   setRating(parseInt(event.target.value));
  // };
  const handleRatingChange = (event, index) => {
    // const { value } = event.target;
    setRating(parseInt(event.target.value));
    // setVlogs(prevVlogs => {
    //   const updatedVlogs = [...prevVlogs];
    //   updatedVlogs[index].rating = value;
    //   return updatedVlogs;
    // });
  };

  // Function to handle change in comment input
  // const handleCommentChange = (event) => {
  //   setComment(event.target.value);
  // };
  const handleCommentChange = (event, index) => {
    // const { value } = event.target;
    setComment(event.target.value);
    // setVlogs(prevVlogs => {
    //   const updatedVlogs = [...prevVlogs];
    //   updatedVlogs[index].comment = value;
    //   return updatedVlogs;
    // });
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
              {bucketList.length > 0 ? (
                <ul className="List">
                  {bucketList.map(item => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="bucket-list-item-btn"
                        onClick={() => handleBucketListItemClick(item.destname)}
                      >
                        {item.destname}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="No-items">No Items Yet!</span>
              )}


              {/* {
                bucketList.length > 0
                  ?
                  <ul className='List'>
                    {bucketList.map(item => (
                      <li key={item.id}>{item.destname}</li>
                    ))}
                  </ul>
                  :
                  <span class="No-items">No Items Yet!</span>
              } */}


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

                <Link to={`/add-vlog/${username}`} class="Link">Add Vlog</Link>

              </button>
              {vlogs.map((vlog,index) => (
                <div className="vlog-card" key={index}>
                  <div className='first-half'>
                    <img className="vlog-image" src={vlog.image_url} alt={vlog.title} />
                    <textarea
                      className="comment-box"
                      placeholder="Add your comment..."
                      value={vlog.comment}  // Use vlog.comment instead of comment
                      onChange={(event) => handleCommentChange(event, index)}
                    />
                    <button
                      className="comment-button"
                      onClick={() => handleAddReview(vlog.username, vlog.destname, rating, comment,index)}>
                      Add Comment
                    </button>
                  </div>

                  <div className='vlog-details'>
                    <h3>{vlog.title}</h3>
                    <h3>{vlog.username}</h3>
                    <h4>{vlog.destname} </h4>
                    <p>{vlog.description}</p>
                    <div className='Rating'>
                      <div className='rating-container-1'>
                        <div className="rating-backend">Rating: {vlog.avg_rating}</div>
                        <div className="stars">
                          {[...Array(5)].map((star, index) => (
                            <span key={index} className={index < vlog.avg_rating ? "filled-star" : "empty-star"}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="rating-container-2">
                        <span>Your Rating:</span>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          className='your-rating'
                          value={vlog.rating}  // Use vlog.rating instead of rating
                          onChange={(event) => handleRatingChange(event, index)} 
                        />
                      </div>


                    </div>
                    {/* Display other comments */}
                    <div className="other-comments">
                      {/* Show only first two comments by default */}
                      {vlog.comments && vlog.comments.slice(0, 2).map(comment => (
                        <div key={comment.id} className="comment">
                          <p>{comment.text}</p>
                          {/* Button to expand all comments */}
                          {vlog.comments.length > 2 && (
                            <button className="expand-button">Expand</button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add more details as needed */}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




