//DOM for drawing shapes
const SHAPECANVAS = document.getElementById("shape-canvas");
const RECTANGLEINPUTHEIGHT = document.getElementById("rHeight");
const RECTANGLEINPUTWIDTH = document.getElementById("rWidth");
const DRAWRECTANGLE = document.getElementById("draw-rectangle");
const SQUAREINPUT = document.getElementById("sqr-input");
const DRAWSQUARE = document.getElementById("draw-square");
const CIRCLEINPUT = document.getElementById("circle-input");
const DRAWCIRCLE = document.getElementById("draw-circle");
const TRIANGLEINPUT = document.getElementById("triangle-input");
const DRAWTRIANGLE = document.getElementById("draw-triangle");

//DOM for Shape Selection
const SELECTEDSHAPENAME = document.getElementById("selected-shape-name");
const SELECTEDSHAPEWIDTH = document.getElementById("selected-shape-width");
const SELECTEDSHAPEHEIGHT = document.getElementById("selected-shape-height");
const SELECTEDSHAPERADIUS = document.getElementById("selected-shape-radius");
const SELECTEDSHAPEAREA = document.getElementById("selected-shape-area");
const SELECTEDSHAPEPERIMETER = document.getElementById("selected-shape-perimeter");

//MIN and MAX constants to define the limits of a shape in shape canvas
const MAX = 600;
const MIN = 0;

//Generates Random Values for the absolute positioning of the shapes.
function randValGenerator(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

// Shape Defines the basic properties of a shape, this where any click events take place, and where each 
class shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.div = document.createElement("div");
        this.div.addEventListener("click", (e) => {
            //Preprocessing of common use variables prior to logic.
            let shapeHeight = parseInt(e.target.style.height);
            let shapeWidth = parseInt(e.target.style.width);
            let shapePerimeter = shapeHeight + shapeWidth + shapeHeight + shapeWidth;
            let shapeArea = shapeHeight * shapeWidth;
            let shapeName = e.target.id;
            //Square and rectangle are measured in the same ways.
            if(shapeName === "square" || shapeName === "rectangle"){
                SELECTEDSHAPENAME.textContent = shapeName;
                SELECTEDSHAPEWIDTH.textContent = shapeWidth;
                SELECTEDSHAPEHEIGHT.textContent = shapeHeight;
                SELECTEDSHAPERADIUS.textContent = "N/A";
                SELECTEDSHAPEPERIMETER.textContent = shapePerimeter;
                SELECTEDSHAPEAREA.textContent = shapeArea; 
            }   
            //Switch for shape selection
            switch(shapeName){
                case "circle":
                    SELECTEDSHAPENAME.textContent = shapeName;
                    SELECTEDSHAPEWIDTH.textContent = "N/A";
                    SELECTEDSHAPEHEIGHT.textContent = "N/A";
                    SELECTEDSHAPERADIUS.textContent = shapeWidth; 
                    SELECTEDSHAPEPERIMETER.textContent = 2 * Math.PI * shapeWidth;
                    SELECTEDSHAPEAREA.textContent = Math.PI * Math.pow(shapeWidth, 2);
                break;
                case "triangle":
                    shapeWidth = parseInt(e.target.style.borderRight);
                    shapeHeight = parseInt(e.target.style.borderBottom);
                    shapeArea = shapeHeight * shapeWidth;
                    SELECTEDSHAPENAME.textContent = shapeName;
                    SELECTEDSHAPEWIDTH.textContent = shapeWidth;
                    SELECTEDSHAPEHEIGHT.textContent = shapeHeight;
                    SELECTEDSHAPERADIUS.textContent = "N/A";
                    SELECTEDSHAPEPERIMETER.textContent = 2 * shapeHeight + Math.sqrt(2) * shapeHeight;
                    SELECTEDSHAPEAREA.textContent = 0.5 * shapeArea;
                break;
                default:
                    console.log("Bounding Box Clicked");
                break;
            }
        });
        this.div.addEventListener("dblclick", (e) =>{
            e.target.remove();
        }); 
    }
    //Specifies a outside box which contains for each shape and keeps it within the shape canvas and is also used for debugging.
    generateBoundingBox(){
        let boundingHeight = this.width + 5; 
        let boundingWidth = this.width + 5; 
        let boundingBox = this.div;
        let finalCanvasWidth = MAX - this.width - 5;   //-5 due to bounding box size.
        let finalCanvasHeight = MAX - this.width - 5; //-5 due to bounding box size.
        if(this.div.id === "rectangle"){ //Rectangle requires a uniquely specificed boundingBox to keep it in bounds
            boundingHeight = this.height + 5; 
            finalCanvasHeight = this.height - 5;
        }   
        boundingBox.style.marginTop = `${randValGenerator(MIN,finalCanvasHeight)}px`;
        boundingBox.style.marginLeft =`${randValGenerator(MIN,finalCanvasWidth)}px`;
        boundingBox.id = "boundingBox";
        boundingBox.style.width = `${boundingWidth}px`;
        boundingBox.style.height = `${boundingHeight}px`;
        SHAPECANVAS.appendChild(boundingBox);
    }  
}

class square extends shape{
    constructor(width){
        super(width);
        this.renderSquare();
        this.generateBoundingBox();
    }

    renderSquare(){
        let square = document.createElement("div");
        square.id = "square";
        square.style.width = `${this.width}px`;
        square.style.height = `${this.width}px`;
        this.div.appendChild(square);
    }    
}

class rectangle extends shape{
    constructor(height,width){
        super(height,width);
        this.renderRectangle();
        this.generateBoundingBox();
    }
    renderRectangle(){
        let rectangle = document.createElement("div");
        rectangle.id = "rectangle";
        rectangle.style.width = `${this.width}px`;
        rectangle.style.height = `${this.height}px`;
        this.div.appendChild(rectangle);
    }
}

class circle extends shape{
    constructor(width){
        super(width);
        this.renderCircle();
        this.generateBoundingBox();
    }
    renderCircle(){
        let circle = document.createElement("div");
        circle.id = "circle";
        circle.style.width = `${this.width}px`;
        circle.style.height = `${this.width}px`;
        circle.style.borderRadius = `${50}%`;
        this.div.appendChild(circle);
    }
}

class triangle extends shape{
    constructor(width){
        super(width);
        this.renderTriangle();
        this.generateBoundingBox();
    }
    renderTriangle(){
        let triangle = document.createElement("div");
        triangle.id = "triangle";
        triangle.style.borderLeft = `${0}px solid transparent`
        triangle.style.borderRight = `${this.width}px solid transparent`;
        triangle.style.borderBottom = `${this.width}px solid rgb(${255},${251},${0})`;
        this.div.appendChild(triangle);
    }
}

DRAWSQUARE.addEventListener("click", () => {
    new square(parseInt(SQUAREINPUT.value));
});
DRAWRECTANGLE.addEventListener("click", () =>{
    new rectangle(parseInt(RECTANGLEINPUTHEIGHT.value),parseInt(RECTANGLEINPUTWIDTH.value));
});
DRAWCIRCLE.addEventListener("click", () => {
    new circle(parseInt(CIRCLEINPUT.value));
});
DRAWTRIANGLE.addEventListener("click", () => {
    new triangle(parseInt(TRIANGLEINPUT.value));
});