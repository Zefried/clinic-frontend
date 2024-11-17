import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearch = (token, apiUrl, paid) => {
  const [messages, setMessages] = useState('');
  const [loading, setLoading] = useState(false);

  // search states 
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  // api call and state management 
  const handleSearch = (e) => {
    setLoading(true);
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 1) {
      const searchUrl = `${apiUrl}?paid=${paid}&query=${searchValue}`; // Add both `paid` and `query` to URL
      axios
        .get(searchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSuggestions(response.data.suggestions);
          setMessages(response.data.message);
        })
        .catch((error) => {
          setSuggestions([]);
          setMessages('Error fetching suggestions');
          console.error('Error fetching suggestions:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id, phone, email, name, district) => {
    setSelected({ id, phone, email, name, district });
    setQuery(); // Reset input field after selection
    setSuggestions([]); // Clear suggestions
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (messages) {
      const timer = setTimeout(() => {
        setMessages('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Handle UI rendering inside the hook
  const suggestionUI = () => {
    if (loading) return <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;

    if (suggestions.length > 0) {
      return (
        <ul className="list-group m-3">
          {suggestions.map(({ id, phone, email, name, district }) => (
            <li key={id} className="list-group-item list-group-item-action" onClick={() => handleSuggestionClick(id, phone, email, name, district)}>
              <strong>{name}</strong> <br />
              <small>{phone} | {district}</small>
            </li>
          ))}
        </ul>
      );
    } else {
      return <p className="text-center mt-3">No results found</p>;
    }
  };

  const selectedItemUI = () => {
    if (selected) {
      return (
        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Selected Patient</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>District:</strong> {selected.district}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const messageUI = () => {
    if (messages) {
      return <div className="alert alert-info mt-3">{messages}</div>;
    }
    return null;
  };

  return {
    query,
    setQuery,
    suggestions,
    selected,
    handleSearch,
    handleSuggestionClick,
    suggestionUI,
    selectedItemUI,
    messageUI,
  };
};

export default useSearch;
