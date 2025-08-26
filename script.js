let mes_length = 0;

function get_channel_num(){
    return 3;
}

function sendmess(inputmes) {
    let tag = document.createElement("div");
    tag.classList.add("messagebox");
    tag.id = mes_length;
    let parent = document.getElementById("messages");
    parent.appendChild(tag);

    tag = document.createElement("div");
    tag.classList.add("message_text");
    tag.innerHTML = inputmes;
    parent = document.getElementById(mes_length);
    parent.appendChild(tag);
    mes_length += 1;
}

async function get_channel_name() {
    const response = await fetch("/api/v1/channels");
    const data = await response.json();
    return data.map(item => item.channel_name);
}

async function get_channel_id(channel_id) {
    const response = await fetch("/api/v1/channels");
    const data = await response.json();
    return data[channel_id].channel_id;
}

async function get_messgae(channel_id){
    const response = await fetch(`/api/v1/channels/${channel_id}/messages`) // リクエストを送信
    const data = await response.json();
    const mes_data=[];
    for(let i=0;i<data.length; i++)
        mes_data.push(data[i].nessage);
    return mes_data;
}

function channel_list(num) {
    get_channel_name().then(channel_list => {
        for (i = 0; i < num; i++) {
            let tag = document.createElement("div");
            tag.innerHTML = channel_list[i];
            tag.id(i);
            tag.setAttribute("onclick", "display_mes_clear(),display_mes(this.innerHTML,this.id)");
            const parent = document.getElementById("channel_list");
            parent.appendChild(tag);
        }
    });
}

function make_channel(channel_name) { 
    if (channel_name) {
        let tag = document.createElement("div");
        tag.id = "channel"
        tag.innerHTML = channel_name;
        const parent = document.getElementById("channel_list");
        tag.setAttribute("onclick", "display_mes_clear(),display_mes(this.innerHTML,this.innerHTML.length)");//display_mesの第二引数にメッセージの件数を入れる
        parent.appendChild(tag);
        close_channel_modal();
    } else {
        document.getElementById("title_error").innerText = "チャンネル名を入力してください";
    }
}

function display_mes_clear() {
    let tag = document.getElementById("messages");
    tag.remove();
    tag = document.createElement("div");
    tag.id = "messages";
    let parent = document.getElementById("bms_messages_container");
    parent.appendChild(tag);

    tag = document.getElementById("clips");
    tag.remove();
    tag = document.createElement("div");
    tag.id = "clips";
    parent = document.getElementById("clipboard");
    parent.appendChild(tag);
}

function display_mes(channel_title, channel_id) {
    let tag = document.createElement("div");
    let parent = document.getElementById("messages");
    tag.id = "mes_channel_title";
    tag.innerHTML = channel_title;
    parent.appendChild(tag);
    
    get_channel_id(channel_id).then(channel_id => {
        get_messgae(channel_id).then(mes_data => {
            for (let i = 1; i < mes_data+1; i++) {
                tag = document.createElement("div");
                tag.classList.add("messagebox");
                tag.id = i;
                parent = document.getElementById("messages");
                parent.appendChild(tag);
        
                tag = document.createElement("div");
                tag.classList.add("message_title");
                tag.id = -i;
                parent = document.getElementById(i);
                parent.appendChild(tag);
        
                tag = document.createElement("div");
                tag.classList.add("message_info");
                tag.innerHTML = "username - time";
                parent = document.getElementById(-i);
                parent.appendChild(tag);
        
                tag = document.createElement("span");
                tag.classList.add("ping_span");
                tag.innerHTML = "✖︎";
                parent = document.getElementById(-i);
                parent.appendChild(tag);
        
                tag = document.createElement("div");
                tag.classList.add("message_text");
                tag.innerHTML = mes_data[i-1];
                parent = document.getElementById(i);
                parent.appendChild(tag);
                mes_length += 1;
            }
        })
    })
}

function clipmes(){
    
}


// 要素を取得
var channel_modal = document.getElementById("channel_modal");
var channel_btn = document.getElementById("make_channel_modal");
var channel_span = document.getElementsByClassName("close")[0];

function close_channel_modal() {
    document.getElementById("input_channel_name").value = "";
    document.getElementById("title_error").innerText = ""
    channel_modal.style.display = "none";
}

channel_btn.onclick = function () {
    channel_modal.style.display = "block";
}
channel_span.onclick = function () {
    close_channel_modal();
}
window.onclick = function (event) {
    if (event.target == channel_modal) {
        close_channel_modal();
    }
}

var clip_modal = document.getElementById("clip_modal");
var clip_btn = document.getElementById("clip_modal_btn");
var clip_span = document.getElementsByClassName("close")[0];

function close_clip_modal() {
    clip_modal.style.display = "none";
}

clip_btn.onclick = function () {
    clip_modal.style.display = "block";
}
clip_span.onclick = function () {
    close_clip_modal();
}
window.onclick = function (event) {
    if (event.target == clip_modal) {
        close_clip_modal();
    }
}
