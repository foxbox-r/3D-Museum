function mkPointLight(color,from,to,x,y,z,helpFlag){
    let light = new THREE.PointLight(color,from,to);
    // light.helpFlag = helpFlag;
    if(helpFlag){
        help_pointLight(light);
    }
    setPosition(light,x,y,z);
    // set_shadow(light);
    scene.add(light);
} 

function help_pointLight(p_light){
    let p_light_helper = new THREE.PointLightHelper(p_light,0.5);
    scene.add(p_light_helper);
}