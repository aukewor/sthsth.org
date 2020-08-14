function showTime(){
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var session = "AM"


  if(h == 0){
    h = 12;
  }

  if(h > 12){
    h = h - 12;
    session = "PM"
  }

  h = (h<10) ? "0" + h : h;
  m = (m<10) ? "0" + m : m;
  s = (s<10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);

}

showTime();

function fullscreen() {
  // document.getElementById("MyClockDisplay").style.color = "rgba(186, 74, 255,0.5)";
  document.getElementById("drz").style.width = "100vw";
  document.getElementById("drz").style.height = "100vh";
  document.getElementById("drz").style.position = "inherit";
  document.getElementById("drz").style.zIndex = "99";
  document.getElementById("instructions").style.display = "none";
  document.getElementById("flying").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("fsbn").style.display = "none";
  document.getElementById("clbn").style.display = "block";
}

function shutdown() {
  window.location.reload()
}
