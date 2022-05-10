const loader = new THREE.TextureLoader();
const img_arr = [];
const load = (path,callback) =>{
    loader.load(path,callback);
}

function mkImgInfo(path,title,desc,link){
    this.path = path;
    this.title = title;
    this.desc = desc;
    this.link = link;
    return this;
}

const img_info_arr = [

    new mkImgInfo(
        "1.jpg",
        "모나리자",
        '모나리자 또는 라 조콘다는 16세기 르네상스 시대에 레오나르도 다 빈치가 그린 초상화로, 현재 프랑스 파리 루브르 박물관에 전시되어 있다. "모나"는 유부녀 이름 앞에 붙이는 이탈리아어 경칭이고, "리자"는 초상화의 모델이 된 여인의 이름이다.',
        "https://www.google.com/search?q=%EB%AA%A8%EB%82%98%EB%A6%AC%EC%9E%90&oq=%EB%AA%A8%EB%82%98%EB%A6%AC%EC%9E%90&aqs=chrome.0.69i59j0l7.10879j0j8&sourceid=chrome&ie=UTF-8"
    ),
    new mkImgInfo(
        "2.jpg",
        "고흐",
        '빈센트 빌럼 반 고흐는 네덜란드 화가로 일반적으로 서양 미술사상 가장 위대한 화가 중 한 사람으로 여겨진다. 그는 그의 작품 전부를 정신질환을 앓고 자살을 감행하기 전의 단지 10년 동안에 만들어냈다.',
        "https://www.google.com/search?sxsrf=ALeKk01_cddiHIvsazG77WqxEGzU1sog8Q%3A1597429235926&ei=89U2X9OdONWnoASisYyQCQ&q=%EA%B3%A0%ED%9D%90&oq=%EA%B3%A0%ED%9D%90&gs_lcp=CgZwc3ktYWIQAzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADoHCAAQRxCwAzoECAAQQzoFCAAQsQM6BAgAEANQt_EDWKP0A2DJ_QNoA3AAeAGAAZ8BiAHjBJIBAzAuNJgBAKABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwiT46TRp5vrAhXVE4gKHaIYA5IQ4dUDCAw&uact=5"
    ),
    new mkImgInfo(
        "3.jpg",
        "별이 빛나는 밤",
        '《별이 빛나는 밤》은 네덜란드의 화가 빈센트 반 고흐의 가장 널리 알려진 작품이다. 정신병을 앓고 있을 당시의 고흐가 그린 작품이다. 1889년 상 레미의 정신병원에서 나와 기억으로 그린 그림이지만, 당시 고흐는 정신장애로 인한 고통을 떠올려 그림 속의 소용돌이로 묘사했다.',
        "https://www.google.com/search?q=%EB%AA%A8%EB%82%98%EB%A6%AC%EC%9E%90&oq=%EB%AA%A8%EB%82%98%EB%A6%AC%EC%9E%90&aqs=chrome.0.69i59j0l7.10879j0j8&sourceid=chrome&ie=UTF-8"
    ),
    new mkImgInfo(
        "4.jpg",
        "모나리자",
        '구스타프 클림트의 명화. 1907년 작품이다. 《엘펜리트》의 오프닝 판화로도 나왔다.정사각형으로 클림트가 금을 얇게 붙여 완성한 그림으로, 그 기술의 유래에 아버지의 영향이 있다.두 사람의 경계가 애매모호한데, 이때는 옷의 무늬를 보면 된다. 남자는 네모, 여자는 동그라미로 상징적으로 차이를 나타냈다.',
        "https://namu.wiki/w/%ED%82%A4%EC%8A%A4(%EA%B5%AC%EC%8A%A4%ED%83%80%ED%94%84%20%ED%81%B4%EB%A6%BC%ED%8A%B8)"
    ),
    new mkImgInfo(
        "5.jpg",
        "진주 귀고리를 한 소녀",
        '《진주 귀고리를 한 소녀》는 네덜란드 화가 요하네스 페르메이르의 걸작으로, 이름에서 암시하듯이 소녀가 걸고 있는 진주 귀고리를 그림의 초점으로 사용하였다. 헤이그의 마우리츠호이스에 전시되어 있으며, "북유럽의 《모나리자》", 또는 "네덜란드의 《모나리자》"라고도 불린다. ',
        "https://www.google.com/search?bih=754&biw=1536&hl=ko&sxsrf=ALeKk01nagphK7ZvOo5BH5FuTMBhlKxDVg%3A1597429781457&ei=Fdg2X6W9G9uB-QbLp7X4BA&q=%EC%A7%84%EC%A3%BC%EA%B7%80%EA%B1%B8%EC%9D%B4+%EC%86%8C%EB%85%80&oq=%EC%A7%84%EC%A3%BC%EA%B7%80%EA%B1%B8%EC%9D%B4&gs_lcp=CgZwc3ktYWIQARgBMgcIABBHELADMgcIABBHELADMgcIABBHELADUABYAGCEHGgCcAB4AIABAIgBAJIBAJgBAKoBB2d3cy13aXrAAQE&sclient=psy-ab"
    ),
];
let imgInfoCount = 0;
const mkImgBox = (x,y,z,path,px,py,pz)=>{
    const mkImg = t=>{
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(x,y,z),
            new THREE.MeshStandardMaterial({map:t})
        );
        setPosition(box,px,py,pz);
        scene.add(box);
        box.info = img_info_arr[imgInfoCount];
        ++imgInfoCount;
        img_arr.push(box);
    }
    load(path,mkImg);
}