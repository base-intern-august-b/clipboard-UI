let mes_length = 0;

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

function channel_list(num) {
    for (i = 0; i < num; i++) {
        let tag = document.createElement("div");
        tag.id = "channel"
        tag.innerHTML = "チャンネル" + (i + 1);
        tag.setAttribute("onclick", "display_mes_clear(),display_mes(this.innerHTML,10)");
        const parent = document.getElementById("channel_list");
        parent.appendChild(tag);
    }
}

function close_modal() {
    document.getElementById("input_channel_name").value = "";
    document.getElementById("title_error").innerText = ""
    modal.style.display = "none";
}

function make_channel(channel_name) {
    if (channel_name) {
        let tag = document.createElement("div");
        tag.id = "channel"
        tag.innerHTML = channel_name;
        const parent = document.getElementById("channel_list");
        tag.setAttribute("onclick", "display_mes_clear(),display_mes(this.innerHTML,10)");
        parent.appendChild(tag);
        close_modal();
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

function display_mes(data, a) {
    let tag = document.createElement("div");
    let parent = document.getElementById("messages");
    tag.id = "mes_channel_title";
    tag.innerHTML = data;
    parent.appendChild(tag);

    for (let i = 0; i < a; i++) {
        tag = document.getElementById("messages");
        tag = document.createElement("div");
        tag.classList.add("messagebox");
        tag.id = i;
        tag.innerHTML = "username - time";
        parent = document.getElementById("messages");
        parent.appendChild(tag);

        tag = document.createElement("div");
        tag.classList.add("message_text");
        tag.innerHTML = "testtext" + i;
        parent = document.getElementById(i);
        parent.appendChild(tag);
        mes_length += 1;
    }
}

function clipmes(){
    
}





// 要素を取得
var modal = document.getElementById("myModal");
var btn = document.getElementById("make_channel_modal");
var span = document.getElementsByClassName("close")[0];

// ボタンをクリックするとモーダルを開く
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    close_modal();
}
window.onclick = function (event) {
    if (event.target == modal) {
        close_modal();
    }
}
