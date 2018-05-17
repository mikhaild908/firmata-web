const express = require('express');
const path = require('path');
const Board = require('firmata');
var boardInitialized = false;
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

function router(nav) {
    const onOffRouter = express.Router();
    const title = 'Firmata Web';
    
    onOffRouter.route('/')
        .get((req, res) => {
            res.render('index', { nav, title });
        });
    
    onOffRouter.route('/on')
        .get((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.HIGH);
            }
            res.send("On");
        })
        .post((req, res) => {
            res.send("On");
            if(boardInitialized) {
                board.digitalWrite(13, board.HIGH);
            }
        });
    
    onOffRouter.route('/off')
        .get((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.LOW);
            }
            res.send("Off");
        })
        .post((req, res) => {
            if(boardInitialized) {
                board.digitalWrite(13, board.LOW);
            }
            res.send("Off");
        });

    return onOffRouter;
}

module.exports = router;