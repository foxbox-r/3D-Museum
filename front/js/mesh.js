const mkBox = (x,y,z,color,px,py,pz)=>{
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(x,y,z),
        new THREE.MeshStandardMaterial({color:color}),
    );
    setPosition(box,px,py,pz);
    scene.add(box);
}

const return_mkBox = (x,y,z,color,px,py,pz)=>{
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(x,y,z),
        new THREE.MeshStandardMaterial({color:color}),
    );
    setPosition(box,px,py,pz);
    scene.add(box);
    return box;
}