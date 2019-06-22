(function() {
  try {
    if (location.href.indexOf("fullcpgrid") > -1) {
      return;
    }
    const startTime = Date.now();
    function ga(t, others)  {
      var tid = "UA-128864447-2";
      var cid = (Math.random() * Math.pow(10, 20)) / Math.pow(10, 10);
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;
      var screen = window.screen || { width: innerWidth, height: innerHeight };
      var collectInfos = [
        "v=1",
        "t="+ t,
        "dl=" + location.href,
        "ul=" + (navigator.language || "en-us").toLowerCase(),
        "de=" + (document.charset || document.inputEncoding || document.characterSet || "utf-8"),
        "dt=" + document.title, "sr=" + screen.width + "x" + screen.height,
        "vp=" + innerWidth + "x" + innerHeight,
        "cid=" + cid,
        "tid=" + tid,
        "z=" + Math.floor(Math.random() * 10000000)
      ];
      const req = new XMLHttpRequest();
      req.open("GET", "https://www.google-analytics.com/collect?" + collectInfos.join("&") + others);
      req.send();
    }
    var a = document.createElement("a");
    a.setAttribute("href", "https://github.com/daybrush/scenejs");
    a.setAttribute("target", "_blank");
    a.style.cssText = "position: fixed; bottom: 10px;right: 10px;width: 40px;height: 40px;line-height: 40px;border-radius: 50%;  border: 2px solid #555; background-color: #fff; overflow: hidden; padding: 0px;box-sizing: border-box;text-align: center; text-decoration: none; color: black; font-weight: bold; font-family: sans-serif;font-size: 20px;";
    // a.innerHTML = '<img src="https://daybrush.com/scenejs/images/clapperboard.png" style="width: 95%;margin-top: 3px"/>';
    a.innerHTML = '?';

    a.addEventListener("click", function () {
      ga("event", '&ec=scene&ea=click&ev=' + Math.floor((Date.now() - startTime) / 1000));
    });
    document.body.appendChild(a);

    ga("pageview", "");
  } catch (e) {}
})();
