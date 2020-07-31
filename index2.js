const {
	fetchMyIP,
	fetchCoordsByIP,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation,
	printPassTimes,
} = require('./iss_promised');

nextISSTimesForMyLocation()
	.then((body) => {
		printPassTimes(body);
		// pass the array to the function to print
	})
	.catch((error) => {
		console.log(`It didn't work:`, error.message);
	});

// fetchMyIP()
// 	.then(fetchCoordsByIP)
// 	.then(fetchISSFlyOverTimes)
// 	.then((body) => console.log(body));
