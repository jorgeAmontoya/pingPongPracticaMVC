//se crea el objeto,  pizarron
debugger;
// modelo
(function(){
// como si fuera un constructor
     self.Board=function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];   // barras a la orilla del juego
        this.ball = null;
    }
    self.Board.prototype = {

        get elements(){
            var elements = this.bars;
            //elements.Push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }
    self.Bar.prototype = {
        down:function(){
            this.y += this.speed;
        },       // para dibujar los elementos
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: "+ this.y;
        }
    }
})();
// vista
(function(){
    self.BoardView = function(canvas,board){

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype={
        clean: function() {
            this.cxt.clearRect(x=0, y= 0, this.board.width, this.board.height);
        },
        draw: function(){
            for(var i = this.board.elements.length - 1; i >= 0 ; i--){
                var el = this.board.elements[i];
                draw(this.ctx,el);
            };
        }
    }
    function draw(ctx,element){
        if(element !== null && !element.hasOwnProperty("Kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            }
        }
    }
})();





document.addEventListener("keydown", function(ev){
    //console.log(ev.Code);
    if(ev.Code == 81){
        bars.up();
    }
    else if(ev.Code == 40 ){
        bars.down();
    }
    else if(ev.Code == 87 ){
        bar2.up();
    }
    else if(ev.Code == 83 ){
        bar2.down();
    }
});
//self.addEventListener("load", main);
// controlador

window.addEventListener("load",main);

function main (){
    debugger;
    var x= 0;
    var board = new Board(800,400);
    var bars = new Bar(20,100,40,100,board);
    var bar_2 = new Bar(735,100,40,100,board);
    var canvas = document.getElementById('canvas');
    var  board_view = new BoardView(canvas,board);

    board_view.draw();
}

    //console.log(board);
    
