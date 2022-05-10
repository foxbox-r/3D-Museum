const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

const img_box_wrapper = document.querySelector("#img_box_wrapper");
const img_title = document.querySelector("#img_title");
const now_img = document.querySelector("#now_img");
const img_link = document.querySelector("#img_link");
const img_desc = document.querySelector("#img_desc");
const up_button = document.querySelector("#img_up_button");

up_button.addEventListener("click",()=>{
    img_box_wrapper.style.top = "-1000%";
});

camera.rotation.y = 0;
camera.position.y = 0;
const renderer = new THREE.WebGLRenderer();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const cv = document.querySelector("canvas");


const mkAxes = x=>{
    const axesHelper = new THREE.AxesHelper(x);
    scene.add(axesHelper);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

const setPosition = (obj,x,y,z)=>{
    obj.position.set(x,y,z);
}

const randomColor = ()=>{
    return  Math.floor(Math.random()*0xffffff);
}

cv.addEventListener("click",(e)=>{

    mouse.x = (e.offsetX-cv.width/2)/(cv.width/2);
    mouse.y = -((e.offsetY-cv.height/2)/(cv.height/2));

    raycaster.setFromCamera( mouse, camera );//raycast 카메라 설정
    var intersects = raycaster.intersectObjects( scene.children );
    // console.log(intersects);
        var obj = intersects[0];
        obj.object.material.color.set( randomColor() );
        console.log(obj.object.uuid);
        for(let i=0;i< img_arr.length;i++){
            let img = img_arr[i];
            if(obj.object.uuid === img.uuid){
                console.log(img.info);
                img_box_wrapper.style.top = 0;
                img_title.innerText = img.info.title;
                now_img.src = img.info.path;
                img_link.href = img.info.link;
                img_desc.innerText = img.info.desc;
            }
        }
});

// const update = ()=>{
//     requestAnimationFrame(update);

//     renderer.render(scene,camera);
// }