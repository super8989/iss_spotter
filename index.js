const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
	if (error) {
		console.log(`It didn't work!`, error);
		return;
	}

	console.log(`It worked! Returned IP:`, ip);
});

fetchCoordsByIP('24.57.167.162', (error, coords) => {
	if (error) {
		console.log(`It didn't work!`, error);
		return;
	}

	console.log(`It worked! Returned coords:`, coords);
});

const localCoords = { latitude: '42.29490', longitude: '-83.05200' };

fetchISSFlyOverTimes(localCoords, (error, passTimes) => {
	if (error) {
		console.log(`It didn't work!`, error);
		return;
	}

	console.log(`It worked! Returned flyover times:`, passTimes);
});

console.log('index.js ...');
