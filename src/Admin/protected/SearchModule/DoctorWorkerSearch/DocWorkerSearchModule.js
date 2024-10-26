import React, { useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../CustomAppState/CustomState';


/// Doctor Worker search module 
/// Import in the component and use it
/// ensure to use 3 states query, search, selected


// Independent function to handle search
export const handleSearch = async (e, setQuery, setSuggestions, setLoading, setMessages) => {
    let token = customStateMethods.selectStateKey('appState', 'token');

    const searchValue = e.target.value;
    setQuery(searchValue);

    // If search query is longer than 1 character, fetch suggestions
    if (searchValue.length > 1) {
        setLoading(customStateMethods.spinnerDiv(true));

        try {
            const response = await axios.get(`/api/admin/search-users?query=${searchValue}`, {
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

// Independent function to handle clicking a suggestion
// receiving email, phone name, location 
// setting selected state name, email, phone, location

export const handleSuggestionClick = (email, name, phone, location, id, setSelected, setQuery, setSuggestions, setFetchRow) => {
    setSelected({ email, name, phone, location, id});
    setQuery(name); // Set query to the selected name
    setSuggestions([]); // Clear the suggestions

};
