import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios';
import { Link, useParams } from 'react-router-dom';
import userIcon from '../../../../Assets/img/registration/userIcon.jpeg';
import { customStateMethods } from '../../../protected/CustomAppState/CustomState';




export const ViewAssignedTest = () => {

    
    const {id:labId} = useParams();

    // fetching and storing all associated test and related category of the lab
    const [allAssociatedTest, setAllTest] = useState([]);

    // fetching & storing lab associated category data
    const [testCategoryData, setTestCategoryData] = useState([]);

    // fetching & storing test data list based on selected category 
    const [testData, setTestData] = useState([]);

    const [selectedTestCategoryId, setSelectedTestCategoryId] = useState('');

  

     // Additional State starts from here
     const token = customStateMethods.selectStateKey('appState', 'token');
     const [loading, setLoading] = useState(null);
     const [messages, setMessages] = useState(null);
     const [disable, setDisable] = useState(0);
     // ends here
 
 
     // Response data starts from here
 
 
         //////// List View Data starts from here
         const [listData, setListData] = useState({
             items: '',
             total: '',
             lastPage: '',
         });
         /////// ends here

 
     // Response Data ends here
 
 
     // Search Module state starts from here
     const [query, setQuery] = useState('');
     const [suggestions, setSuggestions] = useState([]);
     const [selected, setSelected] = useState(null);
     // ends here 
 
 
     // Pagination state starts from here
     const [currentPage, setCurrentPage] = useState(1);
     const [recordsPerPage, setRecordsPerPage] = useState(10);
     let totalRecords = listData.total;
     const totalPages = Math.ceil(totalRecords / recordsPerPage);   
     // ends here
 
 
 
 
     // UseEffects Order Starts from here
 
             //////// fetching list items for pagination based search starts here
             useEffect(() => {
                 try {
                     setLoading(customStateMethods.spinnerDiv(true));
                     axios.get('sanctum/csrf-cookie').then(response => {
                         axios.get(`/api/admin/view-all-test-lab/${labId}?page=${currentPage}&recordsPerPage=${recordsPerPage}`, {
                             headers: {
                                 Authorization: `Bearer ${token}`,
                             }
                         })
                             .then((res) => {
 
                                 if (res.data.status === 200) {
                                  // server has a key name data that's why using data.data
                                     setListData({
                                         items: res.data.data.tests,
                                         total: res.data.data.pagination.total,
                                         lastPage: res.data.data.pagination.last_page,
                                     });
                                     setAllTest(res.data.data);
                                     setTestCategoryData(res.data.data.categories);
                                     setMessages(customStateMethods.getAlertDiv(res.data.message));
                                 } else if(res.data.status === 204) {
                                     setListData({
                                         items: res.data.listData,
                                     });
                                 } else{
                                     setMessages(customStateMethods.getAlertDiv(res.data.message));
                                 }
                                 setLoading(false);
                             });
                     });
                 } catch (error) {
                     setLoading(false);
                     console.log(error);
                 }
 
                 clearMessages();
             }, [currentPage, recordsPerPage, disable]);
             //////// ends here
 
 
     // ends here
 

 
   
     // Functions Order Starts from here 
 
         /////// Pagination functions starts from here
 
          const getPageCount = () => {
             let pageCount = [];
             let startPage = currentPage - 1;
             if (startPage < 1) startPage = 1;
 
             let endPage = currentPage + 2;
             if (endPage > totalPages) endPage = totalPages;
 
             for (let i = startPage; i <= endPage; i++) {
                 pageCount.push(i);
             }
 
             return pageCount;
          };
 
          const handlePageClick = (page) => {
             setCurrentPage(page);
             console.log(page)
          };
 
          function handleRow(e){
             
             let value = parseInt(e.target.value, 10);
 
             if (!isNaN(value)) {
                 setRecordsPerPage(value);
             } else {
                 console.log("Invalid number selected");
             }
          }
 
         /////// Pagination functions ends here
 
 
         /////// Search Module Functions starts from here
 
           const handleSearch = async (e) => {
             setLoading(customStateMethods.spinnerDiv(true));
         
             const searchValue = e.target.value;
             setQuery(searchValue);
         
             // Fetching suggestions from the API
             if (searchValue.length > 1) {
         
               try {
         
                 const response = await axios.get(`/api/admin/lab-search?query=${searchValue}`, {
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
         
           const handleSuggestionClick = (id, phone, email, name, workDistrict) => {
             setSelected({ id, phone, email, name, workDistrict });
             setQuery(phone); // Updating the input field with the selected phone number
             setSuggestions([]); // Clearing suggestions
           };
         
 
         /////// Search Module Functions ends here
 
 
         /////// Disable & clear messages function starts here
 
         function handleDisable(id){
 
             try{
     
                 setLoading(customStateMethods.spinnerDiv(true));
     
                 axios.get('sanctum/csrf-cookie').then(response => {
                     axios.get(`/api/admin/disable-lab/${id}`,{
                         headers: {
                           Authorization: `Bearer ${token}`,
                         }
                       })
                       .then((res) => {
                            if(res.data.status === 200){
                         
                             setMessages(customStateMethods.getAlertDiv(res.data.message))
     
                             setDisable((prevData) => {
                                 let newState = 0;
                                 return prevData !== newState ? 0 : 1;
                             });
     
                            }else{
                             setMessages(customStateMethods.getAlertDiv(res.data.message))
                            }
                           if(res.data){
                             setLoading(false);
                           }
                       })
                 });
             }catch(error){
                 setLoading(false);
                 console.log(error);
             }
         }
 
         function clearMessages(){
             setTimeout(()=>{
                 setMessages('');
             },5000)
         }
 
         /////// Disable & clear function Ends here     
 


           
        /////// Handle Category Change function starts here

        const handleCategoryChange = (e) => {
            const categoryId = e.target.value;
            setSelectedTestCategoryId(categoryId);

            let payLoad = {
                'category_id': categoryId,
                'lab_id':labId,
            }

            if (categoryId) {
                setLoading(customStateMethods.spinnerDiv(true));
                axios.post(`api/admin/view-assigned-test/`, {payLoad}, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then((res) => {
                    setTestData(res.data); 
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
            }
        };

        /////// Handle Category Change function ends here


     // ends here
 
 
 
 
     // Custom JSX starts from here
 
           //////// Search Module Custom JSX starts from here
 
           let userCard = '';
           let suggestionJSX = '';
           let selectedOneItemJsx = '';
 
            if (suggestions && suggestions.length > 0) {
                userCard = suggestions.map(({ id, phone, email, name, district }) => (
                    <ul className="row list-group" key={id} onClick={() => handleSuggestionClick(id, phone, email, name, district)} style={{ cursor: 'pointer' }}>
                        <li className="list-group-item col-md-6 text-dark mt-3 mx-4">
                            <strong>Name:</strong> {name} | <strong>Phone:</strong> {phone} | <strong>District:</strong> {district}
                        </li>
                    </ul>
                ));
            } 
         
            if (!selected) {
                suggestionJSX = (
                    <p className='m-3 mx-4 text-dark'>No Suggestions...</p>
                );
            } else {
                suggestionJSX = '';
                selectedOneItemJsx = (
                    <tr key={selected.id}>
                    
                    </tr>
                );
            }
 
            //////// Search Module Custom JSX ends here
     
         



            //////// test data table list jsx starts here based on selected category
            let categoryBasedTestRow = '';
            if(testData){
                categoryBasedTestRow = testData.map((items, index)=>(
                        <tr key={items.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{items.name}</td>
                    
                            <td className='text-center'>
                                <Link onClick={handleDisable} className='btn btn-outline-danger btn-sm'>Remove Test</Link>
                            </td>
                        </tr>
                ))
            } 
            //////// test data table list jsx ends here based on selected category


            //////// All test data against the lab jsx starts here 
            let testRow = '';
            if(listData && listData.items){
                testRow = listData.items.map((items, i)=>(
                    <tr key={items.id}>
                        <td className='text-center'>{i + 1}</td>
                        <td className='text-center'>{items.name}</td>
                        <td className='text-center'>
                            <Link onClick={handleDisable} className='btn btn-outline-danger btn-sm'>Remove Test</Link>
                        </td>
                    </tr>
                ))
            }
        
          

            //////// jsx for select option to choose one test or surgery category 

            let SelectCategoryJsx = (
                <div className="form-group col-lg-8 mb-3">
                    <label htmlFor="category" className="form-label">Select Test Category</label>
                    <select
                        name="test_category_id"
                        className="form-select col-lg-5"
                        id="category"
                        value={selectedTestCategoryId}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select Category</option>
                        {testCategoryData?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

            )

            ///////// ends here
 
     // ends here




     return (
        <div>

                {/* loading UI starts here */}
                    {loading}
                    {messages}
                {/* ends here */}


                {/* Search module UI starts here  */}

                    <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search by phone or unique ID"
                    className="mx-4 form-control col-md-7 mt-3"
                    />

                
                    {userCard}
                    {suggestionJSX}
                

                    {
                        selected && (
                            <div className='row col-4 mt-4 mx-2'>
                                <div className='card'>
                                    <h4 className='mt-4 text-center'>Selected</h4>
                                    <p><strong>Email:</strong> {selected.email}</p>
                                    <p><strong>Location:</strong> {selected.workDistrict}</p>
                                    <p><strong>Phone:</strong> {selected.phone}</p>  
                                </div>

                            
                            </div>
                    
                        )       
                    }

                {/* Search module UI ends here */}




            {/* Selected lab / surgery category and data table UI starts here */}

            {SelectCategoryJsx}

            <div className="table-container col-lg-6">
            <h2 className="text-center mb-4">{allAssociatedTest && allAssociatedTest.lab_name }<span> : Complete Test Data</span></h2> {/* Table title */}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th className="col-1 text-center">S.No</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Remove Test</th>
                            </tr>
                        </thead>
                        <tbody>
                        {categoryBasedTestRow && categoryBasedTestRow.length > 0 ? categoryBasedTestRow : (testRow && testRow.length > 0 ? testRow : <tr><td colSpan="3" className="text-center">No tests available.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ends here */}

            
            {/* pagination UI starts from here */}

                <div className="container mt-3">

                    <div className='row no-gutters'>  {/* Add no-gutters class to eliminate gaps */}

                        <div className='drop-down col-lg-2'> {/* Removed mt-3 to avoid margin at the top */}
                            <select className="form-select" aria-label="Default select example" onClick={handleRow}>
                                <option defaultValue={"5"}>Select Row</option>
                                <option value="5">05</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="500">500</option> {/* Fixed duplicate value */}
                                <option value="1000">1000</option>
                            </select>
                        </div>

                        <div className='col-lg-6'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className={`${currentPage === 1 ? 'disabled' : 'active'}`}>
                                        <a className="page-link" onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}>Previous</a>
                                    </li>
                                    {getPageCount().map((page) => (
                                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                            <a className="page-link" onClick={() => handlePageClick(page)}>
                                                {page === getPageCount().length ? `...${page}` : page}
                                            </a>
                                        </li>
                                    ))}
                                    <li className={`${currentPage === totalPages ? 'disabled' : 'active'}`}>
                                        <a className="page-link" onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>

                    <p>
                    Note: Pagination is used to display all test data, 
                    <span style={{ color: 'blue' }}> not categorized data.</span>
                    </p>

                </div>

            {/* pagination UI ends here */}        
   
        </div>
    )
}
