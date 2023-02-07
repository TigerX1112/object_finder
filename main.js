status = "";
function setup(){
    canvas = createCanvas(420, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    item = document.getElementById("object_find").value;
}
function modalLoaded(){
    console.log("Modal Loaded!");
    status = true;
}
function draw(){
    image(video, 0, 0, 420, 400);
}