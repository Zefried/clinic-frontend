import React, { useState } from 'react';
import { handleSearch, handleSuggestionClick} from './AutoCopy';




/// Example of how to use in a component 

export const CompoBuilding = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState(null);


 // handleChange event to trigger the search
  const handleChange = (e) => {
    handleSearch(e, setQuery, setSuggestions, setLoading, setMessages);
  };

  return (
    <div>
      <h3>Compo Testing</h3>
      <label>Testing real-time character transfer (AutoSearch)</label>
      <br />
      <input type='text' name='searchBar'value={query} onChange={handleChange} placeholder="Search here..." />
      
      <div>
        {loading && <div>Loading...</div>}
        {messages}
      </div>

      <h4>Suggestions</h4>
      <ul>
        {Object.entries(suggestions).map(([uniqueId, phone], index) => (
          <li key={index} style={{ cursor: 'pointer' }} onClick={() =>
              handleSuggestionClick(uniqueId, phone, setSelected, setQuery, setSuggestions, () => {})
            } >
            {`Unique ID: ${uniqueId} | Phone: ${phone}`}
          </li>
        ))}
      </ul>

      {selected && (
        <div>
          <h4>Selected</h4>
          <p>Unique ID: {selected.uniqueId}</p>
          <p>Phone: {selected.phone}</p>
        </div>
      )}
    </div>
  );
};

export default CompoBuilding;
