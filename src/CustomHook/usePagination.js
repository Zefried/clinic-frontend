import { useState, useEffect } from 'react';
import axios from 'axios';
import { customStateMethods } from '../Admin/protected/CustomAppState/CustomState';

const usePagination = (initialUrl, token) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);


  // pagination state starts here 
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [listData, setListData] = useState([]);
  // ends here



  // pagination api call 
  useEffect(() => {
    setLoading(customStateMethods.spinnerDiv(true));

    axios.get('sanctum/csrf-cookie')
      .then(() => {
        return axios.get(`${initialUrl}?page=${currentPage}&recordsPerPage=${recordsPerPage}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then((response) => {
        const { data } = response;
        if (data.status === 200 && data.listData) {
          setListData(data.listData ?? []);  // Assigns an empty array if data.listData is null or undefined
          setTotalRecords(data.total ?? 0);  // Defaults to 0 if data.total is missing
          setMessages(customStateMethods.getAlertDiv(data.message));
        } else {
          setMessages(customStateMethods.getAlertDiv(data.message ?? 'No data available'));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, recordsPerPage, initialUrl, token]);
  // ends here



  // Clear message after 3 seconds
  useEffect(() => {
    if (messages) {
      const timer = setTimeout(() => {
        setMessages(null); // Clear message after 3 seconds
      }, 3000); // 3000 ms = 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    }
  }, [messages]); // Runs whenever `messages` change
  // ends here 


  // function starts here

    // Recalculate totalPages every time totalRecords changes
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

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

    const handlePageClick = (page) => setCurrentPage(page);

    const handleRow = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) setRecordsPerPage(value);
    };

  // ends here




  // pagination ui starts here
  const paginationUI = (
    <div className="container mt-5">
      <div className='drop-down mt-5'>
        <select className="form-select col-3" onChange={handleRow}>
          <option defaultValue={'5'}>Select Row</option>
          <option value="5">05</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}>Previous</a>
          </li>
          {getPageCount().map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <a className="page-link" onClick={() => handlePageClick(page)}>{page}</a>
            </li>
          ))}
          <li className={`${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}>Next</a>
          </li>
          {/* Add "Last Page" link */}
          <li className={`${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handlePageClick(totalPages)}>Last</a>
          </li>
        </ul>
      </nav>
    </div>
  );
  // ends here


  

  return {
    listData,
    loading,
    messages,
    paginationUI
  };
};

export default usePagination;
