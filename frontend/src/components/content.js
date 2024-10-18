// import React, { useState, useEffect } from "react";
// import ElectionCard from "./ElectionCard";
// import "./Content.css";

// function Content({ filteredElections, signer }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const electionsPerPage = 6;

//   // Sort elections based on vote end date
//   const sortedElections = filteredElections.sort((a, b) => {
//     const now = Date.now();
//     const aEnded = a.voteEndDate < now;
//     const bEnded = b.voteEndDate < now;

//     if (aEnded && !bEnded) return 1; // a has ended, b has not ended
//     if (!aEnded && bEnded) return -1; // a has not ended, b has ended
//     return a.voteEndDate - b.voteEndDate; // both have same status, sort by nearest voting time
//   });

//   const indexOfLastElection = currentPage * electionsPerPage;
//   const indexOfFirstElection = indexOfLastElection - electionsPerPage;
//   const currentElections = sortedElections.slice(
//     indexOfFirstElection,
//     indexOfLastElection
//   );

//   const totalPages = Math.ceil(sortedElections.length / electionsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="outlet-content">
//       <div className="content-pagination">
//         <div className="content">
//           {currentElections.map((election) => (
//             <ElectionCard
//               key={election.id}
//               election={election}
//               signer={signer}
//             />
//           ))}
//         </div>
//         <div className="pagination">
//           <button
//             className="pagination-btn"
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           <span className="page-info">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="pagination-btn"
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Content;

import React, { useState, useEffect } from "react";
import ElectionCard from "./ElectionCard";
import Loader from "./Loader"; // Import the Loader component
import "./Content.css"; // Assuming this contains the VoteChain navbar styles

function Content({ filteredElections, signer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const electionsPerPage = 3;

  // Simulating loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    filteredElections.length === 0 ? setIsLoading(true) : setIsLoading(false)
  }, [filteredElections]);

  // Sort elections based on vote end date
  const sortedElections = filteredElections.sort((a, b) => {
    const now = Date.now();
    const aEnded = a.voteEndDate < now;
    const bEnded = b.voteEndDate < now;

    if (aEnded && !bEnded) return 1;
    if (!aEnded && bEnded) return -1;
    return a.voteEndDate - b.voteEndDate;
  });

  const indexOfLastElection = currentPage * electionsPerPage;
  const indexOfFirstElection = indexOfLastElection - electionsPerPage;
  const currentElections = sortedElections.slice(
    indexOfFirstElection,
    indexOfLastElection
  );

  const totalPages = Math.ceil(sortedElections.length / electionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  // Show wallet connection message if signer is not connected
  if (!signer) {
    return <Loader message="Please connect your wallet to continue." />;
  }
  // Show loader if the data is being fetched or filteredElections is empty
  if (isLoading && filteredElections.length === 0) {
    return <Loader message="We are using the testnet, so fetching data may take longer..." />;
  }



  // Show content if elections exist
  return (
    <div className="outlet-content">
      {filteredElections.length === 0 ? (
        <div className="no-data-message">
          <p>No elections available at the moment.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Content;
