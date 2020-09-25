const express = require('express');

function openServer(app){
    app.listen('3000',()=>{
        console.log('Server started on port 3000');
    });
};

module.exports.openServer = openServer;