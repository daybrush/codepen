(function() {
  document.body.insertAdjacentHTML("beforeend", '<a href="https://github.com/daybrush/scenejs" target="_blank" style="position: fixed; bottom: 10px;right: 10px;width: 80px;">\
<img src="https://daybrush.com/scenejs/images/clapperboard.png" style="width: 100%;"/></a>');

  var tid = "UA-128864447-2";
  var cid = (Math.random() * Math.pow(10, 20)) / Math.pow(10, 10);
  var innerWidth = window.innerWidth;
  var innerHeight = window.innerHeight;
  var screen = window.screen || { width: innerWidth, height: innerHeight };
  var collectInfos = [
    "v=1",
    "t=event",
    "dl=" + location.href,
    "ul=" + (navigator.language || "en-us").toLowerCase(),
    "de=" + (document.charset || document.inputEncoding || document.characterSet || "utf-8"),
    "dt=" + document.title, "sr=$" + screen.width + "x" + screen.height,
    "vp=" + innerWidth + "x" + innerHeight, "ec=" + category, "ea=" + action,
    "tid=" + tid
    "z=" + Math.floor(Math.random() * 10000000)
  ];
  const req = new XMLHttpRequest();
  req.open("GET", `https://www.google-analytics.com/collect?${collectInfos.join("&")}`);
  req.send();
})();
