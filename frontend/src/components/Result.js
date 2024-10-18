import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Result.css';

function Result({ elections }) {
    const { PremId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const election = elections.find(election => election.id === parseInt(PremId));
                if (!election) {
                    setErrorMessage("Election not found");
                    setCandidates([]);
                    return;
                }
                setCandidates(election.candidates);
                setErrorMessage('');
            } catch (error) {
                console.error(error);
                setErrorMessage("An error occurred while fetching candidates.");
                setCandidates([]);
            }
        };

        fetchCandidates();
    }, [PremId, elections]);

    if (!PremId || PremId <= 0 || PremId > elections.length) {
        return <div className="content">Invalid PremId</div>;
    }

    // Sorting candidates based on number of votes in descending order
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

    // Getting the winner (first candidate in the sorted array)
    const winner = sortedCandidates.length > 0 ? sortedCandidates[0] : null;

    return (
        <div className='content'>
        <div className='result-container'>
            <h2 className="result-title">Election Results</h2>
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
            {winner && (
                <div className="winner">
                    <h3>Winner</h3>
                    <p className="winner-text">Congratulations to <strong>{winner.name}</strong> (ID: {winner.id}) for winning with <strong>{winner.votes}</strong> votes!</p>
                </div>
            )}
            <div className="candidate-list">
                {sortedCandidates.length > 0 ? (
                    sortedCandidates.map(candidate => (
                        <div key={candidate.id} className="candidate-item">
                            <span className="candidate-id">Candidate ID: {candidate.id}</span>
                            <span className="candidate-name">Candidate Name: {candidate.name}</span>
                            <span className="candidate-votes">Votes: {candidate.votes}</span>
                        </div>
                    ))
                ) : (
                    <p>No candidates found.</p>
                )}
            </div>
        </div>
        </div>
    );
}

export default Result;
