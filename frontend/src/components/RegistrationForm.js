import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomAlert from "./CustomAlert"; 
import "./RegistrationForm.css";

function RegistrationForm({ updateElections, signer, elections, contract }) {
  let { PremId } = useParams();
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [approved, setApproved] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 


  const closeAlert = () => {
    setShowAlert(false); 
    setAlertMessage("");
    setAlertType("");
  };

  const triggerAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true); 

    setTimeout(() => {
      closeAlert();
    }, 5000); 
  };

  const handleApproval = async () => {
    if (address && id) {
      try {
        const message = "user";
        const signature = await signer.signMessage(message);
        const response = await axios.post(
          "http://localhost:5000/api/register",
          { address, id, electionID: PremId, signature }
        );
        if (response.status === 201) {
          triggerAlert("Data submitted for approval.", "success");
        } else {
          triggerAlert(
            "Failed to submit data for approval. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        triggerAlert("An error occurred while submitting data for approval.", "error");
      }
    } else {
      triggerAlert("Please enter both Address and ID.", "error");
    }
  };

  // Function to check approval status
  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-approval`,
        {
          params: { address, id, electionID: PremId },
        }
      );
      if (response.data.approved) {
        setApproved(true);
        triggerAlert("User approved.", "success");
      } else {
        triggerAlert("User not approved yet.", "error");
      }
    } catch (error) {
      console.error(error);
      triggerAlert("An error occurred while checking approval status.", "error");
    }
  };

  // Function to handle registration after approval
  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const election = elections.find(
        (election) => election.id === parseInt(PremId)
      );
      if (!election) {
        triggerAlert("Election not found", "error");
        return;
      }

      const currentDate = new Date();
      const registrationStartDate = new Date(election.startDate * 1000);
      const registrationEndDate = new Date(election.endDate * 1000);

      if (
        !(
          currentDate >= registrationStartDate &&
          currentDate < registrationEndDate
        )
      ) {
        triggerAlert("User can only be added during registration period", "error");
        return;
      }
      const tx = await contract.registerVoterToElection(election.id);
      await tx.wait(); // Wait for transaction to be mined

      election.registeredUsers.push({
        address: signer.address,
        voted: false,
        registered: true,
      });
      updateElections(elections);

      triggerAlert("Registration successful on blockchain.", "success");
    } catch (error) {
      console.error(error);
      triggerAlert("An error occurred during registration.", "error");
    }
  };

  return (
    <div className="content">
      <div className="content-inner">
        <div className="form-container">
          <h2 className="title">Registration Form</h2>

          {showAlert && (
            <CustomAlert
              message={alertMessage}
              onClose={closeAlert}
              type={alertType}
            />
          )}

          <div className="form-group">
            <label htmlFor="address">MetaMask Wallet Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter MetaMask Wallet Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">ID No:</label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Enter ID No"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="approval-btn"
            onClick={handleApproval}
          >
            Submit for Approval
          </button>
          <button
            type="button"
            className="check-approval-btn"
            onClick={checkApprovalStatus}
          >
            Check Approval Status
          </button>
          {approved && (
            <button
              type="button"
              className="check-approval-btn"
              onClick={handleRegistration}
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
