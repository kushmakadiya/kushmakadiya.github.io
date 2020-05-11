var can;
var c;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioC = null;

var game;

var frame;

window.onload = function(){
    can = document.getElementById("can");
    can.height = Math.min(window.innerHeight, window.innerWidth * 2) * 0.9;
    can.width = can.height / 2;
    c = can.getContext("2d");

    loopStarted = false;
    can.addEventListener("mousedown", function(e){
        if(game.reseting){
            return;
        }
        if(audioC === null){
            audioC = new AudioContext();
            var notes = new Notes(audioC);
            game.setNotes(notes);
        }
        var rect = can.getBoundingClientRect();
        var x = (e.clientX - rect.left) / can.width;
        var y = (e.clientY - rect.top) / can.height;
        game.input(x, y);
    });
/*
    this.can.addEventListener("touchstart", function(e){
        if(game.reseting){
            return;
        }
        if(audioC === null){
            audioC = new AudioContext();
            var notes = new Notes(audioC);
            game.setNotes(notes);
        }
        var rect = can.getBoundingClientRect();
        var x = (e.clientX - rect.left) / can.width;
        var y = (e.clientY - rect.top) / can.height;
        game.input(x, y);
    })
*/
    game = new Game();

    frame = 0;
    loop();
}


window.onresize = function(){
    can.height = Math.min(window.innerHeight, window.innerWidth * 2) * 0.9;
    can.width = can.height / 2;
    c = can.getContext("2d");
}

window.ondeviceorientation = function(){
    can.height = Math.min(window.innerHeight, window.innerWidth * 2) * 0.9;
    can.width = can.height / 2;
    c = can.getContext("2d");
}


function loop(){
    c.clearRect(0, 0, can.width, can.height);

    game.update();
    game.render(c, can.width, can.height, frame);

    frame++;
    requestAnimationFrame(loop);
}



function Notes(audioC){
    this.oscillators = [];
    this.gains = [];
    for(var i=1;i<=88;i++){
        this.oscillators.push(audioC.createOscillator());
        this.gains.push(audioC.createGain())
        this.oscillators[i-1].connect(this.gains[i-1]);
        this.gains[i-1].connect(audioC.destination);
        this.oscillators[i-1].frequency.value = Math.pow(Math.pow(2, 1/12), i-49) * 440;
        this.gains[i-1].gain.value = 0;
        this.oscillators[i-1].start();
    }

    this.update = function(){
        for(var i=0;i<this.gains.length;i++){
            this.gains[i].gain.value = Math.max(this.gains[i].gain.value * 0.95, 0);
            if(this.gains[i].gain.value < 0.1){
                this.gains[i].gain.value = 0;
            }
        }
    }

    this.playNote = function(n){
        this.gains[n].gain.value = 1;
    }
}


function Game(){
    this.tilesAmount = 30;
    this.rows = 4;
    this.tiles = [];
    for(var i=0;i<this.tilesAmount;i++){
        this.tiles.push(new Tile(Math.floor(Math.random() * this.rows), Math.floor(Math.random() * 10 + 30)));
    }
    this.top = 1;
    this.speed = 0;
    this.notes = null;
    this.atTile = 0;
    this.reseting = false;

    this.setNotes = function(notes){
        this.notes = notes;
    }

    this.update = function(){
        this.top += this.speed;
        if(this.notes != null){
            this.notes.update();
        }

        if(this.atTile % this.tilesAmount == 0){
            if(this.top > this.tilesAmount + 3){
                for(var i=0;i<this.tiles.length;i++){
                    this.tiles[i].played = false;
                }
                this.top = -1;
            }
        }

        if(this.atTile % this.tilesAmount < this.top - 3.95 && !this.tiles[this.atTile % this.tilesAmount].played){
            if(this.reseting){
                this.top -= 0.1;
            }else{
                this.reseting = true;
                this.speed = 0;
                this.tiles[this.atTile % this.tilesAmount].failed = true;
                window.setTimeout(function(){
                    game.reset();
                }, 2000);
            }
        }
    }

    this.render = function(c, width, height, frame){
        for(var i=0;i<this.tiles.length;i++){
            this.tiles[i].render(c, this.top - i, width/this.rows, height/4, frame);
        }

        c.strokeStyle = "rgba(255, 255, 255, 0.5)";
        c.lineWidth = 2;
        for(var i=1;i<this.rows;i++){
            c.beginPath();
            c.moveTo(Math.round(can.width * (i / this.rows)), 0);
            c.lineTo(Math.round(can.width * (i / this.rows)), can.height);
            c.stroke();
        }

        c.fillStyle = "#ff6262";
        c.textAlign = "center";
        c.font = "30px Arial";
        c.fillText(this.atTile, can.width/2, can.height * 0.05);

        if(this.speed == 0 && !this.reseting){
            this.tiles[0].renderTap(c, this.top, width/this.rows, height/4, frame);
        }
    }

    this.reset = function(){
        this.tiles = [];
        for(var i=0;i<this.tilesAmount;i++){
            this.tiles.push(new Tile(Math.floor(Math.random() * this.rows), Math.floor(Math.random() * 10 + 30)));
        }
        this.top = 1;
        this.speed = 0;
        this.atTile = 0;
        this.reseting = false;
    }

    this.input = function(x, y){
        if(this.tiles[this.atTile % this.tilesAmount].left < x*this.rows && this.tiles[this.atTile % this.tilesAmount].left + 1 > x*this.rows){
            this.notes.playNote(this.tiles[this.atTile % this.tilesAmount].n);
            this.tiles[this.atTile % this.tilesAmount].played = true;
            this.atTile++;

            if(this.speed == 0){
                this.speed = 0.005;
            }else{
                this.speed += 0.002;
            }
        }else{
            this.reseting = true;
            this.speed = 0;
            this.tiles[this.atTile % this.tilesAmount].failed = true;
            window.setTimeout(function(){
                game.reset();
            }, 2000);
        }
    }
}


function Tile(left, n){
    this.left = left;
    this.n = n;
    this.played = false;
    this.failed = false;

    this.render = function(c, top, width, height, frame){
        if(this.failed){
            c.fillStyle = "#ff4262";
            if(frame % 30 < 15){
                c.fillRect(Math.round(this.left * width), Math.round(top * height), Math.ceil(width), Math.ceil(height));
            }
        }else{
            if(this.played){
                c.fillStyle = "rgba(0, 0, 0, 0.2)";
            }else{
                c.fillStyle = "#000000";
            }
            c.fillRect(Math.round(this.left * width), Math.round(top * height), Math.ceil(width), Math.ceil(height));
        }
    }

    this.renderTap = function(c, top, width, height, frame){
        c.fillStyle = "#FFFFFF";
        c.textAlign = "center";
        c.font = "30px Arial";
        c.fillText("tap", Math.round(this.left * width + width/2), Math.round(top * height + height/2));
    }
}