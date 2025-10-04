//firesteam
//se vocé está vendo isso desenvolva reatividade adaptativa
const mounter = document.body.querySelector("#mounter"); //builder
let iterableMounter = mounter.querySelectorAll("*"); //iterable builder
function compileClass(element) {
  let elementStyles = element.classList[0].split(";");
  elementStyles.forEach(sc => {
    if (sc.match(/bg-rgb-(\d+),(\d+),(\d+)/)) {
      const parsedStr = sc.split("-");
      let rgb = parsedStr[2].split(",");
      let [r, g, b] = [rgb[0], rgb[1], rgb[2]];
      element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (sc.match(/clr-rgb-(\d+),(\d+),(\d+)/)) {
      let parsed = sc.split("-")[2].split(",");
      const [r, g, b] = [parsed[0], parsed[1], parsed[2]];
      element.style.color = `rgb(${r}, ${g}, ${b})`;
    } else if (sc.match(/fts-(\w+)-(\d+)/)) {
      const token = sc.split("-");
      element.style.fontSize = `${token[2]}${token[1]}`;
    } else if (sc.match(/ftt-(\w+)-(\d+)/)) {
      let token = sc.split("-");
      if (token[1] === "b") element.style.fontWeight = token[2] === "0" ? "bold" : token[2].toString();
      else if (token[1] === "i") element.style.fontStyle = "italic";
      else if (token[1] != "b" && token[1] != "i") {
        element.style.fontStyle = token[1];
      }
    } else if (sc.match(/ft-(\w+)/)) {
      element.style.fontFamily = sc.split("-")[1];
    } else if (sc.match(/ft-cSpace-(\d+\.\d+)/)) {
      let token = sc.split("-");
      element.style.letterSpacing = token[2];
    } else if (sc.match(/ft-lSpace-(\d+)(\.\d+)/)) element.style.lineHeight = sc.split("-")[2];
    else if (sc.match(/txt-pos-(\w+)/)) {
      element.style.textAlign = sc.split("-")[2];
    } else if (sc.match(/img-(w|h|p%|t%)-(\d+)(px|rem|em|%)/)) {
      const token = sc.split("-");
      switch (token[1]) {
        case "w": element.style.width = token[2]; break;
        case "h": element.style.height = token[2]; break;
        case "p%": element.style.height = token[2]; element.style.width = token[2]; break;
        case "t%": element.style.opacity = token[2]; break;
        default: element.style.border = "solid 10px red";
      }
    } else if (sc.match(/mg-(l|r|t|b)-(\d+\w+)/)) {
      const token = sc.split("-");
      switch (token[1]) {
        case "l": element.style.marginLeft = token[2]; break;
        case "r": element.style.marginRight = token[2]; break;
        case "t": element.style.marginTop = token[2]; break;
        case "b": element.style.marginBottom = token[2]; break;
        default: element.style.border = "solid 10px rgb(255, 0, 0)";
      }
    } else if (sc.match(/div-c/)) {
      element.style.display = "flex";
      element.style.justifyContent = "center";
      element.style.alignItems = "center";
    } else if (sc.match(/b-(\d+)(px|em|rem|%)-rgb-(\d+),(\d+),(\d+)/)) {
      let token = sc.split("-");
      element.style.border = `solid ${token[1]} rgb(${token[3]})`;
    } else if (sc.match(/opc-(\d+)/)) {
      element.style.opacity = `${sc.split("-")[1] / 100}`;
    } else if (sc.match(/pos-(absolute|static|fixed|sticky)/)) {
      element.style.position = sc.split("-")[1];
    } else if (sc.match(/layer-(\d+)/)) {
      element.style.position = "absolute";
      element.style.zIndex = sc.split("-")[1];
    } else if (sc.match(/bg-img-(\w+\.)(png|jpg|jpeg)/)) {
      element.style.backgroundImage = `url(${sc.split("-")[2]})`;
    } else if (sc.match(/oflow-(\w+)/)) element.style.overflow = sc.split("-")[1];
    else if (sc.match(/b-r-(\d+)(px|rem|em|%)/) {
      element.style.borderRadius = sc.split("-")[2];
    }
  });
} //apply css rules based on class
let pastMounter = mounter.innerHTML.length;
function diff() {
  return mounter.innerHTML.length - pastMounter;
}
function JITCompilement() {
  iterableMounter.forEach(el => {
    compileClass(el);
  });
} //compiles all classes of builder on start, using compileClass
const reactivity = new MutationObserver(mut => {
  JITCompilement();
});
reactivity.observe(mounter, {
  childList: true,
  attributes: true,
  characterData: false,
  subtree: true
}); //Reactivity of styles
