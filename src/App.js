import React, { useState } from 'react';
import '../src/styles.css';

function WhoisSearch() {
  const [domainName, setDomainName] = useState('');
  const [whoisData, setWhoisData] = useState(null);
  const [show, setShow] = useState(10); // Added state for the number of entries to show
  const [search, setSearch] = useState(''); // Added state for search query

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://otx.alienvault.com/otxapi/indicator/domain/whois/${domainName}`
      );// handleSubmit function fetches api with try/catch arguement
      const data = await response.json();
      setWhoisData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowChange = (e) => {
    setShow(parseInt(e.target.value));
  };// allows user to change the entries displayed, 
  //show updates useState withthe selected variable the user choses

  const handleSearchChange = (e) => {
    setSearch(e.target.value);// allows search queries in the secondary search bar
  };

  const filteredData = whoisData
    ? Object.entries(whoisData).filter(([key, value]) =>
        key.toLowerCase().includes(search.toLowerCase()) ||
        value.toLowerCase().includes(search.toLowerCase())
      )
    : []; //allows WhoIsData to be filtered based on the search
// the UI components for the Page .
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a domain name:
          <input
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        <label htmlFor="show">Show</label>
        <select name="show" id="show" value={show} onChange={handleShowChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>entries</span>
      </div>
      <div className='form'>
        <input type="text" className='search' placeholder="Search" value={search} onChange={handleSearchChange} />
      </div>
      {whoisData && (
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, show).map(([key, value]) => (// allows only a certain number of entries and creates a array only showing the key value pairs.
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default WhoisSearch;
// issue is that the api sends a bad request (404).
// therefore i cannot impliment table features unless I know the information is displaying correctly

// debug steps taken: 

//1. asessed whether the api url actually works. result: it does

//2. assessed how the api url functions in its original form without ${domainName} 
//result: messes up code

// Debugging next steps:
//to access the api documentation and check whether i have the correct permissions or if it needs to be updated.



