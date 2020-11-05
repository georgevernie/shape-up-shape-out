//MIN and MAX constants to define the limits of a shape in shape canvas
const MAX = 600;
const MIN = 0;

// Shape Defines the basic properties of a shape, this where any click events take place, and where each 
class Shape {
    constructor(_width, _height = null) {
        this.width = _width;
        this.height = _height;
        if(this.width > 600 || this.height > 600){
            alert("Shape is to large for Canvas!");
            return 1;
        }
        this.div = document.createElement("div");
        //Generates Random Values for the absolute positioning of the shapes.
        this.randValGenerator = function(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            };
        this.div.addEventListener("click", (e) => {
            //Preprocessing of common use variables prior to logic.
            let shapeHeight = parseInt(e.target.style.height);
            let shapeWidth = parseInt(e.target.style.width);
            let shapePerimeter = shapeHeight + shapeWidth + shapeHeight + shapeWidth;
            let shapeArea = shapeHeight * shapeWidth;
            let shapeName = e.target.className;
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
                    SELECTEDSHAPERADIUS.textContent = shapeWidth / 2; 
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
    }
    //removes a shape when double clicked and clears the shape information panel. 
    deleteShape(){
        this.div.addEventListener("dblclick", function(e){
            e.target.remove();
            SELECTEDSHAPENAME.textContent = "";
            SELECTEDSHAPEWIDTH.textContent = "";
            SELECTEDSHAPEHEIGHT.textContent = "";
            SELECTEDSHAPERADIUS.textContent = ""; 
            SELECTEDSHAPEPERIMETER.textContent = "";
            SELECTEDSHAPEAREA.textContent = "";
        });
    }
    //Specifies a outside box which contains for each shape and keeps it within the shape canvas and is also used for debugging.
    generateBoundingBox(){
        let boundingHeight = this.width + 5; 
        let boundingWidth = this.width + 5; 
        let boundingBox = this.div;
        let finalCanvasWidth = MAX - this.width - 5;   //-5 due to bounding box size.
        let finalCanvasHeight = MAX - this.width - 5; //-5 due to bounding box size.
        if(this.div.firstElementChild.className === "rectangle"){ //Rectangle requires a uniquely specificed boundingBox to keep it in bounds
            boundingHeight = this.height + 5; 
            finalCanvasHeight = MAX - this.height - 5;
        }   
        boundingBox.style.marginTop = `${this.randValGenerator(MIN,finalCanvasHeight)}px`;
        boundingBox.style.marginLeft =`${this.randValGenerator(MIN,finalCanvasWidth)}px`;
        boundingBox.className = "boundingBox";
        boundingBox.style.side = `${boundingWidth}px`;
        boundingBox.style.height = `${boundingHeight}px`;
        SHAPECANVAS.appendChild(boundingBox);
    } 
}

class Square extends Shape{
    constructor(width){
        super(width,width); //width refers to the side length of the square
        this.renderSquare();
        this.generateBoundingBox();
        this.deleteShape();
    }

    renderSquare(){
        let square = document.createElement("div");
        square.className = "square";
        square.style.width = `${this.width}px`;
        square.style.height = `${this.width}px`;
        this.div.appendChild(square);
    }    
}

class Rectangle extends Shape{
    constructor(height,width){
        super(height,width);
        this.renderRectangle();
        this.generateBoundingBox();
        this.deleteShape();
    }
    renderRectangle(){
        let rectangle = document.createElement("div");
        rectangle.className = "rectangle";
        rectangle.style.width = `${this.width}px`;
        rectangle.style.height = `${this.height}px`;
        this.div.appendChild(rectangle);
    }
}

class Circle extends Shape{
    constructor(width){
        super(width, width); // width refers to diameter.
        this.renderCircle();
        this.generateBoundingBox();
        this.deleteShape();
    }
    renderCircle(){
        let circle = document.createElement("div");
        circle.className = "circle";
        circle.style.width = `${this.width}px`;
        circle.style.height = `${this.width}px`;
        circle.style.borderRadius = `${50}%`;
        this.div.appendChild(circle);
        console.log(this.div)
    }
}

class Triangle extends Shape{
    constructor(width){
        super(width, width);
        this.renderTriangle();
        this.generateBoundingBox();
        this.deleteShape();
    }
    renderTriangle(){
        let triangle = document.createElement("div");
        triangle.className = "triangle";
        triangle.style.borderLeft = `${0}px solid transparent`
        triangle.style.borderRight = `${this.width}px solid transparent`;
        triangle.style.borderBottom = `${this.width}px solid rgb(${255},${251},${0})`;
        this.div.appendChild(triangle);
    }
}

DRAWSQUARE.addEventListener("click", () => {
    new Square(parseInt(SQUAREINPUT.value));
});
DRAWRECTANGLE.addEventListener("click", () =>{
    new Rectangle(parseInt(RECTANGLEINPUTHEIGHT.value),parseInt(RECTANGLEINPUTWIDTH.value));
});
DRAWCIRCLE.addEventListener("click", () => {
    new Circle(parseInt(CIRCLEINPUT.value));
});
DRAWTRIANGLE.addEventListener("click", () => {
    new Triangle(parseInt(TRIANGLEINPUT.value));
});