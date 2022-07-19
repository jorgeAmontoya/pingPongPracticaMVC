/**
 * @description se crean los atributos de la clase que permite crear el board
 */
(function(){
    
     self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];   // barras a la orilla del juego
        this.ball = null;
        this.playing = false; 
        
    }


    self.Board.prototype = {
        get elements(){

           const elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();

/**
 * @description atributos necesarios para la creacion del Ball
 */
(function(){
     self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI /12;
        this.speed = 10;
        board.ball = this;
        this.kind = "circle";
     }
        /**
         * @description metodos relacionados con el ball
         */
     self.Ball.prototype = {
         /**
          *  @description metodo que permite dar moviento al Ball
          */
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);

        },
        /**
         *@description metodo que permite obtener el valor del atributo width
         */
        get width(){
            return this.radius*2;
        },
        /**
         *@description metodo que permite obtener el valor del atributo height
         */
        get height(){
            return this.radius*2;
        },
        /**
         *@description colisiona con una barra que recibe como parametro
         * @param {*} bar 
         */
        collision : function(bar){
            

            let relative_intersect_y = (bar.y + (bar.height/ 2)) -  this.y;
             relative_intersect_y= relative_intersect_y / (bar.height/2);

             this.bounce_angle = relative_intersect_y* this.max_bounce_angle;

             this.speed_y = this.speed* -Math.sin(this.bounce_angle);
             this.speed_x = this.speed* Math.cos(this.bounce_angle);

             if(this.x > (this.board.width/2)) this.direction = -1;
             else this.direction =1;

        }

    }



})();
/**
 * se crean los atributos para la construcion del elemento Bar
 */
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

        /**
         * @description  metodo que permite dar moviento hacia abajo a la barra
         */
        down:function(){
            this.y += this.speed;
        },   
        /**
         * @description  metodo que permite dar moviento hacia arriba a la barra
         */   
        up: function(){
            this.y -= this.speed;
        }
    }

})();
  
/**
 * @description vista
 */
(function(){
    /**
     * metodo que permite visualizar los bordes en el canvas
     * @param {*} canvas 
     * @param {*} board 
     */
    self.BoardView = function(canvas,board){

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");
    }
    self.BoardView.prototype={

        /**
         * @ metodo que permite limpiar el rastro de la barra
         */
        clean: function() {
            this.contexto.clearRect(0,  0, this.board.width, this.board.height);
        },
        draw: function(){
            for(let i = this.board.elements.length - 1; i >= 0 ; i--){
                let el = this.board.elements[i];
                draw(this.contexto,el);
            }
        },
        
        check_collisions: function(){
            for (let i =this.board.bars.length - 1; i >= 0 ;i--){
                let bar = this.board.bars[i];
                if(hit(bar, this.board.ball))
                {
                    this.board.ball.collision(bar);

                }
            }
        },


        play: function(){

            if(this.board.playing){
                this.clean();
                this.draw();
                this.check_collisions();
                this.board.ball.move();
            }
             
        }
    }

    function hit(a,b){
        //revisa si a colisiona con b

        let hit = false;
        /**
         * @description colisiones horizontales
         */
        
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
                /**
                 * @description Colisiones verticales
                 */
            if(b.y + b.height >= a.y && b.y <a.y + a.height)

                 hit = true;
        }
      
        if(b.x <= a.x && b.y + b.width >= a.x + a.width){

            if(b.y <= a.y && b.x + b.height >= a.y + a.height)
                hit = true;
        }

        // colision de b con a
        if(a.x <= b.x && a.y + a.width >= b.x + b.width){

            if(a.y <= b.y && a.x + a.height >= b.y + b.height)
                hit = true;
        }
        return hit;
    }
    /**
     * @description funcion que permite dibujar las figuras del rectangle y el circle
     * @param {*} contexto 
     * @param {*} element 
     */
    function draw(contexto,element){
       
            switch(element.kind){
                case "rectangle":
                    contexto.fillRect(element.x,element.y,element.width,element.height);
                break;
                case "circle":
                    contexto.beginPath();
                    contexto.arc(element.x,element.y,element.radius,0,7);
                    contexto.fill();
                    contexto.closePath();
                break;    
            }

    }
})();
/**
 * @description instancia de las clases anteriormente creadas
 */
let board = new Board(800,400);
let bar = new Bar(20,100,40,100,board);
let bar_2 = new Bar(735,100,40,100,board);
let canvas = document.getElementById('canvas');
let  board_view = new BoardView(canvas,board);
let ball = new Ball(350,100,10, board);
/**
 * @description funcion que espera el evento de cuando se presiona una tecla sobre la pagina
 */
document.addEventListener("keydown", function(ev){
    if(ev.keyCode == 38){
        ev.preventDefault();

        bar_2.up();
    }
    else if(ev.keyCode == 40 ){
        ev.preventDefault();

        bar_2.down();
    }//w
    else if(ev.keyCode == 87 ){
        ev.preventDefault();

        bar.up();
    }//s
    else if(ev.keyCode == 83 ){
        ev.preventDefault();

        bar.down();
    }
    else if(ev.keyCode == 32 ){
        ev.preventDefault();
        board.playing = !board.playing;
    }
});
board_view.draw();

/**
 * @description Controlador
 */
window.requestAnimationFrame(controller)

function controller (){
    
    board_view.play();
    window.requestAnimationFrame(controller)

    
}