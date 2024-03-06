video = "";
status = "";
objects = [];
input_val = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}


function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        obj_detector.detect(video, getResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Object detected";
            obj_name = objects[i].label;
            obj_confidence = floor(objects[i].confidence * 100);
            obj_x = objects[i].x;
            obj_y = objects[i].y;
            obj_width = objects[i].width;
            obj_height = objects[i].height;

            if (obj_name == input_val) {
                document.getElementById("number_of_objects").innerHTML = input_val + " found";
                fill("red");
                text(obj_name + " " + obj_confidence, obj_x + 10, obj_y + 10);
                noFill();
                stroke("red");
                rect(obj_x, obj_y, obj_width, obj_height);
            }
            else {
                document.getElementById("number_of_objects").innerHTML = input_val + " not found";
            }
        }
    }
}

function getResult(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        objects = r;
    }
}

function start() {
    obj_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status: object detection initialised";
    input_val = document.getElementById("input").value;
}

function modelloaded() {
    console.log("model loaded!");
    status = true;
}