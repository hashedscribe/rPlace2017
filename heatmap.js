//This function takes the elements from one array and adds them to another.
//Don't use append or push.apply directly because the arrays are too long
Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}
day1Array = DAY1.data;
day1Array.extend(DAY2.data);
day1Array.extend(DAY3.data);

let data, canvas, context, image, max = 0, count = 0;

//Heat gradient function from chroma.js. The scale of colours is adjusted to make the heatmap look nicer.
heatGradient = chroma.scale(['black','red','yellow','yellow','yellow','white','white']).gamma(0.4);

//Make an array of 1000 arrays, each with a length of 1000. Fill it all with 0s to represent the number
//of times that each pixel is edited. Running through the entire dataset, each time a pixel is edited, 
//the "counter" at the coordinates of the pixel is increased.
let freq = Array.from(Array(1001), () => new Array(1001));
for(let i = 0; i < freq.length; i++){
    freq[i].fill(parseInt(0));
}
for(let i = 0; i < day1Array.length; i++){ //makes it kinda slow, how to make faster?
    coord = freq[parseInt(day1Array[i].x_coordinate)][parseInt(day1Array[i].y_coordinate)];
    freq[parseInt(day1Array[i].x_coordinate)][parseInt(day1Array[i].y_coordinate)] = coord + 1;
}

//Looks for the most time a pixel has been edited to be used in the heat gradient
for(let i = 0; i < 1001; i++){
    for(let j = 0; j < 1001; j++){
        if(freq[i][j] > max){
            max = freq[i][j];
        }
    }
}

//Turns hex colours into rgb, returning in an object
function hexToRGB(hex){
    return{
        r : "0x" + hex[1] + hex[2],
        g : "0x" + hex[3] + hex[4],
        b : "0x" + hex[5] + hex[6],
    };
}

//Finds the index of the pixel and draws the appropriate rgb values
function drawPixel(x, y, color) {
    let index = 4 * (canvas.width * parseInt(y) + parseInt(x));
    data[index + 0] = parseInt(color.r);
    data[index + 1] = parseInt(color.g);
    data[index + 2] = parseInt(color.b);
    //opacity
    data[index + 3] = 255;
}

//Creates canvas and image to be edited. At the end, it calls draw to start making the heatmap
function setup(){
    canvas = document.querySelector('#heatmap');
    context = canvas.getContext('2d');
    image = context.createImageData(canvas.width, canvas.height);
    data = image.data; 
    draw();
}

function draw(){
    //For all 1 000 000 pixels in the canvas, it takes the number of times it was edited and divides by
    //the maximum because the heat gradient takes in a flat between 0 and 1 to determine the colour
    //After drawing all the pixels, it updates to be a heatmap.
    for(let j = 0; j < freq.length-1; j++){
        for(let i = 0; i < freq[i].length-1; i++){
            color = hexToRGB(heatGradient(parseInt(freq[i][j])/max).hex());
            drawPixel(i, j, color);
        }
        //Loads the drawn pixel onto the canvas
        context.putImageData(image, 0, 0);
    }
}