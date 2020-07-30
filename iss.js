/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = (callback) => {
	request('https://api.ipify.org?format=json', (error, response, body) => {
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

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = (ip, callback) => {
	request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
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

console.log('iss.js ..');

module.exports = { fetchMyIP, fetchCoordsByIP };
