//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var stopButton = document.getElementById( "stop" );
var circleButton = document.getElementById( "circle" );
var dvdButton = document.getElementById( "dvd" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");

//set fill color to lello
ctx.fillStyle = "#ffff00";


var requestID;

var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};


//wrapper function will allow inner function to keep track of
// its own complement of local variables (radius, xcor...)
var circle = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var radius = 0;
    var xcor = c.width / 2;
    var ycor = c.height / 2;
    var increase = true
    var drawDot = function() {
    	console.log( requestID )

    	ctx.clearRect( 0, 0, c.width, c.height );
    	
    	ctx.beginPath();
    	ctx.arc( xcor, ycor, radius, 0, 2 * Math.PI );
    	ctx.stroke();
    	ctx.fill();
        if (radius == xcor || radius == ycor){
            increase = false;
        }
        if (radius == 0){
            increase = true;
        }

        if (increase){
            radius++;
        }else{
            radius--;
        }
    	

    	requestID = window.requestAnimationFrame( drawDot );
    };
    drawDot();
};

var dvd = function() {
    
    window.cancelAnimationFrame( requestID );
    
    //console.log(requestID);

    //init params for drawing rect
    var a = document.getElementById("image")
    imagewidth = a.width
    imageheight = a.height
    increasex = true
    increasey = true
    
    xcor = Math.round((c.width - imagewidth)* Math.random())
    ycor = Math.round((c.height - imageheight)* Math.random())
    var drawDot = function() {
        //console.log( requestID )

        ctx.clearRect( 0, 0, c.width, c.height );
        
        ctx.beginPath();
        ctx.drawImage( a, xcor, ycor,imagewidth,imageheight);
        ctx.stroke();
        ctx.fill();

        console.log(xcor)
        
        if (xcor + imagewidth >= c.width){
            increasex=false;
        }

        if (xcor <= 0){
            increasex=true;
        }

        if (ycor + imageheight >= c.height){
            increasey=false;
        }

        if (ycor <= 0){
            increasey=true;
        }

        if (increasex){
            xcor++;
        }else{
            xcor--;
        }

        if (increasey){
            ycor++;
        }else{
            ycor--;
        }  

        requestID = window.requestAnimationFrame( drawDot );
    };
    drawDot();
};

var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};


//tie click-on-canvas to anime function
circleButton.addEventListener( "click", circle )
dvdButton.addEventListener( "click", dvd )

//ideally, clicking stop will make the animation stop
stopButton.addEventListener( "click",  stopIt );
