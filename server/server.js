const express = require("express");
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const port = 3000;
const host = "localhost";
// const host= "192.168.0.105";
// const host = "10.80.161.95";/
let userList = {};
let userCount = 0;

function mkUser(name) {
  // console.log("class input name : ",name);
  this.name = name;
  this.position = { x: 0, y: 0, z: 0 };
  this.rotationY = 0;
  ++userCount;
  this.userId = name + userCount;
  userList[this.userId] = this;
  userList.newUser = this;
}

app.use(express.static("../html"));
app.use(express.static("../js"));
app.use(express.static("../css"));
app.use(express.static("../img"));

app.get("/", (req, res) => {
  res.redirect("/test_01.html");
});

io.on("connection", (socket) => {
  console.log("user connected!!");

  socket.on("createUserInfo", (name) => {
    new mkUser(name);
    // console.log(userList);
    let output = JSON.stringify(userList);
    // console.log(output);
    socket.broadcast.emit("toClient_userList", output);
    socket.emit("toClient_userList", output);
  });

  socket.on("fromClient", (data) => {
    let obj = JSON.parse(data);
    let mode = obj.mode;
    switch (mode) {
      case "chat":
        console.log(`MODE ( ${mode} ):: USER( ${obj.name} ) MSG( ${obj.msg} )`);
        socket.broadcast.emit("toClient", data);
        socket.emit("toClient", data);
        break;
      case "rotate":
        {
          //data = {mode:"rotate",direction,userId}
          let direction = obj.direction;
          let userId = obj.userId;
          let user = userList[userId];
          console.log(
            `MODE ( ${mode} ):: USER_ID ( ${userId} ) DIRECTION ( ${direction} )`
          );
          switch (direction) {
            case "left":
              user.rotationY += 0.05;
              break;
            case "right":
              user.rotationY -= 0.05;
              break;
          }
          let output = {
            angle: user.rotationY,
            userId: userId,
          };
          output = JSON.stringify(output);
          socket.broadcast.emit("userRotate", output);
          socket.emit("userRotate", output);
        }
        break;
      case "move":
        {
          //data = {mode:"move",direction,userId}
          let direction = obj.direction;
          let userId = obj.userId;
          let user = userList[userId];
          let angle = user.rotationY;
          let dis = 0.5;
          console.log(
            `MODE ( ${mode} ):: USER_ID ( ${userId} ) DIRECTION ( ${direction} )`
          );
          switch (direction) {
            case "go_front":
              user.position.x -= Math.sin(angle) * dis;
              user.position.z -= Math.cos(angle) * dis;
              break;
            case "go_back":
              user.position.x += Math.sin(angle) * dis;
              user.position.z += Math.cos(angle) * dis;
              break;
            case "go_left":
              angle -= Math.PI / 2;
              user.position.x += Math.sin(angle) * dis;
              user.position.z += Math.cos(angle) * dis;
              break;
            case "go_right":
              angle += Math.PI / 2;
              user.position.x += Math.sin(angle) * dis;
              user.position.z += Math.cos(angle) * dis;
              break;
            case "go_up":
              user.position.y += 0.2;
              break;
            case "go_down":
              user.position.y -= 0.2;
              break;
            default:
              break;
          }
          let output = {
            position: {
              x: user.position.x,
              y: user.position.y,
              z: user.position.z,
            },
            userId: userId,
          };
          output = JSON.stringify(output);
          socket.broadcast.emit("userMove", output);
          socket.emit("userMove", output);
        }
        break;
      default:
        console.log(
          `ERR CAN NOT FIND THE MODE( ${
            obj.mode
          } ) DESCRIPTION ( ${JSON.stringify(obj)} )`
        );
        break;
    }
  });
});

http.listen(port, host, () => {
  console.log(`server runs at http://${host}:${port}`);
});
