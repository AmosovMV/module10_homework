const btn = document.getElementById("btn");

btn.onclick = function () {
  let scrWidth = window.screen.width;
  let scrHeight = window.screen.height;
  let inHeight = window.innerHeight;
  let inWidth = window.innerWidth;
  alert(` Разрешение вашего экрана: ${scrWidth} x ${scrHeight}, а размер окна ${inWidth} x ${inHeight} `)
}

