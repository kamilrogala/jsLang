'use strict';

/*jshint esversion:6,browser:true,devel: true*/
var jsLang = function jsLang(options) {
  var complexMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var typeOfStorage = void 0;
  if (window.localStorage) {
    var jsLangTrigger = function jsLangTrigger(newLang) {
      var langFileUrl = 'assets/jsLang-' + newLang.toUpperCase() + '.json';

      function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
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
        var jsonPhrase = JSON.parse(response);
        var allTextElements = document.querySelectorAll('[data-jslang-txt]');
        var allHrefElements = document.querySelectorAll('[data-jslang-href]');
        var allTitleElements = document.querySelectorAll('[data-jslang-title]');
        var allAltElements = document.querySelectorAll('[data-jslang-alt]');
        var allImgElements = document.querySelectorAll('[data-jslang-src]');

        allTextElements.forEach(function (item) {
          var itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-txt'));
          try {
            item.innerHTML = jsonPhrase.text[itemLangID].content;
          } catch (e) {
            console.error('Broken data for element: data-jslang-txt, ID ' + item.getAttribute('data-jslang-txt') + ' \n in file: ' + langFileUrl);
          }
        });
        allHrefElements.forEach(function (item) {
          var itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-href'));
          try {
            var langPhrase = jsonPhrase.href[itemLangID].content;
            item.setAttribute('href', langPhrase);
          } catch (e) {
            console.error('Broken data for element: data-jslang-href, ID ' + item.getAttribute('data-jslang-href') + ' \n in file: ' + langFileUrl);
          }
        });
        allTitleElements.forEach(function (item) {
          var itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-title'));
          try {
            var langPhrase = jsonPhrase.title[itemLangID].content;
            item.setAttribute('title', langPhrase);
          } catch (e) {
            console.error('Broken data for element: data-jslang-title, ID ' + item.getAttribute('data-jslang-title') + ' \n in file: ' + langFileUrl);
          }
        });
        allAltElements.forEach(function (item) {
          var itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-alt'));
          try {
            var langPhrase = jsonPhrase.alt[itemLangID].content;
            item.setAttribute('alt', langPhrase);
          } catch (e) {
            console.error('Broken data for element: data-jslang-alt, ID ' + item.getAttribute('data-jslang-alt') + ' \n in file: ' + langFileUrl);
          }
        });
        allImgElements.forEach(function (item) {
          var itemLangID = [];
          itemLangID.push(item.getAttribute('data-jslang-src'));
          try {
            var langPhrase = jsonPhrase.src[itemLangID].content;
            item.setAttribute('src', langPhrase);
          } catch (e) {
            console.error('Broken data for element: data-jslang-src, ID ' + item.getAttribute('data-jslang-src') + ' \n in file: ' + langFileUrl);
          }
        });
        document.title = jsonPhrase.navTitle;
      });

      var regBody = new RegExp('\\bjsLang(.*)?\\b', 'g');
      document.body.className = document.body.className.replace(regBody, '');
      document.body.classList.add('jsLang-' + newLang.toUpperCase());
      document.querySelector('html').setAttribute('lang', newLang.toLowerCase());
    };

    if (options.storage === 'session') {
      typeOfStorage = window.sessionStorage;
    } else {
      typeOfStorage = window.localStorage;
    }
    var langTriggerContainer = document.createElement('div');
    langTriggerContainer.classList += 'jsLang lang-container';

    if (options === undefined || options.languages === undefined) {
      langTriggerContainer.innerHTML = '<button type="button" class="btn btn-lang btn-EN"><span>EN</span></button><button type="button" class="btn btn-lang btn-PL"><span>PL</span></button>';
    } else {
      options.languages.forEach(function (singleLanguage) {
        langTriggerContainer.innerHTML += '<button type="button" class="btn btn-lang btn-' + singleLanguage.toUpperCase() + '"><span>' + singleLanguage.toUpperCase() + '</span></button>';
      });
    }
    document.body.appendChild(langTriggerContainer);

    var docLang = void 0;
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

    var jsLangBtns = document.querySelectorAll('.jsLang button');

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