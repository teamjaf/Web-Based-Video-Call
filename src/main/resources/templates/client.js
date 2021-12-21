var conn = new WebSocket('ws://localhost:8080/socket');

function send(message) {
    conn.send(JSON.stringify(message));
}

configuration = null;
var peerConnection = new RTCPeerConnection(configuration);

var dataChannel = peerConnection.createDataChannel("dataChannel", { reliable: true });

dataChannel.onerror = function(error) {
    console.log("Error:", error);
};
dataChannel.onclose = function() {
    console.log("Data channel is closed");
};

peerConnection.createOffer(function(offer) {
    send({
        event : "offer",
        data : offer
    });
    peerConnection.setLocalDescription(offer);
}, function(error) {
    // Handle error here
});

peerConnection.onicecandidate = function(event) {
    if (event.candidate) {
        send({
            event : "candidate",
            data : event.candidate
        });
    }
};

peerConnection.addIceCandidate(new RTCIceCandidate(candidate));


peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
peerConnection.createAnswer(function(answer) {
    peerConnection.setLocalDescription(answer);
    send({
        event : "answer",
        data : answer
    });
}, function(error) {
    // Handle error here
});


handleAnswer(answer){
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}
dataChannel.send(“message”);

dataChannel.onmessage = function(event) {
    console.log("Message:", event.data);
};

peerConnection.ondatachannel = function (event) {
    dataChannel = event.channel;
};
const constraints = {
    video: true,audio : true
};
navigator.mediaDevices.getUserMedia(constraints).
then(function(stream) { /* use the stream */ })
    .catch(function(err) { /* handle the error */ });

var constraints = {
    video : {
        frameRate : {
            ideal : 10,
            max : 15
        },
        width : 1280,
        height : 720,
        facingMode : "user"
    }
}
peerConnection.addStream(stream);

peerConnection.onaddstream = function(event) {
    videoElement.srcObject = event.stream;
};

var configuration = {
    "iceServers" : [ {
        "url" : "stun:stun2.1.google.com:19302"
    } ]
};

{
    'iceServers': [
    {
        'urls': 'stun:stun.l.google.com:19302'
    },
    {
        'urls': 'turn:10.158.29.39:3478?transport=udp',
        'credential': 'XXXXXXXXXXXXX',
        'username': 'XXXXXXXXXXXXXXX'
    },
    {
        'urls': 'turn:10.158.29.39:3478?transport=tcp',
        'credential': 'XXXXXXXXXXXXX',
        'username': 'XXXXXXXXXXXXXXX'
    }
]
}







function send(message) {
    conn.send(JSON.stringify(message));
}

configuration = null;
var peerConnection = new RTCPeerConnection(configuration);

var dataChannel = peerConnection.createDataChannel("dataChannel", { reliable: true });

dataChannel.onerror = function(error) {
    console.log("Error:", error);
};
dataChannel.onclose = function() {
    console.log("Data channel is closed");
};

peerConnection.createOffer(function(offer) {
    send({
        event : "offer",
        data : offer
    });
    peerConnection.setLocalDescription(offer);
}, function(error) {
    // Handle error here
});

peerConnection.onicecandidate = function(event) {
    if (event.candidate) {
        send({
            event : "candidate",
            data : event.candidate
        });
    }
};

peerConnection.addIceCandidate(new RTCIceCandidate(candidate));


peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
peerConnection.createAnswer(function(answer) {
    peerConnection.setLocalDescription(answer);
    send({
        event : "answer",
        data : answer
    });
}, function(error) {
    // Handle error here
});


handleAnswer(answer){
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}
dataChannel.send(“message”);

dataChannel.onmessage = function(event) {
    console.log("Message:", event.data);
};

peerConnection.ondatachannel = function (event) {
    dataChannel = event.channel;
};
const constraints = {
    video: true,audio : true
};
navigator.mediaDevices.getUserMedia(constraints).
then(function(stream) { /* use the stream */ })
    .catch(function(err) { /* handle the error */ });

var constraints = {
    video : {
        frameRate : {
            ideal : 10,
            max : 15
        },
        width : 1280,
        height : 720,
        facingMode : "user"
    }
}
peerConnection.addStream(stream);

peerConnection.onaddstream = function(event) {
    videoElement.srcObject = event.stream;
};

var configuration = {
    "iceServers" : [ {
        "url" : "stun:stun2.1.google.com:19302"
    } ]
};

{
    'iceServers': [
    {
        'urls': 'stun:stun.l.google.com:19302'
    },
    {
        'urls': 'turn:10.158.29.39:3478?transport=udp',
        'credential': 'XXXXXXXXXXXXX',
        'username': 'XXXXXXXXXXXXXXX'
    },
    {
        'urls': 'turn:10.158.29.39:3478?transport=tcp',
        'credential': 'XXXXXXXXXXXXX',
        'username': 'XXXXXXXXXXXXXXX'
    }
]
}






