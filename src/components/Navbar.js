import React from 'react';

const Navbar = ({ onRegionSelect, selectedRegion, onSearch }) => {
  const regions = [
    { name: "All Regions", code: "All" },
    { name: "Asia", code: "Asia" },
    { name: "Europe", code: "Europe" },
    { name: "Africa", code: "Africa" },
    { name: "Americas", code: "Americas" },
    { name: "Oceania", code: "Oceania" },
  ];

  const handleRegionClick = (region) => {
    onRegionSelect(region);
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-gray-300 text-xl sm:text-2xl font-bold text-center sm:text-left whitespace-nowrap">World Explorer</h1>
          
          <div className="flex flex-row items-center gap-2 sm:gap-4 flex-1 justify-center">
            <input
              type="text"
              placeholder="Search countries..."
              onChange={handleSearchChange}
              className="bg-gray-700 
              border border-gray-600
              border-1
              shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black w-full max-w-xs sm:w-48 md:w-64 px-3 py-2 rounded text-gray-300 text-sm"
            />
            
            <div className="flex items-center gap-2">
              <ul className="hidden md:flex space-x-4 text-sm font-medium">
                <li className="hover:text-yellow-300 cursor-pointer">Home</li>
                <li className="hover:text-yellow-300 cursor-pointer">Countries</li>
                <li className="hover:text-yellow-300 cursor-pointer">About</li>
                <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative group">
              <button className="bg-gradient-to-tl from-cyan-700 via-blue-500 to-indigo-600 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded text-sm whitespace-nowrap">
                {selectedRegion === 'All' ? 'Regions' : selectedRegion}
              </button>
              <ul className="absolute bg-gray-800 text-white w-40 shadow-lg p-2 hidden group-hover:block z-50 right-0">
                {regions.map((region) => (
                  <li key={region.code} className="py-1 hover:bg-gray-700">
                    <button 
                      onClick={() => handleRegionClick(region.code)}
                      className={`block w-full text-left px-2 py-1 rounded text-sm ${
                        selectedRegion === region.code ? 'bg-gray-600' : ''
                      }`}
                    >
                      {region.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
