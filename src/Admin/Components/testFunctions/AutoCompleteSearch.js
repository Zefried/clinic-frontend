import React, { useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';

export const AutoCompleteSearch = () => {

  let token = customStateMethods.selectStateKey('appState', 'token');
 
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [fetch, setFetchRow] = useState(false);

  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState(null);

  const handleSearch = async (e) => {
    setLoading(customStateMethods.spinnerDiv(true));

    const searchValue = e.target.value;
    setQuery(searchValue);

    // Fetching suggestions from the API
    if (searchValue.length > 1) {

      try {

        const response = await axios.get(`/api/admin/auto-search?query=${searchValue}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        });

        setSuggestions(response.data.suggestions);
   
        setMessages(customStateMethods.getAlertDiv(response.data.message));

        setLoading(false);

      } catch (error) {
        setLoading(false);

        console.error('Error fetching suggestions:', error);
        setSuggestions([]); 
      }
    } else {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (uniqueId, phone) => {
    setSelected({ uniqueId, phone });
    setQuery(phone); // Updating the input field with the selected phone number
    setSuggestions([]); // Clearing suggestions
    setFetchRow(true);
  };

  if(fetch){
    console.log('call api');
    setFetchRow(false);
  }

  let text = '';

  if (suggestions && Object.keys(suggestions).length > 0) {
    text = Object.entries(suggestions).map(([uniqueId, phone]) => (
      <ul className=" row list-group" key={uniqueId} onClick={() => handleSuggestionClick(uniqueId, phone)} style={{ cursor: 'pointer' }}>
        <li className="list-group-item col-md-6 text-dark mt-1">Unique Id: {uniqueId} | <strong>Phone: {phone}</strong></li> 
      </ul>
    ));
  } else {
    text = <p className="blockquote">No suggestions</p>;
  }


  return (
    <div>
      {loading}
      {messages}

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by phone or unique ID"
        className="form-control col-md-7 mt-3"
      />
      <p className="text-warning mt-3">Suggestions...</p>
      <ul className="text-dark">{text}</ul>
    </div>
  );
};


