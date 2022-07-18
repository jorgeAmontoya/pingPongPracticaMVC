//se crea el objeto,  pizarron
(function(){
// como si fuera un constructor
var self.Board = function(width, height){
this.width = width;
this.height = height;
this.playing = false;
this.game_over = false;
this.bards = [];
this.ball = null;
}
    self.Board.prototype = {

        get elements = this.bards;
            elemnts.Push(ball);
            return elements;
    }
})();
(function(){
    self.BoarView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.heigth;
        this.board = board;
       // objeto que nos permite dibujar en Js
        this.contexto = canvas.getContext("2d");


}
})

window.addEventListener("load",main);

function main(){
var board = new board(800, 400);
console.log(board);
var canvas = document.getElementById('canvas');
var boardView = new BoardView(canvas, board);
}