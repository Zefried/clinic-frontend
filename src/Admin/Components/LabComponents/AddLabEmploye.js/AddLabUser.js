import React from 'react'
import { useState } from 'react';
import { handleSearch, handleSuggestionClick } from '../../../protected/SearchModule/AutoCopy';

export const AddLabUser = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState(null);

    const [loading, setLoading] = useState(null);
    const [messages, setMessages] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'lab-billing',
        associatedLab:{
            unique_lab_id:'',
            lab_phone:'',
        }
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
       const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        console.log('Searched item:',  selected);
        // Handle form submission (e.g., send data to an API)
       };

       // handleChange event to trigger the search
        const handleChangeSearch = (e) => {
            handleSearch(e, setQuery, setSuggestions, setLoading, setMessages);
        };

    
  return (
    <div>

        {/* search bar  */}
        <h3>Search Associated Lab First</h3>
        <div className='searchBarDiv d-flex'>
            <input type='text' name='searchBar' placeholder='search lab' onChange={handleChangeSearch} className='form-control col-lg-5'/>
            <i class="bi bi-search mx-2"  style={{ fontSize: '24px' }} ></i>
        </div>


        <div>
        {loading && <div>Loading...</div>}
        {messages}
        </div>

        <ul>
            {Object.entries(suggestions).map(([uniqueId, phone], index) => (
            <li class="col-md-6 text-dark mt-3" key={index} style={{ cursor: 'pointer' }} onClick={() =>
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


        {/* adding employee information */}
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input
                    disabled
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    placeholder="Enter your role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2">Add Employee</button>
            </form>
        </div>

    </div>
  )
}
