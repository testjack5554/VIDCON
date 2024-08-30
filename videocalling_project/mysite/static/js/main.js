console.log("in main.js!");

//var labelUsername = document.querySelector('#label-username');
var usernameInput = document.querySelector('#username');
var btnjoin = document.querySelector('#btn-join');

var username;

var webSocket;

function webSocketOnMessage(event)
{
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];
    console.log('message: ',message);
}
console.log("decl x");
console.log("hola : a little dittle");

var vsk = new WebSocket('ws://127.0.0.1:8000');
console.log(vsk);
btnjoin.addEventListener('click' ,() =>{

    username = usernameInput.value;

    console.log('username: ',username);
    if(username == '')
    {
        return;
    }

    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnjoin.disabled=true;
    btnjoin.style.visibility = 'hidden';

    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;


    var loc = window.location;
    var wsStart = 'ws://';

    if(loc.protocol == 'https:')
    {
        wsStart = 'wss://';
    }

    var endPoint = wsStart +loc.host + loc.pathname;
    console.log('endPoint: ',endPoint);


    webSocket = new WebSocket(endPoint);

    webSocket.addEventListener('open', (e) =>{
        console.log("connection opened!");
        var jsonStr = JSON.stringify(
            {
                'message' : 'this is a test message',
            }
        );

        webSocket.send(jsonStr);
    } );
    webSocket.addEventListener('message', webSocketOnMessage);
    webSocket.addEventListener('close', (e) =>{
        console.log("connection closed!");
    } );
    webSocket.addEventListener('error',  (e) =>{
        console.log("Error Occured!");
    });
    
});

var localStream = new MediaStream();

const constraints = {
    'video' : true,
    'audio' : true
};

const localVideo ='';
/*
var userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then( stream =>{

    })*/