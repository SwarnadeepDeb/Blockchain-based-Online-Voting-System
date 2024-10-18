// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./CandidateRegistration.css";

// function CandidateRegistrationForm({
//   updateElections,
//   signer,
//   elections,
//   contract,
// }) {
//   const { PremId } = useParams();
//   const [address, setAddress] = useState("");
//   const [id, setId] = useState("");
//   const [approved, setApproved] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Function to submit data for approval
//   const handleApproval = async () => {
//     if (address && id) {
//       try {
//         const message = "candidate";
//         const signature = await signer.signMessage(message);
//         const response = await axios.post(
//           "http://localhost:5000/api/register-candidate",
//           {
//             address,
//             id,
//             electionID: PremId,
//             signature,
//           }
//         );
//         if (response.status === 201) {
//           alert("Data submitted for approval.");
//         } else {
//           setErrorMessage(
//             "Failed to submit data for approval. Please try again."
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         setErrorMessage(
//           "An error occurred while submitting data for approval."
//         );
//       }
//     } else {
//       setErrorMessage("Please enter both Address and ID.");
//     }
//   };

//   // Function to check approval status
//   const checkApprovalStatus = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/check-candidate-approval`,
//         {
//           params: { address, id, electionID: PremId },
//         }
//       );
//       if (response.data.approved) {
//         setApproved(true);
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Candidate not approved yet.");
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("An error occurred while checking approval status.");
//     }
//   };

//   // Function to handle registration after approval
//   const handleRegistration = async (event) => {
//     event.preventDefault();
//     try {
//       const name = document.getElementById("name").value;
//       const party = document.getElementById("party").value;
//       const manifesto = document.getElementById("manifesto").value;
//       const age = document.getElementById("age").value;
//       const qualification = document.getElementById("qualification").value;

//       const election = elections.find(
//         (election) => election.id === parseInt(PremId)
//       );
//       if (!election) {
//         setErrorMessage("Election not found");
//         return;
//       }

//       const currentDate = new Date();
//       const registrationStartDate = new Date(election.startDate * 1000);
//       const registrationEndDate = new Date(election.endDate * 1000);

//       if (
//         !(
//           currentDate >= registrationStartDate &&
//           currentDate < registrationEndDate
//         )
//       ) {
//         setErrorMessage(
//           "Candidate can only be added during registration period"
//         );
//         return;
//       }

//       const tx = await contract.registerCandidateToElection(
//         election.id,
//         parseInt(age),
//         qualification,
//         name,
//         party,
//         manifesto
//       );
//       await tx.wait();

//       const candidate = {
//         name,
//         party,
//         manifesto,
//         age: parseInt(age),
//         qualification,
//         votes: 0,
//         id: election.candidates.length + 1,
//       };

//       election.candidates.push(candidate);
//       updateElections(elections);

//       setErrorMessage("");
//       alert("Candidate registered successfully 🎉");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("An error occurred while registering the candidate.");
//     }
//   };

//   if (!PremId || PremId <= 0 || PremId > elections.length) {
//     return <div className="content">Invalid PremId</div>;
//   }

//   return (
//     <div className="content">
//       <div className="content-inner">
//         <h2>Candidate Registration Form</h2>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <div className="form-group">
//           <label htmlFor="address">MetaMask Wallet Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             placeholder="Enter MetaMask Wallet Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="id">ID No:</label>
//           <input
//             type="text"
//             id="id"
//             name="id"
//             placeholder="Enter ID No"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//             required
//           />
//         </div>
//         <button type="button" className="approval-btn" onClick={handleApproval}>
//           Submit for Approval
//         </button>
//         <button
//           type="button"
//           className="check-approval-btn"
//           onClick={checkApprovalStatus}
//         >
//           Check Approval Status
//         </button>
//         {approved && (
//           <form
//             className="candidate-registration-form"
//             onSubmit={handleRegistration}
//           >
//             <div className="form-group">
//               <label htmlFor="name">Name:</label>
//               <input type="text" id="name" name="name" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="party">Party:</label>
//               <input type="text" id="party" name="party" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="manifesto">Manifesto:</label>
//               <textarea id="manifesto" name="manifesto" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="age">Age:</label>
//               <input type="number" id="age" name="age" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="qualification">Qualification:</label>
//               <input
//                 type="text"
//                 id="qualification"
//                 name="qualification"
//                 required
//               />
//             </div>
//             <button type="submit" className="check-approval-btn">
//               Register
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CandidateRegistrationForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./CandidateRegistration.css";

// function CandidateRegistrationForm({ updateElections, signer, elections, contract }) {
//   const { PremId } = useParams();
//   const [address, setAddress] = useState("");
//   const [id, setId] = useState("");
//   const [approved, setApproved] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleApproval = async () => {
//     if (address && id) {
//       try {
//         const message = "candidate";
//         const signature = await signer.signMessage(message);
//         const response = await axios.post(
//           "http://localhost:5000/api/register-candidate",
//           {
//             address,
//             id,
//             electionID: PremId,
//             signature,
//           }
//         );
//         if (response.status === 201) {
//           alert("Data submitted for approval.");
//         } else {
//           setErrorMessage("Failed to submit data for approval. Please try again.");
//         }
//       } catch (error) {
//         console.error(error);
//         setErrorMessage("An error occurred while submitting data for approval.");
//       }
//     } else {
//       setErrorMessage("Please enter both Address and ID.");
//     }
//   };

//   const checkApprovalStatus = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/check-candidate-approval`,
//         {
//           params: { address, id, electionID: PremId },
//         }
//       );
//       if (response.data.approved) {
//         setApproved(true);
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Candidate not approved yet.");
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("An error occurred while checking approval status.");
//     }
//   };

//   const handleRegistration = async (event) => {
//     event.preventDefault();
//     try {
//       const name = document.getElementById("name").value;
//       const party = document.getElementById("party").value;
//       const manifesto = document.getElementById("manifesto").value;
//       const age = document.getElementById("age").value;
//       const qualification = document.getElementById("qualification").value;

//       const election = elections.find((election) => election.id === parseInt(PremId));
//       if (!election) {
//         setErrorMessage("Election not found");
//         return;
//       }

//       const currentDate = new Date();
//       const registrationStartDate = new Date(election.startDate * 1000);
//       const registrationEndDate = new Date(election.endDate * 1000);

//       if (!(currentDate >= registrationStartDate && currentDate < registrationEndDate)) {
//         setErrorMessage("Candidate can only be added during registration period");
//         return;
//       }

//       const tx = await contract.registerCandidateToElection(
//         election.id,
//         parseInt(age),
//         qualification,
//         name,
//         party,
//         manifesto
//       );
//       await tx.wait();

//       const candidate = {
//         name,
//         party,
//         manifesto,
//         age: parseInt(age),
//         qualification,
//         votes: 0,
//         id: election.candidates.length + 1,
//       };

//       election.candidates.push(candidate);
//       updateElections(elections);

//       setErrorMessage("");
//       alert("Candidate registered successfully 🎉");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("An error occurred while registering the candidate.");
//     }
//   };

//   if (!PremId || PremId <= 0 || PremId > elections.length) {
//     return <div className="content">Invalid PremId</div>;
//   }

//   return (
//     <div className="form-container">
//       <h2 className="title">Candidate Registration Form</h2>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <div className="form-group">
//         <label htmlFor="address" className="label">MetaMask Wallet Address:</label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           className="input"
//           placeholder="Enter MetaMask Wallet Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="id" className="label">ID No:</label>
//         <input
//           type="text"
//           id="id"
//           name="id"
//           className="input"
//           placeholder="Enter ID No"
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           required
//         />
//       </div>
//       <div className="button-group">
//         <button type="button" className="fetch-button" onClick={handleApproval}>
//           Submit for Approval
//         </button>
//         <button type="button" className="fetch-button check-approval-btn" onClick={checkApprovalStatus}>
//           Check Approval Status
//         </button>
//       </div>
//       {approved && (
//         <form onSubmit={handleRegistration}>
//           <div className="form-group">
//             <label htmlFor="name" className="label">Name:</label>
//             <input type="text" id="name" name="name" className="input" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="party" className="label">Party:</label>
//             <input type="text" id="party" name="party" className="input" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="manifesto" className="label">Manifesto:</label>
//             <textarea id="manifesto" name="manifesto" className="input" required></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="age" className="label">Age:</label>
//             <input type="number" id="age" name="age" className="input" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="qualification" className="label">Qualification:</label>
//             <input type="text" id="qualification" name="qualification" className="input" required />
//           </div>
//           <div className="button-group">
//             <button type="submit" className="fetch-button">Register</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default CandidateRegistrationForm;
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomAlert from './CustomAlert'; // Import your custom alert
import "./CandidateRegistration.css";

function CandidateRegistrationForm({ updateElections, signer, elections, contract }) {
  const { PremId } = useParams();
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [approved, setApproved] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
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

  const handleApproval = async () => {
    if (address && id) {
      try {
        const message = "candidate";
        const signature = await signer.signMessage(message);
        const response = await axios.post(
          "http://localhost:5000/api/register-candidate",
          {
            address,
            id,
            electionID: PremId,
            signature,
          }
        );
        if (response.status === 201) {
          triggerAlert("Data submitted for approval.", "success");
        } else {
          triggerAlert("Failed to submit data for approval. Please try again.", "error");
        }
      } catch (error) {
        console.error(error);
        triggerAlert("An error occurred while submitting data for approval.", "error");
      }
    } else {
      triggerAlert("Please enter both Address and ID.", "warning");
    }
  };

  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-candidate-approval`,
        {
          params: { address, id, electionID: PremId },
        }
      );
      if (response.data.approved) {
        setApproved(true);
        triggerAlert("Candidate approved.", "success");
      } else {
        triggerAlert("Candidate not approved yet.", "warning");
      }
    } catch (error) {
      console.error(error);
      triggerAlert("An error occurred while checking approval status.", "error");
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const name = document.getElementById("name").value;
      const party = document.getElementById("party").value;
      const manifesto = document.getElementById("manifesto").value;
      const age = document.getElementById("age").value;
      const qualification = document.getElementById("qualification").value;

      const election = elections.find((election) => election.id === parseInt(PremId));
      if (!election) {
        triggerAlert("Election not found", "error");
        return;
      }

      const currentDate = new Date();
      const registrationStartDate = new Date(election.startDate * 1000);
      const registrationEndDate = new Date(election.endDate * 1000);

      if (!(currentDate >= registrationStartDate && currentDate < registrationEndDate)) {
        triggerAlert("Candidate can only be added during the registration period", "warning");
        return;
      }

      const tx = await contract.registerCandidateToElection(
        election.id,
        parseInt(age),
        qualification,
        name,
        party,
        manifesto
      );
      await tx.wait();

      const candidate = {
        name,
        party,
        manifesto,
        age: parseInt(age),
        qualification,
        votes: 0,
        id: election.candidates.length + 1,
      };

      election.candidates.push(candidate);
      updateElections(elections);

      triggerAlert("Candidate registered successfully 🎉", "success");
    } catch (error) {
      console.error(error);
      triggerAlert("An error occurred while registering the candidate.", "error");
    }
  };

  if (!PremId || PremId <= 0 || PremId > elections.length) {
    return <div className="content">Invalid PremId</div>;
  }

  return (
    <div className="form-container">
      <h2 className="title">Candidate Registration Form</h2>
      <div className="form-group">
        <label htmlFor="address" className="label">MetaMask Wallet Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          className="input"
          placeholder="Enter MetaMask Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="id" className="label">ID No:</label>
        <input
          type="text"
          id="id"
          name="id"
          className="input"
          placeholder="Enter ID No"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <button type="button" className="fetch-button" onClick={handleApproval}>
          Submit for Approval
        </button>
        <button type="button" className="fetch-button check-approval-btn" onClick={checkApprovalStatus}>
          Check Approval Status
        </button>
      </div>
      {approved && (
        <form onSubmit={handleRegistration}>
          <div className="form-group">
            <label htmlFor="name" className="label">Name:</label>
            <input type="text" id="name" name="name" className="input" required />
          </div>
          <div className="form-group">
            <label htmlFor="party" className="label">Party:</label>
            <input type="text" id="party" name="party" className="input" required />
          </div>
          <div className="form-group">
            <label htmlFor="manifesto" className="label">Manifesto:</label>
            <textarea id="manifesto" name="manifesto" className="input" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="age" className="label">Age:</label>
            <input type="number" id="age" name="age" className="input" required />
          </div>
          <div className="form-group">
            <label htmlFor="qualification" className="label">Qualification:</label>
            <input type="text" id="qualification" name="qualification" className="input" required />
          </div>
          <div className="button-group">
            <button type="submit" className="fetch-button">Register</button>
          </div>
        </form>
      )}
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={closeAlert}
          type={alertType}
        />
      )}
    </div>
  );
}

export default CandidateRegistrationForm;
