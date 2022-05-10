const floorLength = 150;
const distance = floorLength/2;

const mkRectangleWall = (x,y,z,color,distance,width,height)=>{//width = distance * 2
    const thin = 0.1; 
    mkBox(thin,height,width,color,distance+x,height/2+y,z);//DIRECTION TO X ::  x:thin y:height z:width px:distance py:height/2 pz:null 
    mkBox(thin,height,width,color,(x-distance),height/2+y,z);//DIRECTION TO -X ::  x:thin y:height z:width px:distance py:height/2 pz:null 
    mkBox(width,height,thin,color,x,height/2+y,z+distance);//DIRECTION TO Z ::  x:width y:height z:thin px:null py:height/2 pz:distance 
    mkBox(width,height,thin,color,x,height/2+y,(z-distance));//DIRECTION TO -Z ::  x:width y:height z:thin px:null py:height/2 pz:distance 
}

const arrayImg_to_min_z = ()=>{
    let num =5;
    let width = floorLength/num;
    for(let i = 1; i<=num;i++){
        let x = width*i-distance-15;
        let y = 30;
        let path = i+".jpg";
        mkImgBox(20,20,0.1,path,x,y,-(distance-5));
    }
}

arrayImg_to_min_z();

mkAxes(15);
mkPointLight(0x00ff00,1,500,0,15,15,true);
mkPointLight(0xff0000,1,500,15,15,15,true);
mkPointLight(0x0000ff,1,500,15,15,0,true);
mkPointLight(0xffffff,1,500,0,15,0,true);
// mkBox(3,3,3,0xffffff,2,2,2);
mkBox();
mkBox(floorLength,0.5,floorLength,0x888888,0,-1,0);
mkRectangleWall(0,0,0,0x888888,distance,floorLength,50);
mkRectangleWall(10,0,0,0x555555,2,4,50);
// mkImgBox(3,3,3,"1.jpg",5,5,5);