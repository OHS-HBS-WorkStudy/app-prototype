import React, { useState, useEffect } from 'react';

const FullCircle = ({ score }) => {
  const radius = 40; // Radius of the semi-circle
  const centerX = 50; // Center X-coordinate of the SVG
  const centerY = 50; // Center Y-coordinate of the SVG
  const circumference = Math.PI * radius; // Total circumference of the semi-circle
  const maxScore = 180; // Maximum score
  const minScore = 0; // Minimum score

  // Normalize the score between 0 and 1
  const normalizedScore = (score - minScore) / (maxScore - minScore);
  const strokeLength = normalizedScore * circumference; // Map score to arc length

  // Get rating and color based on the score
  const rating = getRating(score);
  const colorChange = getColor(rating);

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
      case score <= 180:
        return 'Superior';
      default:
        return 'No data';
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: `1 1 auto`,
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
        >
          {/* Base semi-circle */}
          <path
            d={`M ${centerX - radius} ${centerY} 
               A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            stroke="#b0b0b0"
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Dynamic arc using stroke-dasharray */}
          <path
            d={`M ${centerX - radius} ${centerY} 
               A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            stroke={colorChange}
            strokeWidth="9"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${circumference - strokeLength}`}
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out, stroke 0.3s ease',
            }}
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
          <h3>{rating}</h3>
        </div>
      </div>
    </div>
  );
};

function tryForScore() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const score1 = user?.score ?? null;
    return score1;
  } catch (error) {
    console.error("Error retrieving user score:", error);
    return null;
  }
}

const CredScore = () => {
  const score1 = tryForScore();
  const inflationScore = score1 !== null ? parseInt(score1) + 90 : null;
  const [score, setScore] = useState(inflationScore);

  useEffect(() => {
    setScore(inflationScore);
  }, [inflationScore]);

  // Removed unused increaseScore and decreaseScore functions

  return (
    <div className="cred-score">
      {/* <button onClick={increaseScore}>Increase Score</button>
      <button onClick={decreaseScore}>Decrease Score</button> */}
      {score !== null ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FullCircle score={score} />
        </div>
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
};

export default CredScore;