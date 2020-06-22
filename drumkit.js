document.body.addEventListener('keypress', onKeyPress)

let channels = [{ startTime: 0, data: [] }, { startTime: 0, data: [] }, { startTime: 0, data: [] }, { startTime: 0, data: [] }]
let channelContainer;


window.onload = function() {
    GenerateButtons(4);
}

function GenerateBtn(index, name) {
    let btn = document.createElement("button")
    btn.id = name
    btn.val = { index: index };
    channelContainer.appendChild(btn);

    return btn
}

function GenerateRecordBtn(index, name) {
    let btn = GenerateBtn(index, name)
    btn.innerHTML = 'Start recording channel ' + (index + 1);;
    btn.addEventListener('click', function() { btnChannelClick(index); }, false)
}

function GeneratePlayBtn(index, name) {
    let btn = GenerateBtn(index, name)
    btn.innerHTML = 'Start playing channel ' + (index + 1);
    btn.addEventListener('click', function() { channelPlay(index); }, false)
}

function GenerateButtons(buttonCount) {
    channelContainer = document.getElementById("channelContainer")

    for (let i = 0; i < buttonCount; i++) {
        let idName = '#channel' + (i + 1);
        GenerateRecordBtn(i, idName + 'Rec');
        GeneratePlayBtn(i, idName + 'Play');
    }
}

let activeChannelIndex = -1;

const sounds = {
    KeyA: "#boom",
    KeyS: "#clap",
    KeyD: "#hihat",
    KeyL: "#kick",
    KeyK: "#openhat",
    KeyJ: "#ride",
}

function onKeyPress(e) {
    playSound(sounds[e.code]);

    if (RecordingIsDisabled())
        return;

    let activeChannel = channels[activeChannelIndex];
    const time = Date.now() - activeChannel.startTime;

    const sound = {
        sound: e.code,
        time: time
    }

    activeChannel.data.push(sound)
}

function RecordingIsDisabled() {
    return (activeChannelIndex === -1)
}

function DisableRecording() {
    activeChannelIndex = -1;
}

function channelPlay(index) {
    DisableRecording();
    channels[index].data.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time);
    })
}

function playSound(id) {
    const audioTag = document.querySelector(id)
    audioTag.currentTime = 0
    audioTag.play()

}

function btnChannelClick(index) {
    activeChannelIndex = index;
    channels[index].startTime = Date.now()
}
