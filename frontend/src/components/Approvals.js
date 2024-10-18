// import React, { useState } from 'react';
// import axios from 'axios';
// import './Approvals.css';

// const baseURL = "http://localhost:5000";

// function Approvals({ signer }) {
//   const [electionID, setElectionID] = useState('');
//   const [unapprovedRegistrations, setUnapprovedRegistrations] = useState(null);
//   const [unapprovedCandidates, setUnapprovedCandidates] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchUnapprovedRegistrations = async () => {
//     try {
//       const message = "Admin";
//       const signature = await signer.signMessage(message);

//       const response = await axios.get(`${baseURL}/api/unapproved`, {
//         params: { electionID, signature }
//       });
//       setUnapprovedRegistrations(response.data);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('An error occurred while fetching unapproved registrations.');
//     }
//   };

//   const fetchUnapprovedCandidates = async () => {
//     try {
//       const message = "Admin";
//       const signature = await signer.signMessage(message);

//       const response = await axios.get(`${baseURL}/api/unapproved-candidates`, {
//         params: { electionID, signature }
//       });
//       setUnapprovedCandidates(response.data);
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('An error occurred while fetching unapproved candidates.');
//     }
//   };

//   const handleApproveUser = async (address, id) => {
//     const message = "Admin";
//     const signature = await signer.signMessage(message);

//     try {
//       const response = await axios.post(`${baseURL}/api/approve`, {
//         address,
//         id,
//         electionID,
//         signature
//       });
//       if (response.status === 200) {
//         alert('User approved successfully.');
//         setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.address !== address || reg.id !== id));
//       } else {
//         setErrorMessage('Failed to approve user. Please try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('An error occurred while approving the user.');
//     }
//   };

//   const handleApproveCandidate = async (address, id) => {
//     const message = "Admin";
//     const signature = await signer.signMessage(message);

//     try {
//       const response = await axios.post(`${baseURL}/api/approve-candidate`, {
//         address,
//         id,
//         electionID,
//         signature
//       });
//       if (response.status === 200) {
//         alert('Candidate approved successfully.');
//         setUnapprovedCandidates(unapprovedCandidates.filter(cand => cand.address !== address || cand.id !== id));
//       } else {
//         setErrorMessage('Failed to approve candidate. Please try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('An error occurred while approving the candidate.');
//     }
//   };

//   return (
//     <div className="content">
//       <div className="content-inner">
//         <h2 className="title">Manage Approvals</h2>
//         <label className="label" htmlFor="electionID">Election ID:</label>
//         <input
//           className="input"
//           type="text"
//           id="electionID"
//           value={electionID}
//           onChange={(e) => setElectionID(e.target.value)}
//         />
//         <button onClick={fetchUnapprovedRegistrations} className="button fetch-button">Fetch Unapproved Registrations</button>
//         <button onClick={fetchUnapprovedCandidates} className="button fetch-button">Fetch Unapproved Candidates</button>
//         {errorMessage && (
//           <div className="error-message">{errorMessage}</div>
//         )}
//         <h3 className="sub-title">Unapproved Registrations</h3>
//         {unapprovedRegistrations !== null ? (
//           <ul className="list">
//             {unapprovedRegistrations.map(reg => (
//               <li className="list-item" key={`${reg.address}-${reg.id}`}>
//                 <div className="info">
//                   <span className="address">Address: {reg.address}</span>
//                   <span className="id">ID: {reg.id}</span>
//                 </div>
//                 <button className="button approve-button" onClick={() => handleApproveUser(reg.address, reg.id)}>Approve</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="message">No unapproved registrations to show.</p>
//         )}
//         <h3 className="sub-title">Unapproved Candidates</h3>
//         {unapprovedCandidates !== null ? (
//           <ul className="list">
//             {unapprovedCandidates.map(cand => (
//               <li className="list-item" key={`${cand.address}-${cand.id}`}>
//                 <div className="info">
//                   <span className="address">Address: {cand.address}</span>
//                   <span className="id">ID: {cand.id}</span>
//                 </div>
//                 <button className="button approve-button" onClick={() => handleApproveCandidate(cand.address, cand.id)}>Approve</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="message">No unapproved candidates to show.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Approvals;

import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert'; // Import the CustomAlert component
import './Approvals.css';

const baseURL = "http://localhost:5000";

