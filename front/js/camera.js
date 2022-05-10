let camera_keyArr = [];
function camera_go_front(){
    let angle = camera.rotation.y;
    let dis = 0.5;
    camera.position.x -= Math.sin(angle)*dis;
    camera.position.z -= Math.cos(angle)*dis;
    move("go_front");
}

function camera_go_back(){
    let angle = camera.rotation.y;
    let dis = 0.5;
    camera.position.x += Math.sin(angle)*dis;
    camera.position.z += Math.cos(angle)*dis;
    move("go_back");
}

function camera_go_left(){
    let angle = camera.rotation.y-Math.PI/2;
    let dis = 0.5;
    camera.position.x += Math.sin(angle)*dis;
    camera.position.z += Math.cos(angle)*dis;
    move("go_left");
}

function camera_go_right(){
    let angle = camera.rotation.y+Math.PI/2;
    let dis = 0.5;
    camera.position.x += Math.sin(angle)*dis;
    camera.position.z += Math.cos(angle)*dis;
    move("go_right");
}

document.body.addEventListener("keydown",function(e){
    let code = e.keyCode;
    // console.log(code);
    camera_keyArr[code] = true;
});
document.body.addEventListener("keyup",function(e){
    let code = e.keyCode;
    camera_keyArr[code] = false;
});



function camera_move_keyEvent(){//<===== camera_move_keyEvent 이 함수가 base_setting.js 파일에 start()함수에 포함됨
    if(camera_keyArr[65])camera_go_left();//a
    if(camera_keyArr[68])camera_go_right();//d
    if(camera_keyArr[87])camera_go_front();//w
    if(camera_keyArr[83])camera_go_back();//s
    if(camera_keyArr[37]){camera.rotation.y += 0.05;rotate("left");}// <<== left
    if(camera_keyArr[39]){camera.rotation.y -= 0.05;rotate("right");}// ==>> right
    if(camera_keyArr[16]){camera.position.y -= 0.2;move("go_down");}//shift
    if(camera_keyArr[32]){camera.position.y += 0.2;move("go_up");}//space
}