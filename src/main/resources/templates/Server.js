
var userid = Math.round(Math.random() * 1000)
var socketUrl = "ws://127.0.0.1:8080/msgServer/" + userid
window.onload = function () {
    // console.log("My ID:" + userid);
    socket = new WebSocket(socketUrl)
    socket.onclose = function (e) {
        // console.log("Server is close" + e.code);
    }
    socket.onopen = function () {
        // console.log("Successful connection to server");
    }
    //Listen for messages from the server
    socket.onmessage = function (res) {
    }
    //Send message to server
    var msg="hello world"
    socket.send(msg)
}

var text = null
var showText = document.getElementById("showWorld")
var userid = Math.round(Math.random() * 1000)
var socketUrl = "ws://127.0.0.1:8080/msgServer/" + userid
var socket = null
var localStream = null
var pc = null
//Connect to socket server
window.onload = function () {
    // console.log("My ID:" + userid);
    socket = new WebSocket(socketUrl)
    socket.onclose = function (e) {
        // console.log("Server is close" + e.code);
    }
    socket.onopen = function () {
        // console.log("Successful connection to server");
    }
    socket.onmessage = function (res) {
        var obj = JSON.parse(res.data)
        // console.log(obj);
        var type = obj.type
        if (type === "offer") {
            if (pc) {
                console.error('peerConnection Already exists!');
                return;
            }
            pc =InitPeerConnetion()
            // console.log("get offer");
            var rtcs = new RTCSessionDescription(obj)
            pc.setRemoteDescription(rtcs)
            // console.log("set remotedescription success");
            pc.createAnswer(function (desc) {
                pc.setLocalDescription(desc)
                // console.log("send answer");
                // console.log(desc);
                socket.send(JSON.stringify(desc))
                // console.log("send answer success");
            },function(){
                // console.log("create answer fail");
            })
        } else if (type === "answer") {
            if (!pc) {
                console.error('peerConnection does not exist');
                return;
            }
            var rtcs = new RTCSessionDescription(obj)
            pc.setRemoteDescription(rtcs)
        } else if (type === "candidate") {
            // console.log("get candidate");
            // console.log(obj);
            var candidate = new RTCIceCandidate({
                sdpMLineIndex: obj.sdpMLineIndex,
                sdpMid: obj.sdpMid,
                candidate: obj.candidate
            })
            pc.addIceCandidate(candidate)
            // console.log("set candidate suceess");
        }
    }

    openVideo()
}
//webrtc establish connection
function cn() {
    // console.log("send msg");
    pc =InitPeerConnetion()
    pc.createOffer(function (desc) {
        // console.log("send offer");
        pc.setLocalDescription(desc)
        var txt = JSON.stringify(desc)
        socket.send(txt)
    }, function (err) {
        // console.log("create offer fail!!!");
        // console.log(err);
    })
}
function openVideo() {
    navigator.webkitGetUserMedia({ video: true, audio: false },
        function (stream) {
            localStream = stream
            document.getElementById("iv").srcObject = stream;
            document.getElementById("iv").play();
        },
        function (e) {
            // console.log(e.code);
            return;
        }
    )
}

function InitPeerConnetion(){
    // console.log("init");
    var peerconntion =null
    try{
        peerconntion =new webkitRTCPeerConnection();
    }catch(e){
        // console.log("connet fail");
        // console.log(e.message);
    }
    peerconntion.onicecandidate =function(evt){
        // console.log(evt.candidate);
        if(evt.candidate){
            // console.log(evt.candidate);
            var txt =JSON.stringify({
                type:"candidate",
                sdpMid:evt.candidate.sdpMid,
                sdpMLineIndex:evt.candidate.sdpMLineIndex,
                candidate:evt.candidate.candidate
            })
            // console.log(txt);
            // console.log("send candidate");
            socket.send(txt)
        }
    }
    // console.log("add local stream");
    peerconntion.addStream(localStream)
    peerconntion.onaddstream = function (event) {
        document.getElementById("iv2").srcObject = event.stream
        document.getElementById("iv2").play()
        // console.log("Bind remote video streams");
    };

    return peerconntion
}