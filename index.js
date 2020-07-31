const {
	fetchMyIP,
	fetchCoordsByIP,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation,
} = require('./iss');

// // returns the IP
// fetchMyIP((error, ip) => {
// 	if (error) {
// 		console.log(`It didn't work!`, error);
// 		return;
// 	}
// 	console.log(`It worked! Returned IP:`, ip);
// });

// // returns the geo coordinates from IP
// fetchCoordsByIP('24.57.167.162', (error, coords) => {
// 	if (error) {
// 		console.log(`It didn't work!`, error);
// 		return;
// 	}
// 	console.log(`It worked! Returned coords:`, coords);
// });

// const localCoords = { latitude: '42.29490', longitude: '-83.05200' };

// // returns an arary of objects with duration and flyover times
// fetchISSFlyOverTimes(localCoords, (error, passTimes) => {
// 	if (error) {
// 		console.log(`It didn't work!`, error);
// 		return;
// 	}
// 	console.log(`It worked! Returned flyover times:`, passTimes);
// });

const printPassTimes = (passTimes) => {
	for (const pass of passTimes) {
		const datetime = new Date(0);
		datetime.setUTCSeconds(pass.risetime);

		const duration = pass.duration;

		console.log(`Next pass at ${datetime} for ${duration} seconds!`);
	}
};

// takes in multiple callbacks to print flyover times
nextISSTimesForMyLocation((error, passTimes) => {
	if (error) {
		return console.log(`It didn't work!`, error);
	}
	printPassTimes(passTimes);
});

console.log('index.js ...');
