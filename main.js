status = "";
objects = [];
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
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; objects.length; i++){
            document.getElementById("Status: Objects Detected");

            fill("#FF0000");
            percent = floor(objects.length * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == item){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("check").innerHTML = item+" is found!";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(item+" found");
                synth.speak(utterThis);
            } else{
                document.getElementById("check").innerHTML = item+" not found!";
            }
        }
    }
}
function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        objects = results;
    }
}