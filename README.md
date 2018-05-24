# project: jsLang!

Fast and simple translating website plugin- just type language, make JSON file and go!

## Instalation
### Download
Download this repository or clone it using command line:
```
git clone https://github.com/kamilrogala/jsLang.git
```
### Inserting
Insert jsLang.js file in your project from */dist/* folder like this:
```
<script src="js/jsLang.js"></script>
```
of course you can also use minified version:
```
<script src="js/jsLang.min.js"></script>
```
The best way is to input this file just before closing body tag in your **.html* file
### Adding JS
Then you just add simple JavaScript code into your project, after inserted plugin file like this:
```
<script>
  document.addEventListener('DOMContentLoaded', function() {
    jsLang({
      languages: ['en']
  });
</script>
```
Of course you can also use it with jQuery if yow want to:
```
<script>
  $(document).ready(function() {
    jsLang({
      languages: ['en']
  });
</script>
```
Of course you can insert this code in existing files, functions and so on- it should work even with frameworks quite well.
### Configuration
In jsLang you must configure just one option to start work- list of your languages. This is an array in which you must type code of each language in ISO 639-1 standard. Yeah, that seems very difficult isn't it? Bu don't bother about this- you see this all the time.
[Wikipedia](https://en.wikipedia.org/wiki/ISO_639-1) will explain everything. or better- just look at this code:
```
jsLang({
  languages: ['pl', 'en']
});
```
Look at this- 2 languages added (Polish, English). That's all what do you need before two final steps!
It's easy, I've told you! 
If you want- just type some more languages like *de*,* fr*, *it* and so on.
You can even add Martian language, really!
```
jsLang({
  languages: ['pl', 'en', 'martian']
});
```
This part will create trigger buttons for each language.
### Creating JSON file
Now let's make our phrases in both languages.
I'm making *jsLang-EN.json* and *jsLang-PL.js* and inserting them in */assets/*. Remember the name pattern: *jsLang-CODE.json* where your language code is part of name of the file written uppercase. Just like... *jsLang-MARTIAN.json*.
In my "english file" I will write something like this.
```
{
  "navTitle": "Website title in English language",
  "text": {
    "1": {
      "content": "English lorem ipsum in content 1"
    },
    "2": {
      "content": "English lorem ipsum in content 2"
    },
    "3": {
      "content": "English lorem ipsum in content 3"
    }
  }
}
```
In "polish file":
```
{
  "navTitle": "Tytuł strony po polsku",
  "text": {
    "1": {
      "content": "Polskie lorem ipsum w treści 1"
    },
    "2": {
      "content": "Polskie lorem ipsum w treści 2"
    },
    "3": {
      "content": "Polskie lorem ipsum w treści 3"
    }
  }
}
```
Now our script will know where find phrases in each language.
**Remember that plugin in this case replaces innerHTML so remember about HTML tags!** 
### Insert
The last step is paste our string into HTML code like this:
```
<h2 data-jslang-txt="1">Normal heading text without chosen language</h2>
<p data-jslang-txt="2">Normal text for first paragraph (without chosen language)</p>
<p data-jslang-txt="3">Normal text for second paragraph (without chosen language)</p>
```
That's all! You've made it!
Of course you can mix this as you want like...
```
<h2 data-jslang-txt="1">three clones</h2>
<p data-jslang-txt="1">three clones</p>
<p data-jslang-txt="1">three clones</p>
```
And one more thing- your *body* tag is getting class for each language, so you can style it as you want.
## Additional options
### Translating attributes
You can translate not just text content but also these attributes:
 - href
 - title
 - alt
 - src
 
In **.html* file:
```
<a href="#" data-jslang-txt="1" data-jslang-href="1" data-jslang-href="1">Some text</a>
<img src="image.jpg" alt="some alt text" data-jslang-alt="1" data-jslang-src="1">
```
in your **.json* file:
```
{
  "href": {
    "1": {
      "content": "https://www.kamilrogala.it"
    }
  },
  "title": {
    "1": {
      "content": "My blog"
    }
  },
  "alt": {
    "1": {
      "content": "red image"
    }
  },
  "src": {
    "1": {
      "content": "http://placehold.it/100x100/ff0000"
    }
  }
}

```
Of course you can translate one attribute if you want to like:
```
<a href="#" data-jslang-href="1">Just HREF will change</a>
<img src="image-will-not-change.jpg" alt="I will be changed" data-jslang-alt="1">
```
### Storage
Plugin will remember user choices- by default we are using [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).  You can also specify [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in very fast way:
```
jsLang({
  languages: [...],
  storage: 'local'
});
```
It's your choice.
### Complex mode
If you want to auto translate your content even for new users you can add *true* parameter 
```
jsLang({
  languages: [...]
},true);
```
How to specify default language? In your HTML tag like this:
```
<html lang="en">
```
But remember that some of your guests can have browsers without JavaScript- like Google Bot. So... the best way is to mak this like this:
```
<p data-jslang-txt="1">Fallback text when browser not support JavaScript for paragraph</p>
```
## Errors
Something wrong? Check your console! It's quite possible that you will find answer there.
Main causes of errors are:
- broken JS configuration ([check here](https://github.com/kamilrogala/jsLang#configuration))
- not existing or bad JSON file ([check here](https://github.com/kamilrogala/jsLang#creating-json-file))

If only some part of your website is translated I'm quite sure that you have an error in your JSON file. Check your console- there should be lert like:
```
Broken data for element: data-jslang-txt, ID 15 
in file: assets/jsLang-EN.json
 ```
 
## End words and 
I'm waiting for pull requests and your questions!

**TODO**
 - [ ] Make some demo site
 - Optimalization
 - Add unit tests (it's not TDD)
 - Make it DRY (there is so many repeats of code...)
 - Think about martian lang...
