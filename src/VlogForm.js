import React, { useState } from 'react';
import { Link , useParams} from 'react-router-dom'; // Import Link
import axios from 'axios'; // Import Axios
import "./VlogForm.css";
const VlogForm = () => {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    username:username,
    destinationName: '',
    title: '',
    description: '',
    imageUrl: '', 
    tag: '',
    budget: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddVlog = () => {
    axios.post('http://localhost:4343/vlogs', formData) // Send form data to the backend
      .then(response => {
        console.log(response.data); // Log response from the backend
        // Optionally, reset form data after successful submission
        setFormData({
          username: username,
          destinationName: '',
          title: '',
          description: '',
          imageUrl: '', // Reset imageUrl field
          tag: '',
          budget: ''
        });
      })
      .catch(error => {
        console.error('Error adding vlog:', error);
      });
  };

  return (
    <div className='container'>
      <h1>Add Vlog</h1>
      <div>
        <label htmlFor="destinationName">Destination Name:</label>
        <input
          type="text"
          id="destinationName"
          name="destinationName"
          value={formData.destinationName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="budget">Budget:</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          required
        />
      </div>
      <button onClick={handleAddVlog}>Add Vlog</button>
      <Link to="/vlogsearch"><button>VlogSearch</button></Link>
    </div>
  );
};
export default VlogForm;
