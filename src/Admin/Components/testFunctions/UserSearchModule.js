import React, { useState } from 'react';
import axios from 'axios';
import { customStateMethods } from '../../protected/CustomAppState/CustomState';

// Independent function to handle search
export const handleSearch = async (e, setQuery, setSuggestions, setLoading, setMessages) => {
    let token = customStateMethods.selectStateKey('appState', 'token');

    const searchValue = e.target.value;
    setQuery(searchValue);

    // If search query is longer than 1 character, fetch suggestions
    if (searchValue.length > 1) {
        setLoading(customStateMethods.spinnerDiv(true));

        try {
            const response = await axios.get(`/api/admin/auto-search-user?query=${searchValue}`, {
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
export const handleSuggestionClick = (email, phone, setSelected, setQuery, setSuggestions, setFetchRow) => {
    setSelected({ email, phone });
    setQuery(phone); // Set query to the selected phone number
    setSuggestions([]); // Clear the suggestions
    setFetchRow(true); // Trigger any additional action based on selection
};
