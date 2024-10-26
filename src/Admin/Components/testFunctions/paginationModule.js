import { useState } from 'react';
import { personal } from './PersonalData';

export const PaginationComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Number of records per page
  const totalRecords = personal.length; // Total number of records
  const totalPages = Math.ceil(totalRecords / recordsPerPage); // Calculate total pages

  // Function to get current records based on the current page
// Assuming values:
// personal = [/* array of 100 records */]
// currentPage = 3 (we are on page 3)
// recordsPerPage = 10 (each page shows 10 records)

const currentRecords = personal.slice(
  // Task 1: Calculate the starting index for the records on the current page
  // Since currentPage = 3 and recordsPerPage = 10:
  // (currentPage - 1) * recordsPerPage = (3 - 1) * 10 = 2 * 10 = 20
  // This means we start at index 20, which is the 21st record (0-based index).
  (currentPage - 1) * recordsPerPage, 
  
  // Task 2: Calculate the ending index (exclusive) for the records on the current page
  // currentPage * recordsPerPage = 3 * 10 = 30
  // So, slice will stop at index 30 (excluding index 30), meaning it will return records from index 20 to 29.
  currentPage * recordsPerPage
);



// Result: currentRecords will contain records from index 20 to 29 (21st to 30th record).

  // Function to generate the page numbers to display || Independent function 
  const getPageNumbers = () => {
    // Initialize an empty array to hold the page numbers
    const pageNumbers = [];

    // Calculate the start page
    // Task 1: Start by subtracting 2 from the currentPage.
    // Task 2: Ensure startPage is at least 1 (if it's less than 1, set it to 1).
    let startPage = currentPage - 2;

    // This if is only handling scenario where startPage is 0;
    if (startPage < 1) {
      startPage = 1;
    }

    // Calculate the end page
    // Task 3: Add 2 to the currentPage.
    // Task 4: Ensure endPage doesn't exceed totalPages (if it does, set it to totalPages).

    //Goal is to show only 3 items startPage is already 1 endPage should be 3 
    let endPage = currentPage + 2;
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // Task 5: Loop from startPage to endPage (inclusive) and push each page number into the array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Task 6: Return the array of page numbers
    return pageNumbers;
  };


  // Handle page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      {/* Display the current records */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}>
              Previous
            </a>
          </li>

      {/* Display the limited page numbers */}
        {getPageNumbers().map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <a className="page-link" onClick={() => handlePageClick(page)}>
                  {page}
                </a>
              </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}>
              Next
          </a>
        </li>
        </ul>
      </nav>
    </div>
  );
};
