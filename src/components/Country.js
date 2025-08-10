import React, { useState } from 'react';

function Country(props) {
  const { onVisit, onWish, isVisited, isWished } = props;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const safeNameCommon = props.name && typeof props.name === 'object' ? props.name.common : props.name || 'Unknown';
  const safeFlagPng = props.flags && typeof props.flags === 'object' ? props.flags.png : props.flags || '';

  return (
    <div
      className={`shadow rounded p-4 text-center transition-all duration-300 ${
        isVisited 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
          : isWished
          ? 'bg-gradient-to-r from-orange-500 to-red-500'
          : 'bg-gradient-to-r from-blue-500 to-green-500'
      }`}
    >
      <img
        className="mx-auto mb-4 w-48 h-32 object-cover"
        src={safeFlagPng}
        alt={`Flag of ${safeNameCommon}`}
      />
      <h2 className="text-xl font-semibold mb-2">{safeNameCommon}</h2>
      <p> Capital: {props.capital ? props.capital[0] : 'N/A'}</p>
      <p>Region: {props.region}</p>
      <p>Population: {props.population ? props.population.toLocaleString() : 'N/A'}</p>
      {isVisited && (
        <p className="text-yellow-300 font-semibold text-sm mt-1">✓ Visited</p>
      )}
      {isWished && !isVisited && (
        <p className="text-yellow-300 font-semibold text-sm mt-1">❤ Wish</p>
      )}
      
      <div className="flex justify-center space-x-2 mt-4">
        <button 
          onClick={onVisit}
          disabled={isVisited}
          className={`font-bold py-2 px-3 rounded text-sm ${
            isVisited 
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          {isVisited ? 'Visited' : 'Visit'}
        </button>
        <button 
          onClick={onWish}
          disabled={isWished}
          className={`font-bold py-2 px-3 rounded text-sm ${
            isWished 
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700 text-white'
          }`}
        >
          {isWished ? 'Wished' : 'Wish'}
        </button>
        <button 
          onClick={toggleDetails}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded text-sm"
        >
          {showDetails ? 'Hide' : 'Detail'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 p-3 bg-gray-100 text-gray-800 rounded text-left text-sm">
          <h3 className="font-bold text-center mb-2">Country Details</h3>
          <p><strong>Official Name:</strong> {props.name && typeof props.name === 'object' ? props.name.official : 'N/A'}</p>
          <p><strong>Capital:</strong> {props.capital ? props.capital.join(', ') : 'N/A'}</p>
          <p><strong>Region:</strong> {props.region}</p>
          <p><strong>Subregion:</strong> {props.subregion || 'N/A'}</p>
          <p><strong>Population:</strong> {props.population ? props.population.toLocaleString() : 'N/A'}</p>
          <p><strong>Area:</strong> {props.area ? props.area.toLocaleString() + ' km²' : 'N/A'}</p>
          <p><strong>Languages:</strong> {props.languages ? Object.values(props.languages).join(', ') : 'N/A'}</p>
          <p><strong>Currencies:</strong> {props.currencies ? Object.values(props.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          <p><strong>Country Code:</strong> {props.cca3}</p>
        </div>
      )}
    </div>
  );
}

export default Country;
