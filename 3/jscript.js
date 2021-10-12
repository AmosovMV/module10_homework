const btnSent = document.querySelector(".btn_sent");
const btnGeo = document.querySelector(".btn_geo");
const outChat = document.querySelector(".out");
const inputMes = document.getElementById('input_ch');
const wsUrl = "wss://ws.ifelse.io/";
websocket = new WebSocket(wsUrl);

///////// Здесь можно сделать общий обработчик DOMContentloaded  //////////////////////// 
// document.addEventListener("DOMContentLoaded", () => {
// 	websocket.addEventListener('open', (event) => {
// 		writeToScreen("Connected success");
// 		btnSent.disabled = false;
// 		btnGeo.disabled = false;
// 	})
// 	websocket.addEventListener('message', function (event) {
// 		writeToScreenResp('RESPONSE: ' + event.data);
// 	})
// 	websocket.onerror = function(evt) {
//     writeToScreen('ERROR: ' + evt.data);
//   };
// })

websocket.addEventListener('open', (event) => {
	writeToScreen("Connected success");
	btnSent.disabled = false;
	btnGeo.disabled = false;
})

websocket.addEventListener('message', function (event) {
	writeToScreenResp('RESPONSE: ' + event.data);
});

function writeToScreenResp(message) {
	let mess = document.createElement("div");
	mess.className = "chatResp chatMess";
	mess.innerHTML = message;
	outChat.appendChild(mess);
}

function writeToScreen(message) {
	let mess = document.createElement("div");
	mess.className = "chatSend chatMess"
	mess.innerHTML = message;
	outChat.appendChild(mess);
}

function writeToLink(link) {
	let mess = document.createElement('a');
	mess.href = link;
	mess.target = "_blank";
	mess.style.display = "block";
	mess.className = "chatResp chatMess";
	mess.textContent = `${link}`;
	outChat.appendChild(mess);
}

btnSent.addEventListener('click', () => {
	let inp = inputMes.value;
	writeToScreen("SENT: " + inp);
	websocket.send(inp);
})

btnGeo.addEventListener('click', () => {
	writeToScreen('Геолокация');
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition((position) => {
			const { coords } = position;
			let urlPos = `https://yandex.ru/maps/?pt=${coords.longitude},${coords.latitude}&z=18&l=map`;
			writeToLink(urlPos);
			//websocket.send(link);
		})
	} else {
		writeToScreenResp("Невозможно определить геопозицию");
	}
})