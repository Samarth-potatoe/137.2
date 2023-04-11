input_text="";
video="";
status="";
objects=[];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(480, 300);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Dtected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Dtected are :"+ objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             
            if(objects[i].label == input_text){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = input_text + " found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + " found");
                synth.speak(utterThis);
             }
             else {
                document.getElementById("object_found").innerHTML = input_text + " not found";
             }    
    
        }
    }
}

function start()
{
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
  if(error){
    console.log(error);
  }
  console.log(results);
  objects=results;
}