function Approvals({ signer }) {
    const [electionID, setElectionID] = useState('');
    const [unapprovedRegistrations, setUnapprovedRegistrations] = useState(null);
    const [unapprovedCandidates, setUnapprovedCandidates] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Function to close the alert
    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
        setAlertType('');
    };

    // Function to show alert with automatic close
    const triggerAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);

        // Automatically close the alert after 5 seconds
        setTimeout(() => {
            closeAlert();
        }, 5000); // Adjust time as needed (5000 ms = 5 seconds)
    };

    const fetchUnapprovedRegistrations = async () => {
        try {
            const message = "Admin";
            const signature = await signer.signMessage(message);

            const response = await axios.get(`${baseURL}/api/unapproved`, {
                params: { electionID, signature }
            });
            setUnapprovedRegistrations(response.data);
            triggerAlert('Fetched unapproved registrations successfully.', 'success');
        } catch (error) {
            console.error(error);
            triggerAlert('An error occurred while fetching unapproved registrations.', 'error');
        }
    };

    const fetchUnapprovedCandidates = async () => {
        try {
            const message = "Admin";
            const signature = await signer.signMessage(message);

            const response = await axios.get(`${baseURL}/api/unapproved-candidates`, {
                params: { electionID, signature }
            });
            setUnapprovedCandidates(response.data);
            triggerAlert('Fetched unapproved candidates successfully.', 'success');
        } catch (error) {
            console.error(error);
            triggerAlert('An error occurred while fetching unapproved candidates.', 'error');
        }
    };

    const handleApproveUser = async (address, id) => {
        const message = "Admin";
        const signature = await signer.signMessage(message);

        try {
            const response = await axios.post(`${baseURL}/api/approve`, {
                address,
                id,
                electionID,
                signature
            });
            if (response.status === 200) {
                triggerAlert('User approved successfully.', 'success');
                setUnapprovedRegistrations(unapprovedRegistrations.filter(reg => reg.address !== address || reg.id !== id));
            } else {
                triggerAlert('Failed to approve user. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            triggerAlert('An error occurred while approving the user.', 'error');
        }
    };

    const handleApproveCandidate = async (address, id) => {
        const message = "Admin";
        const signature = await signer.signMessage(message);

        try {
            const response = await axios.post(`${baseURL}/api/approve-candidate`, {
                address,
                id,
                electionID,
                signature
            });
            if (response.status === 200) {
                triggerAlert('Candidate approved successfully.', 'success');
                setUnapprovedCandidates(unapprovedCandidates.filter(cand => cand.address !== address || cand.id !== id));
            } else {
                triggerAlert('Failed to approve candidate. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            triggerAlert('An error occurred while approving the candidate.', 'error');
        }
    };

    return (
        <div className="content">
            <div className="content-inner">
                <h2 className="title">Manage Approvals</h2>
                <label className="label" htmlFor="electionID">Election ID:</label>
                <input
                    className="input"
                    type="text"
                    id="electionID"
                    value={electionID}
                    onChange={(e) => setElectionID(e.target.value)}
                />
                <div className="button-group approvals-button">
                    <button onClick={fetchUnapprovedRegistrations} className="button fetch-button">Fetch Unapproved Registrations</button>
                    <button onClick={fetchUnapprovedCandidates} className="button fetch-button">Fetch Unapproved Candidates</button>
                </div>
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
                
                {/* Conditionally render CustomAlert when showAlert is true */}
                {showAlert && (
                    <CustomAlert
                        message={alertMessage}
                        onClose={closeAlert}
                        type={alertType}
                    />
                )}

                <div className="unapproved-section">
                    <h3 className="sub-title">Unapproved Registrations</h3>
                    {unapprovedRegistrations !== null ? (
                        <ul className="list">
                            {unapprovedRegistrations.map(reg => (
                                <li className="list-item" key={`${reg.address}-${reg.id}`}>
                                    <div className="info">
                                        <span className="address">Address: {reg.address}</span>
                                        <span className="id">ID: {reg.id}</span>
                                    </div>
                                    <button className="button approve-button" onClick={() => handleApproveUser(reg.address, reg.id)}>Approve</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="message">No unapproved registrations to show.</p>
                    )}
                </div>
                <div className="unapproved-section">
                    <h3 className="sub-title">Unapproved Candidates</h3>
                    {unapprovedCandidates !== null ? (
                        <ul className="list">
                            {unapprovedCandidates.map(cand => (
                                <li className="list-item" key={`${cand.address}-${cand.id}`}>
                                    <div className="info">
                                        <span className="address">Address: {cand.address}</span>
                                        <span className="id">ID: {cand.id}</span>
                                    </div>
                                    <button className="button approve-button" onClick={() => handleApproveCandidate(cand.address, cand.id)}>Approve</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="message">No unapproved candidates to show.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Approvals;
