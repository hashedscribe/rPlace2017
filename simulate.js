//This function takes the elements from one array and adds them to another.
//Don't use append or push.apply directly because the arrays are too long
Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}
day1Array = DAY1.data;
day1Array.extend(DAY2.data);
day1Array.extend(DAY3.data);
console.log(day1Array.length);

let data, canvas, context, image, count = 0;

function hexToRGB(hex){
    return{
        r : "0x" + hex[1] + hex[2],
        g : "0x" + hex[3] + hex[4],
        b : "0x" + hex[5] + hex[6],
    };
}

function drawPixel(x, y, color) {
    let index = 4 * (canvas.width * parseInt(y) + parseInt(x));
    data[index + 0] = parseInt(color.r);
    data[index + 1] = parseInt(color.g);
    data[index + 2] = parseInt(color.b);
    //opacity
    data[index + 3] = 255;
}

// Creates canvas and image to be edited. At the end, it calls draw with animation frame to start 
// the simulation
function setup(){
    canvas = document.querySelector('#heatmap');
    context = canvas.getContext('2d');
    image = context.createImageData(canvas.width, canvas.height);
    data = image.data; 
    window.requestAnimationFrame(draw);
}

function draw(){
    pps = 1098; 
    // factors of 16561134
    // 1 × 16561134,  2 × 8280567, 3 × 5520378
    // 6 × 2760189, 9 × 1840126, 18 × 920063
    // 61 × 271494, 122 × 135747, 183 × 90498
    // 366 × 45249, 549 × 30166, 1098 × 15083
    if(count < day1Array.length){
        for(let i = 0; i < pps; i++){
            let x = day1Array[count+i].x_coordinate;
            let y = day1Array[count+i].y_coordinate;
            let color = hexToRGB(day1Array[count+i].color);
            drawPixel(x, y, color);
        }
        count = count + pps;
        context.putImageData(image, 0, 0);
        window.requestAnimationFrame(draw);
    }else{
        console.log("done");
    }
} 