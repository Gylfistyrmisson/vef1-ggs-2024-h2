// Current state
var currentState = "";

function htmlListener() {
  var h = document.createElement("h1");
  h.textContent = "html";
  document.body.appendChild(h);

  const s = currentState;
  window.history.pushState({s},"html","./htmlEfni");
  currentState = "html";
}

function cssListener() {
  var h = document.createElement("h1");
  h.textContent = "css";
  document.body.appendChild(h);

  const s = currentState;
  window.history.pushState({s},"css","./cssEfni");
  currentState = "css";
}

function jsListener() {
  var h = document.createElement("h1");
  h.textContent = "js";
  document.body.appendChild(h);

  const s = currentState;
  window.history.pushState({s},"js","./jsEfni");
  currentState = "js";
}


function forsida() {
  // Búa til forsíðu í byrjun
  fetch('data/index.json').then(response => response.json()).then(data => {
    // Titill
    document.title = data.title;

    // Description
    var dec = document.createElement("h2");
    dec.textContent = data.description;
    document.body.appendChild(dec);

    // Navigation
    var nav = document.createElement("nav");

    // Nav börn
    var htmlChild = document.createElement("button");
    var cssChild = document.createElement("button");
    var jsChild = document.createElement("button");

    htmlChild.title = data.navigation[0].title;
    cssChild.title = data.navigation[1].title;
    jsChild.title = data.navigation[2].title;

    htmlChild.textContent = data.navigation[0].title;
    cssChild.textContent = data.navigation[1].title;
    jsChild.textContent = data.navigation[2].title;

    nav.appendChild(htmlChild);
    nav.appendChild(cssChild);
    nav.appendChild(jsChild);

    // Setja virkni á takka
    htmlChild.addEventListener('click',htmlListener);
    cssChild.addEventListener('click',cssListener);
    jsChild.addEventListener('click',jsListener);

    // Appenda nav í body
    document.body.appendChild(nav);

    // Footer
    var footerE = document.getElementById("footerId");
    var footerA = document.createElement("p");
    footerA.textContent = data.footer;
    footerE.appendChild(footerA); 

    // Pusha forsíðu
    window.history.pushState(null,null,"./forsida");
    currentState = "forsida";
  });
};

  window.addEventListener('popstate', e => {
    var g = e.state.s;
    var h = document.createElement("h1");
    h.textContent = g;
    document.body.appendChild(h);
  });

  // Serve forida í byrjun
  forsida();