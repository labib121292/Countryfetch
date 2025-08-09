import React from 'react';

function Country(props) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <img
        className="mx-auto mb-4 w-48 h-32 object-cover"
        src={props.flags.png}
        alt={`Flag of ${props.name.common}`}
      />
      <h2 className="text-xl font-semibold mb-2">{props.name.common}</h2>
      <p> Capital: {props.capital ? props.capital[0] : 'N/A'}</p>
      <p>Region: {props.region}</p>
      <p>Population: {props.population.toLocaleString()}</p>
    </div>
  );
}

export default Country;
