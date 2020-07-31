//  * Makes a single API request to retrieve the user's IP address.
//  * Input: - A callback (to pass back an error or the IP string)
//  * Returns (via Callback): - An error, if any (nullable) - The IP address as a string (null if error). Example: "162.245.144.188"

const request = require('request');

const fetchMyIP = (callback) => {
	const url = 'https://api.ipify.org?format=json';

	request(url, (error, response, body) => {
		// error can be set if invalid domain, user is offline, etc.
		if (error) return callback(error, null);

		// if non-200 status, assume server error
		if (response.statusCode !== 200) {
			const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;

			callback(Error(msg), null);
			return;
		}

		const ip = JSON.parse(body).ip;
		callback(null, ip);
	});
};

//  * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
//  * Input: - The ip (ipv4) address (string) - A callback (to pass back an error or the lat/lng object)
//  * Returns (via Callback): - An error, if any (nullable) - The lat and lng as an object (null if error). Example: { latitude: '49.27670', longitude: '-123.13000' }

const fetchCoordsByIP = (ip, callback) => {
	const url = `https://ipvigilante.com/json/${ip}`;
	request(url, (error, response, body) => {
		if (error) return callback(error, null);

		if (response.statusCode !== 200) {
			const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;

			callback(Error(msg), null);
			return;
		}

		// const latitude = JSON.parse(body).data.latitude
		// const longitude = JSON.parse(body).data.longitude
		// const obj = {latitude: latitude, longitude: longitude}
		// const { latitude, longtidue } = JSON.parse(body).data

		const { latitude, longitude } = JSON.parse(body).data;
		callback(null, { latitude, longitude });
	});
};

//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
//  * Input: - An object with keys `latitude` and `longitude` - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback): - An error, if any (nullable) - The fly over times as an array of objects (null if error). Example: [ { risetime: 134564234, duration: 600 }, ... ]

const fetchISSFlyOverTimes = function (coords, callback) {
	const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

	request(url, (error, response, body) => {
		if (error) return callback(error, null);

		if (response.statusCode !== 200) {
			const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;

			callback(Error(msg), null);
			return;
		}

		const passes = JSON.parse(body).response;
		callback(error, passes);
	});
};

//  * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
//  * Input: - A callback with an error or results.
//  * Returns (via Callback): - An error, if any (nullable) - The fly-over times as an array (null if error): [ { risetime: <number>, duration: <number> }, ... ]

const nextISSTimesForMyLocation = (callback) => {
	// callback(error, fetchISSFlyOverTimes(fetchCoordsByIP(fetchMyIP(callback))));
	fetchMyIP((error, ip) => {
		if (error) {
			callback(error, null);
		}

		fetchCoordsByIP(ip, (error, coords) => {
			if (error) {
				callback(error, null);
			}

			fetchISSFlyOverTimes(coords, (error, passTimes) => {
				if (error) {
					callback(error, null);
				}

				callback(null, passTimes);
			});
		});
	});
};

console.log('iss.js ..');

module.exports = {
	fetchMyIP,
	fetchCoordsByIP,
	fetchISSFlyOverTimes,
	nextISSTimesForMyLocation,
};
