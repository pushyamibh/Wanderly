import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './statistics.css'
import { Bar } from 'react-chartjs-2';
import {Chart,CategoryScale, LinearScale, BarElement} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement)
export function Statistics() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4343/statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
      
    
      
      <div classname="stats">
      <h1>Statistics</h1>
      {statistics && (
        <div>
          {/* Render statistics data here */}
          <div>
            <h2>Average Rating</h2>
            <p>{statistics.average_rating}</p>
          </div>
          <div>
            <h2>User Vlog Counts</h2>
            <Bar
              data={{
                labels: Object.keys(statistics.user_vlog_counts),
                datasets: [
                  {
                    label: 'Number of Vlogs',
                    data: Object.values(statistics.user_vlog_counts),
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                    },
                  }],
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
