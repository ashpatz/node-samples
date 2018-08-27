'use strict';

const hugeJson = require('./huge_file.json');

module.exports.readFile = (request, response) => {

    console.log(request.get('Cookie'));

    const cookieOptions = {
        domain: '.example.com',
        path: '/admin',
        secure: true,
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    };

    response
        .status(200)
        .set('content-type', 'application/json')
        .cookie('AWSALB', 'sJ3zBtnffoC/HOIm1TfAhVYFDDBiPprvb/BrRtv1l/j2LOZTRXREnLKOumKKZMrH1PPlsNIxlxNinfr3TNQR1k+ncW0DxeGum+2XLuYtHCcQdFsVwYuYfvyP9zJR', cookieOptions)
        .send(hugeJson);

};