const socket = io("http://localhost:3000");
const name = prompt("what's your name? ");
let userList;
let userId;
socket.emit("createUserInfo", name);

const send = (msg) => {
  let data = {
    msg: msg,
    name: name,
    mode: "chat",
  };
  data = JSON.stringify(data);
  socket.emit("fromClient", data);
};

const move = (direction) => {
  let data = {
    mode: "move",
    direction: direction,
    userId: userId,
  };
  data = JSON.stringify(data);
  socket.emit("fromClient", data);
};

const rotate = (direction) => {
  let data = {
    mode: "rotate",
    direction: direction,
    userId: userId,
  };
  data = JSON.stringify(data);
  socket.emit("fromClient", data);
};

socket.on("toClient_userList", (data) => {
  let obj = JSON.parse(data);
  // console.log(obj);
  console.log("newUser : ", obj.newUser);
  if (userList === undefined) {
    userList = {};
    for (let key in obj) {
      if (key != "newUser") {
        let user = obj[key];
        // console.log("처음 유저 세팅",key);
        let position = user.position;
        let mesh = return_mkBox(
          3,
          3,
          3,
          randomColor(),
          position.x,
          position.y,
          position.z
        );
        userList[user.userId] = mesh;
      } else {
        let newUser = obj[key];
        userId = newUser.userId;
        // console.log("유저 아이디 세팅 ", userId);
      }
    }
  } else {
    let user = obj.newUser;
    // console.log("new user : ",user);
    let position = user.position;
    let mesh = return_mkBox(
      3,
      3,
      3,
      randomColor(),
      position.x,
      position.y,
      position.z
    );
    userList[user.userId] = mesh;
  }
});

socket.on("userMove", (data) => {
  //{position:{x,y,z},userId}
  let obj = JSON.parse(data);
  let position = obj.position;
  let userId = obj.userId;
  let mesh = userList[userId];
  mesh.position.set(position.x, position.y, position.z);
});

socket.on("userRotate", (data) => {
  //{angle:user.rotattionY,userId}
  let obj = JSON.parse(data);
  let angle = obj.angle;
  let userId = obj.userId;
  let mesh = userList[userId];
  mesh.rotation.y = angle;
});

socket.on("toClient", (data) => {
  let obj = JSON.parse(data);
  insertText(obj);
});
