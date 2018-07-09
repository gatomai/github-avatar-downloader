var request = require('request');
var secret = require('./secrets.js');


console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': secret.GITHUB_TOKEN
        }
      };
    
      request(options, function(err, res, body) {
        cb(err, body);
      });
      
    }

    getRepoContributors("jquery", "jquery", function(err, result) {
        console.log("Errors:", err);
        // console.log("Result:", result);
        var jres = JSON.parse(result);
        // console.log(jres);
        for (var prop in jres) {
            console.log("Key:" + prop);
            console.log("Value:" + jres[prop].avatar_url);
        }

      });