import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UnfinishedActions.css'
const UnfinishedActions = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedVlog, setSelectedVlog] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4343/getUnfinishedActions');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching unfinished actions:', error);
            }
        };
        fetchData();
    }, []);

    const handleViewVlogs = (user) => {
        setSelectedUser(user);
    };


    const handleSubmitReview = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:4343/add-review', {
                username: selectedUser.username,
                destname: selectedVlog.destname,
                rating,
                comment
            });
            console.log('Review added:', response.data);
            setRating(0);
            setComment('');
            // Refresh the page to remove the vlog from unfinished actions
            window.location.reload();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };



    return (
        <div className='Unfinished-Actions-container'>
            <nav>
            <span className="Logo">Wanderly !</span>
            {/* <span className="username">{username}</span> */}
            </nav>
            <div className= "header-container">
            <h1 className='heading'>Unfinished Actions</h1>
            </div>
            
            <div className="users-container">
                <table className='users-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Unfinished Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='button-action' onClick={() => handleViewVlogs(user)}>Unfinished Actions</button>
                                    {/* {user.unfinished_actions.map((action, idx) => (
                    <button key={idx} >
                    <span>{action.title}</span>
                    </button>
                  ))} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div className="vlogs-container">
                    <h2>Vlogs</h2>
                    <div className="vlogs-list-container">
                        {selectedUser.unfinished_actions.map((action, idx) => (
                            <div className="vlog-action-card" key={idx}>
                                
                                <div className="first-half-vlog">
                                <img className="vlog-card-img" src={action.image_url} alt={action.title} />
                                </div>
                                <div className='vlog-card-details'>
                                    <h3 className="text-lg font-semibold">{action.name}</h3>
                                    <h3>{action.title}</h3>
                                    <h4>Destination: {action.destname}</h4>
                                    <h4>Budget: ${action.budget}</h4>
                                    <p>{action.description}</p>
                                    <button className="button-action" onClick={() => setSelectedVlog(action)}>Give Rating</button>
                                </div>
                                {selectedVlog && (
                                    <div className="review-section">
                                        <div className="rating-section">
                                            <label>Rating:</label>
                                            <input className="Rating-input"
                                                type="number"
                                                min="0"
                                                max="5"
                                                value={idx.rating}
                                                onChange={(e) => setRating(parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="comment-section">
                                            <label>Comment:</label>
                                            <textarea
                                                value={idx.comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <button className="button-action" onClick={handleSubmitReview}>Submit Review</button>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default UnfinishedActions;
