const request = require('request-promise-native');

// returns IP
const fetchMyIP = () => {
	return request('https://api.ipify.org?format=json');
	//{"ip":"24.57.167.162"}
};

// returns geo coordinates from IP
const fetchCoordsByIP = (body) => {
	const ip = JSON.parse(body).ip; // 24.57.167.162

	return request(`https://ipvigilante.com/json/${ip}`);
};

// returns flyover times from geo coordinates
const fetchISSFlyOverTimes = (body) => {
	const { latitude, longitude } = JSON.parse(body).data;
	// { latitude: 42.29490, longitude: -83.05200 }

	const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;

	return request(url);
	// object of an array of passover times
};

const printPassTimes = (passTimes) => {
	for (const pass of passTimes) {
		let datetime = new Date(0);
		datetime.setUTCSeconds(pass.risetime);

		const duration = pass.duration;
		console.log(`Next pass at ${datetime} for ${duration} seconds!`);
	}
};

const nextISSTimesForMyLocation = () => {
	return fetchMyIP()
		.then(fetchCoordsByIP)
		.then(fetchISSFlyOverTimes)
		.then((data) => {
			const { response } = JSON.parse(data);
			return response;
		});
};

module.exports = {
	fetchMyIP,
	fetchCoordsByIP,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation,
	printPassTimes,
};
