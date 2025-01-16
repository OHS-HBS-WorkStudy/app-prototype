import React, { useState, useEffect } from 'react';




const FullCircle = ({ score }) => {
  const radius = 40; // Radius of the semi-circle
  const centerScore = 90; // Baseline is always "Average."
  const maxScore = 180; // Cap total score to ±180.
  const normalizedScore = score % 90; // Score within the current 90° segment.
  const segment = Math.floor(score / 182); // Determines which 90° segment we are in (-2 to 2).

  // Calculate arc length for the current segment.
  const arcLength = (Math.abs(normalizedScore) / 90) * (Math.PI * radius);

  console.log(arcLength);





  const rotation = (segment); // Shift the arc when transitioning segments.
  console.log(rotation);
  console.log(segment);


  const rating = getRating(score);

  function getRating(score) {
    switch (true) {
      case score < 30:
        return 'Very Poor';
      case score < 55:
        return 'Poor';
      case score < 90:
        return 'Below Average';
      case score === 90:
        return 'Average';
      case score < 120:
        return 'Good';
      case score < 150:
        return 'Very Good';
      case score = 180:
        return 'Superior';
      default:
        return 'No Data';
    }
  }

  function getColor(rating) {
    switch (rating) {
      case 'Very Poor':
        return '#c22424';
      case 'Poor':
        return '#db3d3d';
      case 'Below Average':
        return '#eb9393';
      case 'Average':
        return '#a8dadc';
      case 'Good':
        return '#457b9d';
      case 'Very Good':
        return '#1d3557';
      case 'Superior':
        return '#ffd700';
      default:
        return '#d6d6d6';
    }
  }

  const colorChange = getColor(rating);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: 20,
        textAlign: 'center',
        transform: 'scale(1.25)',
      }}
    >
      <div style={{ position: 'relative', width: 200, height: 100 }}>
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {/* Base semi-circle */}
          <path
            d={`M ${50 - radius} 50 A ${radius} ${radius} 0 0 1 ${50 + radius} 50`}
            stroke="#b0b0b0"
            strokeWidth="11"
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Dynamic arc */}
          <path
            d={`M ${50 - radius} 50 A ${radius} ${radius} 0 ${
              normalizedScore >= 0 ? 0 : 1
            } 1 ${50 + (normalizedScore >= 0 ? 1 : -1) * radius} 50`}
            stroke={colorChange}
            strokeWidth="9"
            fill="transparent"
            strokeDasharray={`${arcLength} ${Math.PI * radius}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.2s ease' }}
          />
        </svg>

        {/* Centered Rating */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <div className="wa">
            <h3>{rating}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

function tryForScore() {
  try {
    const score1 = JSON.parse(sessionStorage.getItem("user")).score;
    return score1;
  } catch(error) {
    console.log("null")
    return null
  }
}

tryForScore();

const CredScore = (score1) => {
 
  
    const inflationScore = (parseInt(score1) + 90)
  const [score, setScore] = useState(inflationScore); // Start at the center.
  

  const increaseScore = () => {
    setScore((prevScore) => Math.min(180, prevScore + 10)); // Cap at 180.
  };

  const decreaseScore = () => {
    setScore((prevScore) => Math.max(0, prevScore - 10)); // Cap at 0.
  };


  return (
    <div className="cred-score">
      {/* <button onClick={increaseScore}>Increase Score</button>
      <button onClick={decreaseScore}>Decrease Score</button> */}
      {score !== undefined && score !== null ? (
        <div>
          <FullCircle score={score} />
        </div>
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
};




export default CredScore;

