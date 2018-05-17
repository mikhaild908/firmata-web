const express = require('express');
const path = require('path');
const Board = require('firmata');
var boardInitialized = false;
var onOrOff = false;
var board;

function setupBoard() {
    Board.requestPort(function(error, port) {
        if (error) {
            console.log(error);
            return;
        }
        else {
            console.log("Initializing...");
            console.log("Port: " + port.comName);
        }

        board = new Board(port.comName);

        board.on('ready', function() {
            console.log('board is ready...');
            boardInitialized = true;
        });
    });
}

setupBoard();

function router(nav, title) {
    const onOffRouter = express.Router();
    
    onOffRouter.route('/')
        .get((req, res) => {
            res.render('index', { nav, title, onOrOff: false });
        });
    
    onOffRouter.route('/on')
        .get((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.HIGH);
                onOrOff = true;
            }
            
            //res.send("On");
            res.render('index', { nav, title: title, onOrOff: onOrOff } );
        })
        .post((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.HIGH);
                onOrOff = true;
            }

            //res.send("On");
            res.render('index', { nav, title: title, onOrOff: onOrOff } );
        });
    
    onOffRouter.route('/off')
        .get((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.LOW);
                onOrOff = false;
            }

            res.render('index', { nav, title: title, onOrOff: onOrOff } );
        })
        .post((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.LOW);
                onOrOff = false;
            }

            res.render('index', { nav, title: title, onOrOff: onOrOff } );
        });

    return onOffRouter;
}

module.exports = router;