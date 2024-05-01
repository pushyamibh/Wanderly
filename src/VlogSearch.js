import React, { useState } from 'react';
import axios from 'axios';
import './Vlogsearch.css';

const VlogSearch = () => {
  const [formData, setFormData] = useState({
    tagName: '',
    destinationName: '',
    minReviewRating: ''
  });

  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4343/VlogSearch/search', formData);
      console.log(response.data.vlogs)
      setVlogs(response.data.vlogs);
    } catch (error) {
      console.error('Error fetching vlogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-color">
      <div className="vlogsearch-container">
      <nav>
          <span className="Logo">Wanderly !</span>
          
        </nav>
        <div className= "vlog-header-container">
          <h1 className='heading'>Vlog Search</h1>
        </div>
        <div className='vlog-filter-container'>
        <div>
          <input
            type="text"
            name="tagName"
            placeholder="Tag Name"
            value={formData.tagName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="destinationName"
            placeholder="Destination Name"
            value={formData.destinationName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="minReviewRating"
            placeholder="Min Review Rating"
            value={formData.minReviewRating}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          </div>
        </div>
        <div>
        <div class="vlog-Content-Container">
              
              <h3>Vlog Search Results</h3>
              </div> 
              
              {vlogs.map(vlog => (
                <div className="vlog-container" key={vlog.id}>
                  <img className="vlog-image" src={vlog.image_url} alt={vlog.title} />
                  <div className='vlog-details'>
                  <h3>{vlog.title} </h3>
                  <h4>{vlog.destname} </h4>
                  <h3>Rating: {vlog.avg_rating}</h3>
                  <p>{vlog.description}</p>
                  
                  </div>
                </div>
                
              ))}
             
              
        </div>
      </div>
    </div>
    
  );
};

export default VlogSearch;
