import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './ConnectWallet.css';

function ConnectWallet({ updateSetState, updateConnected, connected, updateElections }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_registrationStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_registrationEnd",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_electionStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_electionEnd",
          "type": "uint256"
        }
      ],
      "name": "createElection",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "elections",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "candidatesCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "registrationStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "registrationEnd",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "electionEnd",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "electionStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "winnerId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "findElectionOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "qualification",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "party",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "manifesto",
              "type": "string"
            }
          ],
          "internalType": "struct Ballot.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getElections",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "winnerId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "candidatesCount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "registrationStart",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "registrationEnd",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "electionStart",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "electionEnd",
              "type": "uint256"
            }
          ],
          "internalType": "struct Ballot.ElectionData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getVoters",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "registered",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "voted",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "voterAddress",
              "type": "address"
            }
          ],
          "internalType": "struct Ballot.Voter[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "noOfElections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_qualification",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_party",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_manifesto",
          "type": "string"
        }
      ],
      "name": "registerCandidateToElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "registerVoterToElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_candidateId",
          "type": "uint256"
        }
      ],
      "name": "voteToElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        '0x6cc5b39416b1F521f8EFd517C6Fc97b03af4336C', // Contract address
        abi,
        signer
      );

      console.log(contract);

      updateSetState({ provider, signer, contract });
      updateConnected(true);
      setWalletAddress(accounts[0]);

      // Store the necessary state in localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', accounts[0]);
      localStorage.setItem('contractAddress', '0x4f469587e57f713172c984c00d81b820cf481011');

      setLoading(false);
    } catch (error) {
      console.error(error);
      updateSetState({
        provider: null,
        signer: null,
        contract: null
      });
      updateElections([]);
      updateConnected(false);
    }
  };

  const disconnectWallet = async () => {
    updateSetState({
      provider: null,
      signer: null,
      contract: null
    });
    updateElections([]);
    updateConnected(false);

    // Clear the localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('contractAddress');

    setWalletAddress('');
  };

  // Check localStorage on component mount to restore connection state
  useEffect(() => {
    const walletConnected = localStorage.getItem('walletConnected');
    const walletAddress = localStorage.getItem('walletAddress');

    if (walletConnected === 'true' && walletAddress) {
      connectWallet()
    }
  }, [connected]);

  return (
    <div className='landing-page'>
      {connected ? (
        <>
          <h1>Welcome, Voter!</h1>
          <p className='wallet-address'>Wallet Address: {walletAddress}</p>
          <button className='button disconnect-button' onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <>
          <h1>Welcome to VoteChain</h1>
          <p className='info-text'>
            Connect your wallet to participate in the upcoming elections. We are using the Sepolia test network to ensure a secure and seamless voting experience. By connecting your wallet, you'll be able to vote in various elections, track results, and more.
          </p>
          {loading ? (
            <p className='loading-text'>Connecting...</p>
          ) : (
            <button className='button connect-button' onClick={connectWallet}>Connect Wallet</button>
          )}
        </>
      )}
    </div>
  );
}

export default ConnectWallet;
