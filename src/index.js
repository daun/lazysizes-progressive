/**
 * Fork of lazysizes progressive plugin
 *
 * Uses srcset instead of src as attribute
 */

/* eslint-disable */

(function (window, factory) {
  var globalInstall = function () {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };

  factory = factory.bind(null, window, window.document);

  if (typeof module == 'object' && module.exports) {
    factory(require('lazysizes'));
  } else if (window.lazySizes) {
    globalInstall();
  } else {
    window.addEventListener('lazyunveilread', globalInstall, true);
  }
}(window, function (window, document, lazySizes) {
  /*jshint eqnull:true */
  'use strict';
  var regImg, regClass, onLoad;

  if ('srcset' in document.createElement('img')) {
    regImg = /^img$/i;
    regClass = /\blazyloadprogressive\b/i;

    onLoad = function (e) {
      e.target.style.backgroundSize = '';
      e.target.style.backgroundImage = '';
      e.target.removeEventListener(e.type, onLoad);
    };

    document.addEventListener('lazybeforeunveil', function (e) {
      if (e.detail.instance != lazySizes) {
        return;
      }

      var img = e.target;
      if (!regImg.test(img.nodeName)) {
        return;
      }
      if (!regClass.test(img.className)) {
        return;
      }
      var src = img.getAttribute('srcset');

      if (src) {
        var imgFit = window.getComputedStyle(img, null).getPropertyValue('object-fit');
        var bgSize = '100% 100%';
        var bgPosition = '50% 50%';
        if (imgFit === 'contain' || imgFit === 'cover') {
          bgSize = imgFit;
          var imgPosition = window.getComputedStyle(img, null).getPropertyValue('object-position');
          if (imgPosition) {
            bgPosition = imgPosition;
          }
        }
        img.style.backgroundPosition = bgPosition;
        img.style.backgroundSize = bgSize;
        img.style.backgroundImage = 'url(' + src + ')';
        img.removeAttribute('src');
        img.removeAttribute('srcset');
        img.addEventListener('load', onLoad);
      }
    }, false);
  }
}));
