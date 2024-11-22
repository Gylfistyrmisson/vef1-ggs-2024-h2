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

    document.body.appendChild(nav);

    // Footer
    var footerE = document.getElementById("footerId");
    var footerA = document.createElement("p");
    footerA.textContent = data.footer;
    footerE.appendChild(footerA);
  })