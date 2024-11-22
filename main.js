


/**
 * ChatGPT gerði þessa function fyrir mig sem tekur á móti json objecti og býr til html file frá því
 * @param {} jsonData 
 */
// Function to create HTML from the JSON object
function createHTMLFromJSON(jsonData) {
  // Create the HTML structure


  // 1. Create the title
  const titleElement = document.createElement('h1');
  titleElement.textContent = jsonData.title;
  document.title = jsonData.title;

  // 2. Create the description text
  const textElement = document.createElement('p');
  textElement.textContent = jsonData.text;

  // 3. Create the category
  const categoryElement = document.createElement('p');
  categoryElement.textContent = `Category: ${jsonData.category}`;

  // Append the title, text, and category to the body or a specific container
  const container = document.createElement('div');
  container.appendChild(titleElement);
  container.appendChild(textElement);
  container.appendChild(categoryElement);

  // 4. Loop through the content array and create elements based on its type
  jsonData.content.forEach(item => {
    // Create a section for each content item
    const contentSection = document.createElement('section');
    const contentTitle = document.createElement('h2');
    contentTitle.textContent = item.title;
    const contentText = document.createElement('p');
    contentText.textContent = item.text;

    // Append each section to the container
    contentSection.appendChild(contentTitle);
    contentSection.appendChild(contentText);

    // You can also add a link for the url if needed
    const contentLink = document.createElement('a');
    contentLink.href = item.url;
    contentLink.textContent = `Learn more about ${item.title}`;
    contentSection.appendChild(contentLink);

    container.appendChild(contentSection);
  });

  // Append everything to the body or a specific element in the DOM
  var efniElement = document.getElementById('efni');
  efniElement.appendChild(container);
}


function htmlListener() {
  var efniElement = document.getElementById('efni');

  // Fjarlæga öll börn af efni
  while (efniElement.firstChild) {
    efniElement.removeChild(efniElement.firstChild);
  }

  // Setja inn html-börn í efni
  fetch('data/html/index.json').then(response => response.json()).then(dataHtml => {
    createHTMLFromJSON(dataHtml);
  });
}

function cssListener() {
  var efniElement = document.getElementById('efni');

  // Fjarlæga öll börn af efni
  while (efniElement.firstChild) {
    efniElement.removeChild(efniElement.firstChild);
  }

  // Setja inn html-börn í efni
  fetch('data/css/index.json').then(response => response.json()).then(dataCss => {
    createHTMLFromJSON(dataCss);
  });
}

function jsListener() {
  var efniElement = document.getElementById('efni');

  // Fjarlæga öll börn af efni
  while (efniElement.firstChild) {
    efniElement.removeChild(efniElement.firstChild);
  }

  // Setja inn html-börn í efni
  fetch('data/js/index.json').then(response => response.json()).then(dataJs => {
    createHTMLFromJSON(dataJs);
  });
}

function forsidaListener() {
  var efniElement = document.getElementById('efni');

  // Fjarlæga öll börn af efni
  while (efniElement.firstChild) {
    efniElement.removeChild(efniElement.firstChild);
  }

  // Setja inn html-börn í efni
  fetch('data/index.json').then(response => response.json()).then(data => {
    document.title = data.title;
  });
}

function htmlFunc() {
  window.history.pushState({ pageTitle: 'HTML' },"HTML","./htmlEfni");
  htmlListener();
}

function cssFunc() {
  window.history.pushState({ pageTitle: 'CSS' },"CSS","./cssEfni");
  cssListener();
}

function jsFunc() {
  window.history.pushState({ pageTitle: 'JavaScript' },"JavaScript","./jsEfni");
  jsListener();
}

function forsidaFunc() {
  window.history.pushState({ pageTitle: 'Vefforritunarvefurinn' },"Vefforritunarvefurinn","./forsida");
  forsidaListener();
}


function upphaf() {
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
    htmlChild.addEventListener('click',htmlFunc);
    cssChild.addEventListener('click',cssFunc);
    jsChild.addEventListener('click',jsFunc);

    // Appenda nav í body
    document.body.appendChild(nav);

    // Footer
    var footerE = document.getElementById("footerId");
    var footerA = document.createElement("p");
    footerA.textContent = data.footer;
    footerE.appendChild(footerA); 

    // Appenda div sem heldur utan um hvaða efni er sýnt hverju sinni
    var efni = document.createElement('div');
    var efniId = document.createAttribute('id');
    efniId.value = 'efni';
    efni.setAttributeNode(efniId);
    document.body.appendChild(efni);

    // Pusha forsíðu
    var s = "forsida";
    window.history.pushState({ pageTitle: 'Vefforritunarvefurinn' },"Vefforritunarvefurinn","./forsida");
  });
};

  window.addEventListener('popstate', e => {
    var a = e.state ? e.state.pageTitle : null;

    if (a == 'HTML') {
      htmlListener();
    } else if (a == 'CSS') {
      cssListener();
    } else if (a == 'JavaScript') {
      jsListener();
    } else if (a == 'Vefforritunarvefurinn') {
      forsidaListener();
    }
  });

  // Serve forsida í byrjun
  upphaf();