import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import Navbar from './components/Navbar';
import VisitedPanel from './components/VisitedPanel';
import WishPanel from './components/WishPanel';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [wishCountries, setWishCountries] = useState([]);

  // Backend API base URL
  const API_BASE = 'http://localhost:5000';

  useEffect(() => {
    // Fetch all countries
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));

    // Fetch visited countries from backend (only cca3 codes)
    fetch(`${API_BASE}/visited`)
      .then(res => res.json())
      .then(data => {
        // Extract cca3 codes
        const cca3List = data.map(country => country.cca3);
        setVisitedCountries(cca3List);
      })
      .catch(err => console.error('Error fetching visited countries:', err));

    // Fetch wish countries from backend (only cca3 codes)
    fetch(`${API_BASE}/wish`)
      .then(res => res.json())
      .then(data => {
        // Extract cca3 codes
        const cca3List = data.map(country => country.cca3);
        setWishCountries(cca3List);
      })
      .catch(err => console.error('Error fetching wish countries:', err));
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCountryVisit = (country) => {
    const isAlreadyVisited = visitedCountries.includes(country.cca3);
    
    if (!isAlreadyVisited) {
      // POST to backend
      fetch(`${API_BASE}/visited`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cca3: country.cca3,
          name: country.name.common,
          flag_url: country.flags.png
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add visited country');
        setVisitedCountries(prev => [...prev, country.cca3]);
      })
      .catch(err => console.error(err));
    }
  };

  const handleCountryWish = (country) => {
    const isAlreadyWished = wishCountries.includes(country.cca3);
    
    if (!isAlreadyWished) {
      // POST to backend
      fetch(`${API_BASE}/wish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cca3: country.cca3,
          name: country.name.common,
          flag_url: country.flags.png
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add wish country');
        setWishCountries(prev => [...prev, country.cca3]);
      })
      .catch(err => console.error(err));
    }
  };

  const filteredCountries = countries.filter(country => {
    const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = searchQuery === '' || 
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Map cca3 codes to full country objects for visited and wish lists
  const visitedCountryObjects = visitedCountries
    .map(cca3 => countries.find(c => c.cca3 === cca3))
    .filter(Boolean);

  const wishCountryObjects = wishCountries
    .map(cca3 => countries.find(c => c.cca3 === cca3))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Navbar */}
      <Navbar 
        onRegionSelect={handleRegionSelect} 
        selectedRegion={selectedRegion}
        onSearch={handleSearch}
      />
      
      {/* Main content area with proper flow */}
      <div className="pt-20 sm:pt-20 md:pt-20 lg:pt-20 xl:pt-20">
        {/* Responsive panels section */}
        <div className="bg-black bg-opacity-50 rounded-lg shadow-md">
          <div className="container mx-auto px-2 sm:px-4 py-3">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <VisitedPanel visitedCountries={visitedCountryObjects} />
              <WishPanel wishCountries={wishCountryObjects} />
            </div>
          </div>
        </div>

        {/* Countries section with proper spacing */}
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCountries.map(country => (
              <Country 
                key={country.cca3} 
                {...country} 
                onVisit={() => handleCountryVisit(country)}
                onWish={() => handleCountryWish(country)}
                isVisited={visitedCountries.includes(country.cca3)}
                isWished={wishCountries.includes(country.cca3)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
