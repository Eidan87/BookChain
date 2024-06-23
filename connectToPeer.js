const WebSocket = require('ws');

const connectToPeers = (peers) => {
  peers.forEach(peerAddress => {
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts) {
      try {
        const ws = new WebSocket(peerAddress);
        console.log(peerAddress);
      } catch (error) {
        if (error.code === 'ETIMEDOUT') {
          console.log(`Connection timed out to peer ${peerAddress}. Retrying...`);
          attempt++;
          setTimeout(() => {
            connectToPeers(peers); // Recursively call the function after a delay
          }, 1000);
        } else {
          console.error(`Error connecting to peer ${peerAddress}: ${error}`);
          break;
        }
      }
    }

    if (attempt >= maxAttempts) {
      console.log(`Maximum attempts reached. Peer ${peerAddress} may be down.`);
    }
  });
};


module.exports = connectToPeers;
