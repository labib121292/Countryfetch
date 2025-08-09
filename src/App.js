import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import Navbar from './components/Navbar';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map(country => (
          <Country key={country.cca3} {...country} />
        ))}
      </div>
    </>
  );
}

export default App;
