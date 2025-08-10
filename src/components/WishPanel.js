import React from 'react';

const WishPanel = ({ wishCountries }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 text-white rounded-lg p-3">
      <h3 className="text-sm font-semibold mb-2">Wish ({wishCountries.length})</h3>
      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
        {wishCountries.map(country => (
          <div 
            key={country.cca3 || country.id} 
            className="flex items-center bg-indigo-600 text-white px-2 py-1 rounded text-xs"
          >
            {country.flags && country.flags.png ? (
              <img
                className="w-5 h-3 object-cover mr-1 rounded"
                src={country.flags.png}
                alt={`Flag of ${country.name && country.name.common ? country.name.common : 'Unknown'}`}
              />
            ) : (
              <div className="w-5 h-3 mr-1 rounded bg-gray-400" />
            )}
            <span className="text-xs">{country.name && country.name.common ? country.name.common : 'Unknown'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishPanel;
