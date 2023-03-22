import React, { useState } from 'react';

function WhoisSearch() {
  const [domainName, setDomainName] = useState('');
  const [whoisData, setWhoisData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://otx.alienvault.com/otxapi/indicator/domain/whois/${domainName}`
      );
      const data = await response.json();
      setWhoisData(data);
    } catch (error) {
      console.error(error);
    }
  };

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
    {whoisData && (
      <table>
        <thead>
          <tr>
            <th>Record</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(whoisData).map(([key, value]) => (
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


