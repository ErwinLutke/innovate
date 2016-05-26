//Script Controller | Komt op de client

function Controller(snake) {
    this.allowMove = false;
    this.lastCommand = ""; //je spawnt met direction naar rechts
    this.command = function(command) {
        // if(this.player == null) {
        //     alert("Please create a Controller before you give a command");
        // } else {
            if(command == "up" && this.lastCommand != "up") {
                this.lastCommand = "up";
                snake.direction = 2;
                this.allowMove = true;
            } else if(command == "down" && this.lastCommand != "down") {
                this.lastCommand = "down";
                this.allowMove = true;
                snake.direction = 3;
            } else if(command == "left" && this.lastCommand != "left") {
                this.lastCommand = "left";
                this.allowMove = true;
                snake.direction = 1;
            } else if(command == "right" && this.lastCommand != "right") {
                this.lastCommand = "right";
                this.allowMove = true;
                snake.direction = 0;
            }
        // }
    };
}

/*
Controller.prototype.command = function(command) {
    if(this.player == null) {
        alert("Please create a Controller before you give a command");
    } else {
        if(command == "up") {
            this.player.up();
        } else if(command == "down") {
            this.player.down();
        } else if(command == "left") {
            this.player.left();
        } else if(command == "right") {
            this.player.right();
        }
    }
}*/

function controls(params)
{
    params = params || null;
    if(params) {
        if(params == "up") {
            up();
        } else if(params == "down") {
            down();
        } else if(params == "left") {
            left();
        } else if(params == "right") {
            right();
        }
    }
    // body...
}



