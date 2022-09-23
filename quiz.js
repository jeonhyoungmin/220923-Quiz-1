const http = require('http');
const fs = require('fs');

const setDomComponent = (tagName, content, attributeName, props) => {
  let getDataArr = [];
  try {
    if(typeof tagName === "string" && typeof props === "object" && typeof attributeName === "string") {
      if(getDataArr.length === 0) {
        let tempArray = [];
        tempArray.push("<");
        tempArray.push(tagName + ' ' + attributeName + "=\"");
        for(const keys in props) {
          tempArray.push( ' ' + keys + ":" + props[keys] + ";");
        };
        tempArray.push("\">");
        getDataArr.push(tempArray.join(''));
      };
    }
    getDataArr.push(content);
    getDataArr.push(`</${tagName}>`);
    // return getDataArr.join("")
    // [< tagName + '\u00A0' + attributeName + "=\"" '\u00A0' + "width" + ":" + props[keys] + ";" '\u00A0' + keys + ":" + props[keys] + ";" '\u00A0' + keys + ":" + props[keys] + ";" "\">" content `</${tagName}>`]
  } catch(e) {
    console.error(e, "need checking arguments data type");
  } finally {
    return getDataArr.join("");
  }
}

let dynamicElement = setDomComponent("div", "helloYogg", "style", {"width":"100px", "height":"100px", "background-color":"cadetblue"});

const mainPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
${dynamicElement}
<div></div>
${dynamicElement}
<div></div>
${dynamicElement}
<div></div>
${dynamicElement}
${dynamicElement}
${dynamicElement}
${dynamicElement}
${dynamicElement}
${dynamicElement}
</body>
</html>
`;

const byteChecker = string => {return string.length * 2 + "byte"};

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type':'text/html'});
  response.write(mainPage);
  response.end();
}).listen(5555, () => {
  console.log(byteChecker(mainPage), "server listening on port 5555");
});
