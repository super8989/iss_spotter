const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
// 	if (error) {
// 		console.log(`It didn't work!`, error);
// 		return;
// 	}

// 	console.log(`It worked! Returned IP:`, ip);
// });

fetchCoordsByIP('24.57.167.162', (error, coords) => {
	if (error) {
		console.log(`It didn't work!`, error);
		return;
	}

	console.log(`It worked! Returned coords:`, coords);
});

console.log('index.js ...');
