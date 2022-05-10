const chat_box = document.querySelector("#chat_box");
const diplay = document.querySelector("#display");
const input = document.querySelector("#textInput");
const chatBut = document.querySelector("#chatButton"); 
chat_box.style.display = "none";
chatBut.addEventListener("click",e=>{
    const msg = input.value;
    input.value = "";
    send(msg);
});

const insertText = data=>{//msg,name,mode
    const name = data.name;
    const msg = data.msg;
    const tag = `<p>${name} : ${msg}</p>`;
    display.innerHTML += tag;
    console.log(data);
}
const update = ()=>{
    requestAnimationFrame(update);

    camera_move_keyEvent();
    renderer.render(scene,camera);
}

window.document.addEventListener("keydown",e=>{
    // console.log(e.keyCode);
    switch(e.keyCode){
        case 81://q
            chat_box.style.display = (chat_box.style.display==="none")?"":"none";
            break;
    }
})

update();