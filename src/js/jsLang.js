/*jshint esversion:6,browser:true,devel: true*/
const jsLang = function (options, complexMode = false) {
  let typeOfStorage;
  if (window.localStorage) {
    if (options.storage === 'session') {
      typeOfStorage = window.sessionStorage;
    } else {
      typeOfStorage = window.localStorage;
    }
    const langTriggerContainer = document.createElement('div');
    langTriggerContainer.classList += 'jsLang lang-container';

    if (options === undefined || options.languages === undefined) {
      langTriggerContainer.innerHTML = '<button type="button" class="btn btn-lang btn-EN"><span>EN</span></button><button type="button" class="btn btn-lang btn-PL"><span>PL</span></button>';
    } else {
      options.languages.forEach(function (singleLanguage) {
        langTriggerContainer.innerHTML += `<button type="button" class="btn btn-lang btn-${singleLanguage.toUpperCase()}"><span>${singleLanguage.toUpperCase()}</span></button>`;
      });
    }
    document.body.appendChild(langTriggerContainer);

    let docLang;
    if (docLang === null) {
      docLang = navigator.language;
      if (docLang === undefined) {
        docLang = 'en';
      }
    } else {
      if (document.querySelector('html').hasAttribute('lang')) {
        docLang = document.querySelector('html').getAttribute('lang').toLowerCase();
      } else {
        docLang = 'en';
      }
    }
    docLang = docLang.charAt(0) + docLang.charAt(1);

    let jsLangBtns = document.querySelectorAll('.jsLang button');

    function jsLangTrigger(newLang) {
      let langFileUrl = `assets/jsLang-${newLang.toUpperCase()}.json`;

      function loadJSON(callback) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', langFileUrl, true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
        };
        xobj.send(null);
      }
      loadJSON(function (response) {
        let jsonPhrase = JSON.parse(response);
        let allTextElements = document.querySelectorAll('[data-jslang-txt]');
        let allHrefElements = document.querySelectorAll('[data-jslang-href]');
        let allTitleElements = document.querySelectorAll('[data-jslang-title]');
        let allAltElements = document.querySelectorAll('[data-jslang-alt]');
        let allImgElements = document.querySelectorAll('[data-jslang-src]');

        allTextElements.forEach(function (item) {
          let itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-txt'));
          try {
            item.innerHTML = jsonPhrase.text[itemLangID].content;
          } catch (e) {
            console.error(`Broken data for element: data-jslang-txt, ID ${item.getAttribute('data-jslang-txt')} \n in file: ${langFileUrl}`);
          }
        });
        allHrefElements.forEach(function (item) {
          let itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-href'));
          try {
            let langPhrase = jsonPhrase.href[itemLangID].content;
            item.setAttribute('href', langPhrase);
          } catch (e) {
            console.error(`Broken data for element: data-jslang-href, ID ${item.getAttribute('data-jslang-href')} \n in file: ${langFileUrl}`);
          }
        });
        allTitleElements.forEach(function (item) {
          let itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-title'));
          try {
            let langPhrase = jsonPhrase.title[itemLangID].content;
            item.setAttribute('title', langPhrase);
          } catch (e) {
            console.error(`Broken data for element: data-jslang-title, ID ${item.getAttribute('data-jslang-title')} \n in file: ${langFileUrl}`);
          }
        });
        allAltElements.forEach(function (item) {
          let itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-alt'));
          try {
            let langPhrase = jsonPhrase.alt[itemLangID].content;
            item.setAttribute('alt', langPhrase);
          } catch (e) {
            console.error(`Broken data for element: data-jslang-alt, ID ${item.getAttribute('data-jslang-alt')} \n in file: ${langFileUrl}`);
          }
        });
        allImgElements.forEach(function (item) {
          let itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-src'));
          try {
            let langPhrase = jsonPhrase.src[itemLangID].content;
            item.setAttribute('src', langPhrase);
          } catch (e) {
            console.error(`Broken data for element: data-jslang-src, ID ${item.getAttribute('data-jslang-src')} \n in file: ${langFileUrl}`);
          }
        });
        document.title = jsonPhrase.navTitle;
      });

      let regBody = new RegExp('\\bjsLang(.*)?\\b', 'g');
      document.body.className = document.body.className.replace(regBody, '');
      document.body.classList.add('jsLang-' + newLang.toUpperCase());
      document.querySelector('html').setAttribute('lang', newLang.toLowerCase());
    }

    jsLangBtns.forEach(function (jsLangBtn) {
      jsLangBtn.addEventListener('click', function () {
        jsLangTrigger(this.textContent.toLowerCase());
        typeOfStorage.setItem('jsLang', this.textContent.toLowerCase());
      });
    });

    if (complexMode) {
      jsLangTrigger(docLang);
    }
    if (typeOfStorage.getItem('jsLang')) {
      if (!complexMode) {
        document.body.classList += ' jsLang-' + typeOfStorage.getItem('jsLang').toUpperCase();
      }
      if (typeOfStorage.getItem('jsLang') !== docLang) {
        jsLangTrigger(typeOfStorage.getItem('jsLang'));
      }
    } else {
      typeOfStorage.setItem('jsLang', docLang);
    }

  } else {
    console.log('Too old browser...');
  }
};
