import React, { useState, useEffect } from "react";
import ElectionCard from "./ElectionCard";
import Loader from "./Loader";
import "./Content.css";
// Make sure to include the CSS file

function Dashboard({ filteredElections, signer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Simulating loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    filteredElections.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [filteredElections]);

  // Filter the elections to only include those owned by the signer
  const ownedElections = filteredElections.filter(
    (election) => signer && election.owner === signer.address
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(ownedElections.length / itemsPerPage);

  // Calculate the starting and ending index of the elections to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentElections = ownedElections.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Show wallet connection message if signer is not connected
  if (!signer) {
    return <Loader message="Please connect your wallet to continue." />;
  }
  // Show loader if the data is being fetched or filteredElections is empty
  if (isLoading && filteredElections.length === 0) {
    return (
      <Loader message="We are using the testnet, so fetching data may take longer..." />
    );
  }
  return (
    <div className="outlet-content">
      <div className="content-pagination">
        <div className="content">
          {currentElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              signer={signer}
            />
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
