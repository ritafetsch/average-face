var imgs = [];
var avgImg;
var numOfImages = 30;
var selectedImage;
var selectedIndex;


//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    var filename;
    // load all images from assets folder into memory 
    for (var i = 0; i < 30; i++) {
        filename = "assets/" + [i] + ".jpg";
        imgs.push(loadImage(filename)); 
        
    }
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width * 2 + 200, imgs[0].height + 200);
    pixelDensity(1);
    // initalise graphics for new image 
    avgImg = createGraphics(imgs[0].width, imgs[0].height);

    // initalise global variable to store index of currently selected img from array 
    selectedIndex = random(0,29);
}
//////////////////////////////////////////////////////////
function draw() {
    // background(125);

    /// draw first image imgs array 
    // image(imgs[0],0,0);

    // Further Dev - draw random image from imgs array to display upon startup
    image(imgs[int(selectedIndex)],0,0);
    // Initialise photo spot on right with same image as is currently selected
    image(imgs[int(selectedIndex)],imgs[0].width,0);

    // Print user instructions on screen
    textSize(26);
    text('Move the mouse left to right to observe the original image as it relates to the average of 30 images.', 10, 575);
    text('Press any key to change the image on the left.', 10, 620);
    
    
    // load pixels for all images in imgs array
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }
    // load pixels for average image 
    avgImg.loadPixels();


    // NESTED FOR LOOPS COMMENTED OUT FOR FURTHER DEVELOPMENT IMPLEMENTATIONS

    // loop over all pixels for image in index 0 spot of imgs array 
    // for (var x = 0; x < imgs[0].width; x++) {
    //     for (var y = 0; y < imgs[0].height; y++) {
            
            // convert x and y coordinates to pixel index value 
            // var index =  (y * imgs[0].width + x) * 4;

            /// set pixels red channel in avgImg to red 
            // avgImg.pixels[index + 0] = 255;

            // // initailse variables to contain sum values of each colour channel from all imgs
            // var sumR = 0;
            // var sumG = 0;
            // var sumB = 0;

            // // loop over imgs array, store sum value of each channel colour channel for all imgs
            // for (var i = 0; i < numOfImages; i++) {
            //     sumR += imgs[i].pixels[index + 0];
            //     sumG += imgs[i].pixels[index + 1];
            //     sumB += imgs[i].pixels[index + 2];
            // }

            // // update each channel of avgImg according to average values calculated by sum and numOfImages
            
            // avgImg.pixels[index + 0] = sumR / numOfImages;
            // avgImg.pixels[index + 1] = sumG / numOfImages;
            // avgImg.pixels[index + 2] = sumB / numOfImages;
            // avgImg.pixels[index + 3] = 255;
    

    //     }
    // }
    
    // update pixels for avgimg 
    avgImg.updatePixels();
    image(avgImg,imgs[0].width, 0)
    
    noLoop();

}

function keyPressed() {
    // Update global variables to point to currently selected photo
    selectedIndex = random(0,29);
    selectedImage = imgs[int(selectedIndex)];

    // change displayed image on key pressed 
    image(selectedImage, 0,0);
}

  

function mouseMoved(){

    // map mouseX value to a value between 0 and 1
    mouseFactor = map(mouseX,0, (imgs[0].width * 2), 0,1)

    // Constrain mapped mouse values  to be between 0 and 1
    var mouse = constrain(mouseFactor,0,1);
    

    for (var x = 0; x < imgs[0].width; x++) {
        for (var y = 0; y < imgs[0].height; y++) {
            
            var index =  (y * imgs[0].width + x) * 4;

            // obtrain sum values of each colour channel from all imgs
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            // store sum value of each channel colour channel for all imgs
            for (var i = 0; i < numOfImages; i++) {
                sumR += imgs[i].pixels[index + 0];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }

            
            // Obtain pixel values of image currently being displayed to lerp
            var r1 = imgs[int(selectedIndex)].pixels[index + 0];
            var g1 = imgs[int(selectedIndex)].pixels[index + 1];
            var b1 = imgs[int(selectedIndex)].pixels[index + 2];

            
            // Obtain average values from each original image channel to lerp
            var r2 = sumR / numOfImages;
            var g2 = sumG / numOfImages;
            var b2 = sumB / numOfImages;

            // Lerp previously calculated values according to mapped mouse value, also previously calculated 
            var lerpedRed = lerp(r1,r2, mouse);
            var lerpedGreen = lerp(g1,g2, mouse);
            var lerpedBlue = lerp(b1,b2, mouse);

            // Update avgImg pixels to calcualted lerped values respective to position of mouse 
            avgImg.pixels[index + 0] = lerpedRed  
            avgImg.pixels[index + 1] = lerpedGreen 
            avgImg.pixels[index + 2] = lerpedBlue  
            avgImg.pixels[index + 3] = 255;
        }
    }
    avgImg.updatePixels();
    loop();
}
