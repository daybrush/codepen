function requestUrl(url, callback) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", () => {
    callback(req.responseText);
  });
  req.open("GET", url);
  req.send();
}
function toArray(arr) {
  return [].slice.call(arr);
}
function $(selector, parent) {
  return toArray(parent.querySelectorAll(selector));
}
requestUrl(location.href, res => {
  const html = document.createElement("html");
  html.innerHTML = res;
  
  const cssFiles = $("link[href]", html);
  const scriptFiles = $(`script[src]:not([src*="codepen"])`, html);
  const inlineScripts = $("script:not([src])", html);
  const inlineStyles = $("style", html);
  
  const titleEl = $("title", document);
  const body = $("body", html);
  const title = titleEl && titleEl.innerText || "";
  
  const htmlText = body[0].innerHTML.trim();
  const cssText = inlineStyles.map(el => el.innerText).join("\n").trim();
  const jsText = inlineScripts.map(el => el.innerText).join("\n").trim();

  const scriptPaths = scriptFiles.map(el => el.getAttribute("src"));
  const cssPaths = scriptFiles.map(el => el.getAttribute("href"));
  const data = {
    title: title,
    description: title,
    private: false,
    head: "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi'>",
    html: htmlText,
    html_pre_processor: "none",
    css: cssText,
    css_pre_processor: "none",
    css_starter: "neither",
    css_prefix_free: false,
    js: jsText,
    js_pre_processor: "babel",
    html_classes: "loading",
    css_external: cssPaths.join(";"),
    js_external: scriptPaths.join(";"),
  };

  document.body.insertAdjacentHTML("afterbegin", `
  <form class="codepenform" action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" value="${JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;")}">
    <input type="submit" width="40" height="40" value="Codepen" class="submit-codepen" style="position:absolute;z-index:10;top:10px;right:10px;">
  </form>`);
});
