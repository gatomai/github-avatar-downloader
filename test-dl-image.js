function downloadImageByURL(url, filePath) {
    var request = require('request');
    var fs = require('fs');

    request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')               // Note 1
        .on('error', function (err) {                                   // Note 2
            throw err;
        })
        .on('response', function (response) {                           // Note 3
            console.log('Response Status Code: ', response.statusCode);
        })
        .pipe(fs.createWriteStream('./avatars/kvirani.jpg'));               // Note 4

}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")