// Create variables that reference other modules and packages
var request = require('request');
var secret = require('./secrets.js');

// Receive the parameters through argv
var args = process.argv.slice(2);

var owner = args[0];
var repo = args[1];

console.log('The owner is :' + owner + ' The Repo is: ' + repo);

// If no parameters are provided - throw an error and exit
if (owner === undefined || repo === undefined) {
    throw new Error('Owner and/or Repo not provided... EXITING');
}

console.log('Welcome to the GitHub Avatar Downloader');

// This function will take the Owner and Repo to access  GitHub and retrieve the JSON
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': secret.GITHUB_TOKEN
        }
    };

    request(options, function (err, res, body) {
        cb(err, body);
    });

}

// Using the retrieved JSON - iterate through the structure to retrieve the required Keys and values

getRepoContributors(owner, repo, function (err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    var jres = JSON.parse(result);
    // console.log(jres);
    for (var prop in jres) {
        // console.log("Key:" + prop);
        // console.log("Value:" + jres[prop].avatar_url);
        downloadImageByURL(jres[prop].avatar_url, './avatars/' + jres[prop].login);
    }
});


// Module to request the resource based on the avatar URL
function downloadImageByURL(url, filePath) {
    var request = require('request');
    var fs = require('fs');

    request.get(url)               // Note 1
        .on('error', function (err) {                                   // Note 2
            throw err;
        })
        .on('response', function (response) {                           // Note 3
            console.log('Response Status Code: ', response.statusCode);
        })
        .pipe(fs.createWriteStream(filePath));               // Note 4

}