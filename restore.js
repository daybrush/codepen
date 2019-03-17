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
    
    $(`script[src*="codepen.io"], script[src*="/restore.js"], link[href*="codepen.io"], meta:not([name="viewport"])`, html).forEach(el => el.remove());

    const inlineScripts = $("script:not([src])", html);
    const inlineStyles = $("style", html);
    
    const cssFiles = $("link[href]", html);
    const scriptFiles = $(`script[src]:not([src*="codepen"])`, html);
    const cssText = inlineStyles.map(el => el.outerHTML).join("\n").trim();
    const jsText = inlineScripts.map(el => el.outerHTML).join("\n").trim();
  
    const scriptPaths = scriptFiles.map(el => el.outerHTML);
    const cssPaths = cssFiles.map(el => el.outerHTML);

    $(`script, link, style`, html).forEach(el => el.remove());
    

    const body = $("body", html);  
    const htmlText = body[0].innerHTML.trim();
    


    const restoreText = `<!doctype html>
<html>
<head>
${cssPaths.join("\n")}
${cssText}
</head>
<body>
${htmlText}
</body>
${scriptPaths.join("\n")}
<script src="https://daybrush.com/codepen/index.js"></script>
${jsText}
</html>`;

    const button = document.createElement("button");
    const textarea = document.createElement("textarea");

    // textarea.addEventListener("focus", e => {
    // });
    textarea.addEventListener("select", e => {
        document.execCommand('copy');
    });
    function copyTextarea() {
      const oldContentEditable = textarea.contentEditable;
      const oldReadOnly = textarea.readOnly;
      const range = document.createRange();

      textarea.value = restoreText;
      textarea.contentEditable = true;
      textarea.readOnly = false;
      
      range.selectNodeContents(textarea);
  
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(range);
  
      textarea.setSelectionRange(0, textarea.value.length); // A big number, to cover anything that could be inside the element.
  
      textarea.contentEditable = oldContentEditable;
      textarea.readOnly = oldReadOnly;

      textarea.focus();
      document.execCommand('copy');
    }
    button.addEventListener("click", e => {
      if (navigator.clipboard && navigator.clipbaord.writeText) {
        navigator.clipboard.writeText(restoreText).then(e => {
          alert("copied");
        }).catch(e => {
          copyTextarea();
        });
      } else {
        copyTextarea();
      }
    });

    button.style.cssText = "position: absolute; z-index: 10; top: 10px; right: 10px; width: 80px; height: 40px;";
    textarea.style.cssText = "position: fixed; z-index: 10; top: 10px; left: 110%; width: 80px; height: 40px;";
    button.innerHTML = "RESTORE";

    document.body.appendChild(button);
    document.body.appendChild(textarea);
  });
  