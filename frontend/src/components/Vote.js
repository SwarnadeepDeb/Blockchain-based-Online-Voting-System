import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomAlert from "./CustomAlert"; 
import "./Vote.css";

function Vote({ updateElections, signer, elections, contract }) {
  const { PremId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("Hi there this is error!");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); 

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const election = elections.find(
          (election) => election.id === parseInt(PremId)
        );
        if (!election) {
          setErrorMessage("Election not found");
          return;
        }
        setCandidates(election.candidates);
      } catch (error) {
        console.error(error);
        setErrorMessage("Election not found");
      }
    };

    fetchCandidates();
  }, [PremId, elections]);

  const handleVote = async (candidateId) => {
    try {
      const signerAddress = await signer.getAddress();
      const election = elections.find(
        (election) => election.id === parseInt(PremId)
      );

      if (!election) {
        console.log("Election not found");
        return;
      }

      const currentDate = new Date();
      const votingStartDate = new Date(election.voteStartDate * 1000);
      const votingEndDate = new Date(election.voteEndDate * 1000);

      if (!(currentDate >= votingStartDate && currentDate < votingEndDate)) {
        console.log("Voting is only allowed during the voting period");
        return;
      }

      const userIndex = election.registeredUsers.findIndex(
        (user) => user.address === signerAddress
      );
      if (userIndex !== -1) {
        const tx = await contract.voteToElection(election.id, candidateId);
        await tx.wait(); 

        const candidate = election.candidates.find((c) => c.id === candidateId);
        candidate.votes++;
        election.registeredUsers[userIndex].voted = true;
        updateElections(elections);
        setErrorMessage("");
        showAlertWithMessage("Vote submitted successfully","success");
      } else {
        console.log("User not registered");
        return;
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while submitting your vote.");
      showAlertWithMessage("An error occurred while submitting your vote.","error");
    }
  };

  const showAlertWithMessage = (message,type) => {
    setAlertMessage(message);
    setAlertType(type)
    setShowAlert(true);
    setTimeout(() => {setShowAlert(false);setAlertMessage("")}, 3000); 
  };

  if (!PremId || PremId <= 0 || PremId > elections.length) {
    return <div className="content">Invalid PremId</div>;
  }

  return (
    <div className="content">
      <div className="content-inner">
        <div className="vote-container">
          {showAlert && (
            <CustomAlert
              message={alertMessage}
              onClose={() => setShowAlert(false)}
              type={alertType}
            />
          )}
          <h2>Vote for Your Candidate</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="candidate-list">
            {candidates.map((candidate) => (
              <button
                key={candidate.id}
                className="candidate-button"
                onClick={() => handleVote(candidate.id)}
              >
                {candidate.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vote;
