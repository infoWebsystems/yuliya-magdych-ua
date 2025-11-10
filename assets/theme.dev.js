
/*
* @license
* Broadcast Theme (c) Invisible Themes
*
* This file is included for advanced development by
* Shopify Agencies.  Modified versions of the theme
* code are not supported by Shopify or Invisible.
*
* In order to use this file you will need to change
* theme.js to theme.dev.js in /layout/theme.liquid
*
*/

(function (bodyScrollLock, themeAddresses, themeCurrency, Sqrl, themeImages, Flickity, FlickityFade, Rellax, ellipsed, AOS) {
  'use strict';

  window.theme = window.theme || {};

  window.theme.sizes = {
    mobile: 480,
    small: 750,
    large: 990,
    widescreen: 1400,
  };

  window.theme.keyboardKeys = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    LEFTARROW: 37,
    RIGHTARROW: 39,
  };

  window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function floatLabels(container) {
    const floats = container.querySelectorAll('.form-field');
    floats.forEach((element) => {
      const label = element.querySelector('label');
      const input = element.querySelector('input, textarea');
      if (label && input) {
        input.addEventListener('keyup', (event) => {
          if (event.target.value !== '') {
            label.classList.add('label--float');
          } else {
            label.classList.remove('label--float');
          }
        });
        if (input.value && input.value.length) {
          label.classList.add('label--float');
        }
      }
    });
  }

  function readHeights() {
    const h = {};
    h.windowHeight = window.innerHeight;
    h.announcementHeight = getHeight('[data-section-type*="announcement"] [data-bar-top]');
    h.footerHeight = getHeight('[data-section-type*="footer"]');
    h.menuHeight = getHeight('[data-header-height]');
    h.headerHeight = h.menuHeight + h.announcementHeight;
    h.collectionNavHeight = getHeight('[data-collection-nav]');
    h.logoHeight = getFooterLogoWithPadding();
    return h;
  }

  function setVarsOnResize() {
    document.addEventListener('theme:resize', resizeVars);
    setVars();
  }

  function setVars() {
    const {windowHeight, announcementHeight, headerHeight, logoHeight, menuHeight, footerHeight, collectionNavHeight} = readHeights();
    const newsletterSmallLeft = document.querySelector('[data-newsletter-holder].newsletter--top-left');
    const announcementHigh = document.querySelector('#MainContent > .shopify-section:first-child > [data-announcement-wrapper]');
    const cookiePopup = document.querySelector('[data-tracking-consent]');
    const articleSocials = document.querySelector('[data-article-socials]');
    let defaultOuter = 16;

    document.documentElement.style.setProperty('--full-screen', `${windowHeight}px`);
    document.documentElement.style.setProperty('--three-quarters', `${windowHeight * (3 / 4)}px`);
    document.documentElement.style.setProperty('--two-thirds', `${windowHeight * (2 / 3)}px`);
    document.documentElement.style.setProperty('--one-half', `${windowHeight / 2}px`);
    document.documentElement.style.setProperty('--one-third', `${windowHeight / 3}px`);

    document.documentElement.style.setProperty('--menu-height', `${menuHeight}px`);
    document.documentElement.style.setProperty('--announcement-height', `${announcementHeight}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    document.documentElement.style.setProperty('--collection-nav-height', `${collectionNavHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight - logoHeight / 2}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    if (document.querySelector('[data-tracking-consent].popup-cookies--bottom')) {
      document.documentElement.style.setProperty('--cookie-bar-height', `${document.querySelector('[data-tracking-consent].popup-cookies--bottom').offsetHeight}px`);
    }

    document.documentElement.style.setProperty('--newsletter-small-height', newsletterSmallLeft ? `${newsletterSmallLeft.offsetHeight}px` : '0px');
    document.documentElement.style.setProperty('--announcement-height-high', announcementHigh ? `${announcementHigh.offsetHeight}px` : '0px');

    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

    if (cookiePopup && cookiePopup.offsetHeight > 0) {
      defaultOuter = cookiePopup.offsetHeight + Number(getComputedStyle(cookiePopup).bottom.replace('px', ''));
    } else if (articleSocials && articleSocials.offsetHeight > 0) {
      defaultOuter += articleSocials.offsetHeight;
    }

    document.documentElement.style.setProperty('--mobile-newsletter-with-cookie-height', `${defaultOuter}px`);
  }

  function resizeVars() {
    // restrict the heights that are changed on resize to avoid iOS jump when URL bar is shown and hidden
    const {windowHeight, announcementHeight, headerHeight, logoHeight, menuHeight, footerHeight, collectionNavHeight} = readHeights();
    const newsletterSmallLeft = document.querySelector('[data-newsletter-holder].newsletter--top-left');
    const announcementHigh = document.querySelector('#MainContent > .shopify-section:first-child > [data-announcement-wrapper]');
    const cookiePopup = document.querySelector('[data-tracking-consent]');
    const articleSocials = document.querySelector('[data-article-socials]');
    let defaultOuter = 16;

    document.documentElement.style.setProperty('--menu-height', `${menuHeight}px`);
    document.documentElement.style.setProperty('--announcement-height', `${announcementHeight}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    document.documentElement.style.setProperty('--collection-nav-height', `${collectionNavHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight - logoHeight / 2}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    if (document.querySelector('[data-tracking-consent].popup-cookies--bottom')) {
      document.documentElement.style.setProperty('--cookie-bar-height', `${document.querySelector('[data-tracking-consent].popup-cookies--bottom').offsetHeight}px`);
    }

    document.documentElement.style.setProperty('--newsletter-small-height', newsletterSmallLeft ? `${newsletterSmallLeft.offsetHeight}px` : '0px');
    document.documentElement.style.setProperty('--announcement-height-high', announcementHigh ? `${announcementHigh.offsetHeight}px` : '0px');

    if (cookiePopup && cookiePopup.offsetHeight > 0) {
      defaultOuter = cookiePopup.offsetHeight + Number(getComputedStyle(cookiePopup).bottom.replace('px', ''));
    } else if (articleSocials && articleSocials.offsetHeight > 0) {
      defaultOuter += articleSocials.offsetHeight;
    }

    document.documentElement.style.setProperty('--mobile-newsletter-with-cookie-height', `${defaultOuter}px`);
  }

  function getHeight(selector) {
    const el = document.querySelector(selector);
    if (el) {
      return el.offsetHeight;
    } else {
      return 0;
    }
  }

  function getFooterLogoWithPadding() {
    const height = getHeight('[data-footer-logo]');
    if (height > 0) {
      return height + 20;
    } else {
      return 0;
    }
  }

  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  function singles(frame, wrappers) {
    // sets the height of any frame passed in with the
    // tallest preventOverflowContent as well as any image in that frame
    let padding = 64;
    let tallest = 0;

    wrappers.forEach((wrap) => {
      if (wrap.offsetHeight > tallest) {
        const getMarginTop = parseInt(window.getComputedStyle(wrap).marginTop);
        const getMarginBottom = parseInt(window.getComputedStyle(wrap).marginBottom);
        const getMargin = getMarginTop + getMarginBottom;
        if (getMargin > padding) {
          padding = getMargin;
        }

        tallest = wrap.offsetHeight;
      }
    });
    const images = frame.querySelectorAll('[data-overflow-background]');
    const frames = [frame, ...images];
    frames.forEach((el) => {
      el.style.setProperty('min-height', `calc(${tallest + padding}px + var(--header-padding)`);
    });
  }

  function doubles(section) {
    if (window.innerWidth < window.theme.sizes.small) {
      // if we are below the small breakpoint, the double section acts like two independent
      // single frames
      let singleFrames = section.querySelectorAll('[data-overflow-frame]');
      singleFrames.forEach((singleframe) => {
        const wrappers = singleframe.querySelectorAll('[data-overflow-content]');
        singles(singleframe, wrappers);
      });
      return;
    }

    const padding = parseInt(getComputedStyle(section).getPropertyValue('--outer')) * 2;
    let tallest = 0;

    const frames = section.querySelectorAll('[data-overflow-frame]');
    const contentWrappers = section.querySelectorAll('[data-overflow-content]');
    contentWrappers.forEach((content) => {
      if (content.offsetHeight > tallest) {
        tallest = content.offsetHeight;
      }
    });
    const images = section.querySelectorAll('[data-overflow-background]');
    let applySizes = [...frames, ...images];
    applySizes.forEach((el) => {
      el.style.setProperty('min-height', `${tallest + padding}px`);
    });
    section.style.setProperty('min-height', `${tallest + padding + 2}px`);
  }

  function preventOverflow(container) {
    const singleFrames = container.querySelectorAll('.js-overflow-container');
    if (singleFrames) {
      singleFrames.forEach((frame) => {
        const wrappers = frame.querySelectorAll('.js-overflow-content');
        singles(frame, wrappers);
        document.addEventListener('theme:resize', () => {
          singles(frame, wrappers);
        });
      });
    }

    const doubleSections = container.querySelectorAll('[data-overflow-wrapper]');
    if (doubleSections) {
      doubleSections.forEach((section) => {
        doubles(section);
        document.addEventListener('theme:resize', () => {
          doubles(section);
        });
      });
    }
  }

  function debounce(fn, time) {
    let timeout;
    return function () {
      // eslint-disable-next-line prefer-rest-params
      if (fn) {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
      }
    };
  }

  function dispatch() {
    document.dispatchEvent(
      new CustomEvent('theme:resize', {
        bubbles: true,
      })
    );
  }

  function resizeListener() {
    window.addEventListener(
      'resize',
      debounce(function () {
        dispatch();
      }, 50)
    );
  }

  let prev = window.pageYOffset;
  let up = null;
  let down = null;
  let wasUp = null;
  let wasDown = null;
  let scrollLockTimeout = 0;

  function dispatch$1() {
    const position = window.pageYOffset;
    if (position > prev) {
      down = true;
      up = false;
    } else if (position < prev) {
      down = false;
      up = true;
    } else {
      up = null;
      down = null;
    }
    prev = position;
    document.dispatchEvent(
      new CustomEvent('theme:scroll', {
        detail: {
          up,
          down,
          position,
        },
        bubbles: false,
      })
    );
    if (up && !wasUp) {
      document.dispatchEvent(
        new CustomEvent('theme:scroll:up', {
          detail: {position},
          bubbles: false,
        })
      );
    }
    if (down && !wasDown) {
      document.dispatchEvent(
        new CustomEvent('theme:scroll:down', {
          detail: {position},
          bubbles: false,
        })
      );
    }
    wasDown = down;
    wasUp = up;
  }

  function lock(e) {
    bodyScrollLock.disableBodyScroll(e.detail, {
      allowTouchMove: (el) => el.tagName === 'TEXTAREA',
    });
    document.documentElement.setAttribute('data-scroll-locked', '');
  }

  function unlock() {
    // Prevent body scroll lock race conditions
    scrollLockTimeout = setTimeout(() => {
      document.body.removeAttribute('data-drawer-closing');
    }, 20);

    if (document.body.hasAttribute('data-drawer-closing')) {
      document.body.removeAttribute('data-drawer-closing');

      if (scrollLockTimeout) {
        clearTimeout(scrollLockTimeout);
      }

      return;
    } else {
      document.body.setAttribute('data-drawer-closing', '');
    }

    document.documentElement.removeAttribute('data-scroll-locked');
    bodyScrollLock.clearAllBodyScrollLocks();
  }

  function scrollListener() {
    let timeout;
    window.addEventListener(
      'scroll',
      function () {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
          dispatch$1();
        });
      },
      {passive: true}
    );

    window.addEventListener('theme:scroll:lock', lock);
    window.addEventListener('theme:scroll:unlock', unlock);
  }

  const wrap = (toWrap, wrapperClass = '', wrapperOption) => {
    const wrapper = wrapperOption || document.createElement('div');
    wrapper.classList.add(wrapperClass);
    toWrap.parentNode.insertBefore(wrapper, toWrap);
    return wrapper.appendChild(toWrap);
  };

  function wrapElements(container) {
    // Target tables to make them scrollable
    const tableSelectors = '.rte table';
    const tables = container.querySelectorAll(tableSelectors);
    tables.forEach((table) => {
      wrap(table, 'rte__table-wrapper');
    });

    // Target iframes to make them responsive
    const iframeSelectors = '.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"], .rte iframe#admin_bar_iframe';
    const frames = container.querySelectorAll(iframeSelectors);
    frames.forEach((frame) => {
      wrap(frame, 'rte__video-wrapper');
    });
  }

  function wasTouched() {
    window.theme.touched = true;
    document.removeEventListener('touchstart', wasTouched, {passive: true});
    document.querySelector('body').classList.add('supports-touch');
    document.dispatchEvent(
      new CustomEvent('theme:touch', {
        bubbles: true,
      })
    );
  }

  document.addEventListener('touchstart', wasTouched, {passive: true});

  function lazyImageBackgrounds() {
    document.addEventListener('lazyloaded', function (e) {
      const lazyImage = e.target.parentNode;
      if (lazyImage.classList.contains('lazy-image')) {
        lazyImage.style.backgroundImage = 'none';
      }
    });
  }

  function ariaToggle(container) {
    const toggleButtons = container.querySelectorAll('[data-aria-toggle]');
    if (toggleButtons.length) {
      toggleButtons.forEach((element) => {
        element.addEventListener('click', function (event) {
          event.preventDefault();
          const currentTarget = event.currentTarget;
          currentTarget.setAttribute('aria-expanded', currentTarget.getAttribute('aria-expanded') == 'false' ? 'true' : 'false');
          const toggleID = currentTarget.getAttribute('aria-controls');

          document.querySelector(`#${toggleID}`).classList.toggle('expanding');
          document.querySelector(`#${toggleID}`).classList.toggle('expanded');

          setTimeout(function () {
            document.querySelector(`#${toggleID}`).classList.remove('expanding');
          }, 500);
        });
      });
    }
  }

  resizeListener();
  scrollListener();
  lazyImageBackgrounds();
  ariaToggle(document);

  window.addEventListener('load', () => {
    setVarsOnResize();
    floatLabels(document);
    preventOverflow(document);
    wrapElements(document);
  });

  document.addEventListener('shopify:section:load', (e) => {
    const container = e.target;
    floatLabels(container);
    preventOverflow(container);
    wrapElements(container);
    ariaToggle(document);
  });

  (function () {
    function n(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect();
      return t.top >= 0 && t.bottom <= r && t.left >= 0 && t.right <= i;
    }
    function t(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect(),
        u = (t.left >= 0 && t.left <= i) || (t.right >= 0 && t.right <= i),
        f = (t.top >= 0 && t.top <= r) || (t.bottom >= 0 && t.bottom <= r);
      return u && f;
    }
    function i(n, i) {
      function r() {
        var r = t(n);
        r != u && ((u = r), typeof i == 'function' && i(r, n));
      }
      var u = t(n);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    function r(t, i) {
      function r() {
        var r = n(t);
        r != u && ((u = r), typeof i == 'function' && i(r, t));
      }
      var u = n(t);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    window.visibilityHelper = {isElementTotallyVisible: n, isElementPartiallyVisible: t, inViewportPartially: i, inViewportTotally: r};
  })();

  const showElement = (elem, removeProp = false, prop = 'block') => {
    if (elem) {
      if (removeProp) {
        elem.style.removeProperty('display');
      } else {
        elem.style.display = prop;
      }
    }
  };

  /**
   * Module to show Recently Viewed Products
   *
   * Copyright (c) 2014 Caroline Schnapp (11heavens.com)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   */

  Shopify.Products = (function () {
    const config = {
      howManyToShow: 4,
      howManyToStoreInMemory: 10,
      wrapperId: 'recently-viewed-products',
      section: null,
      onComplete: null,
    };

    let productHandleQueue = [];
    let wrapper = null;
    let howManyToShowItems = null;

    const cookie = {
      configuration: {
        expires: 90,
        path: '/',
        domain: window.location.hostname,
      },
      name: 'shopify_recently_viewed',
      write: function (recentlyViewed) {
        const recentlyViewedString = recentlyViewed.join(' ');
        document.cookie = `${this.name}=${recentlyViewedString}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      },
      read: function () {
        let recentlyViewed = [];
        let cookieValue = null;
        const templateProduct = document.querySelector('#template-product');

        if (document.cookie.indexOf('; ') !== -1 && document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
          cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(this.name))
            .split('=')[1];
        }

        if (cookieValue !== null) {
          recentlyViewed = cookieValue.split(' ');
        }

        if (templateProduct) {
          const currentProduct = templateProduct.getAttribute('data-product-handle');

          // Remove current product from the array
          if (recentlyViewed.indexOf(currentProduct) != -1) {
            const currentProductIndex = recentlyViewed.indexOf(currentProduct);
            recentlyViewed.splice(currentProductIndex, 1);
          }
        }

        return recentlyViewed;
      },
      destroy: function () {
        const cookieVal = null;
        document.cookie = `${this.name}=${cookieVal}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      },
      remove: function (productHandle) {
        const recentlyViewed = this.read();
        const position = recentlyViewed.indexOf(productHandle);
        if (position !== -1) {
          recentlyViewed.splice(position, 1);
          this.write(recentlyViewed);
        }
      },
    };

    const finalize = (wrapper, section) => {
      showElement(wrapper, true);
      const cookieItemsLength = cookie.read().length;

      if (Shopify.recentlyViewed && howManyToShowItems && cookieItemsLength && cookieItemsLength < howManyToShowItems && wrapper.children.length) {
        let allClassesArr = [];
        let addClassesArr = [];
        let objCounter = 0;
        for (const property in Shopify.recentlyViewed) {
          objCounter += 1;
          const objString = Shopify.recentlyViewed[property];
          const objArr = objString.split(' ');
          const propertyIdx = parseInt(property.split('_')[1]);
          allClassesArr = [...allClassesArr, ...objArr];

          if (cookie.read().length === propertyIdx || (objCounter === Object.keys(Shopify.recentlyViewed).length && !addClassesArr.length)) {
            addClassesArr = [...addClassesArr, ...objArr];
          }
        }

        for (let i = 0; i < wrapper.children.length; i++) {
          const element = wrapper.children[i];
          if (allClassesArr.length) {
            element.classList.remove(...allClassesArr);
          }

          if (addClassesArr.length) {
            element.classList.add(...addClassesArr);
          }
        }
      }

      // If we have a callback.
      if (config.onComplete) {
        try {
          config.onComplete(wrapper, section);
        } catch (error) {
          console.log('error');
        }
      }
    };

    const moveAlong = (shown, productHandleQueue, wrapper, section) => {
      if (productHandleQueue.length && shown < config.howManyToShow) {
        fetch('/products/' + productHandleQueue[0] + '?section_id=api-product-grid-item')
          .then((response) => response.text())
          .then((product) => {
            const aosDelay = shown * 150;
            const aosImageDuration = shown * 100 + 800;
            const aosTextDuration = shown * 50 + 800;
            const anchorAnimation = wrapper.id ? `#${wrapper.id}` : '';
            const fresh = document.createElement('div');
            let productReplaced = product.includes('||itemIndex||') ? product.replaceAll('||itemIndex||', shown) : product;
            productReplaced = productReplaced.includes('||itemAosDelay||') ? productReplaced.replaceAll('||itemAosDelay||', aosDelay) : productReplaced;
            productReplaced = productReplaced.includes('||itemAosImageDuration||') ? productReplaced.replaceAll('||itemAosImageDuration||', aosImageDuration) : productReplaced;
            productReplaced = productReplaced.includes('||itemAosTextDuration||') ? productReplaced.replaceAll('||itemAosTextDuration||', aosTextDuration) : productReplaced;
            productReplaced = productReplaced.includes('||itemAnimationAnchor||') ? productReplaced.replaceAll('||itemAnimationAnchor||', anchorAnimation) : productReplaced;
            fresh.innerHTML = productReplaced;

            wrapper.innerHTML += fresh.querySelector('[data-api-content]').innerHTML;

            productHandleQueue.shift();
            shown++;
            moveAlong(shown, productHandleQueue, wrapper, section);
          })
          .catch(() => {
            cookie.remove(productHandleQueue[0]);
            productHandleQueue.shift();
            moveAlong(shown, productHandleQueue, wrapper, section);
          });
      } else {
        finalize(wrapper, section);
      }
    };

    return {
      showRecentlyViewed: function (params) {
        const paramsNew = params || {};
        const shown = 0;

        // Update defaults.
        Object.assign(config, paramsNew);

        // Read cookie.
        productHandleQueue = cookie.read();

        // Element where to insert.
        wrapper = document.querySelector(`#${config.wrapperId}`);

        // How many products to show.
        howManyToShowItems = config.howManyToShow;
        config.howManyToShow = Math.min(productHandleQueue.length, config.howManyToShow);

        // If we have any to show.
        if (config.howManyToShow && wrapper) {
          // Getting each product with an Ajax call and rendering it on the page.
          moveAlong(shown, productHandleQueue, wrapper, config.section);
        }
      },

      getConfig: function () {
        return config;
      },

      clearList: function () {
        cookie.destroy();
      },

      recordRecentlyViewed: function (params) {
        const paramsNew = params || {};

        // Update defaults.
        Object.assign(config, paramsNew);

        // Read cookie.
        let recentlyViewed = cookie.read();

        // If we are on a product page.
        if (window.location.pathname.indexOf('/products/') !== -1) {
          // What is the product handle on this page.
          const productHandle = decodeURIComponent(window.location.pathname)
            .match(
              /\/products\/([a-z0-9\-]|[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|[\u203B]|[\w\u0430-\u044f]|[\u0400-\u04FF]|[\u0900-\u097F]|[\u0590-\u05FF\u200f\u200e]|[\u0621-\u064A\u0660-\u0669 ])+/
            )[0]
            .split('/products/')[1];
          // In what position is that product in memory.
          const position = recentlyViewed.indexOf(productHandle);

          // If not in memory.
          if (position === -1) {
            // Add product at the start of the list.
            recentlyViewed.unshift(productHandle);
            // Only keep what we need.
            recentlyViewed = recentlyViewed.splice(0, config.howManyToStoreInMemory);
          } else {
            // Remove the product and place it at start of list.
            recentlyViewed.splice(position, 1);
            recentlyViewed.unshift(productHandle);
          }

          // Update cookie.
          cookie.write(recentlyViewed);
        }
      },

      hasProducts: cookie.read().length > 0,
    };
  })();

  const getUrlString = (params, keys = [], isArray = false) => {
    const p = Object.keys(params)
      .map((key) => {
        let val = params[key];

        if ('[object Object]' === Object.prototype.toString.call(val) || Array.isArray(val)) {
          if (Array.isArray(params)) {
            keys.push('');
          } else {
            keys.push(key);
          }
          return getUrlString(val, keys, Array.isArray(val));
        } else {
          let tKey = key;

          if (keys.length > 0) {
            const tKeys = isArray ? keys : [...keys, key];
            tKey = tKeys.reduce((str, k) => {
              return '' === str ? k : `${str}[${k}]`;
            }, '');
          }
          if (isArray) {
            return `${tKey}[]=${val}`;
          } else {
            return `${tKey}=${val}`;
          }
        }
      })
      .join('&');

    keys.pop();
    return p;
  };

  const hideElement = (elem) => {
    if (elem) {
      elem.style.display = 'none';
    }
  };

  const fadeIn = (el, display, callback = null) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';

    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }

      if (val === 1 && typeof callback === 'function') {
        callback();
      }
    })();
  };

  /**
   * Module to add a shipping rates calculator to cart page.
   *
   * Copyright (c) 2011-2012 Caroline Schnapp (11heavens.com)
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   *
   * Modified version -- coupled with Broadcast theme markup
   *
   */

  if (typeof Shopify.Cart === 'undefined') {
    Shopify.Cart = {};
  }

  Shopify.Cart.ShippingCalculator = (function () {
    const _config = {
      submitButton: theme.strings.shippingCalcSubmitButton,
      submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
      templateId: 'shipping-calculator-response-template',
      wrapperId: 'wrapper-response',
      customerIsLoggedIn: false,
    };
    const _render = function (response) {
      const template = document.querySelector(`#${_config.templateId}`);
      const wrapper = document.querySelector(`#${_config.wrapperId}`);

      if (template && wrapper) {
        wrapper.innerHTML = '';
        let ratesList = '';
        let ratesText = '';
        let successClass = 'error center';
        let markup = template.innerHTML;
        const rateRegex = /[^[\]]+(?=])/g;

        if (response.rates && response.rates.length) {
          let rateTemplate = rateRegex.exec(markup)[0];
          response.rates.forEach((rate) => {
            let rateHtml = rateTemplate;
            rateHtml = rateHtml.replace(/\|\|rateName\|\|/, rate.name);
            rateHtml = rateHtml.replace(/\|\|ratePrice\|\|/, Shopify.Cart.ShippingCalculator.formatRate(rate.price));
            ratesList += rateHtml;
          });
        }

        if (response.success) {
          successClass = 'success center';
          const createdNewElem = document.createElement('div');
          createdNewElem.innerHTML = template.innerHTML;
          const noShippingElem = createdNewElem.querySelector('[data-template-no-shipping]');

          if (response.rates.length < 1 && noShippingElem) {
            ratesText = noShippingElem.getAttribute('data-template-no-shipping');
          }
        } else {
          ratesText = response.errorFeedback;
        }

        markup = markup.replace(rateRegex, '').replace('[]', '');
        markup = markup.replace(/\|\|ratesList\|\|/g, ratesList);
        markup = markup.replace(/\|\|successClass\|\|/g, successClass);
        markup = markup.replace(/\|\|ratesText\|\|/g, ratesText);

        wrapper.innerHTML += markup;
      }
    };
    const _enableButtons = function () {
      const getRatesButton = document.querySelector('.get-rates');
      getRatesButton.removeAttribute('disabled');
      getRatesButton.classList.remove('disabled');
      getRatesButton.value = _config.submitButton;
    };
    const _disableButtons = function () {
      const getRatesButton = document.querySelector('.get-rates');
      getRatesButton.setAttribute('disabled', 'disabled');
      getRatesButton.classList.add('disabled');
      getRatesButton.value = _config.submitButtonDisabled;
    };
    const _getCartShippingRatesForDestination = function (shipping_address) {
      const encodedShippingAddressData = encodeURI(
        getUrlString({
          shipping_address: shipping_address,
        })
      );
      const url = `${window.theme.routes.cart}/shipping_rates.json?${encodedShippingAddressData}`;
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          const response = JSON.parse(this.response);
          const rates = response.shipping_rates;
          _onCartShippingRatesUpdate(rates, shipping_address);
        } else {
          _onError(this);
        }
      };

      request.onerror = function () {
        _onError(this);
      };

      request.send();
    };
    const _fullMessagesFromErrors = function (errors) {
      const fullMessages = [];

      for (const error in errors) {
        for (const message of errors[error]) {
          fullMessages.push(error + ' ' + message);
        }
      }

      return fullMessages;
    };
    const _onError = function (XMLHttpRequest) {
      hideElement(document.querySelector('#estimated-shipping'));

      const shippingChild = document.querySelector('#estimated-shipping em');
      if (shippingChild) {
        while (shippingChild.firstChild) shippingChild.removeChild(shippingChild.firstChild);
      }
      _enableButtons();
      let feedback = '';
      const data = eval('(' + XMLHttpRequest.responseText + ')');
      if (data.message) {
        feedback = data.message + '(' + data.status + '): ' + data.description;
      } else {
        feedback = 'Error : ' + _fullMessagesFromErrors(data).join('; ');
      }
      if (feedback === 'Error : country is not supported.') {
        feedback = 'We do not ship to this destination.';
      }
      _render({
        rates: [],
        errorFeedback: feedback,
        success: false,
      });

      showElement(document.querySelector(`#${_config.wrapperId}`));
    };
    const _onCartShippingRatesUpdate = function (rates, shipping_address) {
      _enableButtons();
      let readable_address = '';
      if (shipping_address.zip) {
        readable_address += shipping_address.zip + ', ';
      }
      if (shipping_address.province) {
        readable_address += shipping_address.province + ', ';
      }
      readable_address += shipping_address.country;
      const shippingChild = document.querySelector('#estimated-shipping em');
      if (rates.length && shippingChild) {
        shippingChild.textContent = rates[0].price == '0.00' ? window.theme.strings.free : themeCurrency.formatMoney(rates[0].price, theme.moneyFormat);
      }
      _render({
        rates: rates,
        address: readable_address,
        success: true,
      });

      const fadeElements = document.querySelectorAll(`#${_config.wrapperId}, #estimated-shipping`);

      if (fadeElements.length) {
        fadeElements.forEach((element) => {
          fadeIn(element);
        });
      }
    };

    const _init = function () {
      const getRatesButton = document.querySelector('.get-rates');
      const fieldsContainer = document.querySelector('#address_container');
      const selectCountry = document.querySelector('#address_country');
      const selectProvince = document.querySelector('#address_province');
      const htmlEl = document.querySelector('html');
      let locale = 'en';
      if (htmlEl.hasAttribute('lang') && htmlEl.getAttribute('lang') !== '') {
        locale = htmlEl.getAttribute('lang');
      }

      if (fieldsContainer) {
        themeAddresses.AddressForm(fieldsContainer, locale, {
          shippingCountriesOnly: true,
        });
      }

      if (selectCountry && selectCountry.hasAttribute('data-default') && selectProvince && selectProvince.hasAttribute('data-default')) {
        selectCountry.addEventListener('change', function () {
          selectCountry.removeAttribute('data-default');
          selectProvince.removeAttribute('data-default');
        });
      }

      if (getRatesButton) {
        getRatesButton.addEventListener('click', function (e) {
          _disableButtons();
          const wrapper = document.querySelector(`#${_config.wrapperId}`);
          while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
          hideElement(wrapper);
          const shippingAddress = {};
          let elemCountryVal = selectCountry.value;
          let elemProvinceVal = selectProvince.value;
          const elemCountryData = selectCountry.getAttribute('data-default-fullname');
          if (elemCountryVal === '' && elemCountryData && elemCountryData !== '') {
            elemCountryVal = elemCountryData;
          }
          const elemProvinceData = selectProvince.getAttribute('data-default-fullname');
          if (elemProvinceVal === '' && elemProvinceData && elemProvinceData !== '') {
            elemProvinceVal = elemProvinceData;
          }
          shippingAddress.zip = document.querySelector('#address_zip').value || '';
          shippingAddress.country = elemCountryVal || '';
          shippingAddress.province = elemProvinceVal || '';
          _getCartShippingRatesForDestination(shippingAddress);
        });

        if (_config.customerIsLoggedIn && getRatesButton.classList.contains('get-rates--trigger')) {
          const zipElem = document.querySelector('#address_zip');
          if (zipElem && zipElem.value) {
            getRatesButton.dispatchEvent(new Event('click'));
          }
        }
      }
    };
    return {
      show: function (params) {
        params = params || {};
        Object.assign(_config, params);
        document.addEventListener('DOMContentLoaded', function () {
          _init();
        });
      },
      getConfig: function () {
        return _config;
      },
      formatRate: function (cents) {
        const price = cents === 0 ? window.theme.strings.free : themeCurrency.formatMoney(cents, theme.moneyFormat);
        return price;
      },
    };
  })();

  /**
   * A11y Helpers
   * -----------------------------------------------------------------------------
   * A collection of useful functions that help make your theme more accessible
   */

  /**
   * Moves focus to an HTML element
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects. Used in bindInPageLinks()
   * eg move focus to a modal that is opened. Used in trapFocus()
   *
   * @param {Element} container - Container DOM element to trap focus inside of
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   */
  function forceFocus(element, options) {
    options = options || {};

    var savedTabIndex = element.tabIndex;

    element.tabIndex = -1;
    element.dataset.tabIndex = savedTabIndex;
    element.focus();
    if (typeof options.className !== 'undefined') {
      element.classList.add(options.className);
    }
    element.addEventListener('blur', callback);

    function callback(event) {
      event.target.removeEventListener(event.type, callback);

      element.tabIndex = savedTabIndex;
      delete element.dataset.tabIndex;
      if (typeof options.className !== 'undefined') {
        element.classList.remove(options.className);
      }
    }
  }

  /**
   * If there's a hash in the url, focus the appropriate element
   * This compensates for older browsers that do not move keyboard focus to anchor links.
   * Recommendation: To be called once the page in loaded.
   *
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   * @param {string} options.ignore - Selector for elements to not include.
   */

  function focusHash(options) {
    options = options || {};
    var hash = window.location.hash;
    var element = document.getElementById(hash.slice(1));

    // if we are to ignore this element, early return
    if (element && options.ignore && element.matches(options.ignore)) {
      return false;
    }

    if (hash && element) {
      forceFocus(element, options);
    }
  }

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   * This compensates for older browsers that do not move keyboard focus to anchor links.
   * Recommendation: To be called once the page in loaded.
   *
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   * @param {string} options.ignore - CSS selector for elements to not include.
   */

  function bindInPageLinks(options) {
    options = options || {};
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'));

    function queryCheck(selector) {
      return document.getElementById(selector) !== null;
    }

    return links.filter(function (link) {
      if (link.hash === '#' || link.hash === '') {
        return false;
      }

      if (options.ignore && link.matches(options.ignore)) {
        return false;
      }

      if (!queryCheck(link.hash.substr(1))) {
        return false;
      }

      var element = document.querySelector(link.hash);

      if (!element) {
        return false;
      }

      link.addEventListener('click', function () {
        forceFocus(element, options);
      });

      return true;
    });
  }

  function focusable(container) {
    var elements = Array.prototype.slice.call(
      container.querySelectorAll('[tabindex],' + '[draggable],' + 'a[href],' + 'area,' + 'button:enabled,' + 'input:not([type=hidden]):enabled,' + 'object,' + 'select:enabled,' + 'textarea:enabled')
    );

    // Filter out elements that are not visible.
    // Copied from jQuery https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/src/css/hiddenVisibleSelectors.js
    return elements.filter(function (element) {
      return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
    });
  }

  /**
   * Traps the focus in a particular container
   *
   * @param {Element} container - Container DOM element to trap focus inside of
   * @param {Element} elementToFocus - Element to be focused on first
   * @param {Object} options - Settings unique to your theme
   * @param {string} options.className - Class name to apply to element on focus.
   */

  var trapFocusHandlers = {};

  function trapFocus(container, options) {
    options = options || {};
    var elements = focusable(container);
    var elementToFocus = options.elementToFocus || container;
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = function (event) {
      if (container !== event.target && !container.contains(event.target)) {
        first.focus();
      }

      if (event.target !== container && event.target !== last && event.target !== first) return;
      document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
      if (event.keyCode !== window.theme.keyboardKeys.TAB) return; // If not TAB key

      // On the last focusable element and tab forward, focus the first element.
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }

      //  On the first focusable element and tab backward, focus the last element.
      if ((event.target === container || event.target === first) && event.shiftKey) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    forceFocus(elementToFocus, options);
  }

  /**
   * Removes the trap of focus from the page
   */
  function removeTrapFocus() {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  }

  /**
   * Add a preventive message to external links and links that open to a new window.
   * @param {string} elements - Specific elements to be targeted
   * @param {object} options.messages - Custom messages to overwrite with keys: newWindow, external, newWindowExternal
   * @param {string} options.messages.newWindow - When the link opens in a new window (e.g. target="_blank")
   * @param {string} options.messages.external - When the link is to a different host domain.
   * @param {string} options.messages.newWindowExternal - When the link is to a different host domain and opens in a new window.
   * @param {object} options.prefix - Prefix to namespace "id" of the messages
   */
  function accessibleLinks(elements, options) {
    if (typeof elements !== 'string') {
      throw new TypeError(elements + ' is not a String.');
    }

    elements = document.querySelectorAll(elements);

    if (elements.length === 0) {
      return;
    }

    options = options || {};
    options.messages = options.messages || {};

    var messages = {
      newWindow: options.messages.newWindow || 'Opens in a new window.',
      external: options.messages.external || 'Opens external website.',
      newWindowExternal: options.messages.newWindowExternal || 'Opens external website in a new window.',
    };

    var prefix = options.prefix || 'a11y';

    var messageSelectors = {
      newWindow: prefix + '-new-window-message',
      external: prefix + '-external-message',
      newWindowExternal: prefix + '-new-window-external-message',
    };

    function generateHTML(messages) {
      var container = document.createElement('ul');
      var htmlMessages = Object.keys(messages).reduce(function (html, key) {
        return (html += '<li id=' + messageSelectors[key] + '>' + messages[key] + '</li>');
      }, '');

      container.setAttribute('hidden', true);
      container.innerHTML = htmlMessages;

      document.body.appendChild(container);
    }

    function externalSite(link) {
      return link.hostname !== window.location.hostname;
    }

    elements.forEach(function (link) {
      var target = link.getAttribute('target');
      var rel = link.getAttribute('rel');
      var isExternal = externalSite(link);
      var isTargetBlank = target === '_blank';
      var missingRelNoopener = rel === null || rel.indexOf('noopener') === -1;

      if (isTargetBlank && missingRelNoopener) {
        var relValue = rel === null ? 'noopener' : rel + ' noopener';
        link.setAttribute('rel', relValue);
      }

      if (isExternal && isTargetBlank) {
        link.setAttribute('aria-describedby', messageSelectors.newWindowExternal);
      } else if (isExternal) {
        link.setAttribute('aria-describedby', messageSelectors.external);
      } else if (isTargetBlank) {
        link.setAttribute('aria-describedby', messageSelectors.newWindow);
      }
    });

    generateHTML(messages);
  }

  var a11y = /*#__PURE__*/Object.freeze({
    __proto__: null,
    forceFocus: forceFocus,
    focusHash: focusHash,
    bindInPageLinks: bindInPageLinks,
    focusable: focusable,
    trapFocus: trapFocus,
    removeTrapFocus: removeTrapFocus,
    accessibleLinks: accessibleLinks
  });

  const slideDown = (target, duration = 500, showDisplay = 'block', checkHidden = true) => {
    let display = window.getComputedStyle(target).display;
    if (checkHidden && display !== 'none') {
      return;
    }
    target.style.removeProperty('display');
    if (display === 'none') display = showDisplay;
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  const slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  const slideToggle = (target, duration = 500, showDisplay = 'block') => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration, showDisplay);
    } else {
      return slideUp(target, duration);
    }
  };

  function FetchError(object) {
    this.status = object.status || null;
    this.headers = object.headers || null;
    this.json = object.json || null;
    this.body = object.body || null;
  }
  FetchError.prototype = Error.prototype;

  function fetchProduct(handle) {
    const requestRoute = `${window.theme.routes.root}products/${handle}.js`;

    return window
      .fetch(requestRoute)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const selectors = {
    saleClass: 'sale',
    soldClass: 'sold-out',
    doubleImage: 'double__image',
  };

  function formatPrices(product) {
    // Apprend classes for on sale and sold out
    const on_sale = product.price <= product.compare_at_price_min;
    let classes = on_sale ? selectors.saleClass : '';
    classes += product.available ? '' : selectors.soldClass;
    // Add 'from' before min price if price varies
    product.price = product.price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(product.price, theme.moneyFormat);
    product.price_with_from = product.price;
    if (product.price_varies) {
      const min = product.price_min === 0 ? window.theme.strings.free : themeCurrency.formatMoney(product.price_min, theme.moneyFormat);
      product.price_with_from = `<small>${window.theme.strings.from}</small> ${min}`;
    }

    // add a class if there's more than one media
    let double_class = '';
    if (product.media !== undefined) {
      if (product.media.length > 1) {
        double_class += selectors.doubleImage;
      }
    }

    const formatted = {
      ...product,
      classes,
      on_sale,
      double_class,
      sold_out: !product.available,
      sold_out_translation: window.theme.strings.soldOut,
      compare_at_price: themeCurrency.formatMoney(product.compare_at_price, theme.moneyFormat),
      compare_at_price_max: themeCurrency.formatMoney(product.compare_at_price_max, theme.moneyFormat),
      compare_at_price_min: themeCurrency.formatMoney(product.compare_at_price_min, theme.moneyFormat),
      price_max: themeCurrency.formatMoney(product.price_max, theme.moneyFormat),
      price_min: themeCurrency.formatMoney(product.price_min, theme.moneyFormat),
      unit_price: themeCurrency.formatMoney(product.unit_price, theme.moneyFormat),
    };
    return formatted;
  }

  const selectors$1 = {
    template: '[pair-product-template]',
    pairProducts: '[data-pair-products]',
    upsellButton: '[data-upsell-btn]',
    upsellButtonText: '[data-upsell-btn-text]',
  };

  class PairWithProduct {
    constructor(handle) {
      this.handle = handle;
      this.document = document;
      this.template = this.document.querySelector(selectors$1.template).innerHTML;
      this.pairProducts = this.document.querySelector(selectors$1.pairProducts);
      this.resizeEventUpsell = () => this.calcUpsellButtonDemensions();
      this.variant = null;
      this.variantObject = null;

      this.init();
    }

    init() {
      if (this.handle.includes('_')) {
        const parts = this.handle.split('_');
        this.handle = parts[0];
        this.variant = parts[1];
      }

      fetchProduct(this.handle)
        .then((response) => {
          if (response === undefined) {
            this.document.dispatchEvent(new CustomEvent('upsell-product-error'));

            return;
          }

          const formatted = formatPrices(response);

          let availableVariant = false;

          if (this.variant !== null) {
            formatted.variants.filter((variant) => {
              if (variant.id === Number(this.variant) && variant.available) {
                this.variantObject = variant;
                availableVariant = true;
              }

              return variant;
            });
          }

          if (formatted.available && this.variant === null) {
            this.renderPairProduct(formatted);
          } else if (availableVariant) {
            this.renderPairProduct(formatted);
          } else {
            this.pairProducts.innerHTML = '';
            this.document.dispatchEvent(new CustomEvent('upsell-unavailable'));
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }

    renderPairProduct(formatted) {
      const productMarkup = this.renderProduct(formatted);

      this.pairProducts.innerHTML = productMarkup;

      this.upsellButtonDemensions();
    }

    upsellButtonDemensions() {
      this.calcUpsellButtonDemensions();

      document.addEventListener('theme:resize', this.resizeEventUpsell);
    }

    calcUpsellButtonDemensions() {
      const upsellButtonText = this.pairProducts.querySelector(selectors$1.upsellButtonText);
      const button = this.pairProducts.querySelector(selectors$1.upsellButton);

      if (upsellButtonText) {
        button.style.setProperty('--btn-text-width', `${upsellButtonText.clientWidth}px`);
      }
    }

    renderProduct(currentProduct) {
      let media = null;
      let image = '';
      let firstAvailableVariant = '';
      let hasVariants = true;
      let hasUnitPrice = false;

      if (currentProduct.media !== undefined) {
        media = currentProduct.media[0];
      }

      if (this.variantObject !== null && this.variantObject.featured_media !== undefined) {
        media = this.variantObject.featured_media;
      }

      if (media) {
        image = {
          thumb: themeImages.getSizedImageUrl(media.preview_image.src, '480x480'),
        };
      } else {
        image = {
          thumb: window.theme.assets.no_image,
        };
      }

      if (currentProduct.options[0].name === 'Title' && currentProduct.options.length === 1 && currentProduct.options[0].values[0] === 'Default Title') {
        hasVariants = false;
      }

      if (this.variantObject === null) {
        for (let index = 0; index < currentProduct.variants.length; index++) {
          const variant = currentProduct.variants[index];

          if (variant.available) {
            const title = variant.title.replaceAll('/', '<span>&nbsp;</span>');
            hasUnitPrice = variant.unit_price !== undefined;
            const formatedVariant = formatPrices(variant);

            firstAvailableVariant = {
              ...formatedVariant,
              title,
              hasUnitPrice,
            };

            break;
          }
        }
      }

      if (this.variantObject !== null) {
        const title = this.variantObject.title.replaceAll('/', '<span>&nbsp;</span>');
        hasUnitPrice = this.variantObject.unit_price !== undefined;
        const formatedVariant = formatPrices(this.variantObject);

        firstAvailableVariant = {
          ...formatedVariant,
          title,
          hasUnitPrice,
        };
      }

      if (firstAvailableVariant === '') {
        return '';
      }

      const title = currentProduct.title.replace(/(<([^>]+)>)/gi, '');

      if (firstAvailableVariant.unit_price_measurement) {
        firstAvailableVariant.unitValue = firstAvailableVariant.unit_price_measurement.reference_unit;

        if (firstAvailableVariant.unit_price_measurement.reference_value !== 1) {
          firstAvailableVariant.unitCount = firstAvailableVariant.unit_price_measurement.reference_value;
        }
      }

      const updateValues = {
        ...currentProduct,
        title,
        image,
        firstAvailableVariant,
        hasVariants,
        addToCartText: theme.strings.upsellAddToCart,
        unitPriceLabel: theme.strings.unitPrice,
        unitPriceSeparator: theme.strings.unitPriceSeparator,
      };

      return Sqrl.render(this.template, {product: updateValues});
    }
  }

  const selectors$2 = {
    quantityHolder: '[data-quantity-holder]',
    quantityField: '[data-quantity-field]',
    quantityButton: '[data-quantity-button]',
    quantityMinusButton: '[data-quantity-minus]',
    quantityPlusButton: '[data-quantity-plus]',
    quantityReadOnly: 'read-only',
    isDisabled: 'is-disabled',
  };

  class QuantityCounter {
    constructor(holder, inCart = false) {
      this.holder = holder;
      this.quantityUpdateCart = inCart;
    }

    init() {
      // Settings
      this.settings = selectors$2;

      // DOM Elements
      this.quantity = this.holder.querySelector(this.settings.quantityHolder);

      if (!this.quantity) {
        return;
      }

      this.field = this.quantity.querySelector(this.settings.quantityField);
      this.buttons = this.quantity.querySelectorAll(this.settings.quantityButton);
      this.increaseButton = this.quantity.querySelector(this.settings.quantityPlusButton);

      // Set value or classes
      this.quantityValue = Number(this.field.value || 0);
      this.cartItemID = this.field.getAttribute('data-id');
      this.maxValue = Number(this.field.getAttribute('max')) > 0 ? Number(this.field.getAttribute('max')) : null;
      this.minValue = Number(this.field.getAttribute('min')) > 0 ? Number(this.field.getAttribute('min')) : 0;
      this.disableIncrease = this.disableIncrease.bind(this);

      // Flags
      this.emptyField = false;

      // Methods
      this.updateQuantity = this.updateQuantity.bind(this);
      this.decrease = this.decrease.bind(this);
      this.increase = this.increase.bind(this);

      this.disableIncrease();

      // Events
      if (!this.quantity.classList.contains(this.settings.quantityReadOnly)) {
        this.changeValueOnClick();
        this.changeValueOnInput();
      }
    }

    /**
     * Change field value when click on quantity buttons
     *
     * @return  {Void}
     */

    changeValueOnClick() {
      const that = this;

      this.buttons.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const clickedElement = event.target;
          const isDescrease = clickedElement.matches(that.settings.quantityMinusButton) || clickedElement.closest(that.settings.quantityMinusButton);
          const isIncrease = clickedElement.matches(that.settings.quantityPlusButton) || clickedElement.closest(that.settings.quantityPlusButton);

          if (isDescrease) {
            that.decrease();
          }

          if (isIncrease) {
            that.increase();
          }

          that.updateQuantity();
        });
      });
    }

    /**
     * Change field value when input new value in a field
     *
     * @return  {Void}
     */

    changeValueOnInput() {
      const that = this;

      this.field.addEventListener(
        'input',
        function () {
          that.quantityValue = this.value;

          if (this.value === '') {
            that.emptyField = true;
          }

          that.updateQuantity();
        },
        this
      );
    }

    /**
     * Update field value
     *
     * @return  {Void}
     */

    updateQuantity() {
      if (this.maxValue < this.quantityValue && this.maxValue !== null) {
        this.quantityValue = this.maxValue;
      }

      if (this.minValue > this.quantityValue) {
        this.quantityValue = this.minValue;
      }

      this.field.value = this.quantityValue;

      this.disableIncrease();

      document.dispatchEvent(new CustomEvent('popout:updateValue'));

      if (this.quantityUpdateCart) {
        this.updateCart();
      }
    }

    /**
     * Decrease value
     *
     * @return  {Void}
     */

    decrease() {
      if (this.quantityValue > this.minValue) {
        this.quantityValue--;

        return;
      }

      this.quantityValue = 0;
    }

    /**
     * Increase value
     *
     * @return  {Void}
     */

    increase() {
      this.quantityValue++;
    }

    /**
     * Disable increase
     *
     * @return  {[type]}  [return description]
     */

    disableIncrease() {
      this.increaseButton.classList.toggle(this.settings.isDisabled, this.quantityValue >= this.maxValue && this.maxValue !== null);
    }

    /**
     * Update cart
     *
     * @return  {Void}
     */

    updateCart() {
      const event = new CustomEvent('update-cart', {
        bubbles: true,
        detail: {
          id: this.cartItemID,
          quantity: this.quantityValue,
          valueIsEmpty: this.emptyField,
        },
      });

      this.holder.dispatchEvent(event);
    }
  }

  const settings = {
    cartDrawerEnabled: window.theme.cartDrawerEnabled,
    times: {
      timeoutAddProduct: 1000,
      closeDropdownAfter: 5000,
    },
    classes: {
      hidden: 'is-hidden',
      added: 'is-added',
      htmlClasses: 'has-open-cart-dropdown',
      open: 'is-open',
      active: 'is-active',
      visible: 'is-visible',
      loading: 'is-loading',
      disabled: 'is-disabled',
      success: 'is-success',
      error: 'has-error',
      headerStuck: 'js__header__stuck',
      drawerVisible: 'drawer--visible',
    },
    attributes: {
      transparent: 'data-header-transparent',
      upsellButton: 'data-upsell-btn',
    },
    elements: {
      html: 'html',
      outerSection: '[data-section-id]',
      cartDropdown: '[data-cart-dropdown]',
      cartDropdownBody: '[data-cart-dropdown-body]',
      emptyMessage: '[data-empty-message]',
      buttonHolder: '[data-foot-holder]',
      itemsHolder: '[data-items-holder]',
      item: '[data-item]',
      cartToggleElement: '[data-cart-toggle]',
      cartItemRemove: '[data-item-remove]',
      cartCount: '[data-cart-count]',
      cartCountValue: 'data-cart-count',
      clickedElementForExpanding: '[data-expand-button]',
      cartWidget: '[data-cart-widget]',
      cartTotal: '[data-cart-total]',
      cartMessage: '[data-cart-message]',
      cartMessageValue: 'data-cart-message',
      buttonAddToCart: '[data-add-to-cart]',
      formErrorsContainer: '[data-cart-errors-container]',
      cartErrors: '[data-cart-errors]',
      cartCloseError: '[data-cart-error-close]',
      formCloseError: '[data-close-error]',
      quickAddHolder: '[data-quick-add-holder]',
      cartProgress: '[data-cart-progress]',
      cartProgressBar: '[data-cart-progress-bar]',
      cartOriginalTotal: '[data-cart-original-total]',
      cartOriginaTotalPrice: '[data-cart-original-total-price]',
      cartDiscountsHolder: '[data-cart-discounts-holder]',
      headerWrapper: '[data-header-wrapper]',
      burgerButton: '[data-drawer-toggle]',
      upsellHolder: '[data-upsell-holder]',
      errorMessage: '[data-error-message]',
      navDrawer: '[data-drawer]',
      pairProductsHolder: '[data-pair-products-holder]',
      pairProducts: '[data-pair-products]',
      buttonSkipPairProduct: '[data-skip-pair-product]',
      productIDAttribute: 'data-product-id',
      leftToSpend: '[data-left-to-spend]',
    },
    formatMoney: theme.moneyFormat,
    cartTotalDiscountsTemplate: '[data-cart-total-discount]',
  };

  class CartDrawer {
    constructor() {
      if (window.location.pathname === '/password') {
        return;
      }

      this.init();
    }

    init() {
      this.settings = settings;

      // DOM Elements
      this.document = document;
      this.html = this.document.querySelector(this.settings.elements.html);
      this.cartDropdown = this.document.querySelector(this.settings.elements.cartDropdown);
      this.cartDropdownBody = this.document.querySelector(this.settings.elements.cartDropdownBody);
      this.emptyMessage = this.document.querySelector(this.settings.elements.emptyMessage);
      this.buttonHolder = this.document.querySelector(this.settings.elements.buttonHolder);
      this.itemsHolder = this.document.querySelector(this.settings.elements.itemsHolder);
      this.items = this.document.querySelectorAll(this.settings.elements.item);
      this.counterHolders = this.document.querySelectorAll(this.settings.elements.cartCount);
      this.cartTotal = this.document.querySelector(this.settings.elements.cartTotal);
      this.cartMessage = this.document.querySelectorAll(this.settings.elements.cartMessage);
      this.cartOriginalTotal = this.document.querySelector(this.settings.elements.cartOriginalTotal);
      this.cartOriginaTotalPrice = this.document.querySelector(this.settings.elements.cartOriginaTotalPrice);
      this.cartDiscountHolder = this.document.querySelector(this.settings.elements.cartDiscountsHolder);
      this.clickedElementForExpanding = this.document.querySelectorAll(this.settings.elements.clickedElementForExpanding);
      this.cartTotalDiscountTemplate = this.document.querySelector(this.settings.cartTotalDiscountsTemplate).innerHTML;
      this.cartErrorHolder = this.document.querySelector(this.settings.elements.cartErrors);
      this.cartCloseErrorMessage = this.document.querySelector(this.settings.elements.cartCloseError);
      this.headerWrapper = this.document.querySelector(this.settings.elements.headerWrapper);
      this.accessibility = a11y;
      this.navDrawer = this.document.querySelector(this.settings.elements.navDrawer);
      this.pairProductsHolder = this.document.querySelector(this.settings.elements.pairProductsHolder);
      this.pairProducts = this.document.querySelector(this.settings.elements.pairProducts);

      this.form = null;

      this.build = this.build.bind(this);

      // AJAX request
      this.addToCart = this.addToCart.bind(this);
      this.updateCart = this.updateCart.bind(this);

      // Cart events
      this.openCartDropdown = this.openCartDropdown.bind(this);
      this.closeCartDropdown = this.closeCartDropdown.bind(this);
      this.toggleCartDropdown = this.toggleCartDropdown.bind(this);

      // Checking
      this.hasItemsInCart = this.hasItemsInCart.bind(this);

      // Set classes
      this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this);

      // Flags
      this.cartDropdownIsBuilded = this.items.length > 0;
      this.totalItems = this.cartDropdownIsBuilded;
      this.cartDropdownIsOpen = false;
      this.cartDiscounts = 0;
      this.cartDrawerEnabled = this.settings.cartDrawerEnabled;
      this.cartLimitErrorIsHidden = true;

      // Cart Events
      this.eventToggleCart();
      this.expandEvents();
      this.cartEvents();
      this.cartEventAdd();

      // Init quantity for fields
      this.initQuantity();

      this.customEventAddProduct();

      // Init estimate shipping calculator
      this.estimateShippingCalculator();

      // Attributes
      if (this.cartMessage.length > 0) {
        this.cartFreeLimitShipping = Number(this.cartMessage[0].getAttribute('data-limit')) * 100;
        this.subtotal = 0;
        this.circumference = 28 * Math.PI; // radius - stroke * 4 * PI

        this.cartBarProgress();
      }

      // Pair with
      this.pairWithArray = window.pairWithProducts;
      this.sessionStorage = window.sessionStorage;
      this.getEnablePairProducts();
      this.renderPairProducts();
      this.pairProductSkipEvent();

      this.document.addEventListener('upsell-unavailable', () => {
        this.checkPairProductIsSoldOut();
      });
    }

    /**
     * Init quantity field functionality
     *
     * @return  {Void}
     */

    initQuantity() {
      this.items = this.document.querySelectorAll(this.settings.elements.item);

      this.items.forEach((item) => {
        const initQuantity = new QuantityCounter(item, true);

        initQuantity.init();
        this.customEventsHandle(item);
      });
    }

    /**
     * Expand blocks and close siblings
     *
     * @return  {Void}
     */

    expandEvents() {
      const holders = this.document.querySelectorAll(this.settings.elements.cartWidget);

      this.clickedElementForExpanding.forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault();

          const holder = this.document.querySelector(item.getAttribute('href'));

          item.classList.toggle(this.settings.classes.active);
          slideToggle(holder, 400);

          if (holders.length > 1) {
            holders.forEach((content) => {
              if (content !== holder.parentElement) {
                const buttonExpand = content.querySelector(this.settings.elements.clickedElementForExpanding);

                buttonExpand.classList.remove(this.settings.classes.active);

                slideUp(buttonExpand.nextElementSibling, 400);
              }
            });
          }
        });
      });
    }

    /**
     * Custom event who change the cart
     *
     * @return  {Void}
     */

    customEventsHandle(holder) {
      holder.addEventListener(
        'update-cart',
        debounce((event) => {
          this.updateCart(
            {
              id: event.detail.id,
              quantity: event.detail.quantity,
            },
            holder,
            event.detail.valueIsEmpty
          );
        }, 500)
      );
    }

    /**
     *  Custom event for add product to the cart
     */
    customEventAddProduct() {
      this.html.addEventListener(
        'cart:add-to-cart',
        debounce((event) => {
          this.addToCart(`id=${event.detail.data.id}`, event.detail);
        }, 500)
      );
    }

    /**
     * Cart events
     *
     * @return  {Void}
     */

    cartEvents() {
      const that = this;
      const cartItemRemove = this.document.querySelectorAll(that.settings.elements.cartItemRemove);

      cartItemRemove.forEach((item) => {
        item.addEventListener('click', function (event) {
          event.preventDefault();

          that.updateCart({
            id: this.getAttribute('data-id'),
            quantity: 0,
          });
        });
      });

      if (this.cartCloseErrorMessage) {
        this.cartCloseErrorMessage.addEventListener('click', (event) => {
          event.preventDefault();

          slideUp(this.cartErrorHolder, 400);
        });
      }
    }

    /**
     * Cart event add product to cart
     *
     * @return  {Void}
     */

    cartEventAdd() {
      this.document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.matches(this.settings.elements.buttonAddToCart) || (clickedElement.closest(this.settings.elements.buttonAddToCart) && clickedElement)) {
          let formData = '';
          let button = clickedElement.matches(this.settings.elements.buttonAddToCart) ? clickedElement : clickedElement.closest(this.settings.elements.buttonAddToCart);

          if (button.hasAttribute(this.settings.elements.productIDAttribute)) {
            formData = `id=${Number(button.getAttribute(this.settings.elements.productIDAttribute))}`;
          } else {
            this.form = clickedElement.closest('form');
            formData = new FormData(this.form);
            formData = new URLSearchParams(formData).toString();
          }

          if (this.form !== null && this.form.querySelector('[type="file"]')) {
            return;
          }

          event.preventDefault();

          if (clickedElement.hasAttribute('disabled') || clickedElement.parentNode.hasAttribute('disabled')) {
            return;
          }

          this.addToCart(formData, null, button);

          this.html.dispatchEvent(
            new CustomEvent('cart:add-item', {
              bubbles: true,
              detail: {
                selector: clickedElement,
              },
            })
          );
        }
      });
    }

    /**
     * Estimate shippint calculator
     *
     * @return  {Void}
     */

    estimateShippingCalculator() {
      Shopify.Cart.ShippingCalculator.show({
        submitButton: theme.strings.shippingCalcSubmitButton,
        submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
        customerIsLoggedIn: theme.customerLoggedIn,
        moneyFormat: theme.moneyWithCurrencyFormat,
      });
    }

    /**
     * Get response from the cart
     *
     * @return  {Void}
     */

    getCart() {
      fetch(theme.routes.root + 'cart.js')
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          this.updateCounter(response.item_count);
          this.newTotalItems = response.items.length;

          this.buildTotalPrice(response);
          this.freeShippingMessageHandle(response.total_price);

          if (this.cartMessage.length > 0) {
            this.subtotal = response.total_price;
            this.updateProgress();
          }

          return fetch(theme.routes.cart + '?section_id=api-cart-items');
        })
        .then((response) => response.text())
        .then((response) => {
          const element = document.createElement('div');
          element.innerHTML = response;

          if (element.querySelector('script')) {
            this.pairWithArray = JSON.parse(element.querySelector('script').innerText.split('=')[1].replace(';', ''));
          } else {
            this.pairWithArray = undefined;
          }

          this.getEnablePairProducts();
          this.renderPairProducts();

          const cleanResponse = element.querySelector('[data-api-content]').innerHTML;
          this.build(cleanResponse);
        })
        .catch((error) => console.log(error));
    }

    /**
     * Add item(s) to the cart and show the added item(s)
     *
     * @param   {String}  data
     * @param   {DOM Element/Object}  quickAddHolder
     * @param   {DOM Element}  button
     *
     * @return  {Void}
     */

    addToCart(data, quickAddHolder = null, button = null, json = null) {
      // Get Quick Add form
      if (this.form === null && quickAddHolder !== null && quickAddHolder.label) {
        this.form = quickAddHolder.label.parentNode.querySelector('form');
      }

      if (this.cartDrawerEnabled && button) {
        button.classList.add(this.settings.classes.loading);
      }

      fetch(theme.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          if (button) {
            button.setAttribute('disabled', 'disabled');
          }

          if (response.status) {
            if (quickAddHolder !== null) {
              this.addToCartError(response, quickAddHolder.element, button);
            } else {
              this.addToCartError(response, null, button);
            }

            return;
          }

          if (this.cartDrawerEnabled) {
            if (quickAddHolder !== null && quickAddHolder.label) {
              quickAddHolder.label.classList.remove(this.settings.classes.hidden, this.settings.classes.loading);
              quickAddHolder.label.classList.add(this.settings.classes.added);
            }

            this.getCart();

            setTimeout(() => {
              if (button !== null) {
                button.classList.remove(this.settings.classes.loading);
                button.removeAttribute('disabled');
                button.classList.add(this.settings.classes.success);

                document.dispatchEvent(new CustomEvent('product:bar:button', {bubbles: false}));

                if (button.closest(this.settings.elements.pairProductsHolder)) {
                  setTimeout(() => {
                    button.classList.remove(this.settings.classes.success);
                  }, this.settings.times.timeoutAddProduct * 2);
                }
              }

              if (this.cartDropdown) {
                this.openCartDropdown();
                this.cartDropdownIsOpen = true;
              }
            }, this.settings.times.timeoutAddProduct);
          } else {
            window.location = theme.routes.cart;
          }
        })
        .catch((error) => console.log(error));
    }

    /**
     * Update cart
     *
     * @param   {Object}  updateData
     *
     * @return  {Void}
     */

    updateCart(updateData = {}, holder = null, valueIsEmpty = false) {
      let newCount = null;
      let oldCount = null;
      let newItem = null;
      let settedQuantity = updateData.quantity;

      if (holder !== null) {
        holder.closest(this.settings.elements.item).classList.add(this.settings.classes.loading);
      }

      this.items.forEach((item) => {
        item.classList.add(this.settings.classes.disabled);
        item.querySelector('input').blur();
      });

      fetch(theme.routes.root + 'cart.js')
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          const matchKeys = (item) => item.key === updateData.id;
          const index = response.items.findIndex(matchKeys);
          oldCount = response.item_count;
          newItem = response.items[index].title;

          const data = {
            line: `${index + 1}`,
            quantity: settedQuantity,
          };

          return fetch(theme.routes.root + 'cart/change.js', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
        })
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          newCount = response.item_count;

          if (valueIsEmpty) {
            settedQuantity = 1;
          }

          if (settedQuantity !== 0) {
            this.cartLimitErrorIsHidden = newCount !== oldCount;

            this.toggleLimitError(newItem);
          }

          this.updateCounter(newCount);

          // Change the cart total and hide message if missing discounts and the changed product is not deleted
          this.buildTotalPrice(response);
          this.freeShippingMessageHandle(response.total_price);
          this.cartDiscounts = response.total_discount;

          // Build cart again if the quantity of the changed product is 0 or cart discounts are changed
          if (this.cartMessage.length > 0) {
            this.subtotal = response.total_price;
            this.updateProgress();
          }

          this.getCart();
        })
        .catch((error) => console.log(error));
    }

    /**
     * Show/hide limit error
     *
     * @param   {String}  itemTitle
     *
     * @return  {Void}
     */

    toggleLimitError(itemTitle) {
      this.cartErrorHolder.querySelector(this.settings.elements.errorMessage).innerText = itemTitle;

      if (this.cartLimitErrorIsHidden) {
        slideUp(this.cartErrorHolder, 400);
      } else {
        slideDown(this.cartErrorHolder, 400);
      }
    }

    /**
     * Handle errors
     *
     * @param   {Object}  response
     *
     * @return  {Object}
     */

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }

    /**
     * Add to cart error handle
     *
     * @param   {Object}  data
     * @param   {DOM Element/Null} quickAddHolder
     * @param   {DOM Element/Null} button
     *
     * @return  {Void}
     */

    addToCartError(data, quickAddHolder, button) {
      if (this.cartDrawerEnabled && button && button.closest(this.settings.elements.cartDropdown) !== null && !button.closest(this.settings.elements.cartDropdown)) {
        this.closeCartDropdown();
      }
      const outerSection = button.closest(this.settings.elements.outerSection);
      let errorContainer = outerSection.querySelector(this.settings.elements.formErrorsContainer);

      if (button !== null) {
        const buttonUpsellHolder = button.closest(this.settings.elements.upsellHolder);
        if (buttonUpsellHolder && buttonUpsellHolder.querySelector(this.settings.elements.formErrorsContainer)) {
          errorContainer = buttonUpsellHolder.querySelector(this.settings.elements.formErrorsContainer);
        }
        button.classList.remove(this.settings.classes.loading);
        button.removeAttribute('disabled');

        document.dispatchEvent(new CustomEvent('product:bar:button', {bubbles: false}));
      }

      if (errorContainer) {
        errorContainer.innerHTML = `<div class="errors">${data.message}: ${data.description}<span class="errors__close" data-close-error><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close-thin" viewBox="0 0 27 27"><g stroke="#979797" fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M.5.5l26 26M26.5.5l-26 26"></path></g></svg></span></div>`;

        errorContainer.classList.add(this.settings.classes.visible);

        document.dispatchEvent(new CustomEvent('product:bar:error', {bubbles: false}));
      }

      if (quickAddHolder) {
        this.html.dispatchEvent(
          new CustomEvent('cart:add-to-error', {
            bubbles: true,
            detail: {
              message: data.message,
              description: data.description,
              holder: quickAddHolder,
            },
          })
        );
      }

      this.document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.matches(this.settings.elements.formCloseError) || clickedElement.closest(this.settings.elements.formCloseError)) {
          event.preventDefault();

          errorContainer.classList.remove(this.settings.classes.visible);
        }
      });
    }

    /**
     * Open cart dropdown and add class on body
     *
     * @return  {Void}
     */

    openCartDropdown() {
      document.dispatchEvent(
        new CustomEvent('theme:drawer:close', {
          bubbles: false,
        })
      );

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDropdown}));
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDropdownBody}));

      this.html.classList.add(this.settings.classes.htmlClasses);
      this.cartDropdown.classList.add(this.settings.classes.open);

      this.accessibility.removeTrapFocus();
      this.accessibility.trapFocus(this.cartDropdown, {
        elementToFocus: this.cartDropdown.querySelector('a:first-child, input:first-child'),
      });

      if (!this.cartDropdownIsBuilded) {
        this.getCart();
      }

      // Observe Additional Checkout Buttons
      this.observeAdditionalCheckoutButtons();
    }

    /**
     * Close cart dropdown and remove class on body
     *
     * @return  {Void}
     */

    closeCartDropdown() {
      this.document.dispatchEvent(
        new CustomEvent('theme:cart-close', {
          bubbles: true,
        })
      );

      this.accessibility.removeTrapFocus();

      slideUp(this.cartErrorHolder, 400);

      if (this.html.classList.contains('is-focused')) {
        const button = this.document.querySelector(`${this.settings.elements.cartToggleElement}[data-focus-element]`);

        setTimeout(() => {
          button.focus();
        }, 200);
      }

      const upsellButton = this.document.querySelector(`[${this.settings.attributes.upsellButton}].${this.settings.classes.success}`);

      if (upsellButton) {
        setTimeout(() => {
          upsellButton.classList.remove(this.settings.classes.success);
        }, 2000);
      }

      this.html.classList.remove(this.settings.classes.htmlClasses);
      this.cartDropdown.classList.remove(this.settings.classes.open);

      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    /**
     * Toggle cart dropdown
     *
     * @return  {Void}
     */

    toggleCartDropdown() {
      this.cartDropdownIsOpen = !this.cartDropdownIsOpen;

      if (this.cartDropdownIsOpen) {
        this.openCartDropdown();
      } else {
        this.closeCartDropdown();
      }
    }

    /**
     * Event click to element to open cart dropdown
     *
     * @return  {Void}
     */

    eventToggleCart() {
      this.document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const isNotCartButton = !(clickedElement.matches(this.settings.elements.cartToggleElement) || clickedElement.closest(this.settings.elements.cartToggleElement));
        const isNotCartDropdownOrCartDropdownChild = !(clickedElement.matches(this.settings.elements.cartDropdown) || clickedElement.closest(this.settings.elements.cartDropdown));
        const isNotPairProduct = !(clickedElement.matches(this.settings.elements.buttonSkipPairProduct) || clickedElement.closest(this.settings.elements.buttonSkipPairProduct));

        if (clickedElement.matches(this.settings.elements.cartToggleElement) || clickedElement.closest(this.settings.elements.cartToggleElement)) {
          event.preventDefault();

          this.toggleCartDropdown();
        } else if (this.cartDropdownIsOpen && isNotCartButton && isNotCartDropdownOrCartDropdownChild && isNotPairProduct) {
          this.cartDropdownIsOpen = false;

          this.closeCartDropdown();
        }
      });
    }

    /**
     * Toggle classes on different containers and messages
     *
     * @return  {Void}
     */

    toggleClassesOnContainers() {
      const that = this;

      this.emptyMessage.classList.toggle(that.settings.classes.hidden, that.hasItemsInCart());
      this.buttonHolder.classList.toggle(that.settings.classes.hidden, !that.hasItemsInCart());
      this.itemsHolder.classList.toggle(that.settings.classes.hidden, !that.hasItemsInCart());
    }

    /**
     * Build cart depends on results
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */

    build(data) {
      if (this.totalItems !== this.newTotalItems) {
        this.totalItems = this.newTotalItems;

        this.toggleClassesOnContainers();
      }

      this.itemsHolder.innerHTML = data;

      this.cartEvents();
      this.initQuantity();
    }

    /**
     * Update cart count
     *
     * @param   {Number}  countItems
     *
     * @return  {Void}
     */

    updateCounter(countItems) {
      if (!this.counterHolders.length) {
        return;
      }

      this.counterHolders.forEach((holder) => {
        holder.innerHTML = countItems;
        holder.setAttribute(settings.elements.cartCountValue, countItems);
      });
    }

    /**
     * Check for items in the cart
     *
     * @return  {Void}
     */

    hasItemsInCart() {
      return this.totalItems > 0;
    }

    /**
     * Build total cart total price
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */

    buildTotalPrice(data) {
      if (data.original_total_price > data.total_price && data.cart_level_discount_applications.length > 0) {
        this.cartOriginalTotal.classList.remove(this.settings.classes.hidden);
        this.cartOriginaTotalPrice.innerHTML = data.original_total_price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(data.original_total_price, this.settings.formatMoney);
      } else {
        this.cartOriginalTotal.classList.add(this.settings.classes.hidden);
      }

      this.cartTotal.innerHTML = data.total_price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(data.total_price, this.settings.formatMoney);

      if (data.cart_level_discount_applications.length > 0) {
        const discountsMarkup = this.buildCartTotalDiscounts(data.cart_level_discount_applications);

        this.cartDiscountHolder.classList.remove(this.settings.classes.hidden);
        this.cartDiscountHolder.innerHTML = discountsMarkup;
      } else {
        this.cartDiscountHolder.classList.add(this.settings.classes.hidden);
      }
    }

    /**
     * Build cart total discounts
     *
     * @param   {Array}  discounts
     *
     * @return  {String}
     */

    buildCartTotalDiscounts(discounts) {
      let discountMarkup = '';

      discounts.forEach((discount) => {
        discountMarkup += Sqrl.render(this.cartTotalDiscountTemplate, {
          discountTitle: discount.title,
          discountTotalAllocatedAmount: themeCurrency.formatMoney(discount.total_allocated_amount, this.settings.formatMoney),
        });
      });

      return discountMarkup;
    }

    /**
     * Show/hide free shipping message
     *
     * @param   {Number}  total
     *
     * @return  {Void}
     */

    freeShippingMessageHandle(total) {
      if (this.cartMessage.length > 0) {
        this.document.querySelectorAll(this.settings.elements.cartMessage).forEach((message) => {
          const hasFreeShipping = message.hasAttribute(this.settings.elements.cartMessageValue) && message.getAttribute(this.settings.elements.cartMessageValue) === 'true' && total !== 0;
          const cartMessageClass = hasFreeShipping ? this.settings.classes.success : this.settings.classes.hidden;
          message.classList.remove(this.settings.classes.hidden);
          message.classList.toggle(cartMessageClass, total >= this.cartFreeLimitShipping || total === 0);
        });
      }
    }

    /**
     * Cart bar progress with message for free shipping
     *
     * @param   {Number}  progress
     *
     */
    cartBarProgress(progress = null) {
      this.document.querySelectorAll(this.settings.elements.cartProgress).forEach((element) => {
        this.setProgress(element, progress === null ? element.getAttribute('data-percent') : progress);
      });
      this.document.querySelectorAll(this.settings.elements.cartProgressBar).forEach((element) => {
        this.setProgressBar(element, progress === null ? element.getAttribute('value') : progress);
      });
    }

    /**
     * Set circle progress
     *
     * @param   {DOM Element}  holder
     * @param   {Number}       percent
     *
     * @return  {Void}
     */

    setProgress(holder, percent) {
      const offset = this.circumference - ((percent / 100) * this.circumference) / 2;

      holder.style.strokeDashoffset = offset;
    }

    /**
     * Set bar progress
     *
     * @param   {DOM Element}  holder
     * @param   {Number}       percent
     *
     * @return  {Void}
     */

    setProgressBar(holder, percent) {
      holder.value = percent;
    }

    /**
     * Update progress when update cart
     *
     * @return  {Void}
     */

    updateProgress() {
      const newPercentValue = (this.subtotal / this.cartFreeLimitShipping) * 100;
      const leftToSpend = themeCurrency.formatMoney(this.cartFreeLimitShipping - this.subtotal, this.settings.formatMoney);

      this.document.querySelectorAll(this.settings.elements.leftToSpend).forEach((element) => {
        element.innerHTML = leftToSpend.replace('.00', '');
      });

      this.cartBarProgress(newPercentValue > 100 ? 100 : newPercentValue);
    }

    /**
     * Render pair with products
     */
    renderPairProducts() {
      if (this.pairProductsHolder === null) {
        return;
      }

      if (this.pairWithArray === undefined || this.pairWithArray.length <= 0) {
        this.pairProductsHolder.classList.add(this.settings.classes.hidden);

        return;
      }

      new PairWithProduct(this.pairWithArray[0]);

      this.document.addEventListener('upsell-product-error', () => {
        this.checkPairProductIsSoldOut();
      });

      this.pairProductsHolder.classList.remove(this.settings.classes.hidden);
    }

    /**
     * Update pairWithArray only with uniq and available handles
     */
    getEnablePairProducts() {
      if (this.pairWithArray !== undefined && this.sessionStorage !== undefined && this.sessionStorage.getItem('pair_products') !== null) {
        this.pairWithArray = this.pairWithArray.filter((handle) => {
          return this.sessionStorage.getItem('pair_products').indexOf(`,${handle},`) === -1;
        });
      }
    }

    /**
     * Skip pair product
     */
    pairProductSkipEvent() {
      if (this.pairProductsHolder === null) {
        return;
      }

      this.pairProductsHolder.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches(this.settings.elements.buttonSkipPairProduct) || target.closest(this.settings.elements.buttonSkipPairProduct)) {
          event.preventDefault();

          // Add to session storage
          if (this.sessionStorage !== undefined) {
            this.sessionStorage.setItem(
              'pair_products',
              this.sessionStorage.getItem('pair_products') !== null ? `${this.sessionStorage.getItem('pair_products')},${this.pairWithArray[0]},` : `,${this.pairWithArray[0]},`
            );
          }

          this.getEnablePairProducts();

          if (this.pairWithArray.length <= 0) {
            this.pairProductsHolder.classList.add(this.settings.classes.hidden);
          } else {
            new PairWithProduct(this.pairWithArray[0]);
          }
        }
      });
    }

    /**
     * Check pair product is sold out
     */
    checkPairProductIsSoldOut() {
      if (this.sessionStorage !== undefined) {
        this.sessionStorage.setItem(
          'pair_products',
          this.sessionStorage.getItem('pair_products') !== null ? `${this.sessionStorage.getItem('pair_products')},${this.pairWithArray[0]},` : `,${this.pairWithArray[0]},`
        );

        this.getEnablePairProducts();

        if (this.pairWithArray.length <= 0) {
          this.pairProductsHolder.classList.add(this.settings.classes.hidden);
        } else {
          this.renderPairProducts();
        }
      }
    }

    observeAdditionalCheckoutButtons() {
      // identify an element to observe
      const additionalCheckoutButtons = this.cartDropdown.querySelector('.additional-checkout-buttons');
      if (additionalCheckoutButtons) {
        // create a new instance of `MutationObserver` named `observer`,
        // passing it a callback function
        const observer = new MutationObserver(() => {
          this.accessibility.removeTrapFocus();
          this.accessibility.trapFocus(this.cartDropdown, {
            elementToFocus: this.cartDropdown.querySelector('a:first-child, input:first-child'),
          });
          observer.disconnect();
        });

        // call `observe()` on that MutationObserver instance,
        // passing it the element to observe, and the options object
        observer.observe(additionalCheckoutButtons, {subtree: true, childList: true});
      }
    }
  }

  window.cart = new CartDrawer();

  const settings$1 = {
    elements: {
      html: 'html',
      body: 'body',
      inPageLink: '[data-skip-content]',
      linkesWithOnlyHash: 'a[href="#"]',
      triggerFocusElement: '[data-focus-element]',
      cartDropdown: '#cart-dropdown',
      search: '#search-popdown',
      accordionContent: '.accordion-content',
      tabs: '.tabs',
      accordionDataToggle: 'data-accordion-toggle',
    },
    classes: {
      focus: 'is-focused',
      open: 'is-open',
      accordionToggle: 'accordion-toggle',
      tabLink: 'tab-link',
    },
  };

  class Accessibility {
    constructor() {
      this.init();
    }

    init() {
      this.settings = settings$1;
      this.window = window;
      this.document = document;
      this.a11y = a11y;
      this.cart = this.window.cart;

      // DOM Elements
      this.inPageLink = this.document.querySelector(this.settings.elements.inPageLink);
      this.linkesWithOnlyHash = this.document.querySelectorAll(this.settings.elements.linkesWithOnlyHash);
      this.html = this.document.querySelector(this.settings.elements.html);
      this.body = this.document.querySelector(this.settings.elements.body);
      this.cartDropdown = this.document.querySelector(this.settings.elements.cartDropdown);
      this.lastFocused = null;

      // Flags
      this.isFocused = false;

      // A11Y init methods
      this.a11y.focusHash();
      this.a11y.bindInPageLinks();

      // Events
      this.clickEvents();
      this.focusEvents();
      this.focusEventsOff();
      this.closeExpandedElements();
    }

    /**
     * Clicked events accessibility
     *
     * @return  {Void}
     */

    clickEvents() {
      if (this.inPageLink) {
        this.inPageLink.addEventListener('click', (event) => {
          event.preventDefault();
        });
      }

      if (this.linkesWithOnlyHash) {
        this.linkesWithOnlyHash.forEach((item) => {
          item.addEventListener('click', (event) => {
            event.preventDefault();
          });
        });
      }
    }

    /**
     * Focus events
     *
     * @return  {Void}
     */

    focusEvents() {
      this.document.addEventListener('keyup', (event) => {
        if (event.keyCode !== window.theme.keyboardKeys.TAB) {
          return;
        }

        this.body.classList.add(this.settings.classes.focus);
        this.isFocused = true;
      });

      // Expand modals
      this.document.addEventListener('keyup', (event) => {
        if (!this.isFocused) {
          return;
        }

        const target = event.target;
        const pressEnterOrSpace = event.keyCode === window.theme.keyboardKeys.ENTER || event.keyCode === window.theme.keyboardKeys.SPACE;
        const targetElement = target.matches(this.settings.elements.triggerFocusElement) || target.closest(this.settings.elements.triggerFocusElement);
        const isAccordion =
          target.classList.contains(this.settings.classes.accordionToggle) ||
          target.parentNode.classList.contains(this.settings.classes.accordionToggle) ||
          target.hasAttribute(this.settings.elements.accordionDataToggle) ||
          target.parentNode.hasAttribute(this.settings.elements.accordionDataToggle);
        const isTab = target.classList.contains(this.settings.classes.tabLink) || target.parentNode.classList.contains(this.settings.classes.tabLink);

        const isSearchModal =
          target.hasAttribute('data-popdown-toggle') ||
          (target.closest(this.settings.elements.triggerFocusElement) && target.closest(this.settings.elements.triggerFocusElement).hasAttribute('data-popdown-toggle'));

        if (pressEnterOrSpace && targetElement) {
          if (this.lastFocused === null) {
            this.lastFocused = target;
          }

          let container = this.document.querySelector(this.settings.elements.cartDropdown);

          if (isSearchModal) {
            container = this.document.querySelector(this.settings.elements.search);
          }

          if (isAccordion) {
            container = target.nextElementSibling;
            target.click();
          }

          if (isTab) {
            const selector = `.tab-content-${target.getAttribute('data-tab')}`;

            container = this.document.querySelector(selector);
            target.click();
          }

          if (container.querySelector('a, input')) {
            this.a11y.trapFocus(container, {
              elementToFocus: container.querySelector('a:first-child, input:first-child'),
            });
          }
        }
      });

      // Focus addToCart button or quickview button
      this.html.addEventListener('cart:add-item', (event) => {
        this.lastFocused = event.detail.selector;
      });
    }

    /**
     * Focus events off
     *
     * @return  {Void}
     */

    focusEventsOff() {
      this.document.addEventListener('mousedown', () => {
        this.body.classList.remove(this.settings.classes.focus);
        this.isFocused = false;
      });
    }

    /**
     * Close expanded elements with when press escape
     *
     * @return  {Void}
     */

    closeExpandedElements() {
      document.addEventListener('keyup', (event) => {
        if (event.keyCode !== window.theme.keyboardKeys.ESCAPE) {
          return;
        }

        this.a11y.removeTrapFocus();

        if (this.html.classList.contains(this.cart.settings.classes.htmlClasses)) {
          this.cart.toggleCartDropdown();
          this.html.classList.remove(this.cart.settings.classes.htmlClasses);
          this.cartDropdown.classList.remove(this.cart.settings.classes.open);
        }

        const accordionContents = document.querySelectorAll(this.settings.elements.accordionContent);

        if (accordionContents.length) {
          for (let i = 0; i < accordionContents.length; i++) {
            if (accordionContents[i].style.display !== 'block') {
              continue;
            }

            const accordionArrow = accordionContents[i].previousElementSibling;
            accordionArrow.classList.remove(this.settings.classes.open);

            slideUp(accordionContents[i]);
          }
        }

        if (this.lastFocused !== null) {
          setTimeout(() => {
            this.lastFocused.focus();
            this.lastFocused = null;
          }, 600);
        }
      });
    }
  }

  window.accessibility = new Accessibility();

  theme.ProductModel = (function () {
    let modelJsonSections = {};
    let models = {};
    let xrButtons = {};
    const selectors = {
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productSlideshow: '[data-product-slideshow]',
      productXr: '[data-shopify-xr]',
      dataMediaId: 'data-media-id',
      dataModelId: 'data-model-id',
      dataModel3d: 'data-shopify-model3d-id',
      modelViewer: 'model-viewer',
      modelJson: '#ModelJson-',
      classMediaHidden: 'media--hidden',
      deferredMedia: '[data-deferred-media]',
      deferredMediaButton: '[data-deferred-media-button]',
    };
    const classes = {
      isLoading: 'is-loading',
    };

    function init(mediaContainer, sectionId) {
      modelJsonSections[sectionId] = {
        loaded: false,
      };

      const deferredMediaButton = mediaContainer.querySelector(selectors.deferredMediaButton);

      if (deferredMediaButton) {
        deferredMediaButton.addEventListener('click', loadContent.bind(this, mediaContainer, sectionId));
      }
    }

    function loadContent(mediaContainer, sectionId) {
      if (mediaContainer.querySelector(selectors.deferredMedia).getAttribute('loaded')) {
        return;
      }

      mediaContainer.classList.add(classes.isLoading);
      const content = document.createElement('div');
      content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
      const modelViewerElement = content.querySelector('model-viewer');
      const deferredMedia = mediaContainer.querySelector(selectors.deferredMedia);
      deferredMedia.appendChild(modelViewerElement).focus();
      deferredMedia.setAttribute('loaded', true);
      const mediaId = mediaContainer.dataset.mediaId;
      const modelId = modelViewerElement.dataset.modelId;
      const xrButton = mediaContainer.closest(selectors.productSlideshow).parentElement.querySelector(selectors.productXr);
      xrButtons[sectionId] = {
        element: xrButton,
        defaultId: modelId,
      };

      models[mediaId] = {
        modelId: modelId,
        mediaId: mediaId,
        sectionId: sectionId,
        container: mediaContainer,
        element: modelViewerElement,
      };

      window.Shopify.loadFeatures([
        {
          name: 'shopify-xr',
          version: '1.0',
          onLoad: setupShopifyXr,
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: setupModelViewerUi,
        },
      ]);
    }

    function setupShopifyXr(errors) {
      if (errors) {
        console.warn(errors);
        return;
      }
      if (!window.ShopifyXR) {
        document.addEventListener('shopify_xr_initialized', function () {
          setupShopifyXr();
        });
        return;
      }

      for (const sectionId in modelJsonSections) {
        if (modelJsonSections.hasOwnProperty(sectionId)) {
          const modelSection = modelJsonSections[sectionId];
          if (modelSection.loaded) {
            continue;
          }

          const modelJson = document.querySelector(`${selectors.modelJson}${sectionId}`);
          if (modelJson) {
            window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
            modelSection.loaded = true;
          }
        }
      }
      window.ShopifyXR.setupXRElements();
    }

    function setupModelViewerUi(errors) {
      if (errors) {
        console.warn(errors);
        return;
      }

      for (const key in models) {
        if (models.hasOwnProperty(key)) {
          const model = models[key];
          if (!model.modelViewerUi) {
            model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
          }
          setupModelViewerListeners(model);
        }
      }
    }

    function setupModelViewerListeners(model) {
      const xrButton = xrButtons[model.sectionId];

      model.container.addEventListener('mediaVisible', function () {
        xrButton.element.setAttribute(selectors.dataModel3d, model.modelId);

        pauseOtherMedia(model.mediaId);

        if (window.theme.touched) {
          return;
        }
        model.modelViewerUi.play();
      });

      model.container.addEventListener('mediaHidden', function () {
        model.modelViewerUi.pause();
      });

      model.container.addEventListener('xrLaunch', function () {
        model.modelViewerUi.pause();
      });

      model.element.addEventListener('load', () => {
        model.container.classList.remove(classes.isLoading);
        pauseOtherMedia(model.mediaId);
      });

      model.element.addEventListener('shopify_model_viewer_ui_toggle_play', function () {
        pauseOtherMedia(model.mediaId);
      });
    }

    function pauseOtherMedia(mediaId) {
      const mediaIdString = `[${selectors.dataMediaId}="${mediaId}"]`;
      const currentMedia = document.querySelector(`${selectors.productMediaWrapper}${mediaIdString}`);
      const otherMedia = document.querySelectorAll(`${selectors.productMediaWrapper}:not(${mediaIdString})`);

      currentMedia.classList.remove(selectors.classMediaHidden);
      if (otherMedia.length) {
        otherMedia.forEach((element) => {
          element.dispatchEvent(new CustomEvent('mediaHidden'));
          element.classList.add(selectors.classMediaHidden);
        });
      }
    }

    function removeSectionModels(sectionId) {
      for (const key in models) {
        if (models.hasOwnProperty(key)) {
          const model = models[key];
          if (model.sectionId === sectionId) {
            delete models[key];
          }
        }
      }
      delete modelJsonSections[sectionId];
      delete theme.mediaInstances[sectionId];
    }

    return {
      init: init,
      loadContent: loadContent,
      removeSectionModels: removeSectionModels,
    };
  })();

  const selectors$3 = {
    templateAddresses: '.template-addresses',
    addressNewForm: '#AddressNewForm',
    btnNew: '.address-new-toggle',
    btnEdit: '.address-edit-toggle',
    btnDelete: '.address-delete',
    classHide: 'hide',
    dataFormId: 'data-form-id',
    dataConfirmMessage: 'data-confirm-message',
    defaultConfirmMessage: 'Are you sure you wish to delete this address?',
    editAddress: '#EditAddress',
    addressCountryNew: 'AddressCountryNew',
    addressProvinceNew: 'AddressProvinceNew',
    addressProvinceContainerNew: 'AddressProvinceContainerNew',
    addressCountryOption: '.address-country-option',
    addressCountry: 'AddressCountry',
    addressProvince: 'AddressProvince',
    addressProvinceContainer: 'AddressProvinceContainer',
  };

  class Addresses {
    constructor(section) {
      this.section = section;
      this.addressNewForm = this.section.querySelector(selectors$3.addressNewForm);

      this.init();
    }

    init() {
      if (this.addressNewForm) {
        const section = this.section;
        const newAddressForm = this.addressNewForm;
        this.customerAddresses();

        const newButtons = section.querySelectorAll(selectors$3.btnNew);
        if (newButtons.length) {
          newButtons.forEach((element) => {
            element.addEventListener('click', function () {
              newAddressForm.classList.toggle(selectors$3.classHide);
            });
          });
        }

        const editButtons = section.querySelectorAll(selectors$3.btnEdit);
        if (editButtons.length) {
          editButtons.forEach((element) => {
            element.addEventListener('click', function () {
              const formId = this.getAttribute(selectors$3.dataFormId);
              section.querySelector(`${selectors$3.editAddress}_${formId}`).classList.toggle(selectors$3.classHide);
            });
          });
        }

        const deleteButtons = section.querySelectorAll(selectors$3.btnDelete);
        if (deleteButtons.length) {
          deleteButtons.forEach((element) => {
            element.addEventListener('click', function () {
              const formId = this.getAttribute(selectors$3.dataFormId);
              const confirmMessage = this.getAttribute(selectors$3.dataConfirmMessage);
              if (confirm(confirmMessage || selectors$3.defaultConfirmMessage)) {
                Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
              }
            });
          });
        }
      }
    }

    customerAddresses() {
      // Initialize observers on address selectors, defined in shopify_common.js
      if (Shopify.CountryProvinceSelector) {
        new Shopify.CountryProvinceSelector(selectors$3.addressCountryNew, selectors$3.addressProvinceNew, {
          hideElement: selectors$3.addressProvinceContainerNew,
        });
      }

      // Initialize each edit form's country/province selector
      const countryOptions = this.section.querySelectorAll(selectors$3.addressCountryOption);
      countryOptions.forEach((element) => {
        const formId = element.getAttribute(selectors$3.dataFormId);
        const countrySelector = `${selectors$3.addressCountry}_${formId}`;
        const provinceSelector = `${selectors$3.addressProvince}_${formId}`;
        const containerSelector = `${selectors$3.addressProvinceContainer}_${formId}`;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector,
        });
      });
    }
  }

  const template = document.querySelector(selectors$3.templateAddresses);
  if (template) {
    new Addresses(template);
  }

  const selectors$4 = {
    accountTemplateLogged: '.customer-logged-in',
    account: '.account',
    accountSidebarMobile: '.account-sidebar--mobile',
  };

  class Account {
    constructor(section) {
      this.section = section;

      this.init();
    }

    init() {
      if (this.section.querySelector(selectors$4.account)) {
        this.accountMobileSidebar();
      }
    }

    accountMobileSidebar() {
      this.section.querySelector(selectors$4.accountSidebarMobile).addEventListener('click', function () {
        const nextElem = this.nextElementSibling;

        if (nextElem && nextElem.tagName === 'UL') {
          nextElem.classList.toggle('visible');
        }
      });
    }
  }

  const template$1 = document.querySelector(selectors$4.accountTemplateLogged);
  if (template$1) {
    new Account(template$1);
  }

  const selectors$5 = {
    form: '[data-account-form]',
    showReset: '[data-show-reset]',
    hideReset: '[data-hide-reset]',
    recover: '[data-recover-password]',
    login: '[data-login-form]',
    recoverHash: '#recover',
    hideClass: 'is-hidden',
  };

  class Login {
    constructor(form) {
      this.form = form;
      this.showButton = form.querySelector(selectors$5.showReset);
      this.hideButton = form.querySelector(selectors$5.hideReset);
      this.recover = form.querySelector(selectors$5.recover);
      this.login = form.querySelector(selectors$5.login);
      this.init();
    }

    init() {
      if (window.location.hash == selectors$5.recoverHash) {
        this.showRecoverPasswordForm();
      } else {
        this.hideRecoverPasswordForm();
      }
      this.showButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          this.showRecoverPasswordForm();
        }.bind(this),
        false
      );
      this.hideButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          this.hideRecoverPasswordForm();
        }.bind(this),
        false
      );
    }

    showRecoverPasswordForm() {
      this.login.classList.add(selectors$5.hideClass);
      this.recover.classList.remove(selectors$5.hideClass);
      window.location.hash = selectors$5.recoverHash;
      return false;
    }

    hideRecoverPasswordForm() {
      this.recover.classList.add(selectors$5.hideClass);
      this.login.classList.remove(selectors$5.hideClass);
      window.location.hash = '';
      return false;
    }
  }

  const loginForm = document.querySelector(selectors$5.form);
  if (loginForm) {
    new Login(loginForm);
  }

  window.Shopify = window.Shopify || {};
  window.Shopify.theme = window.Shopify.theme || {};
  window.Shopify.theme.sections = window.Shopify.theme.sections || {};

  window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {};
  window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
  const registered = window.Shopify.theme.sections.registered;
  const instances = window.Shopify.theme.sections.instances;

  const selectors$6 = {
    id: 'data-section-id',
    type: 'data-section-type',
  };

  class Registration {
    constructor(type = null, components = []) {
      this.type = type;
      this.components = validateComponentsArray(components);
      this.callStack = {
        onLoad: [],
        onUnload: [],
        onSelect: [],
        onDeselect: [],
        onBlockSelect: [],
        onBlockDeselect: [],
        onReorder: [],
      };
      components.forEach((comp) => {
        for (const [key, value] of Object.entries(comp)) {
          const arr = this.callStack[key];
          if (Array.isArray(arr) && typeof value === 'function') {
            arr.push(value);
          } else {
            console.warn(`Unregisted function: '${key}' in component: '${this.type}'`);
            console.warn(value);
          }
        }
      });
    }

    getStack() {
      return this.callStack;
    }
  }

  class Section {
    constructor(container, registration) {
      this.container = validateContainerElement(container);
      this.id = container.getAttribute(selectors$6.id);
      this.type = registration.type;
      this.callStack = registration.getStack();

      try {
        this.onLoad();
      } catch (e) {
        console.warn(`Error in section: ${this.id}`);
        console.warn(this);
        console.warn(e);
      }
    }

    callFunctions(key, e = null) {
      this.callStack[key].forEach((func) => {
        const props = {
          id: this.id,
          type: this.type,
          container: this.container,
        };
        if (e) {
          func.call(props, e);
        } else {
          func.call(props);
        }
      });
    }

    onLoad() {
      this.callFunctions('onLoad');
    }

    onUnload() {
      this.callFunctions('onUnload');
    }

    onSelect(e) {
      this.callFunctions('onSelect', e);
    }

    onDeselect(e) {
      this.callFunctions('onDeselect', e);
    }

    onBlockSelect(e) {
      this.callFunctions('onBlockSelect', e);
    }

    onBlockDeselect(e) {
      this.callFunctions('onBlockDeselect', e);
    }

    onReorder(e) {
      this.callFunctions('onReorder', e);
    }
  }

  function validateContainerElement(container) {
    if (!(container instanceof Element)) {
      throw new TypeError('Theme Sections: Attempted to load section. The section container provided is not a DOM element.');
    }
    if (container.getAttribute(selectors$6.id) === null) {
      throw new Error('Theme Sections: The section container provided does not have an id assigned to the ' + selectors$6.id + ' attribute.');
    }

    return container;
  }

  function validateComponentsArray(value) {
    if ((typeof value !== 'undefined' && typeof value !== 'object') || value === null) {
      throw new TypeError('Theme Sections: The components object provided is not a valid');
    }

    return value;
  }

  /*
   * @shopify/theme-sections
   * -----------------------------------------------------------------------------
   *
   * A framework to provide structure to your Shopify sections and a load and unload
   * lifecycle. The lifecycle is automatically connected to theme editor events so
   * that your sections load and unload as the editor changes the content and
   * settings of your sections.
   */

  function register(type, components) {
    if (typeof type !== 'string') {
      throw new TypeError('Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered');
    }

    if (typeof registered[type] !== 'undefined') {
      throw new Error('Theme Sections: A section of type "' + type + '" has already been registered. You cannot register the same section type twice');
    }

    if (!Array.isArray(components)) {
      components = [components];
    }

    const section = new Registration(type, components);
    registered[type] = section;

    return registered;
  }

  function load(types, containers) {
    types = normalizeType(types);

    if (typeof containers === 'undefined') {
      containers = document.querySelectorAll('[' + selectors$6.type + ']');
    }

    containers = normalizeContainers(containers);

    types.forEach(function (type) {
      const registration = registered[type];

      if (typeof registration === 'undefined') {
        return;
      }

      containers = containers.filter(function (container) {
        // Filter from list of containers because container already has an instance loaded
        if (isInstance(container)) {
          return false;
        }

        // Filter from list of containers because container doesn't have data-section-type attribute
        if (container.getAttribute(selectors$6.type) === null) {
          return false;
        }

        // Keep in list of containers because current type doesn't match
        if (container.getAttribute(selectors$6.type) !== type) {
          return true;
        }

        instances.push(new Section(container, registration));

        // Filter from list of containers because container now has an instance loaded
        return false;
      });
    });
  }

  function reorder(selector) {
    var instancesToReorder = getInstances(selector);

    instancesToReorder.forEach(function (instance) {
      instance.onReorder();
    });
  }

  function unload(selector) {
    var instancesToUnload = getInstances(selector);

    instancesToUnload.forEach(function (instance) {
      var index = instances
        .map(function (e) {
          return e.id;
        })
        .indexOf(instance.id);
      instances.splice(index, 1);
      instance.onUnload();
    });
  }

  function getInstances(selector) {
    var filteredInstances = [];

    // Fetch first element if its an array
    if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
      var firstElement = selector[0];
    }

    // If selector element is DOM element
    if (selector instanceof Element || firstElement instanceof Element) {
      var containers = normalizeContainers(selector);

      containers.forEach(function (container) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.container === container;
          })
        );
      });

      // If select is type string
    } else if (typeof selector === 'string' || typeof firstElement === 'string') {
      var types = normalizeType(selector);

      types.forEach(function (type) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.type === type;
          })
        );
      });
    }

    return filteredInstances;
  }

  function getInstanceById(id) {
    var instance;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].id === id) {
        instance = instances[i];
        break;
      }
    }
    return instance;
  }

  function isInstance(selector) {
    return getInstances(selector).length > 0;
  }

  function normalizeType(types) {
    // If '*' then fetch all registered section types
    if (types === '*') {
      types = Object.keys(registered);

      // If a single section type string is passed, put it in an array
    } else if (typeof types === 'string') {
      types = [types];

      // If single section constructor is passed, transform to array with section
      // type string
    } else if (types.constructor === Section) {
      types = [types.prototype.type];

      // If array of typed section constructors is passed, transform the array to
      // type strings
    } else if (Array.isArray(types) && types[0].constructor === Section) {
      types = types.map(function (Section) {
        return Section.type;
      });
    }

    types = types.map(function (type) {
      return type.toLowerCase();
    });

    return types;
  }

  function normalizeContainers(containers) {
    // Nodelist with entries
    if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
      containers = Array.prototype.slice.call(containers);

      // Empty Nodelist
    } else if (NodeList.prototype.isPrototypeOf(containers) && containers.length === 0) {
      containers = [];

      // Handle null (document.querySelector() returns null with no match)
    } else if (containers === null) {
      containers = [];

      // Single DOM element
    } else if (!Array.isArray(containers) && containers instanceof Element) {
      containers = [containers];
    }

    return containers;
  }

  if (window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');

      if (container !== null) {
        load(container.getAttribute(selectors$6.type), container);
      }
    });

    document.addEventListener('shopify:section:reorder', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        reorder(container);
      }
    });

    document.addEventListener('shopify:section:unload', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + selectors$6.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        unload(container);
      }
    });

    document.addEventListener('shopify:section:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onSelect(event);
      }
    });

    document.addEventListener('shopify:section:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onDeselect(event);
      }
    });

    document.addEventListener('shopify:block:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockSelect(event);
      }
    });

    document.addEventListener('shopify:block:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockDeselect(event);
      }
    });
  }

  const selectors$7 = {
    slider: '[data-slider]',
    slide: '[data-slide]',
    slideValue: 'data-slide',
    prevArrow: '[data-prev-arrow]',
    nextArrow: '[data-next-arrow]',
    slideshowSlideImg: '.slide-image-img',
    flickityPrevArrow: '.flickity-button.previous',
    flickityNextArrow: '.flickity-button.next',
    collectionImage: '.collection-item__image',
    productItemImage: '.product-item__image',
    columnImage: '.column__image__wrapper',
    sliderThumb: '[data-slider-thumb]',
    sliderThumbClick: '[data-slider-thumb-click]',
    heroContent: '.hero__content',
    heroContentWrapper: '.hero__content__wrapper',
    dataSliderAnimate: 'data-slider-animate',
    dataSliderAnimateOnce: 'data-slider-animate-once',
    dataAos: '[data-aos]',
    dataAspectRatio: 'data-aspectratio',
    dataDots: 'data-dots',
    dataArrows: 'data-arrows',
    dataAutoplay: 'data-autoplay',
    dataAutoplaySpeed: 'data-speed',
    dataColor: 'data-color',
    dataInfinite: 'data-infinite',
    dataSetHeight: 'data-set-height',
    dataWatchCss: 'data-watch-css',
    dataAdaptiveHeight: 'data-adaptive-height',
    dataCellAlign: 'data-cell-align',
    dataDraggable: 'data-draggable',
    dataPercentPosition: 'data-percent-position',
    dataSlideIndex: 'data-slide-index',
    dataSlidesLargeDesktop: 'data-slides-large-desktop',
    dataSlidesDesktop: 'data-slides-desktop',
    dataSlidesTabletDesktop: 'data-slides-tablet',
    dataSlidesMobileDesktop: 'data-slides-mobile',
    dataSliderStartIndex: 'data-slider-start-index',
    dataGroupCells: 'data-group-cells',
    dataArrowPositionMiddle: 'data-arrow-position-middle',
    dataEqualizeHeight: 'data-equalize-height',
    dataFade: 'data-fade',
  };

  const classes = {
    classIsSelected: 'is-selected',
    textDark: 'text-dark',
    textLight: 'text-light',
    transparentWrapper: 'transparent__wrapper',
    heroContentTransparent: 'hero__content--transparent',
    classSliderInitialized: 'js-slider--initialized',
    classSliderArrowsHidden: 'flickity-button-hide',
    classAosAnimate: 'aos-animate',
    classAosAnimated: 'aos-animated',
  };

  const sections = {};

  class Slider {
    constructor(container, slideshow = null) {
      this.container = container;
      this.slideshow = slideshow || this.container.querySelector(selectors$7.slider);

      if (!this.slideshow) return;

      this.slideshowSlides = this.slideshow.querySelectorAll(selectors$7.slide);
      this.sliderPrev = this.container.querySelector(selectors$7.prevArrow);
      this.sliderNext = this.container.querySelector(selectors$7.nextArrow);
      this.sliderThumbs = this.container.querySelectorAll(selectors$7.sliderThumb);
      this.sliderThumbsClick = this.container.querySelectorAll(selectors$7.sliderThumbClick);
      this.currentSlideColor = this.slideshowSlides[0].getAttribute(selectors$7.dataColor);
      this.showDots = this.slideshow.getAttribute(selectors$7.dataDots) != 'hidden';
      this.showArrows = this.slideshow.getAttribute(selectors$7.dataArrows) === 'true';
      this.autoPlay = this.slideshow.getAttribute(selectors$7.dataAutoplay) === 'true';
      this.autoPlaySpeed = this.slideshow.getAttribute(selectors$7.dataAutoplaySpeed);
      this.infinite = this.slideshow.getAttribute(selectors$7.dataInfinite) !== 'false';
      this.setMinHeightFlag = this.slideshow.getAttribute(selectors$7.dataSetHeight) === 'true';
      this.watchCss = this.slideshow.getAttribute(selectors$7.dataWatchCss) === 'true';
      this.adaptiveHeight = this.slideshow.getAttribute(selectors$7.dataAdaptiveHeight) !== 'false';
      this.cellAlignLeft = this.slideshow.getAttribute(selectors$7.dataCellAlign) === 'left';
      this.cellAlignRight = this.slideshow.getAttribute(selectors$7.dataCellAlign) === 'right';
      this.draggable = this.slideshow.getAttribute(selectors$7.dataDraggable) !== 'false';
      this.percentPosition = this.slideshow.getAttribute(selectors$7.dataPercentPosition) !== 'false';
      this.multipleSlides = this.slideshow.hasAttribute(selectors$7.dataSlidesLargeDesktop);
      this.sliderStartIndex = this.slideshow.hasAttribute(selectors$7.dataSliderStartIndex);
      this.groupCells = this.slideshow.getAttribute(selectors$7.dataGroupCells) === 'true';
      this.sliderAnimate = this.slideshow.getAttribute(selectors$7.dataSliderAnimate) === 'true';
      this.sliderAnimateOnce = this.slideshow.getAttribute(selectors$7.dataSliderAnimateOnce) === 'true';
      this.dataEqualizeHeight = this.slideshow.getAttribute(selectors$7.dataEqualizeHeight) === 'true';
      this.fade = this.slideshow.getAttribute(selectors$7.dataFade) === 'true';
      this.resizeEvent = debounce(() => this.resizeEvents(), 100);
      this.resizeEventAlt = debounce(() => this.addRemoveSlidesForDevices(), 100);

      this.flkty = null;

      this.init();
    }

    init() {
      this.setMinHeight();

      const sliderOptions = {
        initialIndex: this.sliderStartIndex ? parseInt(this.slideshow.getAttribute(selectors$7.dataSliderStartIndex)) : 0,
        autoPlay: this.autoPlay && this.autoPlaySpeed ? parseInt(this.autoPlaySpeed) : false,
        contain: true,
        pageDots: this.showDots,
        prevNextButtons: this.showArrows,
        adaptiveHeight: this.adaptiveHeight,
        wrapAround: this.infinite,
        percentPosition: this.percentPosition,
        watchCSS: this.watchCss,
        cellAlign: this.cellAlignLeft ? 'left' : this.cellAlignRight ? 'right' : 'center',
        groupCells: this.groupCells,
        draggable: this.draggable ? '>1' : false,
        on: {
          ready: () => {
            if (this.sliderAnimate && this.sliderAnimateOnce && !this.autoPlay) {
              const currentSlide = this.slideshow.querySelector(`.${classes.classIsSelected}`);
              currentSlide.classList.add(classes.classAosAnimated);
            }

            setTimeout(() => {
              this.slideshow.parentNode.dispatchEvent(
                new CustomEvent('slider-is-loaded', {
                  bubbles: true,
                  detail: {
                    slider: this,
                  },
                })
              );
            }, 10);

            this.slideActions();

            if (this.slideshow.classList.contains(classes.classIsSelected)) {
              this.slideshow.classList.remove(classes.classIsSelected);
            }
            if (this.showArrows) {
              this.initArrows();
              this.positionArrows();
            }
          },
          resize: () => {
            if (this.showArrows) {
              this.positionArrows();
            }
          },
        },
      };

      if (this.fade) {
        sliderOptions.fade = true;
        this.flkty = new FlickityFade(this.slideshow, sliderOptions);
      }

      if (!this.fade) {
        this.flkty = new Flickity(this.slideshow, sliderOptions);
      }

      if (this.dataEqualizeHeight) {
        this.equalizeHeight();
      }

      if (this.sliderPrev) {
        this.sliderPrev.addEventListener('click', (e) => {
          e.preventDefault();

          this.flkty.previous(true);
        });
      }

      if (this.sliderNext) {
        this.sliderNext.addEventListener('click', (e) => {
          e.preventDefault();

          this.flkty.next(true);
        });
      }

      this.flkty.on('change', () => this.slideActions());

      this.addRemoveSlidesForDevices();

      window.addEventListener('resize', this.resizeEventAlt);

      if (this.sliderAnimate) {
        this.flkty.on('settle', () => this.sliderSettle());
      }

      if (this.setMinHeightFlag || this.multipleSlides) {
        window.addEventListener('resize', this.resizeEvent);
      }

      if (this.sliderThumbsClick.length) {
        this.sliderThumbsClick.forEach((element) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = [...element.parentElement.children].indexOf(element);
            this.flkty.select(slideIndex);
          });
        });
      }
    }

    sliderSettle() {
      let animatedItems = this.slideshow.querySelectorAll(`.${classes.classIsSelected} ${selectors$7.dataAos}`);

      if (this.sliderAnimateOnce) {
        animatedItems = this.slideshow.querySelectorAll(`.${classes.classIsSelected}:not(.${classes.classAosAnimated}) .${classes.classAosAnimated}`);
      }

      if (animatedItems.length) {
        animatedItems.forEach((animatedItem) => {
          animatedItem.classList.add(classes.classAosAnimate);

          if (this.sliderAnimateOnce) {
            animatedItem.closest(`.${classes.classIsSelected}`).classList.add(classes.classAosAnimated);
          }
        });
      }
    }

    addRemoveSlidesForDevices() {
      this.hasDiffSlidesForMobileDesktop =
        Array.prototype.filter.call(this.slideshowSlides, (slide) => {
          if (slide.classList.contains('desktop') || slide.classList.contains('mobile')) {
            return slide;
          }
        }).length > 0;

      if (!this.hasDiffSlidesForMobileDesktop) {
        return;
      }

      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let selectorSlides = null;

      if (windowWidth <= 749) {
        selectorSlides = `${selectors$7.slide}.mobile, ${selectors$7.slide}:not(.desktop)`;
      } else {
        selectorSlides = `${selectors$7.slide}.desktop, ${selectors$7.slide}:not(.mobile)`;
      }

      this.flkty.options.cellSelector = selectorSlides;
      this.flkty.selectCell(0, false, true);
      this.flkty.reloadCells();
      this.flkty.reposition();
      this.flkty.resize();
      this.slideActions();
    }

    resizeEvents() {
      this.setMinHeight();

      if (this.multipleSlides) {
        if (this.showArrows) {
          this.initArrows();
        }
        this.flkty.resize();
        if (!this.slideshow.classList.contains(classes.classSliderInitialized)) {
          this.flkty.select(0);
        }
      }
    }

    slideActions() {
      const currentSlide = this.slideshow.querySelector(`.${classes.classIsSelected}`);
      this.currentSlideColor = currentSlide.getAttribute(selectors$7.dataColor);

      if (this.currentSlideColor) {
        this.slideshow.classList.remove(classes.textLight, classes.textDark);
        this.slideshow.classList.add(this.currentSlideColor);
      }

      this.container.classList.remove(classes.transparentWrapper);
      const heroContentWrapper = currentSlide.querySelector(selectors$7.heroContentWrapper);
      if (heroContentWrapper && heroContentWrapper.classList.contains(classes.heroContentTransparent)) {
        this.container.classList.add(classes.transparentWrapper);
      }

      this.setMinHeight();

      if (this.sliderAnimate) {
        let animatedItems = this.slideshow.querySelectorAll(`.${classes.classIsSelected} .${classes.classAosAnimate}`);
        if (this.sliderAnimateOnce) {
          animatedItems = this.slideshow.querySelectorAll(`.${classes.classIsSelected}:not(.${classes.classAosAnimated}) .${classes.classAosAnimate}`);
        }
        if (animatedItems.length) {
          animatedItems.forEach((animatedItem) => {
            animatedItem.classList.remove(classes.classAosAnimate);
            if (this.sliderAnimateOnce) {
              animatedItem.classList.add(classes.classAosAnimated);
            }
          });
        }
      }

      if (this.sliderThumbs.length && this.sliderThumbs.length === this.slideshowSlides.length && currentSlide.hasAttribute(selectors$7.dataSlideIndex)) {
        const slideIndex = parseInt(currentSlide.getAttribute(selectors$7.dataSlideIndex));
        const currentThumb = this.container.querySelector(`${selectors$7.sliderThumb}.${classes.classIsSelected}`);
        if (currentThumb) {
          currentThumb.classList.remove(classes.classIsSelected);
        }
        this.sliderThumbs[slideIndex].classList.add(classes.classIsSelected);
      }
    }

    setMinHeight() {
      if (!this.setMinHeightFlag) return;

      this.slideshowSlides.forEach((element) => {
        const slideImageImg = element.querySelector(selectors$7.slideshowSlideImg);
        let slideAspectRatio = '';
        if (slideImageImg && slideImageImg.hasAttribute(selectors$7.dataAspectRatio)) {
          slideAspectRatio = slideImageImg.getAttribute(selectors$7.dataAspectRatio);
        }

        let slideTextContentHeight = 0;
        let getMargin = 0;
        const slideTextContent = element.querySelector(selectors$7.heroContent);
        if (slideTextContent) {
          const getMarginTop = parseInt(window.getComputedStyle(slideTextContent).marginTop);
          const getMarginBottom = parseInt(window.getComputedStyle(slideTextContent).marginBottom);
          getMargin = getMarginTop + getMarginBottom;
          slideTextContentHeight = slideTextContent.offsetHeight + getMargin;
        }

        const slideWidth = parseInt(getComputedStyle(element, null).width.replace('px', ''));
        let slideHeight = parseInt(slideWidth / slideAspectRatio) || 0;
        const isCurrentSlide = element.classList.contains(classes.classIsSelected);

        if (slideTextContentHeight > slideHeight) {
          slideHeight = slideTextContentHeight;
        }

        const minHeightValue = `calc(${slideHeight}px + var(--header-padding)`;
        element.style.setProperty('min-height', minHeightValue);
        const heroContentWrapper = element.querySelector(selectors$7.heroContentWrapper);
        if (heroContentWrapper) {
          heroContentWrapper.style.setProperty('min-height', minHeightValue);
        }
        if (isCurrentSlide) {
          this.slideshow.parentElement.style.setProperty('min-height', minHeightValue);
        }
      });
    }

    positionArrows() {
      if (this.slideshow.hasAttribute(selectors$7.dataArrowPositionMiddle) && this.showArrows) {
        const itemImage = this.slideshow.querySelector(selectors$7.collectionImage) || this.slideshow.querySelector(selectors$7.productItemImage) || this.slideshow.querySelector(selectors$7.columnImage);

        // Prevent 'clientHeight' of null error if no image
        if (!itemImage) return;

        this.slideshow.querySelector(selectors$7.flickityPrevArrow).style.top = itemImage.clientHeight / 2 + 'px';
        this.slideshow.querySelector(selectors$7.flickityNextArrow).style.top = itemImage.clientHeight / 2 + 'px';
      }
    }

    initArrows() {
      if (!this.multipleSlides) return;
      const slidesNumberCustom = parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesLargeDesktop));
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const desktopSlides = this.slideshow.hasAttribute(selectors$7.dataSlidesDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesDesktop)) : 3;
      const tabletSlides = this.slideshow.hasAttribute(selectors$7.dataSlidesTabletDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesTabletDesktop)) : 2;
      const mobileSlides = this.slideshow.hasAttribute(selectors$7.dataSlidesMobileDesktop) ? parseInt(this.slideshow.getAttribute(selectors$7.dataSlidesMobileDesktop)) : 1;
      const largeDesktopCheck = windowWidth > 1339 && this.slideshowSlides.length > slidesNumberCustom;
      const desktopCheck = windowWidth <= 1339 && windowWidth > 1023 && this.slideshowSlides.length > desktopSlides;
      const tabletCheck = windowWidth <= 1023 && windowWidth > 749 && this.slideshowSlides.length > tabletSlides;
      const mobileCheck = windowWidth <= 749 && this.slideshowSlides.length > mobileSlides;
      const flag = Boolean(largeDesktopCheck || desktopCheck || tabletCheck || mobileCheck);
      this.slideshow.classList.toggle(classes.classSliderArrowsHidden, !flag);
      this.slideshow.classList.toggle(classes.classSliderInitialized, flag);
    }

    equalizeHeight() {
      Flickity.prototype._createResizeClass = function () {
        setTimeout(() => {
          this.element.classList.add('flickity-resize');
        });
      };

      Flickity.createMethods.push('_createResizeClass');

      const resize = Flickity.prototype.resize;
      Flickity.prototype.resize = function () {
        this.element.classList.remove('flickity-resize');
        resize.call(this);
        this.element.classList.add('flickity-resize');
      };

      this.flkty.resize();
    }

    onUnload() {
      if (this.setMinHeightFlag || this.multipleSlides) {
        window.removeEventListener('resize', this.resizeEvent);
      }

      if (this.slideshow && this.flkty) {
        this.flkty.options.watchCSS = false;
        this.flkty.destroy();
      }
    }

    onBlockSelect(evt) {
      if (!this.slideshow) return;
      // Ignore the cloned version
      const slide = this.slideshow.querySelector(`[${selectors$7.slideValue}="${evt.detail.blockId}"]`);

      if (!slide) return;
      let slideIndex = parseInt(slide.getAttribute(selectors$7.dataSlideIndex));

      if (this.multipleSlides && !this.slideshow.classList.contains(classes.classSliderInitialized)) {
        slideIndex = 0;
      }

      this.slideshow.classList.add(classes.classIsSelected);

      // Go to selected slide, pause autoplay
      this.flkty.selectCell(slideIndex);
      this.flkty.stopPlayer();
    }

    onBlockDeselect() {
      if (!this.slideshow) return;
      this.slideshow.classList.remove(classes.classIsSelected);

      if (!this.autoPlay) return;
      this.flkty.playPlayer();
    }
  }

  const slider = {
    onLoad() {
      sections[this.id] = [];
      const els = this.container.querySelectorAll(selectors$7.slider);
      els.forEach((el) => {
        sections[this.id].push(new Slider(this.container, el));
      });
    },
    onUnload() {
      sections[this.id].forEach((el) => {
        if (typeof el.onUnload === 'function') {
          el.onUnload();
        }
      });
    },
    onBlockSelect(e) {
      sections[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(e);
        }
      });
    },
    onBlockDeselect(e) {
      sections[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(e);
        }
      });
    },
  };

  const selectors$8 = {
    copyClipboard: '[data-copy-clipboard]',
    tooltip: 'data-tooltip',
  };

  const classes$1 = {
    classVisible: 'is-visible',
  };

  const sections$1 = {};

  class CopyClipboard {
    constructor(section) {
      this.container = section.container;
      this.copyButtons = this.container.querySelectorAll(selectors$8.copyClipboard);

      if (this.copyButtons.length) {
        this.init();
      }
    }

    init() {
      this.copyButtons.forEach((el) => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const copyText = this.getAttribute('href');
          this.style.position = 'static';
          let inputElem = document.createElement('input');
          inputElem.type = 'text';
          this.appendChild(inputElem);
          const newInput = this.querySelector('input');
          newInput.value = copyText;
          newInput.select();
          newInput.setSelectionRange(0, 99999); /* For mobile devices */
          document.execCommand('copy');
          this.style.removeProperty('position');
          this.removeChild(newInput);

          if (this.hasAttribute(selectors$8.tooltip) && windowWidth > 749) {
            this.classList.add(classes$1.classVisible);
            this.dispatchEvent(new CustomEvent('tooltip:init', {bubbles: true}));

            setTimeout(() => {
              this.classList.remove(classes$1.classVisible);
              document.dispatchEvent(
                new CustomEvent('tooltip:close', {
                  bubbles: false,
                  detail: {
                    hideTransition: true,
                  },
                })
              );
            }, 2000);
          }
        });
      });
    }
  }

  const copyClipboard = {
    onLoad() {
      sections$1[this.id] = new CopyClipboard(this);
    },
  };

  var sections$2 = {};

  const parallaxHero = {
    onLoad() {
      sections$2[this.id] = [];
      const frames = this.container.querySelectorAll('[data-parallax-wrapper]');
      frames.forEach((frame) => {
        const inner = frame.querySelector('[data-parallax-img]');

        sections$2[this.id].push(
          new Rellax(inner, {
            center: true,
            round: true,
            frame: frame,
          })
        );
      });

      window.addEventListener('load', () => {
        sections$2[this.id].forEach((image) => {
          if (typeof image.refresh === 'function') {
            image.refresh();
          }
        });
      });
    },
    onUnload: function () {
      sections$2[this.id].forEach((image) => {
        if (typeof image.destroy === 'function') {
          image.destroy();
        }
      });
    },
  };

  const selectors$9 = {
    sidebar: '.sidebar',
    widgetCategories: '.widget--categories',
    widgetLinksEl: '.widget__links',
    widgetLinks: '.widget__links .has-sub-nav > a',
    widgetLinksSub: '.widget__links .submenu > li > a',
    listEl: 'li',
    linkEl: 'a',
    articleSingle: '.article--single',
    sidebarContents: '.sidebar__contents',
    hasSubNav: '.has-sub-nav',
  };

  const classes$2 = {
    classOpen: 'open',
    classActive: 'active',
    classSubmenu: 'submenu',
  };

  const sections$3 = {};

  class Article {
    constructor(section) {
      this.container = section.container;
      this.sidebar = this.container.querySelector(selectors$9.sidebar);
      this.widgetCategories = this.container.querySelector(selectors$9.widgetCategories);
      this.resizeEvent = () => this.categories();

      this.init();
    }

    init() {
      if (this.sidebar) {
        this.sidebarNav();
      }
    }

    sidebarNav() {
      this.navStates();

      // Dropdown Menus
      this.container.addEventListener('click', (e) => {
        const checkLinkTag = e.target.tagName.toLowerCase() === selectors$9.linkEl;
        const checkLinkParent = e.target.closest(`${selectors$9.listEl}${selectors$9.hasSubNav}`);
        const checkLinkClosest = e.target.closest(selectors$9.widgetLinksEl);
        const checkLink = checkLinkTag && checkLinkParent && checkLinkClosest;
        const submenu = e.target.nextElementSibling;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isMobile = windowWidth < theme.sizes.small;

        if (!isMobile && checkLink && submenu) {
          submenu.parentElement.classList.toggle(classes$2.classActive);
          submenu.classList.toggle(classes$2.classOpen);
          submenu.setAttribute('aria-expanded', submenu.classList.contains(classes$2.classOpen));
          slideToggle(submenu);

          e.preventDefault();
        }
      });

      if (this.widgetCategories) {
        this.widgetCategoriesNext = this.widgetCategories.nextSibling;
        this.widgetCategoriesParentNode = this.widgetCategories.parentNode;

        this.categories();

        document.addEventListener('theme:resize', this.resizeEvent);
      }
    }

    navStates() {
      // Nav Active States
      const links = this.container.querySelectorAll(`${selectors$9.widgetLinks}, ${selectors$9.widgetLinksSub}`);

      if (links.length) {
        links.forEach((element) => {
          const href = element.getAttribute('href');
          const location = window.location.pathname;

          if (href === location) {
            const elementClosest = element.closest(selectors$9.hasSubNav);
            element.closest('li').classList.add(classes$2.classActive);
            if (!elementClosest) return;
            elementClosest.classList.add(classes$2.classActive);
            const submenu = elementClosest.querySelector(`.${classes$2.classSubmenu}`);

            if (submenu) {
              submenu.classList.toggle(classes$2.classOpen);
              submenu.setAttribute('aria-expanded', submenu.classList.contains(classes$2.classOpen));
              showElement(submenu);
            }
          }
        });
      }
    }

    categories() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = windowWidth < theme.sizes.small;
      const widgetCategories = document.querySelector(selectors$9.widgetCategories);
      if (isMobile) {
        document.querySelector(selectors$9.articleSingle).prepend(widgetCategories);
      } else {
        this.widgetCategoriesParentNode.insertBefore(widgetCategories, this.widgetCategoriesNext);
      }
    }

    onUnload() {
      if (this.widgetCategories) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }
    }
  }

  const articleSection = {
    onLoad() {
      sections$3[this.id] = new Article(this);
    },
    onUnload(e) {
      sections$3[this.id].onUnload(e);
    },
  };

  register('article', [articleSection, slider, copyClipboard, parallaxHero]);

  register('blog-template', [slider]);

  register('hero', parallaxHero);

  const selectors$a = {
    popoutWrapper: '[data-popout]',
    popoutList: '[data-popout-list]',
    popoutToggle: '[data-popout-toggle]',
    popoutText: '[data-popout-text]',
    popoutInput: '[data-popout-input]',
    popoutOptions: '[data-popout-option]',
    popoutPrevent: 'data-popout-prevent',
    popoutQuantity: 'data-quantity-field',
    dataValue: 'data-value',
    dataStatus: 'data-status',
    ariaExpanded: 'aria-expanded',
    ariaCurrent: 'aria-current',
    productGridImage: '[data-product-image]',
    productGrid: '[data-product-grid-item]',
  };

  const classes$3 = {
    listVisible: 'popout-list--visible',
    currentSuffix: '--current',
    classPopoutAlternative: 'popout-container--alt',
    visible: 'is-visible',
  };

  let sections$4 = {};

  class Popout {
    constructor(popout) {
      this.container = popout;
      this.popoutList = this.container.querySelector(selectors$a.popoutList);
      this.popoutToggle = this.container.querySelector(selectors$a.popoutToggle);
      this.popoutText = this.container.querySelector(selectors$a.popoutText);
      this.popoutInput = this.container.querySelector(selectors$a.popoutInput);
      this.popoutOptions = this.container.querySelectorAll(selectors$a.popoutOptions);
      this.popoutPrevent = this.container.getAttribute(selectors$a.popoutPrevent) === 'true';
      this.popupToggleFocusoutEvent = (evt) => this.popupToggleFocusout(evt);
      this.popupListFocusoutEvent = (evt) => this.popupListFocusout(evt);
      this.popupToggleClickEvent = (evt) => this.popupToggleClick(evt);
      this.containerKeyupEvent = (evt) => this.containerKeyup(evt);
      this.popupOptionsClickEvent = (evt) => this.popupOptionsClick(evt);
      this._connectOptionsDispatchEvent = (evt) => this._connectOptionsDispatch(evt);

      this._connectOptions();
      this._connectToggle();
      this._onFocusOut();
      this.init();

      if (this.popoutInput && this.popoutInput.hasAttribute(selectors$a.popoutQuantity)) {
        document.addEventListener('popout:updateValue', this.updatePopout.bind(this));
      }
    }

    init() {

      if (document.body.classList.contains('template-product') && this.popoutText) {
        const currentOption = document.querySelector('.select-popout__item--current a')
        let attrValueText = '';

        if (currentOption.dataset.value) {
          setTimeout(() => {
            attrValueText = `${currentOption.dataset.value} - ${currentOption.dataset.status} `;
          }, 1000);
        }

        if (attrValueText !== '' || attrValueText !== 'undefined' ) {
          setTimeout(() => {
            console.log(this.popoutText)
            this.popoutText.textContent = attrValueText;
          }, 1200);
        }
      }
    }

    unload() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.removeEventListener('clickDetails', this.popupOptionsClickEvent);
          element.removeEventListener('click', this._connectOptionsDispatchEvent);
        });
      }

      this.popoutToggle.removeEventListener('click', this.popupToggleClickEvent);

      this.popoutToggle.removeEventListener('focusout', this.popupToggleFocusoutEvent);

      this.popoutList.removeEventListener('focusout', this.popupListFocusoutEvent);

      this.container.removeEventListener('keyup', this.containerKeyupEvent);
    }

    popupToggleClick(evt) {
      const ariaExpanded = evt.currentTarget.getAttribute(selectors$a.ariaExpanded) === 'true';

      if (this.popoutList.closest(selectors$a.productGrid)) {
        const productGridItemImage = this.popoutList.closest(selectors$a.productGrid).querySelector(selectors$a.productGridImage);

        if (productGridItemImage) {
          productGridItemImage.classList.toggle(classes$3.visible, !ariaExpanded);
        }
      }

      evt.currentTarget.setAttribute(selectors$a.ariaExpanded, !ariaExpanded);
      this.popoutList.classList.toggle(classes$3.listVisible);
    }

    popupToggleFocusout(evt) {
      const popoutLostFocus = this.container.contains(evt.relatedTarget);

      if (!popoutLostFocus) {
        this._hideList();
      }
    }

    popupListFocusout(evt) {
      const childInFocus = evt.currentTarget.contains(evt.relatedTarget);
      const isVisible = this.popoutList.classList.contains(classes$3.listVisible);

      if (isVisible && !childInFocus) {
        this._hideList();
      }
    }

    popupOptionsClick(evt) {
      const link = evt.target.closest(selectors$a.popoutOptions);
      if (link.attributes.href.value === '#') {
        evt.preventDefault();

        let attrValue = '';
        let attrValueText = '';

        if (evt.currentTarget.getAttribute(selectors$a.dataValue)) {
          attrValue = evt.currentTarget.getAttribute(selectors$a.dataValue);
          attrValueText = `${evt.currentTarget.getAttribute(selectors$a.dataValue)} - ${evt.currentTarget.getAttribute(selectors$a.dataStatus)} `;
        }

        this.popoutInput.value = attrValue;

        if (this.popoutPrevent) {
          this.popoutInput.dispatchEvent(new Event('change'));

          if (!evt.detail.preventTrigger && this.popoutInput.hasAttribute(selectors$a.popoutQuantity)) {
            this.popoutInput.dispatchEvent(new Event('input'));
          }

          const currentElement = this.popoutList.querySelector(`[class*="${classes$3.currentSuffix}"]`);
          let targetClass = classes$3.currentSuffix;

          if (currentElement && currentElement.classList.length) {
            for (const currentElementClass of currentElement.classList) {
              if (currentElementClass.includes(classes$3.currentSuffix)) {
                targetClass = currentElementClass;
                break;
              }
            }
          }

          const listTargetElement = this.popoutList.querySelector(`.${targetClass}`);

          if (listTargetElement) {
            listTargetElement.classList.remove(`${targetClass}`);
            evt.currentTarget.parentElement.classList.add(`${targetClass}`);
          }

          const targetAttribute = this.popoutList.querySelector(`[${selectors$a.ariaCurrent}]`);

          if (targetAttribute && targetAttribute.hasAttribute(`${selectors$a.ariaCurrent}`)) {
            targetAttribute.removeAttribute(`${selectors$a.ariaCurrent}`);
            evt.currentTarget.setAttribute(`${selectors$a.ariaCurrent}`, 'true');
          }

          if (attrValue !== '') {
            this.popoutToggle.textContent = attrValue;
            this.popoutText.textContent = attrValueText;
          }

          this.popupToggleFocusout(evt);
          this.popupListFocusout(evt);
        } else {
          this._submitForm(attrValue);
        }
      }
    }

    updatePopout() {
      const targetElement = this.popoutList.querySelector(`[${selectors$a.dataValue}="${this.popoutInput.value}"]`);
      if (targetElement) {
        targetElement.dispatchEvent(
          new CustomEvent('clickDetails', {
            cancelable: true,
            bubbles: true,
            detail: {
              preventTrigger: true,
            },
          })
        );

        if (!targetElement.parentElement.nextSibling) {
          this.container.classList.add(classes$3.classPopoutAlternative);
        }
      } else {
        this.container.classList.add(classes$3.classPopoutAlternative);
      }
    }

    containerKeyup(evt) {
      if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
        return;
      }
      this._hideList();
      this.popoutToggle.focus();
    }

    bodyClick(evt) {
      const isOption = this.container.contains(evt.target);
      const isVisible = this.popoutList.classList.contains(classes$3.listVisible);

      if (isVisible && !isOption) {
        this._hideList();
      }
    }

    _connectToggle() {
      this.popoutToggle.addEventListener('click', this.popupToggleClickEvent);
    }

    _connectOptions() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.addEventListener('clickDetails', this.popupOptionsClickEvent);
          element.addEventListener('click', this._connectOptionsDispatchEvent);
        });
      }
    }

    _connectOptionsDispatch(evt) {
      const event = new CustomEvent('clickDetails', {
        cancelable: true,
        bubbles: true,
        detail: {
          preventTrigger: false,
        },
      });

      if (!evt.target.dispatchEvent(event)) {
        evt.preventDefault();
      }
    }

    _onFocusOut() {
      this.popoutToggle.addEventListener('focusout', this.popupToggleFocusoutEvent);

      this.popoutList.addEventListener('focusout', this.popupListFocusoutEvent);

      this.container.addEventListener('keyup', this.containerKeyupEvent);

      document.body.addEventListener('click', this.bodyClick.bind(this));
    }

    _submitForm() {
      const form = this.container.closest('form');
      if (form) {
        form.submit();
      }
    }

    _hideList() {
      this.popoutList.classList.remove(classes$3.listVisible);
      this.popoutToggle.setAttribute(selectors$a.ariaExpanded, false);
    }
  }

  const popoutSection = {
    onLoad() {
      sections$4[this.id] = [];
      const wrappers = this.container.querySelectorAll(selectors$a.popoutWrapper);
      wrappers.forEach((wrapper) => {
        sections$4[this.id].push(new Popout(wrapper));
      });
    },
    onUnload() {
      sections$4[this.id].forEach((popout) => {
        if (typeof popout.unload === 'function') {
          popout.unload();
        }
      });
    },
  };

  const selectors$b = {
    newsletterForm: '[data-newsletter-form]',
    newsletterHeading: '[data-newsletter-heading]',
  };

  const classes$4 = {
    success: 'has-success',
    error: 'not-success',
    hide: 'hide',
  };

  const sections$5 = {};

  class NewsletterCheckForResult {
    constructor(newsletter) {
      this.sessionStorage = window.sessionStorage;
      this.newsletter = newsletter;

      this.stopSubmit = true;
      this.isChallengePage = false;
      this.formID = null;

      this.checkForChallengePage();

      this.newsletterSubmit = (e) => this.newsletterSubmitEvent(e);

      if (!this.isChallengePage) {
        this.init();
      }
    }

    init() {
      this.newsletter.addEventListener('submit', this.newsletterSubmit);

      this.showMessage();
    }

    newsletterSubmitEvent(e) {
      if (this.stopSubmit) {
        e.preventDefault();

        this.removeStorage();
        this.writeStorage();
        this.stopSubmit = false;
        this.newsletter.submit();
      }
    }

    checkForChallengePage() {
      this.isChallengePage = window.location.pathname === '/challenge';
    }

    writeStorage() {
      if (this.sessionStorage !== undefined) {
        this.sessionStorage.setItem('newsletter_form_id', this.newsletter.id);
      }
    }

    readStorage() {
      this.formID = this.sessionStorage.getItem('newsletter_form_id');
    }

    removeStorage() {
      this.sessionStorage.removeItem('newsletter_form_id');
    }

    showMessage() {
      this.readStorage();

      if (this.newsletter.id === this.formID) {
        const newsletter = document.getElementById(this.formID);
        const newsletterHeading = newsletter.parentElement.querySelector(selectors$b.newsletterHeading);
        const submissionSuccess = window.location.search.indexOf('?customer_posted=true') !== -1;
        const submissionFailure = window.location.search.indexOf('accepts_marketing') !== -1;

        if (submissionSuccess) {
          newsletter.classList.remove(classes$4.error);
          newsletter.classList.add(classes$4.success);

          if (newsletterHeading) {
            newsletterHeading.classList.add(classes$4.hide);
          }
        } else if (submissionFailure) {
          newsletter.classList.remove(classes$4.success);
          newsletter.classList.add(classes$4.error);

          if (newsletterHeading) {
            newsletterHeading.classList.add(classes$4.hide);
          }
        }

        if (submissionSuccess || submissionFailure) {
          this.scrollToForm(newsletter);
        }
      }
    }

    scrollToForm(newsletter) {
      const rect = newsletter.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (!isVisible) {
        setTimeout(() => {
          window.scroll({
            top: rect.top,
            left: 0,
            behavior: 'smooth',
          });
        }, 400);
      }
    }

    unload() {
      this.newsletter.removeEventListener('submit', this.newsletterSubmit);
    }
  }

  const newsletterCheckForResultSection = {
    onLoad() {
      sections$5[this.id] = [];
      const newsletters = this.container.querySelectorAll(selectors$b.newsletterForm);
      newsletters.forEach((form) => {
        sections$5[this.id].push(new NewsletterCheckForResult(form));
      });
    },
    onUnload() {
      sections$5[this.id].forEach((form) => {
        if (typeof form.unload === 'function') {
          form.unload();
        }
      });
    },
  };

  register('footer', [popoutSection, parallaxHero, newsletterCheckForResultSection]);

  function Listeners() {
    this.entries = [];
  }

  Listeners.prototype.add = function (element, event, fn) {
    this.entries.push({element: element, event: event, fn: fn});
    element.addEventListener(event, fn);
  };

  Listeners.prototype.removeAll = function () {
    this.entries = this.entries.filter(function (listener) {
      listener.element.removeEventListener(listener.event, listener.fn);
      return false;
    });
  };

  /**
   * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Number} value Accepts Number (e.g. 6908023078973)
   * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
   */

  /**
   * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromSerializedArray(product, collection) {
    _validateProductStructure(product);

    // If value is an array of options
    var optionArray = _createOptionArrayFromOptionCollection(product, collection);
    return getVariantFromOptionArray(product, optionArray);
  }

  /**
   * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromOptionArray(product, options) {
    _validateProductStructure(product);
    _validateOptionsArray(options);

    var result = product.variants.filter(function (variant) {
      return options.every(function (option, index) {
        return variant.options[index] === option;
      });
    });

    return result[0] || null;
  }

  /**
   * Creates an array of selected options from the object
   * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
   * @param {Object} product Product JSON object
   * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
   */
  function _createOptionArrayFromOptionCollection(product, collection) {
    _validateProductStructure(product);
    _validateSerializedArray(collection);

    var optionArray = [];

    collection.forEach(function (option) {
      for (var i = 0; i < product.options.length; i++) {
        var name = product.options[i].name || product.options[i];
        if (name.toLowerCase() === option.name.toLowerCase()) {
          optionArray[i] = option.value;
          break;
        }
      }
    });

    return optionArray;
  }

  /**
   * Check if the product data is a valid JS object
   * Error will be thrown if type is invalid
   * @param {object} product Product JSON object
   */
  function _validateProductStructure(product) {
    if (typeof product !== 'object') {
      throw new TypeError(product + ' is not an object.');
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
      throw new Error(product + ' is empty.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted like jQuery's serializeArray()
   * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
   */
  function _validateSerializedArray(collection) {
    if (!Array.isArray(collection)) {
      throw new TypeError(collection + ' is not an array.');
    }

    if (collection.length === 0) {
      throw new Error(collection + ' is empty.');
    }

    if (collection[0].hasOwnProperty('name')) {
      if (typeof collection[0].name !== 'string') {
        throw new TypeError('Invalid value type passed for name of option ' + collection[0].name + '. Value should be string.');
      }
    } else {
      throw new Error(collection[0] + 'does not contain name key.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted as list of values
   * @param {Array} collection Array of object (e.g. ['36', 'Black'])
   */
  function _validateOptionsArray(options) {
    if (Array.isArray(options) && typeof options[0] === 'object') {
      throw new Error(options + 'is not a valid array of options.');
    }
  }

  var selectors$c = {
    idInput: '[name="id"]',
    planInput: '[name="selling_plan"]',
    optionInput: '[name^="options"]',
    quantityInput: '[name="quantity"]',
    propertyInput: '[name^="properties"]',
  };

  // Public Methods
  // -----------------------------------------------------------------------------

  /**
   * Returns a URL with a variant ID query parameter. Useful for updating window.history
   * with a new URL based on the currently select product variant.
   * @param {string} url - The URL you wish to append the variant ID to
   * @param {number} id  - The variant ID you wish to append to the URL
   * @returns {string} - The new url which includes the variant ID query parameter
   */

  function getUrlWithVariant(url, id) {
    if (/variant=/.test(url)) {
      return url.replace(/(variant=)[^&]+/, '$1' + id);
    } else if (/\?/.test(url)) {
      return url.concat('&variant=').concat(id);
    }

    return url.concat('?variant=').concat(id);
  }

  /**
   * Constructor class that creates a new instance of a product form controller.
   *
   * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs
   * @param {Object} product - A product object
   * @param {Object} options - Optional options object
   * @param {Function} options.onOptionChange - Callback for whenever an option input changes
   * @param {Function} options.onPlanChange - Callback for changes to name=selling_plan
   * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes
   * @param {Function} options.onPropertyChange - Callback for whenever a property input changes
   * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted
   */
  class ProductForm {
    constructor(element, product, options) {
      this.element = element;
      this.form = this.element.tagName == 'FORM' ? this.element : this.element.querySelector('form');
      this.product = this._validateProductObject(product);
      this.variantElement = this.element.querySelector(selectors$c.idInput);

      options = options || {};

      this._listeners = new Listeners();
      this._listeners.add(this.element, 'submit', this._onSubmit.bind(this, options));

      this.optionInputs = this._initInputs(selectors$c.optionInput, options.onOptionChange);

      this.planInputs = this._initInputs(selectors$c.planInput, options.onPlanChange);

      this.quantityInputs = this._initInputs(selectors$c.quantityInput, options.onQuantityChange);

      this.propertyInputs = this._initInputs(selectors$c.propertyInput, options.onPropertyChange);
    }

    /**
     * Cleans up all event handlers that were assigned when the Product Form was constructed.
     * Useful for use when a section needs to be reloaded in the theme editor.
     */
    destroy() {
      this._listeners.removeAll();
    }

    /**
     * Getter method which returns the array of currently selected option values
     *
     * @returns {Array} An array of option values
     */
    options() {
      return this._serializeInputValues(this.optionInputs, function (item) {
        var regex = /(?:^(options\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the currently selected variant, or `null` if variant
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    variant() {
      const opts = this.options();
      if (opts.length) {
        return getVariantFromSerializedArray(this.product, opts);
      } else {
        return this.product.variants[0];
      }
    }

    /**
     * Getter method which returns the current selling plan, or `null` if plan
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    plan(variant) {
      let plan = {
        allocation: null,
        group: null,
        detail: null,
      };
      const formData = new FormData(this.form);
      const id = formData.get('selling_plan');

      if (id && variant) {
        plan.allocation = variant.selling_plan_allocations.find(function (item) {
          return item.selling_plan_id.toString() === id.toString();
        });
      }
      if (plan.allocation) {
        plan.group = this.product.selling_plan_groups.find(function (item) {
          return item.id.toString() === plan.allocation.selling_plan_group_id.toString();
        });
      }
      if (plan.group) {
        plan.detail = plan.group.selling_plans.find(function (item) {
          return item.id.toString() === id.toString();
        });
      }

      if (plan && plan.allocation && plan.detail && plan.allocation) {
        return plan;
      } else return null;
    }

    /**
     * Getter method which returns a collection of objects containing name and values
     * of property inputs
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    properties() {
      return this._serializeInputValues(this.propertyInputs, function (item) {
        var regex = /(?:^(properties\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'properties[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the current quantity or 1 if no quantity input is
     * included in the form
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    quantity() {
      return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
    }

    getFormState() {
      const variant = this.variant();
      return {
        options: this.options(),
        variant: variant,
        properties: this.properties(),
        quantity: this.quantity(),
        plan: this.plan(variant),
      };
    }

    // Private Methods
    // -----------------------------------------------------------------------------
    _setIdInputValue(variant) {
      if (variant && variant.id) {
        this.variantElement.value = variant.id.toString();
      } else {
        this.variantElement.value = '';
      }

      this.variantElement.dispatchEvent(new Event('change'));
    }

    _onSubmit(options, event) {
      event.dataset = this.getFormState();
      if (options.onFormSubmit) {
        options.onFormSubmit(event);
      }
    }

    _onOptionChange(event) {
      this._setIdInputValue(event.dataset.variant);
    }

    _onFormEvent(cb) {
      if (typeof cb === 'undefined') {
        return Function.prototype.bind();
      }

      return function (event) {
        event.dataset = this.getFormState();
        this._setIdInputValue(event.dataset.variant);
        cb(event);
      }.bind(this);
    }

    _initInputs(selector, cb) {
      var elements = Array.prototype.slice.call(this.element.querySelectorAll(selector));

      return elements.map(
        function (element) {
          this._listeners.add(element, 'change', this._onFormEvent(cb));
          return element;
        }.bind(this)
      );
    }

    _serializeInputValues(inputs, transform) {
      return inputs.reduce(function (options, input) {
        if (
          input.checked || // If input is a checked (means type radio or checkbox)
          (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input
        ) {
          options.push(transform({name: input.name, value: input.value}));
        }

        return options;
      }, []);
    }

    _validateProductObject(product) {
      if (typeof product !== 'object') {
        throw new TypeError(product + ' is not an object.');
      }

      if (typeof product.variants[0].options === 'undefined') {
        throw new TypeError('Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route');
      }
      return product;
    }
  }

  function getScript(url, callback, callbackError) {
    let head = document.getElementsByTagName('head')[0];
    let done = false;
    let script = document.createElement('script');
    script.src = url;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        callback();
      } else {
        callbackError();
      }
    };

    head.appendChild(script);
  }

  const loaders = {};
  window.isYoutubeAPILoaded = false;

  function loadScript(options = {}) {
    if (!options.type) {
      options.type = 'json';
    }

    if (options.url) {
      if (loaders[options.url]) {
        return loaders[options.url];
      } else {
        return getScriptWithPromise(options.url, options.type);
      }
    } else if (options.json) {
      if (loaders[options.json]) {
        return Promise.resolve(loaders[options.json]);
      } else {
        return window
          .fetch(options.json)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            loaders[options.json] = response;
            return response;
          });
      }
    } else if (options.name) {
      const key = ''.concat(options.name, options.version);
      if (loaders[key]) {
        return loaders[key];
      } else {
        return loadShopifyWithPromise(options);
      }
    } else {
      return Promise.reject();
    }
  }

  function getScriptWithPromise(url, type) {
    const loader = new Promise((resolve, reject) => {
      if (type === 'text') {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        getScript(
          url,
          function () {
            resolve();
          },
          function () {
            reject();
          }
        );
      }
    });

    loaders[url] = loader;
    return loader;
  }

  function loadShopifyWithPromise(options) {
    const key = ''.concat(options.name, options.version);
    const loader = new Promise((resolve, reject) => {
      try {
        window.Shopify.loadFeatures([
          {
            name: options.name,
            version: options.version,
            onLoad: (err) => {
              onLoadFromShopify(resolve, reject, err);
            },
          },
        ]);
      } catch (err) {
        reject(err);
      }
    });
    loaders[key] = loader;
    return loader;
  }

  function onLoadFromShopify(resolve, reject, err) {
    if (err) {
      return reject(err);
    } else {
      return resolve();
    }
  }

  const throttle = (fn, wait) => {
    let prev, next;
    return function invokeFn(...args) {
      const now = Date.now();
      next = clearTimeout(next);
      if (!prev || now - prev >= wait) {
        // eslint-disable-next-line prefer-spread
        fn.apply(null, args);
        prev = now;
      } else {
        next = setTimeout(invokeFn.bind(null, ...args), wait - (now - prev));
      }
    };
  };

  const selectors$d = {
    tooltip: 'data-tooltip',
    tooltipStopMouseEnter: 'data-tooltip-stop-mouseenter',
  };

  const classes$5 = {
    tooltipDefault: 'tooltip-default',
    classVisible: 'is-visible',
    classHiding: 'is-hiding',
  };

  let sections$6 = {};

  class Tooltip {
    constructor(el, options = {}) {
      this.tooltip = el;
      if (!this.tooltip.hasAttribute(selectors$d.tooltip)) return;
      this.label = this.tooltip.getAttribute(selectors$d.tooltip);
      this.class = options.class || classes$5.tooltipDefault;
      this.transitionSpeed = options.transitionSpeed || 200;
      this.hideTransitionTimeout = 0;
      this.addPinEvent = () => this.addPin();
      this.addPinMouseEvent = () => this.addPin(true);
      this.removePinEvent = (event) => throttle(this.removePin(event), 50);
      this.removePinMouseEvent = (event) => this.removePin(event, true, true);
      this.init();
    }

    init() {
      if (!document.querySelector(`.${this.class}`)) {
        const tooltipTemplate = `<div class="${this.class}__inner"><div class="${this.class}__arrow"></div><div class="${this.class}__text"></div></div>`;
        const tooltipElement = document.createElement('div');
        tooltipElement.className = this.class;
        tooltipElement.innerHTML = tooltipTemplate;
        document.body.appendChild(tooltipElement);
      }

      this.tooltip.addEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.addEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.addEventListener('tooltip:init', this.addPinEvent);
      document.addEventListener('tooltip:close', this.removePinEvent);
    }

    addPin(stopMouseEnter = false) {
      const tooltipTarget = document.querySelector(`.${this.class}`);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(selectors$d.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        const tooltipTargetInner = tooltipTarget.querySelector(`.${this.class}__inner`);
        const tooltipTargetText = tooltipTarget.querySelector(`.${this.class}__text`);
        tooltipTargetText.textContent = this.label;

        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const tooltipTargetWidth = tooltipTargetInner.offsetWidth;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const tooltipTop = tooltipRect.top;
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const tooltipTargetPositionTop = tooltipTop + tooltipHeight + window.scrollY;
        let tooltipTargetPositionLeft = tooltipRect.left - tooltipTargetWidth / 2 + tooltipWidth / 2;
        const tooltipLeftWithWidth = tooltipTargetPositionLeft + tooltipTargetWidth;
        const tooltipTargetWindowDifference = tooltipLeftWithWidth - windowWidth;

        if (tooltipTargetWindowDifference > 0) {
          tooltipTargetPositionLeft -= tooltipTargetWindowDifference;
        }

        if (tooltipTargetPositionLeft < 0) {
          tooltipTargetPositionLeft = 0;
        }

        tooltipTarget.style.transform = `translate(${tooltipTargetPositionLeft}px, ${tooltipTargetPositionTop}px)`;
        tooltipTarget.classList.remove(classes$5.classHiding);
        tooltipTarget.classList.add(classes$5.classVisible);

        document.addEventListener('theme:scroll', this.removePinEvent);
      }
    }

    removePin(event, stopMouseEnter = false, hideTransition = false) {
      const tooltipTarget = document.querySelector(`.${this.class}`);
      const tooltipVisible = tooltipTarget.classList.contains(classes$5.classVisible);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(selectors$d.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        if (tooltipVisible && (hideTransition || event.detail.hideTransition)) {
          tooltipTarget.classList.add(classes$5.classHiding);

          if (this.hideTransitionTimeout) {
            clearTimeout(this.hideTransitionTimeout);
          }

          this.hideTransitionTimeout = setTimeout(() => {
            tooltipTarget.classList.remove(classes$5.classHiding);
          }, this.transitionSpeed);
        }

        tooltipTarget.classList.remove(classes$5.classVisible);

        document.removeEventListener('theme:scroll', this.removePinEvent);
      }
    }

    unload() {
      this.tooltip.removeEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.removeEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.removeEventListener('tooltip:init', this.addPinEvent);
      document.removeEventListener('tooltip:close', this.removePinEvent);
      document.removeEventListener('theme:scroll', this.removePinEvent);
    }
  }

  const tooltipSection = {
    onLoad() {
      sections$6[this.id] = [];
      const els = this.container.querySelectorAll(`[${selectors$d.tooltip}]`);
      els.forEach((el) => {
        sections$6[this.id].push(new Tooltip(el));
      });
    },
    onUnload: function () {
      sections$6[this.id].forEach((el) => {
        if (typeof el.unload === 'function') {
          el.unload();
        }
      });
    },
  };

  const selectors$e = {
    elements: {
      scrollbarAttribute: 'data-scrollbar',
      scrollbar: 'data-scrollbar-slider',
      scrollbarSlideFullWidth: 'data-scrollbar-slide-fullwidth',
      scrollbarArrowPrev: '[data-scrollbar-arrow-prev]',
      scrollbarArrowNext: '[data-scrollbar-arrow-next]',
    },
    classes: {
      hide: 'is-hidden',
    },
    times: {
      delay: 200,
    },
  };

  class NativeScrollbar {
    constructor(scrollbar) {
      this.scrollbar = scrollbar;

      this.arrowNext = this.scrollbar.parentNode.querySelector(selectors$e.elements.scrollbarArrowNext);
      this.arrowPrev = this.scrollbar.parentNode.querySelector(selectors$e.elements.scrollbarArrowPrev);

      if (this.scrollbar.hasAttribute(selectors$e.elements.scrollbarAttribute)) {
        this.init();
        this.resize();
      }

      if (this.scrollbar.hasAttribute(selectors$e.elements.scrollbar)) {
        this.scrollToVisibleElement();
      }
    }

    init() {
      if (this.arrowNext && this.arrowPrev) {
        this.toggleNextArrow();

        this.events();
      }
    }

    resize() {
      document.addEventListener('theme:resize', () => {
        this.toggleNextArrow();
      });
    }

    events() {
      this.arrowNext.addEventListener('click', (event) => {
        event.preventDefault();

        this.goToNext();
      });

      this.arrowPrev.addEventListener('click', (event) => {
        event.preventDefault();

        this.goToPrev();
      });

      this.scrollbar.addEventListener('scroll', () => {
        this.togglePrevArrow();
        this.toggleNextArrow();
      });
    }

    goToNext() {
      const moveWith = this.scrollbar.hasAttribute(selectors$e.elements.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2;
      const position = moveWith + this.scrollbar.scrollLeft;

      this.move(position);

      this.arrowPrev.classList.remove(selectors$e.classes.hide);

      this.toggleNextArrow();
    }

    goToPrev() {
      const moveWith = this.scrollbar.hasAttribute(selectors$e.elements.scrollbarSlideFullWidth) ? this.scrollbar.getBoundingClientRect().width : this.scrollbar.getBoundingClientRect().width / 2;
      const position = this.scrollbar.scrollLeft - moveWith;

      this.move(position);

      this.arrowNext.classList.remove(selectors$e.classes.hide);

      this.togglePrevArrow();
    }

    toggleNextArrow() {
      setTimeout(() => {
        this.arrowNext.classList.toggle(selectors$e.classes.hide, Math.round(this.scrollbar.scrollLeft + this.scrollbar.getBoundingClientRect().width + 1) >= this.scrollbar.scrollWidth);
      }, selectors$e.times.delay);
    }

    togglePrevArrow() {
      setTimeout(() => {
        this.arrowPrev.classList.toggle(selectors$e.classes.hide, this.scrollbar.scrollLeft <= 0);
      }, selectors$e.times.delay);
    }

    scrollToVisibleElement() {
      [].forEach.call(this.scrollbar.children, (element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();

          this.move(element.offsetLeft - element.clientWidth);
        });
      });
    }

    move(offsetLeft) {
      this.scrollbar.scrollTo({
        top: 0,
        left: offsetLeft,
        behavior: 'smooth',
      });
    }
  }

  const defaults = {
    color: 'ash',
  };

  const selectors$f = {
    formGridSwatch: '[data-grid-swatch-form]',
    swatch: 'data-swatch',
    outerGrid: '[data-product-grid-item]',
    slide: '[data-grid-slide]',
    image: 'data-swatch-image',
    variant: 'data-swatch-variant',
    button: '[data-swatch-button]',
    link: '[data-grid-link]',
    wrapper: '[data-grid-swatches]',
    template: '[data-swatch-template]',
    handle: 'data-swatch-handle',
    label: 'data-swatch-label',
    tooltip: 'data-tooltip',
    swatchCount: 'data-swatch-count',
    scrollbar: 'data-scrollbar',
  };

  const classes$6 = {
    visible: 'is-visible',
    stopEvents: 'no-events',
  };

  class ColorMatch {
    constructor(options = {}) {
      this.settings = {
        ...defaults,
        ...options,
      };

      this.match = this.init();
    }

    getColor() {
      return this.match;
    }

    init() {
      const getColors = loadScript({json: window.theme.assets.swatches});
      return getColors
        .then((colors) => {
          return this.matchColors(colors, this.settings.color);
        })
        .catch((e) => {
          console.log('failed to load swatch colors script');
          console.log(e);
        });
    }

    matchColors(colors, name) {
      let bg = '#E5E5E5';
      let img = null;
      const path = window.theme.assets.base || '/';
      const comparisonName = name.toLowerCase().replace(/\s/g, '');
      const array = colors.colors;

      if (array) {
        let indexArray = null;

        const hexColorArr = array.filter((colorObj, index) => {
          const neatName = Object.keys(colorObj).toString().toLowerCase().replace(/\s/g, '');

          if (neatName === comparisonName) {
            indexArray = index;

            return colorObj;
          }
        });

        if (hexColorArr.length && indexArray !== null) {
          const value = Object.values(array[indexArray])[0];
          bg = value;

          if (value.includes('.jpg') || value.includes('.jpeg') || value.includes('.png') || value.includes('.svg')) {
            img = `${path}${value}`;
            bg = '#888888';
          }
        }
      }

      return {
        color: this.settings.color,
        path: img,
        hex: bg,
      };
    }
  }

  class Swatch {
    constructor(element) {
      this.element = element;
      this.colorString = element.getAttribute(selectors$f.swatch);
      this.image = element.getAttribute(selectors$f.image);
      this.variant = element.getAttribute(selectors$f.variant);
      const matcher = new ColorMatch({color: this.colorString});
      matcher.getColor().then((result) => {
        this.colorMatch = result;
        this.init();
      });
    }

    init() {
      this.setStyles();
      if (this.variant) {
        this.handleEvents();
      }
    }

    setStyles() {
      if (this.colorMatch.hex) {
        this.element.style.setProperty('--swatch', `${this.colorMatch.hex}`);
      }
      if (this.colorMatch.path) {
        this.element.style.setProperty('background-image', `url(${this.colorMatch.path})`);
        this.element.style.setProperty('background-size', 'cover');
        this.element.style.setProperty('background-position', 'center center');
      }
    }

    handleEvents() {
      this.outer = this.element.closest(selectors$f.outerGrid);
      if (this.outer) {
        this.slide = this.outer.querySelector(selectors$f.slide);

        this.linkElement = this.outer.querySelector(selectors$f.link);
        this.linkElementAll = this.outer.querySelectorAll(selectors$f.link);
        this.linkDestination = getUrlWithVariant(this.linkElement.getAttribute('href'), this.variant);
        this.button = this.element.closest(selectors$f.button);

        if (this.button.closest(selectors$f.formGridSwatch)) {
          this.button.addEventListener(
            'mouseenter',
            function () {
              this.changeImage();
            }.bind(this)
          );
        }

        if (!this.button.closest(selectors$f.formGridSwatch)) {
          this.button.addEventListener(
            'click',
            function () {
              this.changeImage();
            }.bind(this)
          );
        }
      }
    }

    changeImage() {
      this.linkElementAll.forEach((link) => {
        link.setAttribute('href', this.linkDestination);
      });

      this.slide.setAttribute('src', this.linkDestination);
      if (this.image) {
        // container width rounded to the nearest 180 pixels
        // increses likelihood that the image will be cached
        let widthRounded = Math.ceil(this.slide.offsetWidth / 180) * 180;
        let sizedImage = themeImages.getSizedImageUrl(this.image, `${widthRounded}x`);
        window
          .fetch(sizedImage)
          .then((response) => {
            return response.blob();
          })
          .then((blob) => {
            var objectURL = URL.createObjectURL(blob);
            this.slide.style.setProperty('background-color', '#fff');
            this.slide.style.setProperty('background-image', `url("${objectURL}")`);
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          });
      }
    }
  }

  class GridSwatch {
    constructor(wrap, container) {
      this.counterSwatches = wrap.parentNode.previousElementSibling;
      this.template = document.querySelector(selectors$f.template).innerHTML;
      this.wrap = wrap;
      this.container = container;
      this.handle = wrap.getAttribute(selectors$f.handle);
      const label = wrap.getAttribute(selectors$f.label).trim().toLowerCase();
      fetchProduct(this.handle).then((product) => {
        this.product = product;
        this.colorOption = product.options.find(function (element) {
          return element.name.toLowerCase() === label || null;
        });

        if (this.colorOption) {
          this.swatches = this.colorOption.values;
          this.init();
        }
      });
    }

    init() {
      this.wrap.innerHTML = '';
      this.count = 0;

      this.swatches.forEach((swatch) => {
        let variant = this.product.variants.find((variant) => {
          return variant.options.includes(swatch);
        });

        if (variant) {
          this.count++;
          const image = variant.featured_media ? variant.featured_media.preview_image.src : '';

          this.wrap.innerHTML += Sqrl.render(this.template, {
            color: swatch,
            uniq: `${this.product.id}-${variant.id}`,
            variant: variant.id,
            available: variant.available,
            image,
          });
        }
      });

      this.swatchElements = this.wrap.querySelectorAll(`[${selectors$f.swatch}]`);

      if (this.counterSwatches.hasAttribute(selectors$f.swatchCount)) {
        this.counterSwatches.innerText = `${this.count} ${this.count > 1 ? theme.strings.otherColor : theme.strings.oneColor}`;

        this.counterSwatches.addEventListener('mouseenter', () => {
          this.wrap.closest(selectors$f.link).classList.add(classes$6.stopEvents);
          this.counterSwatches.nextElementSibling.classList.add(classes$6.visible);
        });

        this.counterSwatches.closest(selectors$f.outerGrid).addEventListener('mouseleave', () => {
          this.wrap.closest(selectors$f.link).classList.remove(classes$6.stopEvents);
          this.counterSwatches.nextElementSibling.classList.remove(classes$6.visible);
        });
      }

      if (this.wrap.hasAttribute(selectors$f.scrollbar)) {
        new NativeScrollbar(this.wrap);
      }

      this.swatchElements.forEach((el) => {
        new Swatch(el);
        const tooltipEl = el.closest(`[${selectors$f.tooltip}]`);

        if (tooltipEl) {
          new Tooltip(tooltipEl);
        }
      });
    }
  }

  const makeGridSwatches = (section) => {
    const gridSwatchWrappers = section.container.querySelectorAll(selectors$f.wrapper);
    gridSwatchWrappers.forEach((wrap) => {
      new GridSwatch(wrap, undefined);
    });
  };

  const swatchSection = {
    onLoad() {
      this.swatches = [];
      const els = this.container.querySelectorAll(`[${selectors$f.swatch}]`);
      els.forEach((el) => {
        this.swatches.push(new Swatch(el));
      });
    },
  };

  const swatchGridSection = {
    onLoad() {
      makeGridSwatches(this);
    },
  };

  const selectors$g = {
    elements: {
      html: 'html',
      body: 'body',
      sectionId: 'data-section-id',
      sectionOuter: '[data-section-id]',
      productGrid: 'data-product-grid-item',
      formQuickAdd: '[data-form-quick-add]',
      quickAddLabel: 'data-quick-add-label',
      quickCollectionHande: 'data-collection-handle',
      selectOption: '[data-select-option]:not([data-quick-add-button])',
      holderFormQuickAdd: '[data-quick-add-holder]',
      goToNextElement: 'data-go-to-next',
      quickAddElement: 'data-quick-add-button',
      productJson: '[data-product-json]',
      productOptionsJson: '[data-product-options-json]',
      quickAddFormHolder: '[data-quick-add-form-holder]',
      featuredImageHolder: '[data-grid-slide]',
      productImagesHolder: '[data-product-image]',
      productInformationHolder: '[data-product-information]',
      scrollbarHolder: '[data-scrollbar]',
      scrollbarArrowPrev: '[data-scrollbar-arrow-prev]',
      scrollbarArrowNext: '[data-scrollbar-arrow-next]',
      radioOption: '[data-radio-option]',
      popoutWrapper: '[data-popout]',
      popupList: '[data-popout-list]',
      popupoutOption: '[data-popout-option]',
      popupoutOptionValue: 'data-value',
      popupoutToggle: '[data-popout-toggle]',
      selectPosition: 'data-select-position',
      swatch: 'data-swatch',
      backButton: '[data-back-button]',
      messageError: '[data-message-error]',
      idInput: '[name="id"]',
      buttonQuickAddMobile: '[data-button-quick-add-mobile]',
      ariaExpanded: 'aria-expanded',
      input: 'input',
    },
    classes: {
      active: 'is-active',
      select: 'is-selected',
      disable: 'is-disable',
      hide: 'is-hidden',
      added: 'is-added',
      loading: 'is-loading',
      visible: 'is-visible',
      error: 'has-error',
      focus: 'is-focused',
      popupoutVisible: 'popout-list--visible',
    },
    times: {
      debounce: 500,
      delay: 400,
      delaySmall: 200,
      delayMedium: 2000,
      delayLarge: 5000,
    },
    imageSize: '800x800',
  };

  const instances$1 = [];

  class QuickAddProduct {
    constructor(el) {
      this.cart = window.cart;
      this.a11y = a11y;
      this.themeAccessibility = window.accessibility;

      this.document = document;
      this.html = this.document.querySelector(selectors$g.elements.html);
      this.body = this.document.querySelector(selectors$g.elements.body);

      this.productGrid = el;
      this.holder = this.productGrid.querySelector(selectors$g.elements.holderFormQuickAdd);
      this.quickAddLabel = this.productGrid.querySelector(`[${selectors$g.elements.quickAddLabel}]`);
      this.quickAddFormHolder = this.productGrid.querySelector(selectors$g.elements.quickAddFormHolder);
      this.featuredImageHolder = this.productGrid.querySelector(selectors$g.elements.featuredImageHolder);
      this.productInformationHolder = this.productGrid.querySelector(selectors$g.elements.productInformationHolder);
      this.buttonQuickAddMobile = this.productGrid.querySelector(selectors$g.elements.buttonQuickAddMobile);

      this.sectionOuter = this.productGrid.closest(selectors$g.elements.sectionOuter);
      this.sectionId = this.sectionOuter.getAttribute(selectors$g.elements.sectionId);

      this.productJSON = null;
      this.productOptionsJSON = null;
      this.productForm = null;

      this.selectedOptions = [];
      this.filteredOptions = [];

      this.enableMobileMode = false;
      this.accessibilityStopEvent = false;
      this.quickAddFormIsLoaded = false;

      if (theme.enableQuickAdd) {
        this.accessibility();
        this.show();
        this.hide();
        this.errorHandle();
      }
    }

    /**
     * Init native scrollbar for product options
     */
    initNativeScrollbar() {
      if (this.scrollbarHolder.length) {
        this.scrollbarHolder.forEach((scrollbar) => {
          new NativeScrollbar(scrollbar);
        });
      }
    }

    /**
     * Handle AJAX product grid item form
     */
    getForm() {
      if (this.quickAddFormIsLoaded) {
        return;
      }

      this.quickAddFormIsLoaded = true;
      const root = theme.routes.root === '/' ? '' : theme.routes.root;

      fetch(root + '/products/' + this.quickAddLabel.getAttribute(selectors$g.elements.quickAddLabel) + '?section_id=api-quick-add')
        .then((response) => response.text())
        .then((data) => {
          const fresh = document.createElement('div');
          fresh.innerHTML = data;
          const cleanResponse = fresh.querySelector('[data-api-content]').innerHTML;

          // Inject a unique ID into the form
          const collectionHandle = this.quickAddLabel.getAttribute(selectors$g.elements.quickCollectionHande);
          const unique = `${collectionHandle}-${this.sectionId}`;
          this.quickAddFormHolder.innerHTML = cleanResponse.replaceAll('||collection-index||', unique);

          this.loadForm();
        })
        .catch((e) => {
          console.warn(e);
        });
    }

    /**
     * Load form and cache elements
     */
    loadForm() {
      this.form = this.quickAddFormHolder.querySelector(selectors$g.elements.formQuickAdd);
      this.selectOption = this.quickAddFormHolder.querySelectorAll(selectors$g.elements.selectOption);
      this.productElemJSON = this.quickAddFormHolder.querySelector(selectors$g.elements.productJson);
      this.productOptionsElemJSON = this.quickAddFormHolder.querySelector(selectors$g.elements.productOptionsJson);
      this.scrollbarHolder = this.quickAddFormHolder.querySelectorAll(selectors$g.elements.scrollbarHolder);
      this.popoutWrapper = this.quickAddFormHolder.querySelectorAll(selectors$g.elements.popoutWrapper);
      this.swatches = this.quickAddFormHolder.querySelectorAll(`[${selectors$g.elements.swatch}]`);
      this.backButtons = this.quickAddFormHolder.querySelectorAll(selectors$g.elements.backButton);

      // Init Swatches
      if (this.swatches.length) {
        this.swatches.forEach((swatch) => {
          new Swatch(swatch);
        });

        this.changeVariantImageOnHover();
      }

      // Init Popout
      if (this.popoutWrapper.length) {
        this.popoutWrapper.forEach((wrapper) => {
          new Popout(wrapper);
        });
      }

      // Init native scrollbar
      this.initNativeScrollbar();

      // Init back buttons to return one step
      this.initGoToBack();

      const hasProductJSON = this.productElemJSON && this.productElemJSON.innerHTML !== '';
      const hasProductOptionsJSON = this.productOptionsElemJSON && this.productOptionsElemJSON.innerHTML !== '';

      if (hasProductJSON && hasProductOptionsJSON) {
        this.productJSON = JSON.parse(this.productElemJSON.innerHTML);
        this.productOptionsJSON = JSON.parse(this.productOptionsElemJSON.innerHTML);

        this.initForm();
      } else {
        console.error('Missing product JSON or product options with values JSON');
      }
    }

    /**
     * Init product form
     */
    initForm() {
      this.filterFirstOptionValues();

      this.productForm = new ProductForm(this.form, this.productJSON, {
        onOptionChange: this.onOptionChange.bind(this),
      });

      if (this.enableMobileMode) {
        this.addFirstVariantIsDefault(this.buttonQuickAddMobile.hasAttribute(selectors$g.elements.quickAddElement));

        this.buttonQuickAddMobile.classList.add(selectors$g.classes.hide);
        this.buttonQuickAddMobile.classList.remove(selectors$g.classes.loading);

        this.quickAddLabel.classList.add(selectors$g.classes.hide);

        this.toggleClasses();
      } else {
        this.quickAddLabel.classList.remove(selectors$g.classes.disable, selectors$g.classes.hide);
      }
    }

    /**
     * Init one step go to back
     */
    onOptionChange(event) {
      const targetElement = event.target;
      const optionHolder = targetElement.closest(selectors$g.elements.selectOption);
      const position = Number(optionHolder.getAttribute(selectors$g.elements.selectPosition));
      const firstOptionValue = event.dataset.variant ? event.dataset.variant.options[position - 1] : event.dataset.options[position - 1];
      const focusedIsEnable = this.body.classList.contains(selectors$g.classes.focus);

      this.changeVariantImage(event.dataset.variant);

      // Stop change when focus is enabled
      if (focusedIsEnable && this.accessibilityStopEvent) {
        return;
      }

      this.selectedOptions.push(event.target.value);

      optionHolder.classList.add(selectors$g.classes.select);

      this.filterAvailableOptions(firstOptionValue, position);

      if (targetElement.hasAttribute(selectors$g.elements.goToNextElement)) {
        optionHolder.classList.remove(selectors$g.classes.active);
        optionHolder.nextElementSibling.classList.add(selectors$g.classes.active);
      }

      if (targetElement.hasAttribute(selectors$g.elements.quickAddElement) && event.dataset.variant.available) {
        if (theme.cartDrawerEnabled) {
          this.quickAddLabel.classList.remove(selectors$g.classes.hide);
          this.quickAddLabel.classList.add(selectors$g.classes.loading);
        }

        this.html.dispatchEvent(
          new CustomEvent('cart:add-to-cart', {
            bubbles: true,
            detail: {
              element: this.holder,
              label: this.quickAddLabel,
              data: {
                id: event.dataset.variant.id,
                quantity: 1,
              },
            },
          })
        );

        setTimeout(() => {
          this.selectedOptions = [];
          this.resetInputsOfInstance();
        }, selectors$g.times.delayMedium);

        optionHolder.classList.remove(selectors$g.classes.active);
      }

      if (focusedIsEnable && targetElement.hasAttribute(selectors$g.elements.goToNextElement)) {
        this.accessibilityTrapFocus(optionHolder.nextElementSibling);
      }

      this.accessibilityStopEvent = false;
    }

    /**
     * Init one-step go to back
     */
    initGoToBack() {
      if (this.backButtons.length) {
        this.backButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();

            const isFocused = this.body.classList.contains(selectors$g.classes.focus);

            // Remove last added option value
            this.selectedOptions.pop();

            const optionHolder = button.closest(selectors$g.elements.selectOption);

            let previousHolder = optionHolder.previousElementSibling.matches(selectors$g.elements.selectOption) ? optionHolder.previousElementSibling : this.quickAddLabel;

            if (previousHolder === this.quickAddLabel && isFocused) {
              this.themeAccessibility.lastFocused = this.quickAddLabel;
            }

            if (previousHolder === this.quickAddLabel && this.enableMobileMode) {
              previousHolder = this.buttonQuickAddMobile;
            }

            // Return inputs and selects to primary states
            if (previousHolder !== this.quickAddLabel) {
              if (isFocused) {
                this.accessibilityTrapFocus(previousHolder);
              }

              const inputs = optionHolder.querySelectorAll(selectors$g.elements.input);
              const selects = optionHolder.querySelectorAll(selectors$g.elements.popupoutOption);

              const previousInputs = previousHolder.querySelectorAll(selectors$g.elements.input);
              const previousSelects = previousHolder.querySelectorAll(selectors$g.elements.popupoutOption);

              if (inputs) {
                inputs.forEach((input) => {
                  input.checked = false;
                });
              }

              if (selects) {
                selects.forEach((option) => {
                  option.classList.remove(selectors$g.classes.visible);
                });
              }

              if (previousInputs) {
                previousInputs.forEach((input) => {
                  input.checked = false;
                });
              }

              if (previousSelects) {
                previousSelects.forEach((option) => {
                  option.classList.remove(selectors$g.classes.visible);
                });
              }
            }

            if (previousHolder !== this.buttonQuickAddMobile) {
              if (isFocused) {
                this.accessibilityTrapFocus(previousHolder);
              }

              previousHolder.classList.add(selectors$g.classes.active, selectors$g.classes.select);
            }

            if (previousHolder === this.buttonQuickAddMobile) {
              this.holder.classList.remove(selectors$g.classes.visible);
            }

            previousHolder.classList.remove(selectors$g.classes.hide);

            optionHolder.classList.remove(selectors$g.classes.active, selectors$g.classes.select);

            if (isFocused) {
              previousHolder.focus();
            }
          });
        });
      }
    }

    /**
     * Toggle classes
     */
    toggleClasses() {
      this.holder.classList.add(selectors$g.classes.visible);

      if (this.selectOption && this.selectOption.length && this.quickAddFormHolder.innerHTML !== '&nbsp;') {
        this.quickAddLabel.classList.add(selectors$g.classes.hide);

        const options = Array.from(this.selectOption);
        const hasActiveOption = options.filter((option) => {
          return option.classList.contains(selectors$g.classes.active);
        });

        if (hasActiveOption.length === 0) {
          this.selectOption[0].classList.add(selectors$g.classes.active);

          if (this.body.classList.contains(selectors$g.classes.focus) && this.accessibilityStopEvent) {
            setTimeout(() => {
              this.accessibilityTrapFocus(this.selectOption[0]);
            }, selectors$g.times.delaySmall);
          }
        }
      }
    }

    /**
     * Add first variant if it is the default variant
     *
     * @param { Boolean } targetHasQuickAddAttribute
     */
    addFirstVariantIsDefault(targetHasQuickAddAttribute) {
      const firstVariant = this.productJSON.variants[0];

      if (targetHasQuickAddAttribute && firstVariant.available) {
        if (theme.cartDrawerEnabled) {
          this.quickAddLabel.classList.remove(selectors$g.classes.hide);
          this.quickAddLabel.classList.add(selectors$g.classes.loading);
        }

        this.html.dispatchEvent(
          new CustomEvent('cart:add-to-cart', {
            bubbles: true,
            detail: {
              element: this.holder,
              label: this.quickAddLabel,
              data: {
                id: firstVariant.id,
                quantity: 1,
              },
            },
          })
        );
      }
    }

    /**
     * Show quick add
     */
    show() {
      // Button quick view (touch devices)
      if (this.buttonQuickAddMobile) {
        this.buttonQuickAddMobile.addEventListener('click', () => {
          this.enableMobileMode = true;

          this.buttonQuickAddMobile.classList.add(selectors$g.classes.loading);

          if (this.quickAddFormHolder.innerHTML === '&nbsp;' && !this.quickAddFormIsLoaded) {
            this.getForm();
          } else {
            this.toggleClasses();

            this.buttonQuickAddMobile.classList.remove(selectors$g.classes.loading);
            this.buttonQuickAddMobile.classList.add(selectors$g.classes.hide);
            this.holder.classList.add(selectors$g.classes.visible);
          }

          if (this.productJSON !== null) {
            this.addFirstVariantIsDefault(this.buttonQuickAddMobile.hasAttribute(selectors$g.elements.quickAddElement));
          }
        });
      }

      // Do AJAX when hover on product grid item
      if (this.productGrid) {
        this.productGrid.addEventListener('mouseenter', () => {
          this.enableMobileMode = false;

          this.hideOtherHolders();

          if (this.quickAddFormHolder && this.quickAddFormHolder.innerHTML === '&nbsp;' && !this.quickAddFormIsLoaded) {
            this.getForm();
          }
        });
      }

      if (this.quickAddLabel) {
        // Do AJAX when focus on quick add label
        this.quickAddLabel.addEventListener('focusin', () => {
          this.enableMobileMode = false;

          if (this.quickAddFormHolder.innerHTML === '&nbsp;' && !this.quickAddFormIsLoaded) {
            this.getForm();
          }
        });

        // Open the first product option values or
        // add product to the cart if it is enable
        this.quickAddLabel.addEventListener('click', () => {
          this.enableMobileMode = false;

          const stopEvent = this.quickAddLabel.classList.contains(selectors$g.classes.added) || this.quickAddLabel.classList.contains(selectors$g.classes.disable);

          if (stopEvent || this.productJSON === null) {
            return;
          }

          this.selectedOptions = [];

          this.addFirstVariantIsDefault(this.quickAddLabel.hasAttribute(selectors$g.elements.quickAddElement));

          if (this.quickAddFormHolder.innerHTML !== '&nbsp;') {
            this.toggleClasses();
          }
        });
      }

      this.productInformationHolder.addEventListener('mouseenter', () => {
        this.featuredImageHolder.closest(selectors$g.elements.productImagesHolder).classList.remove(selectors$g.classes.visible);
      });
    }

    /**
     * Hide quick add
     */
    hide() {
      if (this.quickAddLabel || this.buttonQuickAddMobile) {
        if (theme.cartDrawerEnabled) {
          this.document.addEventListener('theme:cart-close', () => {
            setTimeout(() => {
              this.resetButtonsOfInstance();
            }, selectors$g.times.delayLarge);
          });
        } else {
          setTimeout(() => {
            this.resetButtonsOfInstance();
          }, selectors$g.times.delayLarge);
        }
      }
    }

    accessibility() {
      this.productGrid.addEventListener('keyup', (event) => {
        if (event.keyCode === window.theme.keyboardKeys.TAB) {
          this.accessibilityStopEvent = true;
        }

        if (event.keyCode === window.theme.keyboardKeys.ENTER) {
          this.accessibilityStopEvent = false;
          const element = event.target.hasAttribute(selectors$g.elements.popupoutOptionValue) ? event.target.closest(selectors$g.elements.popupList).nextElementSibling : event.target;

          element.dispatchEvent(new Event('change'));
        }
      });
    }

    /**
     * Enable trap focus
     *
     * @param { DOM Element } container
     */
    accessibilityTrapFocus(container) {
      this.a11y.removeTrapFocus();
      this.a11y.trapFocus(container, {
        elementToFocus: container.querySelector(selectors$g.elements.backButton),
      });
    }

    /**
     * Filter available options based on variants
     *
     * @param { String } value
     * @param { Number } optionIndex
     * @param { Boolean } enableCheck
     */
    filterAvailableOptions(value, optionIndex, enableCheck = true) {
      const variants = this.productJSON.variants.filter((variant) => {
        if (variant.options.length > 1) {
          let available = [];

          this.selectedOptions.forEach((option, index) => {
            available.push(variant[`option${optionIndex}`] === value && variant.options[index] === option && variant.available);
          });

          if (!available.includes(false) && available.length > 0) {
            return variant;
          }
        } else {
          return variant[`option${optionIndex}`] === value && variant.available;
        }
      });

      this.productOptionsJSON.forEach((option) => {
        if (option.position !== optionIndex) {
          const filteredObject = {};
          filteredObject.name = option.name;
          filteredObject.position = option.position;
          filteredObject.values = [];

          option.values.forEach((value) => {
            const availableVariants = variants.filter((variant) => variant[`option${option.position}`] === value);

            if (availableVariants.length) {
              filteredObject.values.push(value);
            }
          });

          this.filteredOptions = [...this.filteredOptions, filteredObject];
        }
      });

      if (enableCheck) {
        this.disableUnavailableValues();
        this.filteredOptions = [];
      }
    }

    /**
     * Filter first option values based on the variants
     * on load or when the product is added
     */
    filterFirstOptionValues() {
      this.productOptionsJSON[0].values.forEach((value) => {
        const variants = this.productJSON.variants.filter((variant) => {
          return variant.option1 === value && variant.available;
        });

        if (variants.length === 0 && this.selectOption[0] !== undefined) {
          const currentInput = this.selectOption[0].querySelector(`input[value="${value}"]`);
          const currentOption = this.selectOption[0].querySelector(`[${selectors$g.elements.popupoutOptionValue}="${value}"]`);

          if (currentInput) {
            currentInput.checked = false;
            currentInput.disabled = true;
          }

          if (currentOption) {
            currentOption.classList.add(selectors$g.classes.disable);
            currentOption.setAttribute('tabindex', -1);
          }
        }
      });
    }

    /**
     * Disable/Enable option values
     */
    disableUnavailableValues() {
      if (this.selectOption) {
        this.selectOption.forEach((option) => {
          const inputs = option.querySelectorAll(selectors$g.elements.input);
          const selects = option.querySelectorAll(selectors$g.elements.popupoutOption);

          // Disable/Enable swatches and boxes
          inputs.forEach((input) => {
            if (!option.classList.contains(selectors$g.classes.select)) {
              input.checked = false;
              input.disabled = true;
            }

            this.filteredOptions.forEach((data) => {
              if (data.values.includes(input.value)) {
                input.disabled = false;
              }
            });
          });

          // Disable/Enable select options
          selects.forEach((item) => {
            if (!option.classList.contains(selectors$g.classes.select)) {
              item.setAttribute('tabindex', -1);
              item.classList.add(selectors$g.classes.disable);
            }

            this.filteredOptions.forEach((data) => {
              if (data.values.includes(item.getAttribute(`${selectors$g.elements.popupoutOptionValue}`))) {
                item.classList.remove(selectors$g.classes.disable);
                item.setAttribute('tabindex', 1);
              }
            });
          });
        });
      }
    }

    /**
     * Change variant image on hover
     */
    changeVariantImageOnHover() {
      this.swatches.forEach((swatch) => {
        swatch.addEventListener('mouseover', () => {
          for (let index = 0; index < this.productJSON.variants.length; index++) {
            const variant = this.productJSON.variants[index];

            if (variant.featured_media !== undefined && variant.options[this.selectedOptions.length] === swatch.getAttribute(selectors$g.elements.swatch)) {
              this.changeVariantImage(variant);
              break;
            }
          }
        });
      });
    }

    /**
     * Change image with a variant image if exists
     *
     * @param { Object } currentVariant
     */
    changeVariantImage(currentVariant) {
      const imageExists = currentVariant && currentVariant.featured_media && currentVariant.featured_media !== undefined;

      if (imageExists) {
        const currentImage = themeImages.getSizedImageUrl(currentVariant.featured_media.preview_image.src, selectors$g.imageSize);

        this.featuredImageHolder.style.setProperty('background-image', `url(${currentImage})`);
        this.featuredImageHolder.closest(selectors$g.elements.productImagesHolder).classList.add(selectors$g.classes.visible);
      }
    }

    /**
     *  Reset option values
     *
     * @param { DOM Element } option
     */
    resetOptions(option) {
      option.querySelectorAll(selectors$g.elements.input).forEach((input) => {
        input.checked = false;
        input.disabled = false;
      });

      option.querySelectorAll(selectors$g.elements.popupoutOption).forEach((option) => {
        option.classList.remove(selectors$g.classes.disable);
        option.setAttribute('tabindex', 1);
      });
    }

    /**
     * Hide other holders if they are visible
     */
    hideOtherHolders() {
      const otherHolderFormQuickAdd = this.document.querySelectorAll(selectors$g.elements.holderFormQuickAdd);

      if (otherHolderFormQuickAdd) {
        otherHolderFormQuickAdd.forEach((holder) => {
          if (holder !== this.holder) {
            holder.classList.remove(selectors$g.classes.visible);
            const selectToggleButton = holder.querySelector(selectors$g.elements.popupoutToggle);

            if (selectToggleButton) {
              selectToggleButton.setAttribute(selectors$g.elements.ariaExpanded, false);
              selectToggleButton.nextElementSibling.classList.remove(selectors$g.classes.popupoutVisible);
            }

            if (this.popoutWrapper) {
              holder.closest(`[${selectors$g.elements.productGrid}]`).querySelector(selectors$g.elements.productImagesHolder).classList.remove(selectors$g.classes.visible);
            }
          }
        });
      }
    }

    /**
     * Reset inputs of this instance
     */
    resetInputsOfInstance() {
      if (this.selectOption) {
        this.quickAddLabel.classList.remove(selectors$g.classes.hide);
        this.initNativeScrollbar();

        this.selectOption.forEach((option) => {
          option.classList.remove(selectors$g.classes.active, selectors$g.classes.select);
          const selectToggleButton = option.querySelector(selectors$g.elements.popupoutToggle);

          if (selectToggleButton) {
            selectToggleButton.innerText = theme.strings.selectValue;
            selectToggleButton.setAttribute(selectors$g.elements.ariaExpanded, false);
          }

          this.resetOptions(option);
        });

        this.filterFirstOptionValues();
        this.filteredOptions = [];
      }
    }

    /**
     * Reset buttons to default states
     */
    resetButtonsOfInstance() {
      this.quickAddLabel.classList.remove(selectors$g.classes.select, selectors$g.classes.added, selectors$g.classes.visible);

      this.buttonQuickAddMobile.classList.remove(selectors$g.classes.hide);
    }

    /**
     * Handle error cart response
     */
    errorHandle() {
      this.html.addEventListener('cart:add-to-error', (event) => {
        const holder = event.detail.holder;
        const errorMessageHolder = holder.querySelector(selectors$g.elements.messageError);

        holder.querySelector(`[${selectors$g.elements.quickAddLabel}]`).classList.remove(selectors$g.classes.visible, selectors$g.classes.added, selectors$g.classes.loading);

        holder.classList.add(selectors$g.classes.error);

        errorMessageHolder.innerText = event.detail.description;

        setTimeout(() => {
          holder.classList.remove(selectors$g.classes.error);
          holder.classList.add(selectors$g.classes.visible);
          holder.previousElementSibling.classList.remove(selectors$g.classes.hide);
        }, selectors$g.times.delayLarge);
      });
    }
  }

  const quickAddProduct = {
    onLoad() {
      this.container.querySelectorAll(`[${selectors$g.elements.productGrid}]`).forEach((item) => {
        instances$1.push(new QuickAddProduct(item));
      });
    },
  };

  const selectors$h = {
    rangeSlider: '[data-range-slider]',
    rangeDotLeft: '[data-range-left]',
    rangeDotRight: '[data-range-right]',
    rangeLine: '[data-range-line]',
    rangeHolder: '[data-range-holder]',
    dataMin: 'data-se-min',
    dataMax: 'data-se-max',
    dataMinValue: 'data-se-min-value',
    dataMaxValue: 'data-se-max-value',
    dataStep: 'data-se-step',
    dataFilterUpdate: 'data-range-filter-update',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
  };

  const classes$7 = {
    classInitialized: 'is-initialized',
  };

  class RangeSlider {
    constructor(section) {
      this.container = section.container;
      this.slider = section.querySelector(selectors$h.rangeSlider);
      this.resizeFilters = debounce(() => this.init(), 250);

      if (this.slider) {
        this.onMoveEvent = (event) => this.onMove(event);
        this.onStopEvent = (event) => this.onStop(event);
        this.onStartEvent = (event) => this.onStart(event);
        this.startX = 0;
        this.x = 0;

        // retrieve touch button
        this.touchLeft = this.slider.querySelector(selectors$h.rangeDotLeft);
        this.touchRight = this.slider.querySelector(selectors$h.rangeDotRight);
        this.lineSpan = this.slider.querySelector(selectors$h.rangeLine);

        // get some properties
        this.min = parseFloat(this.slider.getAttribute(selectors$h.dataMin));
        this.max = parseFloat(this.slider.getAttribute(selectors$h.dataMax));

        this.step = 0.0;

        // normalize flag
        this.normalizeFact = 26;

        this.init();
      }
    }

    init() {
      // retrieve default values
      let defaultMinValue = this.min;
      if (this.slider.hasAttribute(selectors$h.dataMinValue)) {
        defaultMinValue = parseFloat(this.slider.getAttribute(selectors$h.dataMinValue));
      }
      let defaultMaxValue = this.max;

      if (this.slider.hasAttribute(selectors$h.dataMaxValue)) {
        defaultMaxValue = parseFloat(this.slider.getAttribute(selectors$h.dataMaxValue));
      }

      // check values are correct
      if (defaultMinValue < this.min) {
        defaultMinValue = this.min;
      }

      if (defaultMaxValue > this.max) {
        defaultMaxValue = this.max;
      }

      if (defaultMinValue > defaultMaxValue) {
        defaultMinValue = defaultMaxValue;
      }

      if (this.slider.getAttribute(selectors$h.dataStep)) {
        this.step = Math.abs(parseFloat(this.slider.getAttribute(selectors$h.dataStep)));
      }

      // initial reset
      this.reset();
      window.addEventListener('resize', this.resizeFilters);

      // usefull values, min, max, normalize fact is the width of both touch buttons
      this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth;
      this.selectedTouch = null;
      this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact;

      // set defualt values
      this.setMinValue(defaultMinValue);
      this.setMaxValue(defaultMaxValue);

      // link events
      this.touchLeft.addEventListener('mousedown', this.onStartEvent);
      this.touchRight.addEventListener('mousedown', this.onStartEvent);
      this.touchLeft.addEventListener('touchstart', this.onStartEvent);
      this.touchRight.addEventListener('touchstart', this.onStartEvent);

      // initialize
      this.slider.classList.add(classes$7.classInitialized);
    }

    reset() {
      this.touchLeft.style.left = '0px';
      this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.lineSpan.style.marginLeft = '0px';
      this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.startX = 0;
      this.x = 0;
    }

    setMinValue(minValue) {
      const ratio = (minValue - this.min) / (this.max - this.min);
      this.touchLeft.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$h.dataMinValue, minValue);
    }

    setMaxValue(maxValue) {
      const ratio = (maxValue - this.min) / (this.max - this.min);
      this.touchRight.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$h.dataMaxValue, maxValue);
    }

    onStart(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      if (event.currentTarget === this.touchLeft) {
        this.x = this.touchLeft.offsetLeft;
      } else {
        this.x = this.touchRight.offsetLeft;
      }

      this.startX = eventTouch.pageX - this.x;
      this.selectedTouch = event.currentTarget;
      this.slider.addEventListener('mousemove', this.onMoveEvent);
      this.slider.addEventListener('mouseup', this.onStopEvent);
      this.slider.addEventListener('touchmove', this.onMoveEvent);
      this.slider.addEventListener('touchend', this.onStopEvent);
    }

    onMove(event) {
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      this.x = eventTouch.pageX - this.startX;

      if (this.selectedTouch === this.touchLeft) {
        if (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10) {
          this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10;
        } else if (this.x < 0) {
          this.x = 0;
        }

        this.selectedTouch.style.left = this.x + 'px';
      } else if (this.selectedTouch === this.touchRight) {
        if (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10) {
          this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10;
        } else if (this.x > this.maxX) {
          this.x = this.maxX;
        }
        this.selectedTouch.style.left = this.x + 'px';
      }

      // update line span
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';

      // write new value
      this.calculateValue();

      // call on change
      if (this.slider.getAttribute('on-change')) {
        const fn = new Function('min, max', this.slider.getAttribute('on-change'));
        fn(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
      }

      this.onChange(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
    }

    onStop(event) {
      this.slider.removeEventListener('mousemove', this.onMoveEvent);
      this.slider.removeEventListener('mouseup', this.onStopEvent);
      this.slider.removeEventListener('touchmove', this.onMoveEvent);
      this.slider.removeEventListener('touchend', this.onStopEvent);

      this.selectedTouch = null;

      // write new value
      this.calculateValue();

      // call did changed
      this.onChanged(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
    }

    onChange(min, max) {
      const rangeHolder = this.slider.closest(selectors$h.rangeHolder);
      if (rangeHolder) {
        const priceMin = rangeHolder.querySelector(selectors$h.priceMin);
        const priceMax = rangeHolder.querySelector(selectors$h.priceMax);

        if (priceMin && priceMax) {
          priceMin.value = min;
          priceMax.value = max;
        }
      }
    }

    onChanged(min, max) {
      if (this.slider.hasAttribute(selectors$h.dataFilterUpdate)) {
        this.slider.dispatchEvent(new CustomEvent('filter:update:range', {bubbles: true}));
      }
    }

    calculateValue() {
      const newValue = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
      let minValue = this.lineSpan.offsetLeft / this.initialValue;
      let maxValue = minValue + newValue;

      minValue = minValue * (this.max - this.min) + this.min;
      maxValue = maxValue * (this.max - this.min) + this.min;

      if (this.step !== 0.0) {
        let multi = Math.floor(minValue / this.step);
        minValue = this.step * multi;

        multi = Math.floor(maxValue / this.step);
        maxValue = this.step * multi;
      }

      if (this.selectedTouch === this.touchLeft) {
        this.slider.setAttribute(selectors$h.dataMinValue, minValue);
      }

      if (this.selectedTouch === this.touchRight) {
        this.slider.setAttribute(selectors$h.dataMaxValue, maxValue);
      }
    }

    onUnload() {
      if (this.resizeFilters) {
        window.removeEventListener('resize', this.resizeFilters);
      }
    }
  }

  const selectors$i = {
    collectionSidebar: '[data-collection-sidebar]',
    form: '[data-collection-filters-form]',
    input: 'input',
    select: 'select',
    label: 'label',
    textarea: 'textarea',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
    priceMinValue: 'data-field-price-min',
    priceMaxValue: 'data-field-price-max',
    rangeMin: '[data-se-min-value]',
    rangeMax: '[data-se-max-value]',
    rangeMinValue: 'data-se-min-value',
    rangeMaxValue: 'data-se-max-value',
    productsContainer: '[data-products-grid]',
    product: '[data-product-grid-item]',
    tooltip: 'data-tooltip',
    filterUpdateUrlButton: '[data-filter-update-url]',
    dataActiveFilters: '[data-active-filters]',
    dataActiveFiltersCount: 'data-active-filters-count',
    dataSort: 'data-sort-enabled',
    headerSticky: '[data-header-sticky="sticky"]',
    headerHeight: '[data-header-height]',
    collectionNav: '[data-collection-nav]',
  };

  const classes$8 = {
    classHidden: 'hidden',
    classLoading: 'is-loading',
  };

  let sections$7 = {};

  class FiltersForm {
    constructor(section) {
      this.section = section;
      this.container = this.section.container;
      this.sidebar = this.container.querySelector(selectors$i.collectionSidebar);
      this.form = this.container.querySelector(selectors$i.form);
      this.sort = this.container.querySelector(`[${selectors$i.dataSort}]`);
      this.productsContainer = this.container.querySelector(selectors$i.productsContainer);
      this.headerSticky = document.querySelector(selectors$i.headerSticky) !== null;
      this.collectionNav = this.container.querySelector(selectors$i.collectionNav);
      this.init();
    }

    init() {
      if (this.form) {
        this.initRangeSlider();

        this.sidebar.addEventListener(
          'input',
          debounce((e) => {
            const type = e.type;
            const target = e.target;

            if (type === selectors$i.input || type === selectors$i.select || type === selectors$i.label || type === selectors$i.textarea) {
              if (this.form && typeof this.form.submit === 'function') {
                const priceMin = this.form.querySelector(selectors$i.priceMin);
                const priceMax = this.form.querySelector(selectors$i.priceMax);
                if (priceMin && priceMax) {
                  if (target.hasAttribute(selectors$i.priceMinValue) && !priceMax.value) {
                    priceMax.value = priceMax.placeholder;
                  } else if (target.hasAttribute(selectors$i.priceMaxValue) && !priceMin.value) {
                    priceMin.value = priceMin.placeholder;
                  }
                }

                this.submitForm(e);
              }
            }
          }, 500)
        );

        this.sidebar.addEventListener('filter:update:range', (e) => this.updateRange(e));
      }

      if (this.sidebar) {
        this.sidebar.addEventListener('click', (e) => this.filterUpdateFromUrl(e));
      }

      if (this.productsContainer) {
        this.productsContainer.addEventListener('click', (e) => this.filterUpdateFromUrl(e));
      }

      if (this.sort) {
        this.container.addEventListener('filter:submit:form', (e) => this.submitForm(e));
      }

      if (this.sidebar || this.sort) {
        window.addEventListener('popstate', (e) => this.submitForm(e));
      }
    }

    initRangeSlider() {
      new RangeSlider(this.form);
    }

    filterUpdateFromUrl(e) {
      const target = e.target;
      if (target.matches(selectors$i.filterUpdateUrlButton) || (target.closest(selectors$i.filterUpdateUrlButton) && target)) {
        e.preventDefault();
        const button = target.matches(selectors$i.filterUpdateUrlButton) ? target : target.closest(selectors$i.filterUpdateUrlButton);
        this.submitForm(e, button.getAttribute('href'));
      }
    }

    submitForm(e, replaceHref = '') {
      this.sort = this.container.querySelector(`[${selectors$i.dataSort}]`);
      const sortValue = this.sort ? this.sort.getAttribute(selectors$i.dataSort) : '';
      if (!e || (e && e.type !== 'popstate')) {
        if (replaceHref === '') {
          const url = new window.URL(window.location.href);
          let filterUrl = url.searchParams;
          const filterUrlEntries = filterUrl;
          const filterUrlParams = Object.fromEntries(filterUrlEntries);
          const filterUrlRemoveString = filterUrl.toString();

          if (filterUrlRemoveString.includes('filter.') || filterUrlRemoveString.includes('sort_by')) {
            for (const key in filterUrlParams) {
              if (key.includes('filter.') || key.includes('sort_by')) {
                filterUrl.delete(key);
              }
            }
          }

          if (this.form) {
            const formData = new FormData(this.form);
            const formParams = new URLSearchParams(formData);

            for (let [key, val] of formParams.entries()) {
              if (key.includes('filter.') && val) {
                filterUrl.append(key, val);
              }
            }
          }

          if (sortValue || (e && e.detail && e.detail.href)) {
            const sortString = sortValue ? sortValue : e.detail.href;
            filterUrl.set('sort_by', sortString);
          }

          const filterUrlString = filterUrl.toString();
          const filterNewParams = filterUrlString ? `?${filterUrlString}` : location.pathname;
          window.history.pushState(null, '', filterNewParams);
        } else {
          window.history.pushState(null, '', replaceHref);
        }
      } else if (this.sort) {
        this.sort.dispatchEvent(new CustomEvent('filter:sort:check', {bubbles: false}));
      }

      if (this.productsContainer) {
        this.productsContainer.classList.add(classes$8.classLoading);
        fetch(`${window.location.pathname}${window.location.search}`)
          .then((response) => response.text())
          .then((data) => {
            this.productsContainer.innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector(selectors$i.productsContainer).innerHTML;

            if (this.sidebar) {
              this.sidebar.innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector(selectors$i.collectionSidebar).innerHTML;

              const tooltips = this.sidebar.querySelectorAll(`[${selectors$i.tooltip}]`);
              if (tooltips.length) {
                tooltips.forEach((tooltip) => {
                  new Tooltip(tooltip);
                });
              }

              const activeFiltersCountContainer = this.sidebar.querySelector(`[${selectors$i.dataActiveFiltersCount}]`);
              const activeFiltersContainer = this.container.querySelector(selectors$i.dataActiveFilters);
              if (activeFiltersCountContainer && activeFiltersContainer) {
                const activeFiltersCount = parseInt(activeFiltersCountContainer.getAttribute(selectors$i.dataActiveFiltersCount));
                activeFiltersContainer.textContent = activeFiltersCount;
                activeFiltersContainer.classList.toggle(classes$8.classHidden, activeFiltersCount < 1);
              }
            }

            if (this.form) {
              this.form = this.container.querySelector(selectors$i.form);

              // Init Range Slider
              this.initRangeSlider();
            }

            // Init Collection
            const collectionClass = new Collection(this.section);
            collectionClass.onUnload(false);

            // Init Quick Add
            const products = this.productsContainer.querySelectorAll(selectors$i.product);
            if (products.length) {
              products.forEach((item) => {
                new QuickAddProduct(item);
              });
            }

            // Init Grid Swatches
            makeGridSwatches(this.section);

            // Init Tooltips
            document.dispatchEvent(
              new CustomEvent('tooltip:close', {
                bubbles: false,
                detail: {
                  hideTransition: false,
                },
              })
            );

            if (this.collectionNav) {
              const headerHeight = this.headerSticky ? document.querySelector(selectors$i.headerHeight).getBoundingClientRect().height : 0;
              const collectionNavTop = this.collectionNav.getBoundingClientRect().top + window.scrollY - headerHeight;

              window.scrollTo({
                top: collectionNavTop,
                left: 0,
                behavior: 'smooth',
              });
            }

            setTimeout(() => {
              this.productsContainer.classList.remove(classes$8.classLoading);
            }, 500);
          })
          .catch(() => {
            console.log('error');
          });
      }
    }

    updateRange(e) {
      if (this.form && typeof this.form.submit === 'function') {
        const rangeMin = this.form.querySelector(selectors$i.rangeMin);
        const rangeMax = this.form.querySelector(selectors$i.rangeMax);
        const priceMin = this.form.querySelector(selectors$i.priceMin);
        const priceMax = this.form.querySelector(selectors$i.priceMax);
        const checkElements = rangeMin && rangeMax && priceMin && priceMax;

        if (checkElements && rangeMin.hasAttribute(selectors$i.rangeMinValue) && rangeMax.hasAttribute(selectors$i.rangeMaxValue)) {
          const priceMinValue = parseInt(priceMin.placeholder);
          const priceMaxValue = parseInt(priceMax.placeholder);
          const rangeMinValue = parseInt(rangeMin.getAttribute(selectors$i.rangeMinValue));
          const rangeMaxValue = parseInt(rangeMax.getAttribute(selectors$i.rangeMaxValue));

          if (priceMinValue !== rangeMinValue || priceMaxValue !== rangeMaxValue) {
            priceMin.value = rangeMinValue;
            priceMax.value = rangeMaxValue;

            this.submitForm(e);
          }
        }
      }
    }

    unload() {
      if (this.form) {
        document.removeEventListener('theme:resize', this.resizeEvent);
      }
    }
  }

  const collectionFiltersForm = {
    onLoad() {
      sections$7[this.id] = new FiltersForm(this);
    },
    onUnload: function () {
      if (sections$7[this.id] && typeof sections$7[this.id].unload === 'function') {
        sections$7[this.id].unload();
      }
    },
  };

  const selectors$j = {
    dataSort: 'data-sort-enabled',
    sortLinks: '[data-sort-link]',
    sortValue: 'data-value',
    sortButton: '[data-popout-toggle]',
    sortButtonText: '[data-sort-button-text]',
    collectionSidebarHeading: '[data-collection-sidebar-heading]',
    collectionSidebar: '[data-collection-sidebar]',
    collectionSidebarSlider: '[data-collection-sidebar-slider]',
    collectionSidebarSlideOut: '[data-collection-sidebar-slide-out]',
    collectionSidebarCloseButton: '[data-collection-sidebar-close]',
    showMoreOptions: '[data-show-more]',
    groupTagsButton: '[data-aria-toggle]',
    collectionNav: '[data-collection-nav]',
    headerSticky: '[data-header-sticky="sticky"]',
    headerHeight: '[data-header-height]',
    linkAdd: '[data-link-add]',
    linkRemove: '[data-link-remove]',
    linkHidden: '[data-link-hidden]',
    swatch: 'data-swatch',
  };

  const classes$9 = {
    expanded: 'expanded',
    expanding: 'expanding',
    noMobileAnimation: 'no-mobile-animation',
    hidden: 'is-hidden',
    active: 'is-active',
    sortActive: 'popout-list__item--current',
    sortPopoutActive: 'popout--active',
  };

  let sections$8 = {};
  class Collection {
    constructor(section) {
      this.container = section.container;
      this.sort = this.container.querySelector(`[${selectors$j.dataSort}]`);
      this.sortLinks = this.container.querySelectorAll(selectors$j.sortLinks);
      this.collectionSidebar = this.container.querySelector(selectors$j.collectionSidebar);
      this.collectionSidebarCloseButton = this.container.querySelector(selectors$j.collectionSidebarCloseButton);
      this.groupTagsButton = this.container.querySelector(selectors$j.groupTagsButton);
      this.collectionNav = this.container.querySelector(selectors$j.collectionNav);
      this.headerSticky = document.querySelector(selectors$j.headerSticky) !== null;
      this.showMoreOptions = this.container.querySelectorAll(selectors$j.showMoreOptions);
      this.collectionSidebarHeading = this.container.querySelectorAll(selectors$j.collectionSidebarHeading);
      this.swatches = this.container.querySelectorAll(`[${selectors$j.swatch}]`);
      this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      this.groupTagsButtonClickEvent = (evt) => this.groupTagsButtonClick(evt);
      this.collectionSidebarCloseEvent = (evt) => this.collectionSidebarClose(evt);
      this.collectionSidebarScrollEvent = () => this.collectionSidebarScroll();
      this.onClickEvent = (e) => this.onClick(e);
      this.onSortCheckEvent = (e) => this.onSortCheck(e);

      this.init();
    }

    init() {
      if (this.sort) {
        this.initSort();
      }

      if (this.groupTagsButton !== null) {
        this.hideSidebarSliderOnMobile();

        this.groupTagsButton.addEventListener('click', this.groupTagsButtonClickEvent);

        // Prevent filters closing animation on page load
        setTimeout(() => {
          this.collectionSidebar.classList.remove(classes$9.noMobileAnimation);
        }, 1000);
      }

      if (this.collectionSidebarCloseButton !== null) {
        this.collectionSidebarCloseButton.addEventListener('click', this.collectionSidebarCloseEvent);
      }

      // Hide filters sidebar on ESC keypress
      this.container.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideSidebar();
        }.bind(this)
      );

      // Show more options from the group
      if (this.showMoreOptions) {
        this.showMoreOptions.forEach((element) => {
          element.addEventListener('click', (event) => {
            event.preventDefault();

            element.parentElement.classList.add(classes$9.hidden);

            element.parentElement.previousElementSibling.querySelectorAll(selectors$j.linkHidden).forEach((link) => {
              link.classList.remove(classes$9.hidden);
            });
          });
        });
      }

      if (this.collectionSidebarHeading) {
        this.collectionSidebarHeading.forEach((element) => {
          element.addEventListener('click', (event) => {
            event.preventDefault();

            element.classList.toggle(classes$9.active);

            slideToggle(element.nextElementSibling);

            if (element.nextElementSibling.nextElementSibling) {
              slideToggle(element.nextElementSibling.nextElementSibling);
            }
          });
        });
      }

      // Init Swatches
      if (this.swatches) {
        this.swatches.forEach((swatch) => {
          new Swatch(swatch);
        });
      }
    }

    collectionSidebarScroll() {
      document.dispatchEvent(
        new CustomEvent('tooltip:close', {
          bubbles: false,
          detail: {
            hideTransition: false,
          },
        })
      );
    }

    sortActions(link, submitForm = true) {
      const sort = link ? link.getAttribute(selectors$j.sortValue) : '';
      this.sort.setAttribute(selectors$j.dataSort, sort);

      const sortButtonText = this.sort.querySelector(selectors$j.sortButtonText);
      const sortActive = this.sort.querySelector(`.${classes$9.sortActive}`);
      if (sortButtonText) {
        const linkText = link ? link.textContent.trim() : '';
        sortButtonText.textContent = linkText;
      }
      if (sortActive) {
        sortActive.classList.remove(classes$9.sortActive);
      }
      this.sort.classList.toggle(classes$9.sortPopoutActive, link);

      if (link) {
        link.parentElement.classList.add(classes$9.sortActive);

        if (submitForm) {
          link.dispatchEvent(
            new CustomEvent('filter:submit:form', {
              bubbles: true,
              detail: {
                href: sort,
              },
            })
          );
        }
      }
    }

    onClick(e) {
      e.preventDefault();
      const sortButton = this.sort.querySelector(selectors$j.sortButton);
      if (sortButton) {
        sortButton.dispatchEvent(new Event('click'));
      }
      this.sortActions(e.currentTarget);
    }

    onSortCheck(e) {
      let link = null;
      if (window.location.search.includes('sort_by')) {
        const url = new window.URL(window.location.href);
        const urlParams = url.searchParams;

        for (const [key, val] of urlParams.entries()) {
          const linkSort = this.sort.querySelector(`[${selectors$j.sortValue}="${val}"]`);
          if (key.includes('sort_by') && linkSort) {
            link = linkSort;
            break;
          }
        }
      }

      this.sortActions(link, false);
    }

    initSort() {
      this.sortLinks.forEach((link) => {
        link.addEventListener('click', this.onClickEvent);
      });
      this.sort.addEventListener('filter:sort:check', this.onSortCheckEvent);
    }

    showSidebarCallback() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const collectionSidebarSlider = this.container.querySelector(selectors$j.collectionSidebarSlider);
      const collectionSidebarSlideOut = this.container.querySelector(selectors$j.collectionSidebarSlideOut);
      const collectionSidebarScrollable = collectionSidebarSlider || collectionSidebarSlideOut;

      if (windowWidth < theme.sizes.small && collectionSidebarSlideOut === null) {
        const headerHeight = this.headerSticky ? document.querySelector(selectors$j.headerHeight).getBoundingClientRect().height : 0;
        const scrollTopPosition = this.collectionNav ? this.collectionNav.getBoundingClientRect().top : this.groupTagsButton.getBoundingClientRect().top;

        window.scrollTo({
          top: scrollTopPosition + window.scrollY - headerHeight,
          left: 0,
          behavior: 'smooth',
        });
      }

      if (windowWidth < theme.sizes.small || collectionSidebarSlideOut !== null) {
        document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: collectionSidebarScrollable}));
      }

      if (collectionSidebarScrollable) {
        collectionSidebarScrollable.addEventListener('scroll', this.collectionSidebarScrollEvent);
      }
    }

    hideSidebar() {
      const collectionSidebarSlider = this.container.querySelector(selectors$j.collectionSidebarSlider);
      const collectionSidebarSlideOut = this.container.querySelector(selectors$j.collectionSidebarSlideOut);
      const collectionSidebarScrollable = collectionSidebarSlider || collectionSidebarSlideOut;

      this.groupTagsButton.setAttribute('aria-expanded', 'false');
      this.collectionSidebar.classList.add(classes$9.expanding);
      this.collectionSidebar.classList.remove(classes$9.expanded);

      if (collectionSidebarScrollable) {
        collectionSidebarScrollable.removeEventListener('scroll', this.collectionSidebarScrollEvent);
      }

      setTimeout(() => {
        this.collectionSidebar.classList.remove(classes$9.expanding);
      }, 500);
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    hideSidebarSliderOnMobile(evt) {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (windowWidth < theme.sizes.small) {
        if (evt && evt.type === 'theme:resize') {
          if (windowWidth !== this.windowWidth) {
            this.windowWidth = windowWidth;
            this.hideSidebar();
          }
        } else {
          this.hideSidebar();
        }
      }
    }

    collectionSidebarClose(evt) {
      evt.preventDefault();
      this.hideSidebar();
    }

    groupTagsButtonClick() {
      if (this.collectionSidebar.classList.contains(classes$9.expanded)) {
        this.showSidebarCallback();
      } else {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }
    }

    onUnload(flag = true) {
      if (this.groupTagsButton !== null) {
        this.groupTagsButton.removeEventListener('click', this.groupTagsButtonClickEvent);

        // document.removeEventListener('theme:resize', this.resizeEvent);
      }

      if (this.collectionSidebarCloseButton !== null && flag) {
        this.collectionSidebarCloseButton.removeEventListener('click', this.collectionSidebarCloseEvent);
      }

      if (this.collectionSidebarScrollable & flag) {
        this.collectionSidebarScrollable.removeEventListener('scroll', this.collectionSidebarScrollEvent);
      }

      if (this.sort) {
        this.sortLinks.forEach((link) => {
          link.removeEventListener('click', this.onClickEvent);
        });
        this.sort.removeEventListener('filter:sort:check', this.onSortCheckEvent);
      }
    }
  }

  const collectionSection = {
    onLoad() {
      sections$8[this.id] = new Collection(this);
    },
    onUnload() {
      sections$8[this.id].onUnload();
    },
  };

  register('collection', [slider, parallaxHero, quickAddProduct, collectionSection, popoutSection, swatchGridSection, collectionFiltersForm, tooltipSection]);

  const selectors$k = {
    frame: '[data-ticker-frame]',
    scale: '[data-ticker-scale]',
    text: '[data-ticker-text]',
    clone: 'data-clone',
    animationClass: 'ticker--animated',
    unloadedClass: 'ticker--unloaded',
    comparitorClass: 'ticker__comparitor',
    moveTime: 1.63, // 100px going to move for 1.63s
    space: 100, // 100px
  };

  class Ticker {
    constructor(el, stopClone = false) {
      this.frame = el;
      this.stopClone = stopClone;
      this.scale = this.frame.querySelector(selectors$k.scale);
      this.text = this.frame.querySelector(selectors$k.text);

      this.comparitor = this.text.cloneNode(true);
      this.comparitor.classList.add(selectors$k.comparitorClass);
      this.frame.appendChild(this.comparitor);
      this.scale.classList.remove(selectors$k.unloadedClass);
      this.resizeEvent = debounce(() => this.checkWidth(), 100);
      this.listen();
    }

    unload() {
      document.removeEventListener('theme:resize', this.resizeEvent);
    }

    listen() {
      document.addEventListener('theme:resize', this.resizeEvent);
      this.checkWidth();
    }

    checkWidth() {
      const padding = window.getComputedStyle(this.frame).paddingLeft.replace('px', '') * 2;

      if (this.frame.clientWidth - padding < this.comparitor.clientWidth || this.stopClone) {
        this.text.classList.add(selectors$k.animationClass);
        if (this.scale.childElementCount === 1) {
          this.clone = this.text.cloneNode(true);
          this.clone.setAttribute(selectors$k.clone, '');
          this.scale.appendChild(this.clone);

          if (this.stopClone) {
            for (let index = 0; index < 10; index++) {
              const cloneSecond = this.text.cloneNode(true);
              cloneSecond.setAttribute(selectors$k.clone, '');
              this.scale.appendChild(cloneSecond);
            }
          }

          const animationTimeFrame = (this.text.clientWidth / selectors$k.space) * selectors$k.moveTime;

          this.scale.style.setProperty('--animation-time', `${animationTimeFrame}s`);
        }
      } else {
        this.text.classList.add(selectors$k.animationClass);
        let clone = this.scale.querySelector(`[${selectors$k.clone}]`);
        if (clone) {
          this.scale.removeChild(clone);
        }
        this.text.classList.remove(selectors$k.animationClass);
      }
    }
  }

  const selectors$l = {
    bar: '[data-bar]',
    barSlide: '[data-slide]',
    frame: '[data-ticker-frame]',
    header: '[data-header-wrapper]',
    slider: '[data-slider]',
    slideValue: 'data-slide',
    tickerScale: '[data-ticker-scale]',
    tickerText: '[data-ticker-text]',
    dataTargetReferrer: 'data-target-referrer',
  };

  const sections$9 = {};

  class Bar {
    constructor(holder) {
      this.barHolder = holder;
      this.locationPath = location.href;

      this.slides = this.barHolder.querySelectorAll(selectors$l.barSlide);
      this.slider = this.barHolder.querySelector(selectors$l.slider);

      this.init();
    }

    init() {
      this.removeAnnouncement();

      if (this.slider) {
        this.initSliders();
      }

      if (!this.slider) {
        this.initTickers(true);
      }
    }

    /**
     * Delete announcement which has a target referrer attribute and it is not contained in page URL
     */
    removeAnnouncement() {
      for (let index = 0; index < this.slides.length; index++) {
        const element = this.slides[index];

        if (!element.hasAttribute(selectors$l.dataTargetReferrer)) {
          continue;
        }

        if (this.locationPath.indexOf(element.getAttribute(selectors$l.dataTargetReferrer)) === -1 && !window.Shopify.designMode) {
          element.parentNode.removeChild(element);
        }
      }
    }

    /**
     * Init slider
     */
    initSliders() {
      this.slider = new Slider(this.barHolder);
      this.slider.flkty.reposition();

      this.barHolder.addEventListener('slider-is-loaded', () => {
        this.initTickers();
      });
    }

    /**
     * Init tickers in sliders
     */
    initTickers(stopClone = false) {
      const frames = this.barHolder.querySelectorAll(selectors$l.frame);

      frames.forEach((element) => {
        new Ticker(element, stopClone);
      });
    }

    toggleTicker(e, isStoped) {
      const tickerScale = document.querySelector(selectors$l.tickerScale);
      const element = document.querySelector(`[${selectors$l.slideValue}="${e.detail.blockId}"]`);

      if (isStoped && element) {
        tickerScale.setAttribute('data-stop', '');
        tickerScale.querySelectorAll(selectors$l.tickerText).forEach((textHolder) => {
          textHolder.classList.remove('ticker--animated');
          textHolder.style.transform = `translate3d(${-(element.offsetLeft - element.clientWidth)}px, 0, 0)`;
        });
      }

      if (!isStoped && element) {
        tickerScale.querySelectorAll(selectors$l.tickerText).forEach((textHolder) => {
          textHolder.classList.add('ticker--animated');
          textHolder.removeAttribute('style');
        });
        tickerScale.removeAttribute('data-stop');
      }
    }

    onBlockSelect(e) {
      if (this.slider) {
        this.slider.onBlockSelect(e);
      } else {
        this.toggleTicker(e, true);
      }
    }

    onBlockDeselect(e) {
      if (this.slider) {
        this.slider.onBlockDeselect(e);
      } else {
        this.toggleTicker(e, false);
      }
    }
  }

  const bar = {
    onLoad() {
      sections$9[this.id] = [];
      const element = this.container.querySelector(selectors$l.bar);
      if (element) {
        sections$9[this.id].push(new Bar(element));
      }
    },
    onBlockSelect(e) {
      if (sections$9[this.id].length) {
        sections$9[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockSelect(e);
          }
        });
      }
    },
    onBlockDeselect(e) {
      if (sections$9[this.id].length) {
        sections$9[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockDeselect(e);
          }
        });
      }
    },
  };

  register('announcement', [bar]);

  const selectors$m = {
    body: 'body',
    drawerWrappper: '[data-drawer]',
    drawerInner: '[data-drawer-inner]',
    underlay: '[data-drawer-underlay]',
    stagger: '[data-stagger-animation]',
    wrapper: '[data-header-transparent]',
    transparent: 'data-header-transparent',
    drawerToggle: 'data-drawer-toggle',
    focusable: 'button, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
  };

  const classes$a = {
    isVisible: 'drawer--visible',
    isFocused: 'is-focused',
    headerStuck: 'js__header__stuck',
  };

  let sections$a = {};

  class Drawer {
    constructor(el) {
      this.drawer = el;
      this.drawerWrapper = this.drawer.closest(selectors$m.drawerWrappper);
      this.drawerInner = this.drawer.querySelector(selectors$m.drawerInner);
      this.underlay = this.drawer.querySelector(selectors$m.underlay);
      this.wrapper = this.drawer.closest(selectors$m.wrapper);
      this.key = this.drawer.dataset.drawer;
      const btnSelector = `[${selectors$m.drawerToggle}='${this.key}']`;
      this.buttons = document.querySelectorAll(btnSelector);
      this.staggers = this.drawer.querySelectorAll(selectors$m.stagger);
      this.body = document.querySelector(selectors$m.body);

      this.initWatchFocus = (evt) => this.watchFocus(evt);

      this.connectToggle();
      this.connectDrawer();
      this.closers();
      this.staggerChildAnimations();
    }

    connectToggle() {
      this.buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:toggle', {
              bubbles: false,
            })
          );
        });
      });
    }

    connectDrawer() {
      this.drawer.addEventListener('theme:drawer:toggle', () => {
        if (this.drawer.classList.contains(classes$a.isVisible)) {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:close', {
              bubbles: true,
            })
          );
        } else {
          this.drawer.dispatchEvent(
            new CustomEvent('theme:drawer:open', {
              bubbles: true,
            })
          );
        }
      });

      document.addEventListener('theme:drawer:close', this.hideDrawer.bind(this));
      document.addEventListener('theme:drawer:open', this.showDrawer.bind(this));
    }

    staggerChildAnimations() {
      this.staggers.forEach((el) => {
        const children = el.querySelectorAll(':scope > * > [data-animates]');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 50 + 10}ms`;
        });
      });
    }

    watchFocus(evt) {
      let drawerInFocus = this.wrapper.contains(evt.target);
      if (!drawerInFocus && this.body.classList.contains(classes$a.isFocused)) {
        this.hideDrawer();
      }
    }

    closers() {
      this.wrapper.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideDrawer();
          this.buttons[0].focus();
        }.bind(this)
      );

      this.underlay.addEventListener('click', () => {
        this.hideDrawer();
      });
    }

    showDrawer() {
      document.dispatchEvent(
        new CustomEvent('theme:drawer:close', {
          bubbles: false,
        })
      );

      this.buttons.forEach((el) => {
        el.setAttribute('aria-expanded', true);
        el.classList.add(classes$a.isVisible);
      });

      this.drawer.classList.add(classes$a.isVisible);
      this.drawer.querySelector(selectors$m.focusable).focus();
      this.wrapper.setAttribute(selectors$m.transparent, false);

      document.addEventListener('focusin', this.initWatchFocus);
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.drawerInner}));
    }

    hideDrawer() {
      this.buttons.forEach((el) => {
        el.setAttribute('aria-expanded', true);
        el.classList.remove(classes$a.isVisible);
      });

      this.drawer.classList.remove(classes$a.isVisible);
      document.removeEventListener('focusin', this.initWatchFocus);

      if (!this.wrapper.classList.contains(classes$a.headerStuck)) {
        this.wrapper.setAttribute(selectors$m.transparent, theme.transparentHeader);
      }

      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      document.dispatchEvent(new CustomEvent('theme:sliderule:close', {bubbles: false}));
    }
  }

  const drawer = {
    onLoad() {
      sections$a[this.id] = [];
      const els = this.container.querySelectorAll(selectors$m.drawerWrappper);
      els.forEach((el) => {
        sections$a[this.id].push(new Drawer(el));
      });
    },
  };

  const selectors$n = {
    announcement: '[data-announcement-wrapper]',
    transparent: 'data-header-transparent',
    header: '[data-header-wrapper] header',
    headerIsNotFixed: '[data-header-sticky="static"]',
  };

  const classes$b = {
    stuck: 'js__header__stuck',
    stuckAnimated: 'js__header__stuck--animated',
    triggerAnimation: 'js__header__stuck--trigger-animation',
    stuckBackdrop: 'js__header__stuck__backdrop',
    headerIsNotVisible: 'is-not-visible',
    hasStickyHeader: 'has-sticky-header',
  };

  let sections$b = {};

  class Sticky {
    constructor(el) {
      this.wrapper = el;
      this.type = this.wrapper.dataset.headerSticky;
      this.sticks = this.type === 'sticky';
      this.static = this.type === 'static';
      this.win = window;
      this.animated = this.type === 'directional';
      this.currentlyStuck = false;
      this.cls = this.wrapper.classList;
      const announcementEl = document.querySelector(selectors$n.announcement);
      const announcementHeight = announcementEl ? announcementEl.clientHeight : 0;
      this.headerHeight = document.querySelector(selectors$n.header).clientHeight;
      this.blur = this.headerHeight + announcementHeight;
      this.stickDown = this.headerHeight + announcementHeight;
      this.stickUp = announcementHeight;
      this.scrollEventStatic = () => this.checkIsVisible();
      this.scrollEventListen = (e) => this.listenScroll(e);
      this.scrollEventUpListen = () => this.scrollUpDirectional();
      this.scrollEventDownListen = () => this.scrollDownDirectional();
      if (this.wrapper.getAttribute(selectors$n.transparent) !== 'false') {
        this.blur = announcementHeight;
      }
      if (this.sticks) {
        this.stickDown = announcementHeight;
        this.scrollDownInit();
        document.body.classList.add(classes$b.hasStickyHeader);
      }

      if (this.static) {
        document.addEventListener('theme:scroll', this.scrollEventStatic);
      }

      this.listen();
    }

    unload() {
      if (this.sticks || this.animated) {
        document.removeEventListener('theme:scroll', this.scrollEventListen);
      }

      if (this.animated) {
        document.removeEventListener('theme:scroll:up', this.scrollEventUpListen);
        document.removeEventListener('theme:scroll:down', this.scrollEventDownListen);
      }

      if (this.static) {
        document.removeEventListener('theme:scroll', this.scrollEventStatic);
      }
    }

    listen() {
      if (this.sticks || this.animated) {
        document.addEventListener('theme:scroll', this.scrollEventListen);
      }

      if (this.animated) {
        document.addEventListener('theme:scroll:up', this.scrollEventUpListen);
        document.addEventListener('theme:scroll:down', this.scrollEventDownListen);
      }
    }

    listenScroll(e) {
      if (e.detail.down) {
        if (!this.currentlyStuck && e.detail.position > this.stickDown) {
          this.stickSimple();
        }
        if (!this.currentlyBlurred && e.detail.position > this.blur) {
          this.addBlur();
        }
      } else {
        if (e.detail.position <= this.stickUp) {
          this.unstickSimple();
        }
        if (e.detail.position <= this.blur) {
          this.removeBlur();
        }
      }
    }

    stickSimple() {
      if (this.animated) {
        this.cls.add(classes$b.stuckAnimated);
      }
      this.cls.add(classes$b.stuck);
      this.wrapper.setAttribute(selectors$n.transparent, false);
      this.currentlyStuck = true;
    }

    unstickSimple() {
      if (!document.documentElement.hasAttribute('data-scroll-locked')) {
        // check for scroll lock
        this.cls.remove(classes$b.stuck);
        this.wrapper.setAttribute(selectors$n.transparent, theme.transparentHeader);
        if (this.animated) {
          this.cls.remove(classes$b.stuckAnimated);
        }
        this.currentlyStuck = false;
      }
    }

    scrollDownInit() {
      if (window.scrollY > this.stickDown) {
        this.stickSimple();
      }
      if (window.scrollY > this.blur) {
        this.addBlur();
      }
    }

    stickDirectional() {
      this.cls.add(classes$b.triggerAnimation);
    }

    unstickDirectional() {
      this.cls.remove(classes$b.triggerAnimation);
    }

    scrollDownDirectional() {
      this.unstickDirectional();
    }

    scrollUpDirectional() {
      if (window.scrollY <= this.stickDown) {
        this.unstickDirectional();
      } else {
        this.stickDirectional();
      }
    }

    addBlur() {
      this.cls.add(classes$b.stuckBackdrop);
      this.currentlyBlurred = true;
    }

    removeBlur() {
      this.cls.remove(classes$b.stuckBackdrop);
      this.currentlyBlurred = false;
    }

    checkIsVisible() {
      const header = document.querySelector(selectors$n.headerIsNotFixed);
      const currentScroll = this.win.pageYOffset;

      if (header) {
        header.classList.toggle(classes$b.headerIsNotVisible, currentScroll >= this.headerHeight);
      }
    }
  }

  const stickyHeader = {
    onLoad() {
      sections$b = new Sticky(this.container);
    },
    onUnload: function () {
      if (typeof sections$b.unload === 'function') {
        sections$b.unload();
      }
    },
  };

  const selectors$o = {
    disclosureToggle: 'data-hover-disclosure-toggle',
    disclosureWrappper: '[data-hover-disclosure]',
    link: '[data-top-link]',
    wrapper: '[data-header-wrapper]',
    stagger: '[data-stagger]',
    staggerPair: '[data-stagger-first]',
    staggerAfter: '[data-stagger-second]',
    focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  };

  const classes$c = {
    isVisible: 'is-visible',
    meganavVisible: 'meganav--visible',
    meganavIsTransitioning: 'meganav--is-transitioning',
  };

  let sections$c = {};
  let disclosures = {};
  class HoverDisclosure {
    constructor(el) {
      this.disclosure = el;
      this.wrapper = el.closest(selectors$o.wrapper);
      this.key = this.disclosure.id;
      this.trigger = document.querySelector(`[${selectors$o.disclosureToggle}='${this.key}']`);
      this.link = this.trigger.querySelector(selectors$o.link);
      this.grandparent = this.trigger.classList.contains('grandparent');
      this.parent = this.trigger.classList.contains('parent');
      this.transitionTimeout = 0;

      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);

      this.connectToggleHandlers();
      this.handleTablets();
      this.staggerChildAnimations();
    }

    onBlockSelect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.showDisclosure(evt);
      }
    }

    onBlockDeselect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.hideDisclosure();
      }
    }

    showDisclosure(e) {
      if (e && e.type && e.type === 'click') {
        this.wrapper.classList.add(classes$c.meganavIsTransitioning);
      }
      this.wrapper.classList.add(classes$c.meganavVisible);
      if (this.grandparent || this.parent) {
        this.wrapper.classList.add(classes$c.meganavVisible);
      } else {
        this.wrapper.classList.remove(classes$c.meganavVisible);
      }
      this.trigger.setAttribute('aria-expanded', true);
      this.trigger.classList.add(classes$c.isVisible);
      this.disclosure.classList.add(classes$c.isVisible);

      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout);
      }

      this.transitionTimeout = setTimeout(() => {
        this.wrapper.classList.remove(classes$c.meganavIsTransitioning);
      }, 200);
      document.addEventListener('click', this.handleOutsideClick);
    }

    hideDisclosure() {
      this.disclosure.classList.remove(classes$c.isVisible);
      this.trigger.classList.remove(classes$c.isVisible);
      this.trigger.setAttribute('aria-expanded', false);
      this.wrapper.classList.remove(classes$c.meganavIsTransitioning);

      const isAnyOtherMenuStillOpen = Object.values(sections$c).flat().some(disclosureInstance => 
          disclosureInstance !== this && disclosureInstance.disclosure.classList.contains(classes$c.isVisible)
      );

      if (!isAnyOtherMenuStillOpen) {
          this.wrapper.classList.remove(classes$c.meganavVisible); 

          const isAtTheTop = window.scrollY === 0 || document.documentElement.scrollTop === 0;
          if (isAtTheTop) {
            this.wrapper.classList.remove(classes$b.stuck, classes$b.stuckBackdrop);
          }
      }

      document.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick(e) {
        const isClickInsideTrigger = this.trigger.contains(e.target);
        const isClickInsideDisclosure = this.disclosure.contains(e.target);
        const isOpen = this.disclosure.classList.contains(classes$c.isVisible);

        if (isOpen && !isClickInsideTrigger && !isClickInsideDisclosure) {
            this.hideDisclosure();
        }
    }

    toggleDisclosure(e) {
        e.preventDefault(); 
        e.stopPropagation(); 

        const isOpen = this.disclosure.classList.contains(classes$c.isVisible);

        Object.values(sections$c).flat().forEach(disclosureInstance => {
            if (disclosureInstance !== this && disclosureInstance.disclosure.classList.contains(classes$c.isVisible)) {
                disclosureInstance.hideDisclosure();
            }
        });

        if (isOpen) {
          this.hideDisclosure();
        } else {
          this.wrapper.classList.add(classes$b.stuck, classes$b.stuckBackdrop);
          this.showDisclosure(e);
        }
    }

    staggerChildAnimations() {
      const simple = this.disclosure.querySelectorAll(selectors$o.stagger);
      simple.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50 + 10}ms`;
      });

      const pairs = this.disclosure.querySelectorAll(selectors$o.staggerPair);
      pairs.forEach((child, i) => {
        const d1 = i * 150;
        child.style.transitionDelay = `${d1}ms`;
        child.parentElement.querySelectorAll(selectors$o.staggerAfter).forEach((grandchild, i2) => {
          const di1 = i2 + 1;
          const d2 = di1 * 20;
          grandchild.style.transitionDelay = `${d1 + d2}ms`;
        });
      });
    }

    handleTablets() {
      // first click opens the popup, second click opens the link
      this.trigger.addEventListener(
        'touchstart',
        function (e) {
          const isOpen = this.disclosure.classList.contains(classes$c.isVisible);
          if (!isOpen) {
            e.preventDefault();
            this.toggleDisclosure(e); 
          }
        }.bind(this)
      );
    }

    connectToggleHandlers() {
      this.trigger.addEventListener('click', (e) => this.toggleDisclosure(e));
      this.link.addEventListener('focus', (e) => this.showDisclosure(e));

      this.trigger.addEventListener('focusout', (e) => {
        const inMenu = this.trigger.contains(e.relatedTarget);
        if (!inMenu) {
          this.hideDisclosure();
        }
      });
      this.disclosure.addEventListener('keyup', (evt) => {
        if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
          return;
        }
        this.hideDisclosure();
      });
    }
  }

  const hoverDisclosure = {
    onLoad() {
      sections$c[this.id] = [];
      disclosures = this.container.querySelectorAll(selectors$o.disclosureWrappper);
      disclosures.forEach((el) => {
        sections$c[this.id].push(new HoverDisclosure(el));
      });
    },
    onBlockSelect(evt) {
      sections$c[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(evt);
        }
      });
    },
    onBlockDeselect(evt) {
      sections$c[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(evt);
        }
      });
    },
  };

  const selectors$p = {
    count: 'data-cart-count',
  };

  class Totals {
    constructor(el) {
      this.section = el;
      this.counts = this.section.querySelectorAll(`[${selectors$p.count}]`);
      this.cart = null;
      this.listen();
    }

    listen() {
      document.addEventListener(
        'theme:cart:change',
        function (event) {
          this.cart = event.detail.cart;
          this.update();
        }.bind(this)
      );
    }

    update() {
      if (this.cart) {
        this.counts.forEach((count) => {
          count.setAttribute(selectors$p.count, this.cart.item_count);
          count.innerHTML = `${this.cart.item_count}`;
        });
      }
    }
  }
  const headerTotals = {
    onLoad() {
      new Totals(this.container);
    },
  };

  const selectors$q = {
    append: '[data-predictive-search-append]',
    input: 'data-predictive-search-input',
    productTemplate: '[product-grid-item-template]',
    productWrapper: '[data-product-wrap]',
    productWrapperOuter: '[data-product-wrap-outer]',
    titleTemplate: '[data-predictive-search-title-template]',
    titleWrapper: '[data-search-title-wrap]',
    dirtyClass: 'dirty',
    loadingClass: 'is-loading',
    searchPopdown: 'search-popdown',
  };

  class SearchPredictive {
    constructor(input) {
      this.input = input;
      this.key = this.input.getAttribute(selectors$q.input);
      const appendSelector = `[id='${this.key}']`;
      this.append = document.querySelector(appendSelector);
      this.productTemplate = document.querySelector(selectors$q.productTemplate).innerHTML;
      this.titleTemplate = document.querySelector(selectors$q.titleTemplate).innerHTML;
      this.titleWrapper = document.querySelector(selectors$q.titleWrapper);
      this.productWrapper = this.append.querySelector(selectors$q.productWrapper);
      this.productWrapperOuter = this.append.querySelector(selectors$q.productWrapperOuter);
      this.popdown = document.getElementById(selectors$q.searchPopdown);
      this.result = null;
      this.accessibility = a11y;
      this.initSearch();
    }

    initSearch() {
      this.input.addEventListener(
        'input',
        debounce(
          function (event) {
            const val = event.target.value;
            if (val && val.length > 1) {
              this.productWrapperOuter.classList.add(selectors$q.loadingClass);
              this.render(val);
            } else {
              this.reset();
              this.append.classList.remove(selectors$q.dirtyClass);
            }
          }.bind(this),
          300
        )
      );
      this.input.addEventListener('clear', this.reset.bind(this));
    }

    render(terms) {
      fetch(`/search/suggest.json?q=${encodeURIComponent(terms)}&resources[type]=product&resources[limit]=8&resources[options][unavailable_products]=last`)
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          this.result = response.resources.results;
          return this.fetchProducts(response.resources.results.products);
        })
        .then((response) => {
          this.injectTitle(terms);

          setTimeout(() => {
            this.reset(false);
            this.productWrapperOuter.classList.remove(selectors$q.loadingClass);
            this.injectProduct(response);
            this.append.classList.add(selectors$q.dirtyClass);

            this.accessibility.trapFocus(this.popdown);
            this.input.focus();
          }, 1000);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    reset(clearTerms = true) {
      this.productWrapper.innerHTML = '';
      this.append.classList.remove(selectors$q.dirtyClass);
      this.input.val = '';
      this.accessibility.removeTrapFocus();

      if (clearTerms) {
        this.titleWrapper.innerHTML = '';
      }
    }

    injectTitle(terms) {
      let title = window.theme.strings.noResultsFor;
      let count = '';
      if (this.result && this.result.products.length > 0) {
        count = this.result.products.length;
        title = window.theme.strings.resultsFor;
      }
      this.titleWrapper.innerHTML = Sqrl.render(this.titleTemplate, {
        count: count,
        title: title,
        query: terms,
      });
    }

    injectProduct(productHTML) {
      this.productWrapper.innerHTML += productHTML;
    }

    fetchProducts(products) {
      const promises = [];
      products.forEach((product) => {
        // because of a translation bug in the predictive search API
        // we need to fetch the product JSON from the handle
        promises.push(
          fetchProduct(product.handle).then((productJSON) => {
            const formatted = formatPrices(productJSON);
            return this.renderProduct(formatted);
          })
        );
      });

      return Promise.all(promises).then((result) => {
        let str = '';
        result.forEach((render) => {
          str += render;
        });
        return str;
      });
    }

    renderProduct(product) {
      let media = null;
      let mediaHover = null;
      let image = '';
      let secondImage = '';

      if (product.media !== undefined) {
        media = product.media[0];
        mediaHover = product.media[1];
      }

      if (media) {
        image = {
          thumb: themeImages.getSizedImageUrl(media.preview_image.src, '800x800'),
          alt: media.preview_image.src,
        };
      } else {
        image = {
          thumb: window.theme.assets.no_image,
          alt: '',
        };
      }

      if (mediaHover) {
        secondImage = {
          thumb: themeImages.getSizedImageUrl(mediaHover.preview_image.src, '800x800'),
          alt: mediaHover.preview_image.src,
        };
      }
      const stripHtmlRegex = /(<([^>]+)>)/gi;
      const title = product.title.replace(stripHtmlRegex, '');

      const updateValues = {
        ...product,
        title,
        image,
        secondImage,
      };

      return Sqrl.render(this.productTemplate, {product: updateValues});
    }

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }
  }

  const selectors$r = {
    body: 'body',
    popdownTrigger: 'data-popdown-toggle',
    close: '[data-close-popdown]',
    input: '[data-predictive-search-input]',
  };

  const classes$d = {
    isVisible: 'is-visible',
  };

  let sections$d = {};

  class SearchPopdownTriggers {
    constructor(trigger) {
      this.trigger = trigger;
      this.key = this.trigger.getAttribute(selectors$r.popdownTrigger);
      this.search = null;

      const popdownSelector = `[id='${this.key}']`;
      this.document = document;
      this.popdown = document.querySelector(popdownSelector);
      this.input = this.popdown.querySelector(selectors$r.input);
      this.close = this.popdown.querySelector(selectors$r.close);
      this.body = document.querySelector(selectors$r.body);
      this.accessibility = a11y;

      this.initTriggerEvents();

      // Initialized once for every search trigger
      this.initPopdownEvents();
    }

    initTriggerEvents() {
      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);

      this.trigger.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!this.body.classList.contains('is-focused')) {
          this.showPopdown();
        }
      });

      this.trigger.addEventListener('keyup', (evt) => {
        if ((evt.which === window.theme.keyboardKeys.SPACE || evt.which === window.theme.keyboardKeys.ENTER) && this.body.classList.contains('is-focused')) {
          this.showPopdown();
        }
      });
    }

    initPopdownEvents() {
      this.search = new SearchPredictive(this.input);
      this.popdown.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hidePopdown();
        }.bind(this)
      );

      this.close.addEventListener(
        'click',
        function () {
          this.hidePopdown();
        }.bind(this)
      );

      this.document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const isNotSearchExpandButton = !(clickedElement.matches(`[${selectors$r.popdownTrigger}]`) || clickedElement.closest(`[${selectors$r.popdownTrigger}]`));
        const isNotSearchPopdownChild = !(clickedElement.matches(`#${this.key}`) || clickedElement.closest(`#${this.key}`));

        if (isNotSearchExpandButton && isNotSearchPopdownChild && this.popdown.classList.contains(classes$d.isVisible)) {
          this.hidePopdown();
        }
      });
    }

    hidePopdown() {
      this.popdown.classList.remove(classes$d.isVisible);
      this.input.form.reset();
      this.input.dispatchEvent(new CustomEvent('clear', {bubbles: false}));
      this.accessibility.removeTrapFocus();

      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));

      if (this.body.classList.contains('is-focused')) {
        setTimeout(() => {
          this.trigger.focus();
        }, 200);
      }
    }

    showPopdown() {
      document.dispatchEvent(
        new CustomEvent('theme:drawer:close', {
          bubbles: false,
        })
      );

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.popdown}));

      this.popdown.classList.add(classes$d.isVisible);
      const val = this.input.value;
      this.input.value = '';
      this.input.value = val;

      this.accessibility.trapFocus(this.popdown);
      this.input.focus();
    }
  }

  const searchPopdown = {
    onLoad() {
      sections$d[this.id] = [];
      const triggers = this.container.querySelectorAll(`[${selectors$r.popdownTrigger}]`);
      triggers.forEach((el) => {
        sections$d[this.id].push(new SearchPopdownTriggers(el));
      });
    },
  };

  const selectors$s = {
    slideruleOpen: 'data-sliderule-open',
    slideruleClose: 'data-sliderule-close',
    sliderulePane: 'data-sliderule-pane',
    slideruleWrappper: '[data-sliderule]',
    focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    children: `:scope > [data-animates],
             :scope > * > [data-animates],
             :scope > * > * >[data-animates],
             :scope > * > .sliderule-grid  > *`,
  };

  const classes$e = {
    isVisible: 'is-visible',
  };

  let sections$e = {};

  class HeaderMobileSliderule {
    constructor(el) {
      this.sliderule = el;
      this.wrapper = el.closest(selectors$s.wrapper);
      this.key = this.sliderule.id;
      const btnSelector = `[${selectors$s.slideruleOpen}='${this.key}']`;
      const exitSelector = `[${selectors$s.slideruleClose}='${this.key}']`;
      this.trigger = document.querySelector(btnSelector);
      this.exit = document.querySelector(exitSelector);
      this.pane = document.querySelector(`[${selectors$s.sliderulePane}]`);
      this.children = this.sliderule.querySelectorAll(selectors$s.children);

      this.trigger.setAttribute('aria-haspopup', true);
      this.trigger.setAttribute('aria-expanded', false);
      this.trigger.setAttribute('aria-controls', this.key);

      this.clickEvents();
      this.staggerChildAnimations();

      document.addEventListener('theme:sliderule:close', this.closeSliderule.bind(this));
    }

    clickEvents() {
      this.trigger.addEventListener(
        'click',
        function () {
          this.showSliderule();
        }.bind(this)
      );
      this.exit.addEventListener(
        'click',
        function () {
          this.hideSliderule();
        }.bind(this)
      );
    }

    keyboardEvents() {
      this.trigger.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.SPACE) {
            return;
          }
          this.showSliderule();
        }.bind(this)
      );
      this.sliderule.addEventListener(
        'keyup',
        function (evt) {
          if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
            return;
          }
          this.hideSliderule();
          this.buttons[0].focus();
        }.bind(this)
      );
    }

    staggerChildAnimations() {
      this.children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 50 + 10}ms`;
      });
    }

    hideSliderule() {
      this.pane.style.setProperty('--sliderule-height', 'auto');
      this.sliderule.classList.remove(classes$e.isVisible);
      this.children.forEach((el) => {
        el.classList.remove(classes$e.isVisible);
      });
      const newPosition = parseInt(this.pane.dataset.sliderulePane, 10) - 1;
      this.pane.setAttribute(selectors$s.sliderulePane, newPosition);
    }

    showSliderule() {
      this.pane.style.setProperty('--sliderule-height', 'auto');
      this.sliderule.classList.add(classes$e.isVisible);
      this.children.forEach((el) => {
        el.classList.add(classes$e.isVisible);
      });
      const newPosition = parseInt(this.pane.dataset.sliderulePane, 10) + 1;
      this.pane.setAttribute(selectors$s.sliderulePane, newPosition);

      const newHeight = parseInt(this.trigger.nextElementSibling.offsetHeight);
      this.pane.style.setProperty('--sliderule-height', `${newHeight}px`);
    }

    closeSliderule() {
      if (this.pane && this.pane.hasAttribute(selectors$s.sliderulePane) && parseInt(this.pane.getAttribute(selectors$s.sliderulePane)) > 0) {
        this.hideSliderule();
        if (parseInt(this.pane.getAttribute(selectors$s.sliderulePane)) > 0) {
          this.pane.setAttribute(selectors$s.sliderulePane, 0);
        }
      }
    }
  }

  const headerMobileSliderule = {
    onLoad() {
      sections$e[this.id] = [];
      const els = this.container.querySelectorAll(selectors$s.slideruleWrappper);
      els.forEach((el) => {
        sections$e[this.id].push(new HeaderMobileSliderule(el));
      });
    },
  };

  const selectors$t = {
    wrapper: '[data-header-wrapper]',
    html: 'html',
    style: 'data-header-style',
    widthContentWrapper: '[data-takes-space-wrapper]',
    widthContent: '[data-child-takes-space]',
    desktop: '[data-header-desktop]',
    cloneClass: 'js__header__clone',
    showMobileClass: 'js__show__mobile',
    backfill: '[data-header-backfill]',
    transparent: 'data-header-transparent',
    overrideBorder: 'header-override-border',
    firstSectionHasImage: '.main-content > .shopify-section:first-child [data-overlay-header]',
    preventTransparentHeader: '.main-content > .shopify-section:first-child [data-prevent-transparent-header]',
    deadLink: '.navlink[href="#"]',
  };

  let sections$f = {};

  class Header {
    constructor(el) {
      this.wrapper = el;
      this.html = document.querySelector(selectors$t.html);
      this.style = this.wrapper.dataset.style;
      this.desktop = this.wrapper.querySelector(selectors$t.desktop);
      this.isTransparentHeader = this.wrapper.getAttribute(selectors$t.transparent) !== 'false';
      this.overlayedImages = document.querySelectorAll(selectors$t.firstSectionHasImage);
      this.deadLinks = document.querySelectorAll(selectors$t.deadLink);
      this.headerUpdateEvent = debounce(() => this.checkForImage(), 500);
      this.resizeEventWidth = () => this.checkWidth();
      this.resizeEventOverlay = () => this.subtractAnnouncementHeight();

      this.killDeadLinks();
      if (this.style !== 'drawer' && this.desktop) {
        this.minWidth = this.getMinWidth();
        this.listenWidth();
      }
      this.checkForImage();
      this.listenSectionEvents();
    }

    checkForImage() {
      // check again for overlayed images
      this.overlayedImages = document.querySelectorAll(selectors$t.firstSectionHasImage);
      let preventTransparentHeader = document.querySelectorAll(selectors$t.preventTransparentHeader).length;

      if (this.overlayedImages.length && !preventTransparentHeader && this.isTransparentHeader) {
        // is transparent and has image, overlay the image
        this.listenOverlay();
        this.wrapper.setAttribute(selectors$t.transparent, true);
        document.querySelector(selectors$t.backfill).style.display = 'none';
        theme.transparentHeader = true;
      } else {
        this.wrapper.setAttribute(selectors$t.transparent, false);
        document.querySelector(selectors$t.backfill).style.display = 'block';
        theme.transparentHeader = false;
      }

      if (this.overlayedImages.length && !preventTransparentHeader && !this.isTransparentHeader) {
        // Have image but not transparent, remove border bottom
        this.wrapper.classList.add(selectors$t.overrideBorder);
      }

      this.subtractAnnouncementHeight();
    }

    listenOverlay() {
      document.addEventListener('theme:resize', this.resizeEventOverlay);
      this.subtractAnnouncementHeight();
    }

    listenWidth() {
      document.addEventListener('theme:resize', this.resizeEventWidth);
      this.checkWidth();
    }

    listenSectionEvents() {
      document.addEventListener('shopify:section:load', this.headerUpdateEvent);
      document.addEventListener('shopify:section:unload', this.headerUpdateEvent);
      document.addEventListener('shopify:section:reorder', this.headerUpdateEvent);
    }

    killDeadLinks() {
      this.deadLinks.forEach((el) => {
        el.onclick = (e) => {
          e.preventDefault();
        };
      });
    }

    subtractAnnouncementHeight() {
      const {windowHeight, announcementHeight, headerHeight} = readHeights();
      this.overlayedImages.forEach((el) => {
        if (theme.transparentHeader) {
          el.style.setProperty('--full-screen', `${windowHeight - announcementHeight}px`);
        } else {
          // headerHeight includes announcement bar height
          el.style.setProperty('--full-screen', `${windowHeight - headerHeight}px`);
        }
        el.classList.add('has-overlay');
      });
    }

    checkWidth() {
      if (document.body.clientWidth < this.minWidth) {
        this.wrapper.classList.add(selectors$t.showMobileClass);
      } else {
        this.wrapper.classList.remove(selectors$t.showMobileClass);
      }
    }

    getMinWidth() {
      const comparitor = this.wrapper.cloneNode(true);
      comparitor.classList.add(selectors$t.cloneClass);
      document.body.appendChild(comparitor);
      const widthWrappers = comparitor.querySelectorAll(selectors$t.widthContentWrapper);
      let minWidth = 0;
      let spaced = 0;

      widthWrappers.forEach((context) => {
        const wideElements = context.querySelectorAll(selectors$t.widthContent);
        let thisWidth = 0;
        if (wideElements.length === 3) {
          thisWidth = _sumSplitWidths(wideElements);
        } else {
          thisWidth = _sumWidths(wideElements);
        }
        if (thisWidth > minWidth) {
          minWidth = thisWidth;
          spaced = wideElements.length * 20;
        }
      });

      document.body.removeChild(comparitor);
      return minWidth + spaced;
    }

    unload() {
      document.removeEventListener('theme:resize', this.resizeEventWidth);
      document.removeEventListener('theme:resize', this.resizeEventOverlay);
      document.removeEventListener('shopify:section:load', this.headerUpdateEvent);
      document.removeEventListener('shopify:section:unload', this.headerUpdateEvent);
      document.removeEventListener('shopify:section:reorder', this.headerUpdateEvent);
    }
  }

  function _sumSplitWidths(nodes) {
    let arr = [];
    nodes.forEach((el) => {
      if (el.firstElementChild) {
        arr.push(el.firstElementChild.clientWidth);
      }
    });
    if (arr[0] > arr[2]) {
      arr[2] = arr[0];
    } else {
      arr[0] = arr[2];
    }
    const width = arr.reduce((a, b) => a + b);
    return width;
  }
  function _sumWidths(nodes) {
    let width = 0;
    nodes.forEach((el) => {
      width += el.clientWidth;
    });
    return width;
  }

  const header = {
    onLoad() {
      sections$f = new Header(this.container);

      setVarsOnResize();
    },
    onUnload() {
      if (typeof sections$f.unload === 'function') {
        sections$f.unload();
      }
    },
  };

  register('header', [header, drawer, popoutSection, headerMobileSliderule, stickyHeader, hoverDisclosure, headerTotals, searchPopdown]);

  const selectors$u = {
    slider: '[data-slider]',
    slide: '[data-slide]',
    thumb: '[data-slider-thumb]',
  };

  const classes$f = {
    classIsSelected: 'is-selected',
  };

  const sections$g = {};

  class Look {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$u.slider);
      this.slides = this.container.querySelectorAll(selectors$u.slide);
      this.thumbs = this.container.querySelectorAll(selectors$u.thumb);

      if (this.slider && this.slides.length && this.thumbs.length) {
        this.resizeEvent = () => this.checkPosition();

        this.slider.addEventListener('scroll', this.resizeEvent);
        document.addEventListener('theme:resize', this.resizeEvent);

        this.thumbs.forEach((thumb, i) => {
          thumb.addEventListener('click', () => {
            const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (windowWidth < theme.sizes.small) {
              const parentPadding = parseInt(window.getComputedStyle(this.slider).paddingLeft);
              const thumbLeft = this.slides[i].offsetLeft;
              this.slider.scrollTo({
                top: 0,
                left: thumbLeft - parentPadding,
                behavior: 'smooth',
              });
            }
          });
        });
      }
    }

    checkPosition() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (windowWidth < theme.sizes.small) {
        const sliderWidth = this.slider.offsetWidth;
        const sliderPositionLeft = this.slider.scrollLeft;
        const sliderPositionRight = sliderPositionLeft + sliderWidth;

        this.slides.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slidePositionLeft = slide.offsetLeft;
          const slidePositionRight = slidePositionLeft + slideWidth;
          let nextSlideCheck = false;
          const nextSlide = this.slides[i + 1];

          if (nextSlide) {
            const nextSlidePositionWidth = nextSlide.offsetWidth;
            const nextSlidePositionLeft = nextSlide.offsetLeft;
            const nextSlidePositionRight = nextSlidePositionLeft + nextSlidePositionWidth;

            if (sliderPositionRight >= nextSlidePositionRight) {
              nextSlideCheck = true;
            }
          }

          this.thumbs[i].classList.toggle(classes$f.classIsSelected, sliderPositionRight >= slidePositionRight && !nextSlideCheck);
        });
      }
    }

    onUnload() {
      if (this.slider && this.slides.length && this.thumbs.length) {
        document.removeEventListener('theme:resize', this.resizeEvent);
        this.slider.removeEventListener('scroll', this.resizeEvent);
      }
    }
  }

  const lookSection = {
    onLoad() {
      sections$g[this.id] = new Look(this);
    },
    onUnload(e) {
      sections$g[this.id].onUnload(e);
    },
  };

  register('look', [lookSection, slider, quickAddProduct, swatchGridSection]);

  const selectors$v = {
    body: 'body',
    dataRelatedSectionElem: '[data-related-section]',
    dataTabsHolder: '[data-tabs-holder]',
    dataTab: 'data-tab',
    dataTabIndex: 'data-tab-index',
    dataTabStartIndex: 'data-start-index',
    blockId: 'data-block-id',
    tabsLi: 'ul.tabs > li',
    tabLink: '.tab-link',
    tabLinkRecent: '.tab-link__recent',
    tabContent: '.tab-content',
    scrollbarHolder: '[data-scrollbar]',
    scrollbarArrowPrev: '[data-scrollbar-arrow-prev]',
    scrollbarArrowNext: '[data-scrollbar-arrow-next]',
    productModal: '[data-product-modal]',
    dataLockScrollbar: 'data-lock-scroll',
  };

  const classes$g = {
    classCurrent: 'current',
    classHide: 'hide',
    classAlt: 'alt',
    classAosAnimate: 'aos-animate',
    classAosNoTransition: 'aos-no-transition',
  };

  const sections$h = {};

  class GlobalTabs {
    constructor(holder) {
      this.container = holder;
      this.body = document.querySelector(selectors$v.body);
      this.accessibility = window.accessibility;

      if (this.container) {
        this.scrollbarHolder = this.container.querySelectorAll(selectors$v.scrollbarHolder);

        this.init();

        // Init native scrollbar
        this.initNativeScrollbar();
      }
    }

    init() {
      const ctx = this.container;
      const tabsNavList = ctx.querySelectorAll(selectors$v.tabsLi);
      const firstTabLink = ctx.querySelector(`${selectors$v.tabLink}-${ctx.hasAttribute(selectors$v.dataTabStartIndex) ? ctx.getAttribute(selectors$v.dataTabStartIndex) : 0}`);
      const firstTabContent = ctx.querySelector(`${selectors$v.tabContent}-${ctx.hasAttribute(selectors$v.dataTabStartIndex) ? ctx.getAttribute(selectors$v.dataTabStartIndex) : 0}`);

      if (firstTabContent) {
        firstTabContent.classList.add(classes$g.classCurrent);
      }

      if (firstTabLink) {
        firstTabLink.classList.add(classes$g.classCurrent);
      }

      this.checkVisibleTabLinks();
      this.container.addEventListener('tabs:checkRecentTab', () => this.checkRecentTab());
      this.container.addEventListener('tabs:hideRelatedTab', () => this.hideRelatedTab());

      if (tabsNavList.length) {
        tabsNavList.forEach((element) => {
          const tabId = parseInt(element.getAttribute(selectors$v.dataTab));
          const tab = ctx.querySelector(`${selectors$v.tabContent}-${tabId}`);

          element.addEventListener('click', () => {
            this.tabChange(element, tab);
          });

          element.addEventListener('keyup', (event) => {
            if ((event.which === window.theme.keyboardKeys.SPACE || event.which === window.theme.keyboardKeys.ENTER) && this.body.classList.contains('is-focused')) {
              this.tabChange(element, tab);

              if (tab.querySelector('a, input')) {
                this.accessibility.lastFocused = element;

                this.accessibility.a11y.trapFocus(tab, {
                  elementToFocus: tab.querySelector('a:first-child, input:first-child'),
                });
              }
            }
          });
        });
      }
    }

    tabChange(element, tab) {
      this.container.querySelector(`${selectors$v.tabsLi}.${classes$g.classCurrent}`).classList.remove(classes$g.classCurrent);
      const lastCurrentTab = this.container.querySelector(`${selectors$v.tabContent}.${classes$g.classCurrent}`);
      lastCurrentTab.classList.remove(classes$g.classCurrent);

      element.classList.add(classes$g.classCurrent);
      tab.classList.add(classes$g.classCurrent);

      if (element.classList.contains(classes$g.classHide)) {
        tab.classList.add(classes$g.classHide);
      }

      this.checkVisibleTabLinks();

      this.accessibility.a11y.removeTrapFocus();

      this.animateItems(tab);
    }

    animateItems(tab, animated = true) {
      const animatedItems = tab.querySelectorAll(`[data-aos]`);

      if (animatedItems.length) {
        animatedItems.forEach((animatedItem) => {
          animatedItem.classList.remove(classes$g.classAosAnimate);

          if (animated) {
            animatedItem.classList.add(classes$g.classAosNoTransition);

            setTimeout(() => {
              animatedItem.classList.remove(classes$g.classAosNoTransition);
              animatedItem.classList.add(classes$g.classAosAnimate);
            }, 100);
          }
        });
      }
    }

    initNativeScrollbar() {
      if (this.scrollbarHolder.length) {
        this.scrollbarHolder.forEach((scrollbar) => {
          new NativeScrollbar(scrollbar);
        });
      }
    }

    checkVisibleTabLinks() {
      const tabsNavList = this.container.querySelectorAll(selectors$v.tabsLi);
      const tabsNavListHided = this.container.querySelectorAll(`${selectors$v.tabLink}.${classes$g.classHide}`);
      const difference = tabsNavList.length - tabsNavListHided.length;

      if (difference < 2) {
        this.container.classList.add(classes$g.classAlt);
      } else {
        this.container.classList.remove(classes$g.classAlt);
      }
    }

    checkRecentTab() {
      const tabLink = this.container.querySelector(selectors$v.tabLinkRecent);

      if (tabLink) {
        tabLink.classList.remove(classes$g.classHide);
        const tabLinkIdx = parseInt(tabLink.getAttribute(selectors$v.dataTab));
        const tabContent = this.container.querySelector(`${selectors$v.tabContent}[${selectors$v.dataTabIndex}="${tabLinkIdx}"]`);

        if (tabContent) {
          tabContent.classList.remove(classes$g.classHide);

          this.animateItems(tabContent, false);
        }

        this.checkVisibleTabLinks();

        this.initNativeScrollbar();
      }
    }

    hideRelatedTab() {
      const relatedSection = this.container.querySelector(selectors$v.dataRelatedSectionElem);
      if (!relatedSection) {
        return;
      }

      const parentTabContent = relatedSection.closest(`${selectors$v.tabContent}.${classes$g.classCurrent}`);
      if (!parentTabContent) {
        return;
      }
      const parentTabContentIdx = parseInt(parentTabContent.getAttribute(selectors$v.dataTabIndex));
      const tabsNavList = this.container.querySelectorAll(selectors$v.tabsLi);

      if (tabsNavList.length > parentTabContentIdx) {
        const nextTabsNavLink = tabsNavList[parentTabContentIdx].nextSibling;

        if (nextTabsNavLink) {
          tabsNavList[parentTabContentIdx].classList.add(classes$g.classHide);
          nextTabsNavLink.dispatchEvent(new Event('click'));
          this.initNativeScrollbar();
        }
      }
    }

    onBlockSelect(evt) {
      const element = this.container.querySelector(`${selectors$v.tabLink}[${selectors$v.blockId}="${evt.detail.blockId}"]`);
      if (element) {
        element.dispatchEvent(new Event('click'));

        element.parentNode.scrollTo({
          top: 0,
          left: element.offsetLeft - element.clientWidth,
          behavior: 'smooth',
        });
      }
    }
  }

  const tabs = {
    onLoad() {
      sections$h[this.id] = [];
      const tabHolders = this.container.querySelectorAll(selectors$v.dataTabsHolder);

      tabHolders.forEach((holder) => {
        sections$h[this.id].push(new GlobalTabs(holder));
      });
    },
    onBlockSelect(e) {
      sections$h[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(e);
        }
      });
    },
  };

  register('product-grid', [slider, quickAddProduct, swatchGridSection, tabs]);

  const fadeOut = (el, callback = null) => {
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }

      if (parseFloat(el.style.opacity) === 0 && typeof callback === 'function') {
        callback();
      }
    })();
  };

  const selectors$w = {
    productSlideshow: '[data-product-slideshow]',
    productThumbs: '[data-product-thumbs]',
    sliderThumb: '[data-thumb-item]',
    dataTallLayout: 'data-tall-layout',
    mediaType: 'data-type',
    dataMediaId: 'data-media-id',
    dataThumb: 'data-thumb',
    dataThumbIndex: 'data-thumb-index',
    deferredMediaButton: '[data-deferred-media-button]',
    ariaLabel: 'aria-label',
    dataThumbnail: '[data-thumbnail]',
    productSlideThumb: '.js-product-slide-thumb',
    classSelected: 'is-active',
    classMediaHidden: 'media--hidden',
    sliderEnabled: 'flickity-enabled',
    focusEnabled: 'is-focused',
    thumbsSlider: '[data-thumbs-slider]',
  };

  const classes$h = {
    classDrag: 'is-dragging',
  };

  const thumbIcons = {
    model:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-model" viewBox="0 0 26 26"><path class="icon-media-model-outline" d="M.5 25v.5h25V.5H.5z" fill="none"/><path class="icon-media-model-element" d="M19.13 8.28L14 5.32a2 2 0 0 0-2 0l-5.12 3a2 2 0 0 0-1 1.76V16a2 2 0 0 0 1 1.76l5.12 3a2 2 0 0 0 2 0l5.12-3a2 2 0 0 0 1-1.76v-6a2 2 0 0 0-.99-1.72zm-6.4 11.1l-5.12-3a.53.53 0 0 1-.26-.38v-6a.53.53 0 0 1 .27-.46l5.12-3a.53.53 0 0 1 .53 0l5.12 3-4.72 2.68a1.33 1.33 0 0 0-.67 1.2v6a.53.53 0 0 1-.26 0z" opacity=".6" style="isolation:isolate"/></svg>',
    video:
      '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-media-video" viewBox="0 0 26 26"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25h24V1H1v24z"/><path class="icon-media-video-outline" d="M.5 25v.5h25V.5H.5V25z"/><path class="icon-media-video-element" fill-rule="evenodd" clip-rule="evenodd" d="M9.718 6.72a1 1 0 0 0-1.518.855v10.736a1 1 0 0 0 1.562.827l8.35-5.677a1 1 0 0 0-.044-1.682l-8.35-5.06z" opacity=".6"/></svg>',
  };

  class InitSlider {
    constructor(section) {
      this.container = section.container;
      this.tallLayout = this.container.getAttribute(selectors$w.dataTallLayout) === 'true';
      this.slideshow = this.container.querySelector(selectors$w.productSlideshow);
      this.thumbs = this.container.querySelector(selectors$w.productThumbs);
      this.mobileSliderEnable = this.container.getAttribute(selectors$w.mobileSliderEnable) === 'true';

      this.flkty = null;

      this.init();
    }

    init() {
      if (this.tallLayout) {
        this.initSliderMobile();

        document.addEventListener('theme:resize', () => {
          this.initSliderMobile();
        });
      } else {
        this.createSlider();
      }
    }

    initSliderMobile() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isMobile = windowWidth < theme.sizes.small;
      if (isMobile) {
        this.createSlider();
      } else {
        this.destroySlider();
      }
    }

    destroySlider() {
      const isSliderInitialized = this.slideshow.classList.contains(selectors$w.sliderEnabled);

      if (isSliderInitialized) {
        this.flkty.destroy();
      }

      if (this.thumbs) {
        this.thumbs.innerHTML = '';
      }
    }

    createSlider() {
      if (!this.slideshow) {
        return;
      }

      const instance = this;
      const firstSlide = this.slideshow.querySelectorAll(`[${selectors$w.mediaType}]`)[0];

      let flickityOptions = {
        autoPlay: false,
        prevNextButtons: false,
        contain: true,
        pageDots: false,
        adaptiveHeight: true,
        setGallerySize: false,
        wrapAround: true,
        fade: false,
        on: {
          ready: function () {
            instance.sliderThumbs(this);
          },
        },
      };

      this.flkty = new FlickityFade(this.slideshow, flickityOptions);
      this.flkty.resize();

      if (firstSlide) {
        const firstType = firstSlide.getAttribute(selectors$w.mediaType);

        if (firstType === 'model' || firstType === 'video' || firstType === 'external_video') {
          this.flkty.options.draggable = false;
          this.flkty.updateDraggable();
        }
      }

      this.flkty.on('change', function (index) {
        let lastSLideIdx = index;

        if (instance.thumbs) {
          const selectedElem = instance.thumbs.querySelector(`.${selectors$w.classSelected}`);
          const currentSlide = instance.thumbs.querySelector(`${selectors$w.sliderThumb} [${selectors$w.dataThumbIndex}="${index}"]`);

          if (selectedElem) {
            lastSLideIdx = Array.from(selectedElem.parentElement.children).indexOf(selectedElem);
            selectedElem.classList.remove(selectors$w.classSelected);
          }

          if (currentSlide) {
            currentSlide.parentElement.classList.add(selectors$w.classSelected);
          }

          instance.scrollToThumb();
        }

        const currentMedia = this.cells[lastSLideIdx].element;
        const newMedia = this.selectedElement;

        currentMedia.dispatchEvent(new CustomEvent('mediaHidden'));
        newMedia.classList.remove(selectors$w.classMediaHidden);
      });

      this.flkty.on('settle', function () {
        const currentMedia = this.selectedElement;
        const otherMedia = Array.prototype.filter.call(currentMedia.parentNode.children, function (child) {
          return child !== currentMedia;
        });
        const mediaType = currentMedia.getAttribute(selectors$w.mediaType);
        const isFocusEnabled = document.body.classList.contains(selectors$w.focusEnabled);

        if (mediaType === 'model' || mediaType === 'video' || mediaType === 'external_video') {
          // fisrt boolean sets value, second option false to prevent refresh
          instance.flkty.options.draggable = false;
          instance.flkty.updateDraggable();
        } else {
          instance.flkty.options.draggable = true;
          instance.flkty.updateDraggable();
        }

        if (isFocusEnabled) currentMedia.dispatchEvent(new Event('focus'));

        if (otherMedia.length) {
          otherMedia.forEach((element) => {
            element.classList.add(selectors$w.classMediaHidden);
          });
        }

        currentMedia.dispatchEvent(new CustomEvent('mediaVisible'));

        // Force media loading if slide becomes visible
        const deferredMedia = currentMedia.querySelector('deferred-media');
        if (deferredMedia && deferredMedia.getAttribute('loaded') !== true) {
          currentMedia.querySelector(selectors$w.deferredMediaButton).dispatchEvent(new Event('click', {bubbles: false}));
        }
      });

      this.flkty.on('dragStart', (event, pointer) => {
        event.target.classList.add(classes$h.classDrag);
      });

      this.flkty.on('dragEnd', (event, pointer) => {
        const draggedElem = this.flkty.element.querySelector(`.${classes$h.classDrag}`);
        if (draggedElem) {
          draggedElem.classList.remove(classes$h.classDrag);
        }
      });

      this.container.addEventListener('click', (e) => {
        const target = e.target;

        if (target.matches(selectors$w.productSlideThumb) || target.closest(selectors$w.productSlideThumb)) {
          e.preventDefault();

          let slideIdx = 0;
          let selector;
          if (target.matches(selectors$w.productSlideThumb)) {
            selector = target;
          } else {
            selector = target.closest(selectors$w.productSlideThumb);
          }

          slideIdx = parseInt(selector.getAttribute(selectors$w.dataThumbIndex));

          this.flkty.select(slideIdx);
        }
      });
    }

    scrollToThumb() {
      const thumbs = this.container.querySelector(selectors$w.thumbsSlider);

      if (thumbs) {
        const thumb = thumbs.querySelector(`.${selectors$w.classSelected}`);
        if (!thumb) return;
        const thumbsScrollTop = thumbs.scrollTop;
        const thumbsScrollLeft = thumbs.scrollLeft;
        const thumbsWidth = thumbs.offsetWidth;
        const thumbsHeight = thumbs.offsetHeight;
        const thumbsPositionBottom = thumbsScrollTop + thumbsHeight;
        const thumbsPositionRight = thumbsScrollLeft + thumbsWidth;
        const thumbPosTop = thumb.offsetTop;
        const thumbPosLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
        const thumbHeight = thumb.offsetHeight;
        const thumbRightPos = thumbPosLeft + thumbWidth;
        const thumbBottomPos = thumbPosTop + thumbHeight;
        const topCheck = thumbsScrollTop > thumbPosTop;
        const bottomCheck = thumbBottomPos > thumbsPositionBottom;
        const leftCheck = thumbsScrollLeft > thumbPosLeft;
        const rightCheck = thumbRightPos > thumbsPositionRight;
        const verticalCheck = bottomCheck || topCheck;
        const horizontalCheck = rightCheck || leftCheck;

        if (verticalCheck || horizontalCheck) {
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const isMobile = windowWidth < theme.sizes.small;
          let scrollTopPosition = thumbPosTop - thumbsHeight + thumbHeight;
          let scrollLeftPosition = thumbPosLeft - thumbsWidth + thumbWidth;

          if (topCheck) {
            scrollTopPosition = thumbPosTop;
          }

          if (rightCheck && isMobile) {
            scrollLeftPosition += parseInt(window.getComputedStyle(thumbs).paddingRight);
          }

          if (leftCheck) {
            scrollLeftPosition = thumbPosLeft;

            if (isMobile) {
              scrollLeftPosition -= parseInt(window.getComputedStyle(thumbs).paddingLeft);
            }
          }

          thumbs.scrollTo({
            top: scrollTopPosition,
            left: scrollLeftPosition,
            behavior: 'smooth',
          });
        }
      }
    }

    sliderThumbs(thisEl) {
      const slides = thisEl.slides;

      if (this.thumbs && slides.length) {
        let slidesHtml = '';
        slides.forEach((element, i) => {
          const slide = element.cells[0].element;
          const type = slide.getAttribute(selectors$w.mediaType);
          const mediaId = slide.getAttribute(selectors$w.dataMediaId);
          const thumb = slide.getAttribute(selectors$w.dataThumb);
          let thumbAlt = '';
          const thumbIcon = thumbIcons[type] ? thumbIcons[type] : '';
          let selected = '';

          if (slide.querySelector(`[${selectors$w.ariaLabel}]`)) {
            thumbAlt = slide.querySelector(`[${selectors$w.ariaLabel}]`).getAttribute(selectors$w.ariaLabel);
          }

          if (thumbAlt === '' && slide.hasAttribute(selectors$w.ariaLabel)) {
            thumbAlt = slide.getAttribute(selectors$w.ariaLabel);
          }

          slide.setAttribute('tabindex', '-1');

          if (slide.classList.contains(selectors$w.classSelected) || i === 0) {
            selected = selectors$w.classSelected;
          }

          slidesHtml += `<div class="thumb ${selected}" data-thumb-item><a href="${thumb}" class="thumb__link thumb__link--${type} js-product-slide-thumb" data-thumb-index="${i}" data-thumbnail data-media-id="${mediaId}"><img class="thumb__link__image lazyload" alt="${thumbAlt}" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048, 2450, 2700, 3000, 3350, 3750, 4100]" data-sizes="auto" src="${thumb}" data-src="${thumb}" loading="lazy">${thumbIcon}</a></div>`;
        });

        if (slidesHtml !== '') {
          slidesHtml = `<div class="thumbs-holder" data-thumbs-slider>${slidesHtml}</div>`;
          this.thumbs.innerHTML = slidesHtml;
        }
      }

      const productThumbImages = this.container.querySelectorAll(selectors$w.dataThumbnail);
      if (productThumbImages.length) {
        productThumbImages.forEach((element) => {
          element.addEventListener('click', function (e) {
            e.preventDefault();
          });

          element.addEventListener('keyup', function (e) {
            // On keypress Enter move the focus to the first focusable element in the related slide
            if (e.keyCode === window.theme.keyboardKeys.ENTER) {
              const mediaId = this.getAttribute(selectors$w.dataMediaId);
              const mediaElem = thisEl.element
                .querySelector(`[${selectors$w.dataMediaId}="${mediaId}"]`)
                .querySelectorAll('model-viewer, video, iframe, button, [href], input, [tabindex]:not([tabindex="-1"])')[0];
              if (mediaElem) {
                mediaElem.dispatchEvent(new Event('focus'));
                mediaElem.dispatchEvent(new Event('select'));
              }
            }
          });
        });
      }
    }
  }

  const selectors$x = {
    dataEnableSound: 'data-enable-sound',
    dataEnableBackground: 'data-enable-background',
    dataEnableAutoplay: 'data-enable-autoplay',
    dataEnableLoop: 'data-enable-loop',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
    videoIframe: '[data-video-id]',
  };

  const classes$i = {
    loaded: 'loaded',
  };

  class LoadVideoVimeo {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$x.videoIframe);

      if (this.player) {
        this.videoID = this.player.getAttribute(selectors$x.dataVideoId);
        this.videoType = this.player.getAttribute(selectors$x.dataVideoType);
        this.enableBackground = this.player.getAttribute(selectors$x.dataEnableBackground) === 'true';
        this.disableSound = this.player.getAttribute(selectors$x.dataEnableSound) === 'false';
        this.enableAutoplay = this.player.getAttribute(selectors$x.dataEnableAutoplay) !== 'false';
        this.enableLoop = this.player.getAttribute(selectors$x.dataEnableLoop) !== 'false';

        if (this.videoType == 'vimeo') {
          this.init();
        }
      }
    }

    init() {
      this.loadVimeoPlayer();
    }

    loadVimeoPlayer() {
      const oembedUrl = 'https://vimeo.com/api/oembed.json';
      const vimeoUrl = 'https://vimeo.com/' + this.videoID;
      let paramsString = '';
      const state = this.player;

      const params = {
        url: vimeoUrl,
        background: this.enableBackground,
        muted: this.disableSound,
        autoplay: this.enableAutoplay,
        loop: this.enableLoop,
      };

      for (let key in params) {
        paramsString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
      }

      fetch(`${oembedUrl}?${paramsString}`)
        .then((response) => response.json())
        .then(function (data) {
          state.innerHTML = data.html;

          setTimeout(function () {
            state.parentElement.classList.add(classes$i.loaded);
          }, 1000);
        })
        .catch(function () {
          console.log('error');
        });
    }
  }

  const selectors$y = {
    dataSectionId: 'data-section-id',
    dataEnableSound: 'data-enable-sound',
    dataHideOptions: 'data-hide-options',
    dataCheckPlayerVisibility: 'data-check-player-visibility',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
    videoIframe: '[data-video-id]',
    videoWrapper: '.video-wrapper',
    youtubeWrapper: '[data-youtube-wrapper]',
  };

  const classes$j = {
    loaded: 'loaded',
  };

  const players = [];

  class LoadVideoYT {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$y.videoIframe);

      if (this.player) {
        this.videoOptionsVars = {};
        this.videoID = this.player.getAttribute(selectors$y.dataVideoId);
        this.videoType = this.player.getAttribute(selectors$y.dataVideoType);
        if (this.videoType == 'youtube') {
          this.checkPlayerVisibilityFlag = this.player.getAttribute(selectors$y.dataCheckPlayerVisibility) === 'true';
          this.playerID = this.player.querySelector(selectors$y.youtubeWrapper) ? this.player.querySelector(selectors$y.youtubeWrapper).id : this.player.id;
          if (this.player.hasAttribute(selectors$y.dataHideOptions)) {
            this.videoOptionsVars = {
              cc_load_policy: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              autohide: 0,
              controls: 0,
              branding: 0,
              showinfo: 0,
              rel: 0,
              fs: 0,
              wmode: 'opaque',
            };
          }

          this.init();

          this.container.addEventListener('touchstart', function (e) {
            if (e.target.matches(selectors$y.videoWrapper) || e.target.closest(selectors$y.videoWrapper)) {
              const playerID = e.target.querySelector(selectors$y.videoIframe).id;
              players[playerID].playVideo();
            }
          });
        }
      }
    }

    init() {
      if (window.isYoutubeAPILoaded) {
        this.loadYoutubePlayer();
      } else {
        // Load Youtube API if not loaded yet
        loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadYoutubePlayer());
      }
    }

    loadYoutubePlayer() {
      const defaultYoutubeOptions = {
        height: '720',
        width: '1280',
        playerVars: this.videoOptionsVars,
        events: {
          onReady: (event) => {
            const eventIframe = event.target.getIframe();
            const id = eventIframe.id;
            const enableSound = document.querySelector(`#${id}`).getAttribute(selectors$y.dataEnableSound) === 'true';

            eventIframe.setAttribute('tabindex', '-1');

            if (enableSound) {
              event.target.unMute();
            } else {
              event.target.mute();
            }
            event.target.playVideo();

            if (this.checkPlayerVisibilityFlag) {
              this.checkPlayerVisibility(id);

              window.addEventListener(
                'scroll',
                throttle(() => {
                  this.checkPlayerVisibility(id);
                }, 150)
              );
            }
          },
          onStateChange: (event) => {
            // Loop video if state is ended
            if (event.data == 0) {
              event.target.playVideo();
            }
            if (event.data == 1) {
              // video is playing
              event.target.getIframe().parentElement.classList.add(classes$j.loaded);
            }
          },
        },
      };

      const currentYoutubeOptions = {...defaultYoutubeOptions};
      currentYoutubeOptions.videoId = this.videoID;
      if (this.videoID.length) {
        YT.ready(() => {
          players[this.playerID] = new YT.Player(this.playerID, currentYoutubeOptions);
        });
      }
      window.isYoutubeAPILoaded = true;
    }

    checkPlayerVisibility(id) {
      let playerID;
      if (typeof id === 'string') {
        playerID = id;
      } else if (id.data != undefined) {
        playerID = id.data.id;
      } else {
        return;
      }

      const playerElement = document.getElementById(playerID + '-container');
      if (!playerElement) return;
      const player = players[playerID];
      const box = playerElement.getBoundingClientRect();
      let isVisible = visibilityHelper.isElementPartiallyVisible(playerElement) || visibilityHelper.isElementTotallyVisible(playerElement);

      // Fix the issue when element height is bigger than the viewport height
      if (box.top < 0 && playerElement.clientHeight + box.top >= 0) {
        isVisible = true;
      }

      if (isVisible && player && typeof player.playVideo === 'function') {
        player.playVideo();
      } else if (!isVisible && player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      }
    }

    onUnload() {
      const playerID = 'youtube-' + this.container.getAttribute(selectors$y.dataSectionId);
      if (!players[playerID]) return;
      players[playerID].destroy();
    }
  }

  const selectors$z = {
    popupContainer: '.pswp',
    popupCloseBtn: '.pswp__custom-close',
    popupIframe: 'iframe, video',
    popupCustomIframe: '.pswp__custom-iframe',
    popupThumbs: '.pswp__thumbs',
    dataOptionClasses: 'data-pswp-option-classes',
    dataVideoType: 'data-video-type',
  };

  const classes$k = {
    classCurrent: 'is-current',
    classCustomLoader: 'pswp--custom-loader',
    classCustomOpen: 'pswp--custom-opening',
    classLoader: 'pswp__loader',
  };

  const loaderHTML = `<div class="${classes$k.classLoader}"><div class="loader pswp__loader-line"><div class="loader-indeterminate"></div></div></div>`;

  class LoadPhotoswipe {
    constructor(items, options = '') {
      this.items = items;
      this.pswpElement = document.querySelectorAll(selectors$z.popupContainer)[0];
      this.popup = null;
      this.popupThumbs = null;
      this.popupThumbsContainer = this.pswpElement.querySelector(selectors$z.popupThumbs);
      this.closeBtn = this.pswpElement.querySelector(selectors$z.popupCloseBtn);
      const defaultOptions = {
        history: false,
        focus: false,
        mainClass: '',
      };
      this.options = options !== '' ? options : defaultOptions;

      this.init();
    }

    init() {
      this.pswpElement.classList.add(classes$k.classCustomOpen);

      this.initLoader();

      loadScript({url: window.theme.assets.photoswipe})
        .then(() => this.loadPopup())
        .catch((e) => console.error(e));
    }

    initLoader() {
      if (this.pswpElement.classList.contains(classes$k.classCustomLoader) && this.options !== '' && this.options.mainClass) {
        this.pswpElement.setAttribute(selectors$z.dataOptionClasses, this.options.mainClass);
        let loaderElem = document.createElement('div');
        loaderElem.innerHTML = loaderHTML;
        loaderElem = loaderElem.firstChild;
        this.pswpElement.appendChild(loaderElem);
      } else {
        this.pswpElement.setAttribute(selectors$z.dataOptionClasses, '');
      }
    }

    loadPopup() {
      const PhotoSwipe = window.themePhotoswipe.PhotoSwipe.default;
      const PhotoSwipeUI = window.themePhotoswipe.PhotoSwipeUI.default;

      if (this.pswpElement.classList.contains(classes$k.classCustomLoader)) {
        this.pswpElement.classList.remove(classes$k.classCustomLoader);
      }

      this.pswpElement.classList.remove(classes$k.classCustomOpen);

      this.popup = new PhotoSwipe(this.pswpElement, PhotoSwipeUI, this.items, this.options);
      this.popup.init();

      this.initVideo();

      this.thumbsActions();

      this.popup.listen('close', () => this.onClose());

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.popup.close());
      }
    }

    initVideo() {
      const videoContainer = this.pswpElement.querySelector(selectors$z.popupCustomIframe);
      if (videoContainer) {
        const videoType = videoContainer.getAttribute(selectors$z.dataVideoType);

        if (videoType == 'youtube') {
          new LoadVideoYT(videoContainer.parentElement);
        } else if (videoType == 'vimeo') {
          new LoadVideoVimeo(videoContainer.parentElement);
        }
      }
    }

    thumbsActions() {
      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        this.popupThumbsContainer.addEventListener('wheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('mousewheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('DOMMouseScroll', (e) => this.stopDisabledScroll(e));

        this.popupThumbs = this.pswpElement.querySelectorAll(`${selectors$z.popupThumbs} > *`);
        this.popupThumbs.forEach((element, i) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            element.parentElement.querySelector(`.${classes$k.classCurrent}`).classList.remove(classes$k.classCurrent);
            element.classList.add(classes$k.classCurrent);
            this.popup.goTo(i);
          });
        });

        this.popup.listen('imageLoadComplete', () => this.setCurrentThumb());
        this.popup.listen('beforeChange', () => this.setCurrentThumb());
      }
    }

    stopDisabledScroll(e) {
      e.stopPropagation();
    }

    onClose() {
      const popupIframe = this.pswpElement.querySelector(selectors$z.popupIframe);
      if (popupIframe) {
        popupIframe.parentNode.removeChild(popupIframe);
      }

      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        while (this.popupThumbsContainer.firstChild) this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
      }

      this.pswpElement.setAttribute(selectors$z.dataOptionClasses, '');
      const loaderElem = this.pswpElement.querySelector(`.${classes$k.classLoader}`);
      if (loaderElem) {
        this.pswpElement.removeChild(loaderElem);
      }
    }

    setCurrentThumb() {
      const lastCurrentThumb = this.pswpElement.querySelector(`${selectors$z.popupThumbs} > .${classes$k.classCurrent}`);
      if (lastCurrentThumb) {
        lastCurrentThumb.classList.remove(classes$k.classCurrent);
      }

      if (!this.popupThumbs) return;
      const currentThumb = this.popupThumbs[this.popup.getCurrentIndex()];
      currentThumb.classList.add(classes$k.classCurrent);
      this.scrollThumbs(currentThumb);
    }

    scrollThumbs(currentThumb) {
      const thumbsContainerLeft = this.popupThumbsContainer.scrollLeft;
      const thumbsContainerWidth = this.popupThumbsContainer.offsetWidth;
      const thumbsContainerPos = thumbsContainerLeft + thumbsContainerWidth;
      const currentThumbLeft = currentThumb.offsetLeft;
      const currentThumbWidth = currentThumb.offsetWidth;
      const currentThumbPos = currentThumbLeft + currentThumbWidth;

      if (thumbsContainerPos <= currentThumbPos || thumbsContainerPos > currentThumbLeft) {
        const currentThumbMarginLeft = parseInt(window.getComputedStyle(currentThumb).marginLeft);
        this.popupThumbsContainer.scrollTo({
          top: 0,
          left: currentThumbLeft - currentThumbMarginLeft,
          behavior: 'smooth',
        });
      }
    }
  }

  const selectors$A = {
    zoomWrapper: '[data-zoom-wrapper]',
    dataImageSrc: 'data-image-src',
    dataImageWidth: 'data-image-width',
    dataImageHeight: 'data-image-height',
    dataImageZoomEnable: 'data-image-zoom-enable',
    thumbs: '.pswp__thumbs',
    caption: '[data-zoom-caption]',
  };

  const classes$l = {
    variantSoldOut: 'variant--soldout',
    variantUnavailable: 'variant--unavailabe',
    popupThumb: 'pswp__thumb',
    popupClass: 'pswp-zoom-gallery',
    popupClassNoThumbs: 'pswp-zoom-gallery--single',
    popupTitle: 'product__title',
    popupTitleNew: 'product__title pswp__title',
  };

  class Zoom {
    constructor(section) {
      this.container = section.container;
      this.zoomWrappers = this.container.querySelectorAll(selectors$A.zoomWrapper);
      this.thumbsContainer = document.querySelector(selectors$A.thumbs);
      this.zoomCaptionElem = this.container.querySelector(selectors$A.caption);
      this.zoomEnable = this.container.getAttribute(selectors$A.dataImageZoomEnable) === 'true';

      if (this.zoomEnable) {
        this.init();
      }
    }

    init() {
      const self = this;

      if (this.zoomWrappers.length) {
        this.zoomWrappers.forEach((element, i) => {
          element.addEventListener('click', function (e) {
            e.preventDefault();

            self.createZoom(i);
          });

          element.addEventListener('keyup', function (e) {
            // On keypress Enter move the focus to the first focusable element in the related slide
            if (e.keyCode === window.theme.keyboardKeys.ENTER) {
              e.preventDefault();

              self.createZoom(i);
            }
          });
        });
      }
    }

    createZoom(indexImage) {
      const self = this;
      let items = [];
      let counter = 0;
      let thumbs = '';
      this.zoomWrappers.forEach((elementImage) => {
        const imgSrc = elementImage.getAttribute(selectors$A.dataImageSrc);
        const imgWidth = parseInt(elementImage.getAttribute(selectors$A.dataImageWidth));
        const imgHeight = parseInt(elementImage.getAttribute(selectors$A.dataImageHeight));

        items.push({
          src: imgSrc,
          w: imgWidth,
          h: imgHeight,
          msrc: imgSrc,
        });

        thumbs += `<a href="#" class="${classes$l.popupThumb}" style="background-image: url('${imgSrc}')"></a>`;

        counter += 1;
        if (self.zoomWrappers.length === counter) {
          let popupClass = `${classes$l.popupClass}`;
          if (counter === 1) {
            popupClass = `${classes$l.popupClass} ${classes$l.popupClassNoThumbs}`;
          }
          const options = {
            history: false,
            focus: false,
            index: indexImage,
            mainClass: popupClass,
            showHideOpacity: true,
            howAnimationDuration: 150,
            hideAnimationDuration: 250,
            closeOnScroll: false,
            closeOnVerticalDrag: false,
            captionEl: true,
            closeEl: true,
            closeElClasses: ['caption-close', 'title'],
            tapToClose: false,
            clickToCloseNonZoomable: false,
            maxSpreadZoom: 2,
            loop: true,
            spacing: 0,
            allowPanToNext: true,
            pinchToClose: false,
            addCaptionHTMLFn: function (item, captionEl, isFake) {
              self.zoomCaption(item, captionEl, isFake);
            },
            getThumbBoundsFn: function getThumbBoundsFn() {
              const imageLocation = self.zoomWrappers[indexImage];
              const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
              const rect = imageLocation.getBoundingClientRect();
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
            },
          };

          new LoadPhotoswipe(items, options);

          if (self.thumbsContainer && thumbs !== '') {
            self.thumbsContainer.innerHTML = thumbs;
          }
        }
      });
    }

    zoomCaption(item, captionEl) {
      let captionHtml = '';
      const targetContainer = captionEl.children[0];
      if (this.zoomCaptionElem) {
        captionHtml = this.zoomCaptionElem.innerHTML;

        if (this.zoomCaptionElem.closest(`.${classes$l.variantSoldOut}`)) {
          targetContainer.classList.add(classes$l.variantSoldOut);
        } else {
          targetContainer.classList.remove(classes$l.variantSoldOut);
        }

        if (this.zoomCaptionElem.closest(`.${classes$l.variantUnavailable}`)) {
          targetContainer.classList.add(classes$l.variantUnavailable);
        } else {
          targetContainer.classList.remove(classes$l.variantUnavailable);
        }
      }

      captionHtml = captionHtml.replaceAll(classes$l.popupTitle, classes$l.popupTitleNew);
      targetContainer.innerHTML = captionHtml;
      return false;
    }
  }

  const hosts = {
    html5: 'html5',
    youtube: 'youtube',
  };

  const selectors$B = {
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productMediaSlider: '[data-product-single-media-slider]',
    mediaContainer: '[data-video]',
    mediaId: 'data-media-id',
  };

  const classes$m = {
    mediaHidden: 'media--hidden',
  };

  theme.mediaInstances = {};
  class Video {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.id = section.id;
      this.players = {};
      this.init();
    }

    init() {
      const mediaContainers = this.container.querySelectorAll(selectors$B.mediaContainer);

      mediaContainers.forEach((mediaContainer) => {
        const deferredMediaButton = mediaContainer.querySelector(selectors$B.deferredMediaButton);

        if (deferredMediaButton) {
          deferredMediaButton.addEventListener('click', this.loadContent.bind(this, mediaContainer));
        }
      });
    }

    loadContent(mediaContainer) {
      if (mediaContainer.querySelector(selectors$B.deferredMedia).getAttribute('loaded')) {
        return;
      }

      const content = document.createElement('div');
      content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
      const mediaId = mediaContainer.dataset.mediaId;
      const element = content.querySelector('video, iframe');
      const host = this.hostFromVideoElement(element);
      const deferredMedia = mediaContainer.querySelector(selectors$B.deferredMedia);
      deferredMedia.appendChild(element).focus();
      deferredMedia.setAttribute('loaded', true);

      this.players[mediaId] = {
        mediaId: mediaId,
        sectionId: this.id,
        container: mediaContainer,
        element: element,
        host: host,
        ready: () => {
          this.createPlayer(mediaId);
        },
      };

      const video = this.players[mediaId];

      switch (video.host) {
        case hosts.html5:
          this.loadVideo(video, hosts.html5);
          break;
        case hosts.youtube:
          if (window.isYoutubeAPILoaded) {
            this.loadVideo(video, hosts.youtube);
          } else {
            loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadVideo(video, hosts.youtube));
          }
          break;
      }
    }

    hostFromVideoElement(video) {
      if (video.tagName === 'VIDEO') {
        return hosts.html5;
      }

      if (video.tagName === 'IFRAME') {
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(video.src)) {
          return hosts.youtube;
        }
      }
      return null;
    }

    loadVideo(video, host) {
      if (video.host === host) {
        video.ready();
      }
    }

    createPlayer(mediaId) {
      const video = this.players[mediaId];
      const enableLooping = video.container.dataset.enableVideoLooping;

      switch (video.host) {
        case hosts.html5:
          video.element.addEventListener('play', () => {
            this.pauseOtherMedia(mediaId);
          });

          video.element.play(); // Force video play on iOS
          video.container.addEventListener('mediaHidden', (event) => this.onHidden(event));
          video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));
          video.container.addEventListener('mediaVisible', (event) => this.onVisible(event));

          break;

        case hosts.youtube:
          if (video.host == hosts.youtube && video.player) {
            return;
          }

          YT.ready(() => {
            const videoId = video.container.dataset.videoId;

            this.players[mediaId].player = new YT.Player(video.element, {
              videoId: videoId,
              events: {
                onReady: (event) => {
                  event.target.playVideo(); // Force video play on iOS
                },
                onStateChange: (event) => {
                  if (event.data === 0) {
                    // ended
                    if (enableLooping) {
                      event.target.seekTo(0);
                    }
                  }
                  if (event.data === 1) {
                    // playing
                    this.pauseOtherMedia(mediaId);
                  }
                  if (event.data === 2) ;
                },
              },
            });

            window.isYoutubeAPILoaded = true;

            video.container.addEventListener('mediaHidden', (event) => this.onHidden(event));
            video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));
            video.container.addEventListener('mediaVisible', (event) => this.onVisible(event));
          });

          break;
      }
    }

    onHidden(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        const mediaId = event.target.dataset.mediaId;
        const videoPlayer = this.players[mediaId];

        if (videoPlayer.player && videoPlayer.player.pauseVideo) {
          videoPlayer.player.pauseVideo();
        } else if (videoPlayer.element && videoPlayer.element.pause) {
          videoPlayer.element.pause();
        }
      }
    }

    onVisible(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        const mediaId = event.target.dataset.mediaId;
        const videoPlayer = this.players[mediaId];

        if (videoPlayer.player && videoPlayer.player.playVideo) {
          videoPlayer.player.playVideo();
        } else if (videoPlayer.element && videoPlayer.element.play) {
          videoPlayer.element.play();
        }
      }
    }

    pauseOtherMedia(mediaId) {
      const mediaIdString = `[${selectors$B.mediaId}="${mediaId}"]`;
      const currentMedia = document.querySelector(`${selectors$B.productMediaWrapper}${mediaIdString}`);
      const otherMedia = document.querySelectorAll(`${selectors$B.productMediaWrapper}:not(${mediaIdString})`);
      currentMedia.classList.remove(classes$m.mediaHidden);

      if (otherMedia.length) {
        otherMedia.forEach((element) => {
          element.dispatchEvent(new CustomEvent('mediaHidden'));
          element.classList.add(classes$m.mediaHidden);
        });
      }
    }
  }

  theme.mediaInstances = {};

  const selectors$C = {
    videoPlayer: '[data-video]',
    modelViewer: '[data-model]',
    sliderEnabled: 'flickity-enabled',
    classMediaHidden: 'media--hidden',
  };

  class Media {
    constructor(section) {
      this.section = section;
      this.id = section.id;
      this.container = section.container;
    }

    init() {
      this.detect3d();
      this.launch3d();

      new Video(this.section);
      new Zoom(this.section);
      new InitSlider(this.section);
    }

    detect3d() {
      const modelViewerElements = this.container.querySelectorAll(selectors$C.modelViewer);
      if (modelViewerElements.length) {
        modelViewerElements.forEach((element) => {
          theme.ProductModel.init(element, this.id);
        });
      }
    }

    launch3d() {
      const instance = this;

      document.addEventListener('shopify_xr_launch', function () {
        const currentMedia = instance.container.querySelector(`${instance.selectors.modelViewer}:not(.${selectors$C.classMediaHidden})`);
        currentMedia.dispatchEvent(new CustomEvent('xrLaunch'));
      });
    }
  }

  const selectors$D = {
    pickupContainer: '[data-store-availability-container]',
    shopifySection: '.shopify-section',
    drawer: '[data-pickup-drawer]',
    drawerBody: '[data-pickup-drawer-body]',
    drawerOpen: '[data-pickup-drawer-open]',
    drawerClose: '[data-pickup-drawer-close]',
    body: 'body',
  };

  const classes$n = {
    isOpen: 'is-open',
  };

  let sections$i = {};

  class PickupAvailability {
    constructor(section) {
      this.container = section.container;
      this.drawer = null;
      this.drawerBody = null;
      this.buttonDrawerOpen = null;
      this.buttonDrawerClose = null;
      this.body = document.querySelector(selectors$D.body);
      this.a11y = a11y;

      this.container.addEventListener('theme:variant:change', (event) => this.fetchPickupAvailability(event));

      this.closeEvent();
    }

    fetchPickupAvailability(event) {
      const container = this.container.querySelector(selectors$D.pickupContainer);
      const variant = event.detail.variant;

      // Remove cloned instances of pickup drawer
      if (this.drawer) {
        this.body.removeChild(this.drawer);
      }

      if (container && variant) {
        fetch(`${window.theme.routes.root}variants/${variant.id}/?section_id=api-pickup-availability`)
          .then((response) => response.text())
          .then((text) => {
            const pickupAvailabilityHTML = new DOMParser().parseFromString(text, 'text/html').querySelector(selectors$D.shopifySection).innerHTML;
            container.innerHTML = pickupAvailabilityHTML;

            this.drawer = this.container.querySelector(selectors$D.drawer);
            // Clone Pickup drawer and append it to the end of <body>
            this.clone = this.drawer.cloneNode(true);
            this.body.appendChild(this.clone);

            // Delete the original instance of pickup drawer
            container.removeChild(this.drawer);

            this.drawer = this.body.querySelector(selectors$D.drawer);
            this.drawerBody = this.body.querySelector(selectors$D.drawerBody);
            this.buttonDrawerOpen = this.body.querySelector(selectors$D.drawerOpen);
            this.buttonDrawerClose = this.body.querySelectorAll(selectors$D.drawerClose);

            if (this.buttonDrawerOpen) {
              this.buttonDrawerOpen.addEventListener('click', () => {
                this.openDrawer();

                window.accessibility.lastElement = this.buttonDrawerOpen;
              });
            }

            if (this.buttonDrawerClose.length) {
              this.buttonDrawerClose.forEach((element) => {
                element.addEventListener('click', () => this.closeDrawer());
              });
            }

            this.drawer.addEventListener('keyup', (evt) => {
              if (evt.which !== window.theme.keyboardKeys.ESCAPE) {
                return;
              }
              this.closeDrawer();
            });
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }

    openDrawer() {
      if (this.drawer) {
        this.drawer.classList.add(classes$n.isOpen);
        this.drawer.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.drawerBody}));

        // Focus the close button on pickup drawer close
        setTimeout(() => {
          const elementToFocus = this.drawer.querySelector(selectors$D.drawerClose);
          this.a11y.removeTrapFocus();
          this.a11y.trapFocus(this.drawer, {
            elementToFocus: elementToFocus,
          });
        }, 200);
      }
    }

    closeDrawer() {
      if (this.drawer) {
        this.drawer.classList.remove(classes$n.isOpen);
        this.drawer.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: this.drawerBody}));
        this.a11y.removeTrapFocus();

        // Focus the last element on pickup drawer close
        if (window.accessibility.lastElement) {
          setTimeout(() => {
            window.accessibility.lastElement.focus();
          }, 200);
        }
      }
    }

    /**
     * Body click event to close pickup drawer
     *
     * @return  {Void}
     */
    closeEvent() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (!clickedElement.matches(selectors$D.drawerOpen) && !clickedElement.closest(selectors$D.drawer)) {
          this.closeDrawer();
        }
      });
    }
  }

  const pickupAvailability = {
    onLoad() {
      sections$i[this.id] = new PickupAvailability(this);
    },
  };

  const selectors$E = {
    product: '[data-product]',
    productForm: '[data-product-form]',
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    comparePrice: '[data-compare-price]',
    comparePriceText: '[data-compare-text]',
    formWrapper: '[data-form-wrapper]',
    originalSelectorId: '[data-product-select]',
    priceWrapper: '[data-price-wrapper]',
    productSlideshow: '[data-product-slideshow]',
    productImage: '[data-product-image]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    productSku: '[data-product-sku]',
    unitPrice: '[data-product-unit-price]',
    unitBase: '[data-product-base]',
    unitWrapper: '[data-product-unit]',
    preOrderTag: '_preorder',
    sliderEnabled: 'flickity-enabled',
    productSlide: '.product__slide',
    dataTallLayout: 'data-tall-layout',
    dataEnableHistoryState: 'data-enable-history-state',
    subPrices: '[data-subscription-watch-price]',
    subSelectors: '[data-subscription-selectors]',
    subOffWrap: '[data-price-off]',
    subsToggle: '[data-toggles-group]',
    subsChild: 'data-group-toggle',
    subOffAmount: '[data-price-off-amount]',
    subDescription: '[data-plan-description]',
    dataImageId: 'data-image-id',
    idInput: '[name="id"]',
  };

  const classes$o = {
    hide: 'hide',
    variantSoldOut: 'variant--soldout',
    variantUnavailable: 'variant--unavailabe',
    productPriceSale: 'product__price--sale',
  };

  class ProductAddForm {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.tallLayout = this.container.getAttribute(selectors$E.dataTallLayout) === 'true';
      this.product = this.container.querySelector(selectors$E.product);
      this.productForm = this.container.querySelector(selectors$E.productForm);

      // Stop parsing if we don't have the product
      if (!this.product || !this.productForm) {
        return;
      }

      this.enableHistoryState = this.container.getAttribute(selectors$E.dataEnableHistoryState) === 'true';
      this.hasUnitPricing = this.container.querySelector(selectors$E.unitWrapper);
      this.subSelectors = this.container.querySelector(selectors$E.subSelectors);
      this.subPrices = this.container.querySelector(selectors$E.subPrices);

      const counter = new QuantityCounter(this.container);
      counter.init();

      this.init();
    }

    init() {
      let productJSON = null;
      const productElemJSON = this.container.querySelector(selectors$E.productJson);
      if (productElemJSON) {
        productJSON = productElemJSON.innerHTML;
      }
      if (productJSON) {
        this.productJSON = JSON.parse(productJSON);
        this.linkForm();
      } else {
        console.error('Missing product JSON');
      }
    }

    destroy() {
      this.productForm.destroy();
    }

    linkForm() {
      this.productForm = new ProductForm(this.productForm, this.productJSON, {
        onOptionChange: this.onOptionChange.bind(this),
        onPlanChange: this.onPlanChange.bind(this),
      });
      this.pushState(this.productForm.getFormState());
      this.subsToggleListeners();
    }

    onOptionChange(evt) {
      this.pushState(evt.dataset);
      this.updateProductImage(evt);
    }

    onPlanChange(evt) {
      if (this.subPrices) {
        this.pushState(evt.dataset);
      }
    }

    pushState(formState) {
      this.productState = this.setProductState(formState);
      this.updateProductPrices(formState);
      this.updateSubscriptionText(formState);
      this.fireHookEvent(formState);
      if (this.enableHistoryState) {
        this.updateHistoryState(formState);
      }
      this.updateAddToCartState(formState);
    }

    updateAddToCartState(formState) {
      const variant = formState.variant;
      let addText = theme.strings.addToCart;
      const priceWrapper = this.container.querySelectorAll(selectors$E.priceWrapper);
      const addToCart = this.container.querySelectorAll(selectors$E.addToCart);
      const addToCartText = this.container.querySelectorAll(selectors$E.addToCartText);
      const formWrapper = this.container.querySelectorAll(selectors$E.formWrapper);


      if (this.productJSON.tags.includes(selectors$E.preOrderTag)) {
        addText = theme.strings.preOrder;
      }

      if (priceWrapper.length && variant) {
        priceWrapper.forEach((element) => {
          element.classList.remove(classes$o.hide);
        });
      }

      if (addToCart.length) {
        addToCart.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.disabled = false;
            } else {
              element.disabled = true;
            }
          } else {
            element.disabled = true;
          }
        });
      }

      if (document.body.classList.contains('template-product')) {
        if(this.container.querySelector('.select-popout__item--current a')) {
          let currentOption
          setTimeout(() => {
            currentOption = this.container.querySelector('.select-popout__item--current a');

          }, 400);

          setTimeout(() => {
            if (addToCartText.length) {
              addToCartText.forEach((element) => {
                if (currentOption.dataset.status.includes(theme.strings.byOrderOnly)) {
                  element.innerHTML = theme.strings.preorder;
                  document.querySelector('#zooomybackinstock').style.display = 'none'
                } else if (currentOption.dataset.status.includes(theme.strings.soldOut)) {
                  element.innerHTML = theme.strings.soldOut;
                  document.querySelector('#zooomybackinstock').style.display = 'block'
                } else {
                  element.innerHTML = addText;
                  document.querySelector('#zooomybackinstock').style.display = 'none'
                }
              });
            }
          }, 600);
        } else {
          if (addToCartText.length) {
            addToCartText.forEach((element) => {
              if (variant) {
                if (variant.available) {
                  element.innerHTML = addText;
                  document.querySelector('#zooomybackinstock').style.display = 'none'
                } else {
                  element.innerHTML = theme.strings.soldOut;
                  document.querySelector('#zooomybackinstock').style.display = 'block'
                }
              } else {
                element.innerHTML = theme.strings.unavailable;
                document.querySelector('#zooomybackinstock').style.display = 'block'
              }
            });
          }
        }
      }





      if (formWrapper.length) {
        formWrapper.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.classList.remove(classes$o.variantSoldOut, classes$o.variantUnavailable);
            } else {
              element.classList.add(classes$o.variantSoldOut);
              element.classList.remove(classes$o.variantUnavailable);
            }
            const formSelect = element.querySelector(selectors$E.originalSelectorId);
            if (formSelect) {
              formSelect.value = variant.id;
            }
          } else {
            element.classList.add(classes$o.variantUnavailable);
            element.classList.remove(classes$o.variantSoldOut);
          }
        });
      }
    }

    updateHistoryState(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      const location = window.location.href;
      if (variant && location.includes('/product')) {
        const url = new window.URL(location);
        const params = url.searchParams;
        params.set('variant', variant.id);
        if (plan && plan.detail && plan.detail.id && this.productState.hasPlan) {
          params.set('selling_plan', plan.detail.id);
        } else {
          params.delete('selling_plan');
        }
        url.search = params.toString();
        const urlString = url.toString();
        window.history.replaceState({path: urlString}, '', urlString);
      }
    }

    getBaseUnit(variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }

    subsToggleListeners() {
      const toggles = this.container.querySelectorAll(selectors$E.subsToggle);

      toggles.forEach((toggle) => {
        toggle.addEventListener(
          'change',
          function (e) {
            const val = e.target.value.toString();
            const selected = this.container.querySelector(`[${selectors$E.subsChild}="${val}"]`);
            const groups = this.container.querySelectorAll(`[${selectors$E.subsChild}]`);
            if (selected) {
              selected.classList.remove(classes$o.hide);
              const first = selected.querySelector(`[name="selling_plan"]`);
              first.checked = true;
              first.dispatchEvent(new Event('change'));
            }
            groups.forEach((group) => {
              if (group !== selected) {
                group.classList.add(classes$o.hide);
                const plans = group.querySelectorAll(`[name="selling_plan"]`);
                plans.forEach((plan) => {
                  plan.checked = false;
                  plan.dispatchEvent(new Event('change'));
                });
              }
            });
          }.bind(this)
        );
      });
    }

    updateSubscriptionText(formState) {
      const plan = formState.plan;
      const subOffWrap = this.container.querySelector(selectors$E.subOffWrap);
      const subOffAmount = this.container.querySelector(selectors$E.subOffAmount);
      const planDecription = this.container.querySelector(selectors$E.subDescription);

      if (this.productState.planSale) {
        const adjustment = plan.detail.price_adjustments[0];
        const discount = adjustment.value;
        if (adjustment && adjustment.value_type === 'percentage') {
          subOffAmount.innerHTML = `${discount}%`;
        } else {
          subOffAmount.innerHTML = themeCurrency.formatMoney(discount, theme.moneyFormat);
        }
        subOffWrap.classList.remove(classes$o.hide);
      } else if (subOffWrap) {
        subOffWrap.classList.add(classes$o.hide);
      }
      if (plan) {
        planDecription.innerHTML = plan.detail.description;
        planDecription.classList.remove(classes$o.hide);
      } else if (planDecription) {
        planDecription.classList.add(classes$o.hide);
      }
    }

    updateProductPrices(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      const priceWrappers = this.container.querySelectorAll(selectors$E.priceWrapper);

      const productSkuEl = document.querySelector('.product__variant_sku span')

      productSkuEl.innerText = variant.sku
      priceWrappers.forEach((wrap) => {
        const comparePriceEl = wrap.querySelector(selectors$E.comparePrice);
        const productPriceEl = wrap.querySelector(selectors$E.productPrice);
        const comparePriceText = wrap.querySelector(selectors$E.comparePriceText);


        let comparePrice = '';
        let price = '';

        if (this.productState.available) {
          comparePrice = variant.compare_at_price;
          price = variant.price;
        }

        if (this.productState.hasPlan) {
          price = plan.allocation.price;
        }

        if (this.productState.planSale) {
          comparePrice = plan.allocation.compare_at_price;
          price = plan.allocation.price;
        }

        if (comparePriceEl) {
          if (this.productState.onSale || this.productState.planSale) {
            comparePriceEl.classList.remove(classes$o.hide);
            comparePriceText.classList.remove(classes$o.hide);
            productPriceEl.classList.add(classes$o.productPriceSale);
          } else {
            comparePriceEl.classList.add(classes$o.hide);
            comparePriceText.classList.add(classes$o.hide);
            productPriceEl.classList.remove(classes$o.productPriceSale);
          }
          comparePriceEl.innerHTML = themeCurrency.formatMoney(comparePrice, theme.moneyFormat);
        }

        productPriceEl.innerHTML = price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(price, theme.moneyFormat);
      });

      if (this.hasUnitPricing) {
        this.updateProductUnits(formState);
      }
    }

    updateProductUnits(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      let unitPrice = null;

      if (variant && variant.unit_price) {
        unitPrice = variant.unit_price;
      }
      if (plan && plan.allocation && plan.allocation.unit_price) {
        unitPrice = plan.allocation.unit_price;
      }

      if (unitPrice) {
        const base = this.getBaseUnit(variant);
        const formattedPrice = themeCurrency.formatMoney(unitPrice, theme.moneyFormat);
        this.container.querySelector(selectors$E.unitPrice).innerHTML = formattedPrice;
        this.container.querySelector(selectors$E.unitBase).innerHTML = base;
        showElement(this.container.querySelector(selectors$E.unitWrapper));
      } else {
        hideElement(this.container.querySelector(selectors$E.unitWrapper));
      }
    }

    fireHookEvent(formState) {
      const variant = formState.variant;
      this.container.dispatchEvent(
        new CustomEvent('theme:variant:change', {
          detail: {
            variant: variant,
          },
          bubbles: true,
        })
      );
    }

    /**
     * Tracks aspects of the product state that are relevant to UI updates
     * @param {object} evt - variant change event
     * @return {object} productState - represents state of variant + plans
     *  productState.available - current variant and selling plan options result in valid offer
     *  productState.soldOut - variant is sold out
     *  productState.onSale - variant is on sale
     *  productState.showUnitPrice - variant has unit price
     *  productState.requiresPlan - all the product variants requires a selling plan
     *  productState.hasPlan - there is a valid selling plan
     *  productState.planSale - plan has a discount to show next to price
     *  productState.planPerDelivery - plan price does not equal per_delivery_price - a prepaid subscribtion
     */
    setProductState(dataset) {
      const variant = dataset.variant;
      const plan = dataset.plan;

      const productState = {
        available: true,
        soldOut: false,
        onSale: false,
        showUnitPrice: false,
        requiresPlan: false,
        hasPlan: false,
        planPerDelivery: false,
        planSale: false,
      };

      if (!variant || (variant.requires_selling_plan && !plan)) {
        productState.available = false;
      } else {
        if (!variant.available) {
          productState.soldOut = true;
        }

        if (variant.compare_at_price > variant.price) {
          productState.onSale = true;
        }

        if (variant.unit_price) {
          productState.showUnitPrice = true;
        }

        if (this.product && this.product.requires_selling_plan) {
          productState.requiresPlan = true;
        }

        if (plan && this.subPrices) {
          productState.hasPlan = true;
          if (plan.allocation.per_delivery_price !== plan.allocation.price) {
            productState.planPerDelivery = true;
          }
          if (variant.price > plan.allocation.price) {
            productState.planSale = true;
          }
        }
      }
      return productState;
    }

    updateProductImage(evt) {
      const variant = evt.dataset.variant;

      if (variant) {
        // Update variant image, if one is set
        if (variant.featured_media) {
          const newImg = this.container.querySelector(`${selectors$E.productImage}[${selectors$E.dataImageId}="${variant.featured_media.id}"]`);
          const newImageParent = newImg.closest(selectors$E.productSlide);
          // If we have a mobile breakpoint or the tall layout is disabled,
          // just switch the slideshow.
          if (newImageParent) {
            const newImagePos = Array.from(newImageParent.parentElement.children).indexOf(newImageParent);
            const slider = this.container.querySelector(selectors$E.productSlideshow);

            if (slider && slider.classList.contains(selectors$E.sliderEnabled)) {
              FlickityFade.data(slider).select(newImagePos);
            }

            if (!theme.variables.bpSmall && this.tallLayout) {
              // We know its a tall layout, if it's sticky
              // scroll to the images
              // Scroll to/reorder image unless it's the first photo on load
              const targetScroll = newImg.getBoundingClientRect().top + window.scrollY;

              if (newImagePos === 0 && targetScroll > window.pageYOffset) return;

              // Scroll to variant image
              document.dispatchEvent(
                new CustomEvent('tooltip:close', {
                  bubbles: false,
                  detail: {
                    hideTransition: false,
                  },
                })
              );
              window.scrollTo({
                top: targetScroll,
                left: 0,
                behavior: 'smooth',
              });
            }
          }
        }
      }
    }
  }

  const productFormSection = {
    onLoad() {
      this.section = new ProductAddForm(this);
    },
  };

  const selectors$F = {
    elements: {
      accordionHolder: '[data-accordion-holder]',
      accordion: '[data-accordion]',
      accordionToggle: '[data-accordion-toggle]',
      accordionBody: '[data-accordion-body]',
      accordionExpandValue: 'data-accordion-expand',
      accordionBlockValue: 'data-block-id',
    },
    classes: {
      open: 'is-open',
    },
  };

  const sections$j = {};

  class GlobalAccordions {
    constructor(el) {
      this.container = el.container;
      this.accordion = this.container.querySelector(selectors$F.elements.accordion);
      this.accordionToggles = this.container.querySelectorAll(selectors$F.elements.accordionToggle);
      this.accordionTogglesLength = this.accordionToggles.length;
      this.accordionBody = this.container.querySelector(selectors$F.elements.accordionBody);

      if (this.accordionTogglesLength && this.accordionBody) {
        this.accordionEvents();
      }
    }

    accordionEvents() {
      this.accordionToggles.forEach((element) => {
        element.addEventListener(
          'click',
          throttle((event) => {
            event.preventDefault();
            const targetAccordionBody = element.parentElement.querySelector(selectors$F.elements.accordionBody);
            if (targetAccordionBody) {
              this.onAccordionToggle(element, targetAccordionBody);
            }
          }, 800)
        );
      });

      if (this.accordion.getAttribute(selectors$F.elements.accordionExpandValue) === 'true') {
        this.accordionToggles[0].classList.add(selectors$F.classes.open);

        showElement(this.accordionToggles[0].parentElement.querySelector(selectors$F.elements.accordionBody));
      }
    }

    closeOtherAccordions(element, slide = true) {
      let otherElements = [...this.accordionToggles];
      const holder = this.container.closest(selectors$F.elements.accordionHolder);
      if (holder) {
        otherElements = [...holder.querySelectorAll(selectors$F.elements.accordionToggle)];
      }

      otherElements.filter((otherElement) => {
        const otherElementAccordionBody = otherElement.parentElement.querySelector(selectors$F.elements.accordionBody);
        if (otherElement !== element && otherElement.classList.contains(selectors$F.classes.open) && otherElementAccordionBody) {
          this.onAccordionClose(otherElement, otherElementAccordionBody, slide);
        }
      });
    }

    onAccordionOpen(element, body, slide = true) {
      element.classList.add(selectors$F.classes.open);
      slideDown(body);

      this.closeOtherAccordions(element, slide);
    }

    onAccordionClose(element, body, slide = true) {
      element.classList.remove(selectors$F.classes.open);
      if (slide) {
        slideUp(body);
      } else {
        hideElement(body);
      }
    }

    onAccordionToggle(element, body) {
      element.classList.toggle(selectors$F.classes.open);
      slideToggle(body);

      this.closeOtherAccordions(element);
    }

    onBlockToggle(evt, blockSelect = true) {
      const targetAccordionToggle = this.container.querySelector(`${selectors$F.elements.accordionToggle}[${selectors$F.elements.accordionBlockValue}="${evt.detail.blockId}"]`);
      if (!targetAccordionToggle) return;
      const targetAccordionBody = targetAccordionToggle.parentElement.querySelector(selectors$F.elements.accordionBody);
      if (!targetAccordionBody) return;
      if (blockSelect) {
        this.onAccordionOpen(targetAccordionToggle, targetAccordionBody, false);
      } else {
        this.onAccordionClose(targetAccordionToggle, targetAccordionBody);
      }
    }

    onSelectToggle(sectionSelect = true) {
      if (this.accordionBody && this.accordionTogglesLength && this.accordionTogglesLength < 2) {
        if (sectionSelect) {
          this.onAccordionOpen(this.accordionToggles[0], this.accordionBody, false);
        } else {
          this.onAccordionClose(this.accordionToggles[0], this.accordionBody);
        }
      }
    }

    onSelect() {
      this.onSelectToggle(true);
    }

    onDeselect() {
      this.onSelectToggle(false);
    }

    onBlockSelect(evt) {
      this.onBlockToggle(evt, true);
    }

    onBlockDeselect(evt) {
      this.onBlockToggle(evt, false);
    }
  }

  const accordions = {
    onLoad() {
      sections$j[this.id] = new GlobalAccordions(this);
    },
    onSelect() {
      sections$j[this.id].onSelect();
    },
    onDeselect() {
      sections$j[this.id].onDeselect();
    },
    onBlockSelect(e) {
      sections$j[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$j[this.id].onBlockDeselect(e);
    },
  };

  window.theme.variables = {
    productPageSticky: false,
    bpSmall: false,
  };

  const selectors$G = {
    addToCart: '[data-add-to-cart]',
    priceWrapper: '[data-price-wrapper]',
    slideshow: '[data-product-slideshow]',
    productImage: '[data-product-image]',
    productJson: '[data-product-json]',
    form: '[data-product-form]',
    thumbs: '[data-product-thumbs]',
    dataSectionId: 'data-section-id',
    dataTallLayout: 'data-tall-layout',
    dataStickyEnabled: 'data-sticky-enabled',
    dataCartBar: 'data-cart-bar',
    dataProductShare: '[data-product-share]',
    dataProductShareValue: 'data-product-share',
    dataProductShareTitleValue: 'data-product-share-title',
    productPage: '.product__page',
    formWrapper: '.form__wrapper',
    cartBar: '#cart-bar',
    productSubmitAdd: '.product__submit__add',
    cartBarAdd: 'data-add-to-cart-bar',
    cartBarScroll: 'data-cart-bar-scroll',
    templateProduct: '#template-product',
    siteFooterWrapper: '.site-footer-wrapper',
    toggleTruncateHolder: '[data-truncated-holder]',
    toggleTruncateButton: '[data-truncated-button]',
    toggleTruncateContent: '[data-truncated-content]',
    toggleTruncateContentAttr: 'data-truncated-content',
    headerSticky: '[data-header-sticky="sticky"]',
    upsellButton: '[data-upsell-btn]',
    upsellButtonText: '[data-upsell-btn-text]',
    scrollToElement: '[data-scroll-to]',
    scrollToElementValue: 'data-scroll-to',
    accordionHolder: '[data-accordion-holder]',
    accordionToggle: '[data-accordion-toggle]',
    headerHeight: '[data-header-height]',
    dataModalButton: 'data-product-popup',
    modalScrollContainer: '[data-tabs-holder]',
    formWrapper: '[data-form-wrapper]',
    tooltip: '[data-tooltip]',
    tooltipStopMousenterValue: 'data-tooltip-stop-mouseenter',
  };

  const classes$p = {
    classExpanded: 'is-expanded',
    classSticky: 'is-sticky',
    classStickyHeader: 'with-sticky-header',
    classVisible: 'is-visible',
    classLoading: 'is-loading',
    classSiteFooterPush: 'site-footer--push',
    open: 'is-open',
    hasPopup: 'has-popup',
  };

  const sections$k = {};

  /**
   * Product section constructor.
   * @param {string} container - selector for the section container DOM element
   */
  class Product {
    constructor(section) {
      this.section = section;
      this.container = section.container;
      this.id = this.container.getAttribute(selectors$G.dataSectionId);
      this.tallLayout = this.container.getAttribute(selectors$G.dataTallLayout) === 'true';
      this.stickyEnabled = this.container.getAttribute(selectors$G.dataStickyEnabled) === 'true';
      this.headerSticky = document.querySelector(selectors$G.headerSticky) !== null;
      this.thumbs = this.container.querySelector(selectors$G.thumbs);
      this.shareButton = this.container.querySelector(selectors$G.dataProductShare);
      this.upsellButton = this.container.querySelector(selectors$G.upsellButton);
      this.scrollToButton = this.container.querySelector(selectors$G.scrollToElement);
      this.truncateElementHolder = this.container.querySelector(selectors$G.toggleTruncateHolder);
      this.truncateElement = this.container.querySelector(selectors$G.toggleTruncateContent);
      this.modalButton = this.container.querySelectorAll(`[${selectors$G.dataModalButton}]`);
      this.formWrapper = this.container.querySelector(selectors$G.formWrapper);
      this.resizeEventTruncate = () => this.truncateText();
      this.resizeEventSticky = () => this.stickyScrollCheck();
      this.resizeEventUpsell = () => this.calcUpsellButtonDemensions();
      this.scrollEvent = () => this.scrollTop();
      this.unlockTimer = 0;
      this.accessibility = a11y;

      // Record recently viewed products when the product page is loading
      Shopify.Products.recordRecentlyViewed();

      if (this.scrollToButton) {
        this.scrollToReviews();
      }

      this.shareToggle();

      if (this.truncateElementHolder && this.truncateElement) {
        setTimeout(this.resizeEventTruncate, 50);
        document.addEventListener('theme:resize', this.resizeEventTruncate);
      }

      // Stop parsing if we don't have the product json script tag when loading
      // section in the Theme Editor
      const productJson = this.container.querySelector(selectors$G.productJson);
      if ((productJson && !productJson.innerHTML) || !productJson) {
        const counter = new QuantityCounter(this.container);
        counter.init();
        return;
      }

      this.form = this.container.querySelector(selectors$G.form);

      this.init();

      if (this.stickyEnabled) {
        this.stickyScroll();
      }

      if (this.container.getAttribute(selectors$G.dataCartBar) === 'true') {
        this.initCartBar();
      }

      if (this.upsellButton) {
        this.upsellButtonDemensions();
      }

      if (this.modalButton.length > 0) {
        this.productPopup();
      }
    }

    init() {
      theme.mediaInstances[this.id] = new Media(this.section);
      theme.mediaInstances[this.id].init();
    }

    productPopup() {
      this.modalButton.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const modal = document.querySelector(`#${button.getAttribute(selectors$G.dataModalButton)}`);
          const modalKids = document.querySelector(`#kids_size_popup`);
          const modalScrollContainer = modal.querySelector(selectors$G.modalScrollContainer);

          console.log(e.target);

          const isCloseKids = e.target.parentNode.hasAttribute('kids-size-popup-close') || e.target.parentNode.parentNode.hasAttribute('kids-size-popup-close');

          if (e.target.hasAttribute('data-kids-popup') && window.getComputedStyle(modalKids).display == 'none') {
            fadeIn(modalKids);
            this.formWrapper.classList.add(classes$p.hasPopup);
            document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: modalScrollContainer}));
            this.accessibility.trapFocus(modalKids);
          }  else if (window.getComputedStyle(modalKids).display !== 'none' && isCloseKids) {
            fadeOut(modalKids);
            this.formWrapper.classList.remove(classes$p.hasPopup);
            this.accessibility.removeTrapFocus();

            if (this.unlockTimer) {
              clearTimeout(this.unlockTimer);
            }
            // delay scroll unlock to prevent content shifting
            this.unlockTimer = setTimeout(() => {
              document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
            }, 300);
          }

          if (window.getComputedStyle(modal).display !== 'none' && !isCloseKids) {
            fadeOut(modal);
            this.formWrapper.classList.remove(classes$p.hasPopup);
            this.accessibility.removeTrapFocus();

            if (this.unlockTimer) {
              clearTimeout(this.unlockTimer);
            }
            // delay scroll unlock to prevent content shifting
            this.unlockTimer = setTimeout(() => {
              document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
            }, 300);
          } 
          if (window.getComputedStyle(modal).display === 'none' && !e.target.hasAttribute('data-kids-popup') && !isCloseKids) {
            fadeIn(modal);
            this.formWrapper.classList.add(classes$p.hasPopup);
            document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: modalScrollContainer}));
            this.accessibility.trapFocus(modal);
          }
        });
      });
    }

    upsellButtonDemensions() {
      this.calcUpsellButtonDemensions();

      document.addEventListener('theme:resize', this.resizeEventUpsell);
    }

    calcUpsellButtonDemensions() {
      const upsellButtonText = this.upsellButton.querySelector(selectors$G.upsellButtonText);
      if (upsellButtonText) {
        this.upsellButton.style.setProperty('--btn-text-width', `${upsellButtonText.clientWidth}px`);
      }
    }

    stickyScroll() {
      this.stickyScrollCheck();

      document.addEventListener('theme:resize', this.resizeEventSticky);
    }

    stickyScrollCheck() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isDesktop = windowWidth >= window.theme.sizes.small;
      const form = this.container.querySelector(selectors$G.formWrapper);
      const targetFormWrapper = this.container.querySelector(`${selectors$G.productPage} ${selectors$G.formWrapper}`);

      if (isDesktop) {
        const slideshow = this.container.querySelector(selectors$G.slideshow);
        if (!form || !slideshow) return;
        const productCopyHeight = form.offsetHeight;
        const productImagesHeight = slideshow.offsetHeight;

        // Is the product description and form taller than window space
        // Is is also shorter than the window and images
        if (productCopyHeight < productImagesHeight || productCopyHeight < window.innerHeight) {
          theme.variables.productPageSticky = true;

          targetFormWrapper.classList.add(classes$p.classSticky);
          if (this.headerSticky) {
            targetFormWrapper.classList.add(classes$p.classStickyHeader);
          }
        } else {
          theme.variables.productPageSticky = false;
          targetFormWrapper.classList.remove(classes$p.classSticky);
        }
      } else {
        targetFormWrapper.classList.remove(classes$p.classSticky);
      }
    }

    truncateText() {
      if (this.truncateElementHolder.classList.contains(classes$p.classVisible)) return;
      const truncateRows = 5;
      const truncateElementCloned = this.truncateElement.cloneNode(true);
      const truncateElementClass = this.truncateElement.getAttribute(selectors$G.toggleTruncateContentAttr);
      const truncateNextElement = this.truncateElement.nextElementSibling;
      if (truncateNextElement) {
        truncateNextElement.remove();
      }

      this.truncateElement.parentElement.append(truncateElementCloned);

      const truncateAppendedElement = this.truncateElement.nextElementSibling;
      truncateAppendedElement.classList.add(truncateElementClass);
      truncateAppendedElement.removeAttribute(selectors$G.toggleTruncateContentAttr);

      showElement(truncateAppendedElement);

      ellipsed.ellipsis(truncateAppendedElement, truncateRows, {
        replaceStr: '',
      });

      hideElement(truncateAppendedElement);

      if (this.truncateElement.innerHTML !== truncateAppendedElement.innerHTML) {
        this.truncateElementHolder.classList.add(classes$p.classExpanded);
      } else {
        truncateAppendedElement.remove();
        this.truncateElementHolder.classList.remove(classes$p.classExpanded);
      }

      this.toggleTruncatedContent(this.truncateElementHolder);
    }

    toggleTruncatedContent(holder) {
      const toggleButton = holder.querySelector(selectors$G.toggleTruncateButton);
      if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
          e.preventDefault();
          holder.classList.remove(classes$p.classExpanded);
          holder.classList.add(classes$p.classVisible);
        });
      }
    }

    shareToggle() {
      if (this.shareButton) {
        this.shareButton.addEventListener('click', function () {
          const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

          if (navigator.share && windowWidth <= 1024) {
            const shareTitle = this.hasAttribute(selectors$G.dataProductShareTitleValue) ? this.getAttribute(selectors$G.dataProductShareTitleValue) : window.location.hostname;
            const shareUrl = this.hasAttribute(selectors$G.dataProductShareValue) ? this.getAttribute(selectors$G.dataProductShareValue) : window.location.href;

            navigator
              .share({
                title: shareTitle,
                url: shareUrl,
              })
              .then(() => {
                console.log('Thanks for sharing!');
              })
              .catch(console.error);
          } else {
            this.parentElement.classList.toggle(classes$p.classExpanded);
          }
        });
      }
    }

    initCartBar() {
      const cartBar = document.querySelector(selectors$G.cartBar);
      const cartBarBtn = cartBar.querySelector(selectors$G.productSubmitAdd);

      // Submit product form on cart bar button click
      if (cartBarBtn) {
        cartBarBtn.addEventListener('click', (e) => {
          e.preventDefault();

          if (e.target.hasAttribute(selectors$G.cartBarAdd)) {
            if (theme.cartDrawerEnabled) {
              e.target.classList.add(classes$p.classLoading);
              e.target.setAttribute('disabled', 'disabled');
            }

            this.form.querySelector(selectors$G.addToCart).dispatchEvent(
              new Event('click', {
                bubbles: true,
              })
            );
          } else if (e.target.hasAttribute(selectors$G.cartBarScroll)) {
            this.scrollToTop();
          }
        });

        if (cartBarBtn.hasAttribute(selectors$G.cartBarAdd)) {
          document.addEventListener('product:bar:error', () => this.scrollToTop());
        }

        if (theme.cartDrawerEnabled) {
          document.addEventListener('product:bar:button', () => {
            if (cartBarBtn && cartBarBtn.classList.contains(classes$p.classLoading)) {
              cartBarBtn.classList.remove(classes$p.classLoading);
              cartBarBtn.removeAttribute('disabled');
            }
          });
        }
      }

      this.cartBar = cartBar;

      document.addEventListener('theme:scroll', this.scrollEvent);
    }

    scrollToTop() {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const isDesktop = windowWidth >= window.theme.sizes.small;
      const scrollTarget = isDesktop ? this.container : this.form;

      window.scrollTo({
        top: scrollTarget.getBoundingClientRect().top + window.scrollY,
        left: 0,
        behavior: 'smooth',
      });
    }

    scrollTop() {
      const scrolled = window.pageYOffset;
      const siteFooter = document.querySelector(selectors$G.siteFooterWrapper);

      if (this.form && this.cartBar) {
        const formOffset = this.form.offsetTop;
        const formHeight = this.form.offsetHeight;
        const checkPosition = scrolled > formOffset + formHeight;

        this.cartBar.classList.toggle(classes$p.classVisible, checkPosition);
        siteFooter.classList.toggle(classes$p.classSiteFooterPush, checkPosition);
        siteFooter.style.marginBottom = siteFooter.classList.contains(classes$p.classSiteFooterPush) ? `${this.cartBar.offsetHeight}px` : '0';
      }
    }

    scrollToReviews() {
      this.scrollToButton.addEventListener('click', (e) => {
        e.preventDefault();
        const reviews = document.querySelector(this.scrollToButton.getAttribute(selectors$G.scrollToElementValue));

        if (!reviews) return;

        let timeoutFlag = false;

        // Open Reviews accordion if they are inside it
        if (reviews.querySelector(selectors$G.accordionToggle)) {
          const accordionToggle = reviews.querySelector(selectors$G.accordionToggle);
          const accordionHolder = accordionToggle.closest(selectors$G.accordionHolder);

          if (!accordionToggle.classList.contains(classes$p.open) && accordionHolder && accordionHolder.querySelector(`${selectors$G.accordionToggle}.${classes$p.open}`)) {
            timeoutFlag = true;
          }

          if (!accordionToggle.classList.contains(classes$p.open)) {
            accordionToggle.dispatchEvent(new Event('click'));
          }
        }

        if (timeoutFlag) {
          setTimeout(() => this.scrollToElement(reviews), 500);
        } else {
          this.scrollToElement(reviews);
        }
      });
    }

    scrollToElement(element) {
      const headerHeight = this.headerSticky ? document.querySelector(selectors$G.headerHeight).getBoundingClientRect().height : 0;

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerHeight,
        left: 0,
        behavior: 'smooth',
      });

      const tooltips = document.querySelectorAll(`${selectors$G.tooltip}:not([${selectors$G.tooltipStopMousenterValue}])`);
      if (tooltips.length) {
        tooltips.forEach((tooltip) => {
          tooltip.setAttribute(selectors$G.tooltipStopMousenterValue, '');

          setTimeout(() => {
            tooltip.removeAttribute(selectors$G.tooltipStopMousenterValue);
          }, 1000);
        });
      }
    }

    onUnload() {
      if (this.truncateElementHolder && this.truncateElement) {
        document.removeEventListener('theme:resize', this.resizeEventTruncate);
      }

      if (this.stickyEnabled) {
        document.removeEventListener('theme:resize', this.resizeEventSticky);
      }

      if (this.upsellButton) {
        document.removeEventListener('theme:resize', this.resizeEventUpsell);
      }

      if (this.container.getAttribute(selectors$G.dataCartBar) === 'true') {
        document.removeEventListener('theme:scroll', this.scrollEvent);
      }
    }
  }

  const productSection = {
    onLoad() {
      sections$k[this.id] = new Product(this);
    },
    onUnload(e) {
      sections$k[this.id].onUnload(e);
    },
  };

  register('product', [productSection, pickupAvailability, productFormSection, swatchSection, tooltipSection, popoutSection, tabs, accordions, copyClipboard]);

  const selectors$H = {
    dataRelatedSectionElem: '[data-related-section]',
    dataRelatedProduct: '[data-product-grid-item]',
    dataProductId: 'data-product-id',
    dataLimit: 'data-limit',
    dataMinimum: 'data-minimum',
    recentlyViewed: '[data-recent-wrapper]',
    recentlyViewedWrapper: '[data-recently-viewed-wrapper]',
    recentlyProduct: '#recently-viewed-products',
    dataProductItem: '.product-item',
    slider: '[data-slider]',
  };

  const classes$q = {
    classHidden: 'hidden',
    classIsHidden: 'is-hidden',
  };

  class Related {
    constructor(section) {
      this.section = section;
      this.sectionId = section.id;
      this.container = section.container;

      this.init();
      this.recent();
    }

    init() {
      const relatedSection = this.container.querySelector(selectors$H.dataRelatedSectionElem);

      if (!relatedSection) {
        return;
      }

      const self = this;
      const productId = relatedSection.getAttribute(selectors$H.dataProductId);
      const limit = relatedSection.getAttribute(selectors$H.dataLimit);
      const requestUrl = `${window.theme.routes.product_recommendations_url}?section_id=related&limit=${limit}&product_id=${productId}`;

      fetch(requestUrl)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          const createdElement = document.createElement('div');
          createdElement.innerHTML = data;
          const inner = createdElement.querySelector(selectors$H.dataRelatedSectionElem);

          if (inner.querySelector(selectors$H.dataRelatedProduct)) {
            const innerHtml = inner.innerHTML;
            hideElement(relatedSection);
            relatedSection.innerHTML = innerHtml;
            slideDown(relatedSection);

            const relatedProducts = relatedSection.querySelectorAll(selectors$H.dataRelatedProduct);

            relatedProducts.forEach((item) => {
              new QuickAddProduct(item);
            });

            makeGridSwatches(self.section);

            if (relatedProducts.length > 4 && relatedSection.querySelector(selectors$H.slider)) {
              new Slider(relatedSection);
            }
          } else {
            relatedSection.dispatchEvent(
              new CustomEvent('tabs:hideRelatedTab', {
                bubbles: true,
              })
            );
          }
        })
        .catch(function () {
          relatedSection.dispatchEvent(
            new CustomEvent('tabs:hideRelatedTab', {
              bubbles: true,
            })
          );
        });
    }

    recent() {
      const recentlyViewed = this.container.querySelector(selectors$H.recentlyViewed);
      const howManyToshow = recentlyViewed ? parseInt(recentlyViewed.getAttribute(selectors$H.dataLimit)) : 4;

      Shopify.Products.showRecentlyViewed({
        howManyToShow: howManyToshow,
        wrapperId: `recently-viewed-products-${this.sectionId}`,
        section: this.section,
        onComplete: (wrapper, section) => {
          const container = section.container;
          const recentlyViewedHolder = container.querySelector(selectors$H.recentlyViewed);
          const recentlyViewedWrapper = container.querySelector(selectors$H.recentlyViewedWrapper);
          const recentProducts = wrapper.querySelectorAll(selectors$H.dataProductItem);
          const minimumNumberProducts = recentlyViewedHolder.hasAttribute(selectors$H.dataMinimum) ? parseInt(recentlyViewedHolder.getAttribute(selectors$H.dataMinimum)) : 4;
          const checkRecentInRelated = !recentlyViewedWrapper && recentProducts.length > 0;
          const checkRecentOutsideRelated = recentlyViewedWrapper && recentProducts.length >= minimumNumberProducts;

          if (checkRecentInRelated || checkRecentOutsideRelated) {
            if (checkRecentOutsideRelated) {
              recentlyViewedWrapper.classList.remove(classes$q.classIsHidden);
            }

            fadeIn(recentlyViewedHolder);

            recentlyViewedHolder.dispatchEvent(
              new CustomEvent('tabs:checkRecentTab', {
                bubbles: true,
              })
            );

            recentProducts.forEach((item) => {
              new QuickAddProduct(item);
            });

            makeGridSwatches(section);

            if (recentProducts.length > 4 && recentlyViewedHolder.querySelector(selectors$H.slider)) {
              new Slider(recentlyViewedHolder);
            }
          }
        },
      });
    }
  }

  const relatedSection = {
    onLoad() {
      this.section = new Related(this);

      this.container.querySelectorAll(selectors$H.dataRelatedProduct).forEach((item) => {
        new QuickAddProduct(item);
      });
    },
  };

  register('related', [relatedSection, popoutSection, tabs]);

  register('reviews', accordions);

  const selectors$I = {
    scrollElement: '[data-block-scroll]',
    flickityEnabled: 'flickity-enabled',
  };

  const sections$l = {};

  class BlockScroll {
    constructor(el) {
      this.container = el.container;
    }

    onBlockSelect(evt) {
      const scrollElement = this.container.querySelector(selectors$I.scrollElement);
      if (scrollElement && !scrollElement.classList.contains(selectors$I.flickityEnabled)) {
        const currentElement = evt.srcElement;
        if (currentElement) {
          scrollElement.scrollTo({
            top: 0,
            left: currentElement.offsetLeft,
            behavior: 'smooth',
          });
        }
      }
    }
  }

  const blockScroll = {
    onLoad() {
      sections$l[this.id] = new BlockScroll(this);
    },
    onBlockSelect(e) {
      sections$l[this.id].onBlockSelect(e);
    },
  };

  const sections$m = {};

  const selectors$J = {
    logo: '[data-slider-logo]',
    text: '[data-slider-text]',
    slide: '[data-slide]',
    slideData: 'data-slide',
    asNavFor: '#nav-for-',
    slideIndex: 'data-slide-index',
    flickityEnabled: 'flickity-enabled',
  };

  const classes$r = {
    classIsSelected: 'is-selected',
  };

  class LogoList {
    constructor(section) {
      this.container = section.container;
      this.slideshowNav = this.container.querySelector(selectors$J.logo);
      if (!this.slideshowNav) return;
      this.slideshowText = this.container.querySelector(selectors$J.text);
      this.logoSlides = this.slideshowNav.querySelectorAll(selectors$J.slide);
      this.resizeEvent = debounce(() => this.setSlideshowNavState(), 200);
      this.flkty = null;
      this.flktyNav = null;

      this.init();
    }

    init() {
      if (this.slideshowText) {
        this.flkty = new FlickityFade(this.slideshowText, {
          fade: true,
          autoPlay: false,
          prevNextButtons: false,
          cellAlign: 'left', // Prevents blurry text on Safari
          contain: true,
          pageDots: false,
          wrapAround: false,
          selectedAttraction: 0.2,
          friction: 0.6,
          draggable: false,
        });

        const textSlides = this.slideshowText.querySelectorAll(selectors$J.slide);
        if (textSlides.length) {
          let maxHeight = -1;
          textSlides.forEach((element) => {
            const elementHeight = parseFloat(getComputedStyle(element, null).height.replace('px', ''));

            if (elementHeight > maxHeight) {
              maxHeight = elementHeight;
            }
          });

          textSlides.forEach((element) => {
            const elementHeight = parseFloat(getComputedStyle(element, null).height.replace('px', ''));

            if (elementHeight < maxHeight) {
              const calculateMargin = Math.ceil((maxHeight - elementHeight) / 2);
              element.style.margin = `${calculateMargin}px 0`;
            }
          });
        }
      }

      this.logoSlides.forEach((element) => {
        element.addEventListener('click', (e) => {
          const index = parseInt(e.currentTarget.getAttribute(selectors$J.slideIndex));
          const hasSlider = this.slideshowNav.classList.contains(selectors$J.flickityEnabled);

          if (this.flkty) {
            this.flkty.select(index);
          }

          if (hasSlider) {
            this.flktyNav.select(index);
            if (!this.slideshowNav.classList.contains(classes$r.classIsSelected)) {
              this.flktyNav.playPlayer();
            }
          } else {
            const selectedSlide = this.slideshowNav.querySelector(`.${classes$r.classIsSelected}`);
            if (selectedSlide) {
              selectedSlide.classList.remove(classes$r.classIsSelected);
            }
            e.currentTarget.classList.add(classes$r.classIsSelected);
          }
        });
      });

      this.initSlideshowNav();
    }

    onUnload() {
      if (!this.slideshowNav) return;
      const sliderInitialized = this.slideshowNav.classList.contains(selectors$J.flickityEnabled);
      if (sliderInitialized) {
        this.flktyNav.destroy();
      }

      if (this.flkty) {
        this.flkty.destroy();
      }

      window.removeEventListener('resize', this.resizeEvent);
    }

    onBlockSelect(evt) {
      if (!this.slideshowNav) return;
      const slide = this.slideshowNav.querySelector(`[${selectors$J.slideData}="${evt.detail.blockId}"]`);
      const slideIndex = parseInt(slide.getAttribute(selectors$J.slideIndex));

      if (this.slideshowNav.classList.contains(selectors$J.flickityEnabled)) {
        this.flktyNav.select(slideIndex);
        this.flktyNav.stopPlayer();
        this.slideshowNav.classList.add(classes$r.classIsSelected);
      } else {
        slide.dispatchEvent(new Event('click'));
      }
    }

    onBlockDeselect() {
      if (this.slideshowNav && this.slideshowNav.classList.contains(selectors$J.flickityEnabled)) {
        this.flktyNav.playPlayer();
        this.slideshowNav.classList.remove(classes$r.classIsSelected);
      }
    }

    setSlideshowNavState() {
      const slidesCount = this.slideshowNav.querySelectorAll(selectors$J.slide).length;
      const slideWidth = 200;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const slidesWidth = slidesCount * slideWidth;
      const sliderInitialized = this.slideshowNav.classList.contains(selectors$J.flickityEnabled);

      if (slidesWidth > windowWidth) {
        if (!sliderInitialized) {
          const selectedSlide = this.slideshowNav.querySelector(`.${classes$r.classIsSelected}`);
          if (selectedSlide) {
            selectedSlide.classList.remove(classes$r.classIsSelected);
          }
          this.logoSlides[0].classList.add(classes$r.classIsSelected);

          this.flktyNav = new Flickity(this.slideshowNav, {
            autoPlay: 4000,
            prevNextButtons: false,
            contain: true,
            pageDots: false,
            wrapAround: true,
            watchCSS: true,
            selectedAttraction: 0.05,
            friction: 0.8,
            initialIndex: 0,
          });

          if (this.flkty) {
            this.flkty.select(0);

            this.flktyNav.on('change', (index) => this.flkty.select(index));
          }
        }
      } else if (sliderInitialized) {
        this.flktyNav.destroy();
        this.logoSlides[0].classList.add(classes$r.classIsSelected);

        if (this.flkty) {
          this.flkty.select(0);
        }
      }
    }

    initSlideshowNav() {
      this.setSlideshowNavState();

      window.addEventListener('resize', this.resizeEvent);
    }
  }

  const LogoListSection = {
    onLoad() {
      sections$m[this.id] = new LogoList(this);
    },
    onUnload(e) {
      sections$m[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$m[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$m[this.id].onBlockDeselect(e);
    },
  };

  register('logos', [LogoListSection, blockScroll]);

  const selectors$K = {
    videoPlay: '[data-video-play]',
    videoPlayValue: 'data-video-play',
  };

  class VideoPlay {
    constructor(section, selector = selectors$K.videoPlay, selectorValue = selectors$K.videoPlayValue) {
      this.container = section;
      this.videoPlay = this.container.querySelectorAll(selector);

      if (this.videoPlay.length) {
        this.videoPlay.forEach((element) => {
          element.addEventListener('click', (e) => {
            const button = e.currentTarget;
            if (button.hasAttribute(selectorValue) && button.getAttribute(selectorValue).trim() !== '') {
              e.preventDefault();

              const items = [
                {
                  html: button.getAttribute(selectorValue),
                },
              ];

              new LoadPhotoswipe(items);
            }
          });
        });
      }
    }
  }

  const videoPlay = {
    onLoad() {
      new VideoPlay(this.container);
    },
  };

  /**
   * FeaturedVideo Template Script
   * ------------------------------------------------------------------------------
   * A file that contains scripts highly couple code to the FeaturedVideo template.
   *
   * @namespace FeaturedVideo
   */

  register('featured-video', [videoPlay, parallaxHero]);

  register('slideshow', [slider, parallaxHero]);

  register('custom-content', [slider, videoPlay, parallaxHero, quickAddProduct, swatchGridSection]);

  var styles = {};
  styles.basic = [];

  styles.light = [
    {featureType: 'administrative', elementType: 'labels', stylers: [{visibility: 'simplified'}, {lightness: '64'}, {hue: '#ff0000'}]},
    {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#bdbdbd'}]},
    {featureType: 'administrative', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'landscape', elementType: 'all', stylers: [{color: '#f0f0f0'}, {visibility: 'simplified'}]},
    {featureType: 'landscape.natural.landcover', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'landscape.natural.terrain', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'geometry.fill', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'labels', stylers: [{lightness: '100'}]},
    {featureType: 'poi.park', elementType: 'all', stylers: [{visibility: 'on'}]},
    {featureType: 'poi.park', elementType: 'geometry', stylers: [{saturation: '-41'}, {color: '#e8ede7'}]},
    {featureType: 'poi.park', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road', elementType: 'all', stylers: [{saturation: '-100'}]},
    {featureType: 'road', elementType: 'labels', stylers: [{lightness: '25'}, {gamma: '1.06'}, {saturation: '-100'}]},
    {featureType: 'road.highway', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{gamma: '10.00'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}, {visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{weight: '0.01'}]},
    {featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'geometry.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'road.local', elementType: 'geometry.fill', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{gamma: '10.00'}, {lightness: '100'}, {weight: '0.4'}]},
    {featureType: 'road.local', elementType: 'labels', stylers: [{visibility: 'simplified'}, {weight: '0.01'}, {lightness: '39'}]},
    {featureType: 'road.local', elementType: 'labels.text.stroke', stylers: [{weight: '0.50'}, {gamma: '10.00'}, {lightness: '100'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'water', elementType: 'all', stylers: [{color: '#cfe5ee'}, {visibility: 'on'}]},
  ];

  styles.white_label = [
    {featureType: 'all', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'all', elementType: 'labels', stylers: [{visibility: 'simplified'}]},
    {featureType: 'administrative', elementType: 'labels', stylers: [{gamma: '3.86'}, {lightness: '100'}]},
    {featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{color: '#cccccc'}]},
    {featureType: 'landscape', elementType: 'all', stylers: [{color: '#f2f2f2'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'road', elementType: 'all', stylers: [{saturation: -100}, {lightness: 45}]},
    {featureType: 'road.highway', elementType: 'all', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0'}]},
    {featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'labels.text', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'water', elementType: 'all', stylers: [{color: '#e4e4e4'}, {visibility: 'on'}]},
  ];

  styles.dark_label = [
    {featureType: 'all', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'all', elementType: 'labels.text.fill', stylers: [{saturation: 36}, {color: '#000000'}, {lightness: 40}]},
    {featureType: 'all', elementType: 'labels.text.stroke', stylers: [{visibility: 'on'}, {color: '#000000'}, {lightness: 16}]},
    {featureType: 'all', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
    {featureType: 'administrative', elementType: 'geometry.fill', stylers: [{color: '#000000'}, {lightness: 20}]},
    {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{color: '#000000'}, {lightness: 17}, {weight: 1.2}]},
    {featureType: 'administrative', elementType: 'labels', stylers: [{visibility: 'simplified'}, {lightness: '-82'}]},
    {featureType: 'administrative', elementType: 'labels.text.stroke', stylers: [{invert_lightness: true}, {weight: '7.15'}]},
    {featureType: 'landscape', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 20}]},
    {featureType: 'landscape', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 21}]},
    {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'simplified'}]},
    {featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{color: '#000000'}, {lightness: 17}, {weight: '0.8'}]},
    {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#000000'}, {lightness: 29}, {weight: '0.01'}]},
    {featureType: 'road.highway', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'road.arterial', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 18}]},
    {featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 16}]},
    {featureType: 'road.local', elementType: 'geometry.stroke', stylers: [{weight: '0.01'}]},
    {featureType: 'road.local', elementType: 'labels', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 19}]},
    {featureType: 'water', elementType: 'geometry', stylers: [{color: '#000000'}, {lightness: 17}]},
  ];

  function mapStyle(key) {
    return styles[key];
  }

  window.theme.allMaps = window.theme.allMaps || {};
  let allMaps = window.theme.allMaps;

  window.theme.mapAPI = window.theme.mapAPI || null;

  /* global google */

  class Map {
    constructor(section) {
      this.container = section.container;
      this.mapContainer = this.container.querySelector('[data-map-container]');
      this.key = this.container.getAttribute('data-api-key');
      this.styleString = this.container.getAttribute('data-style') || '';
      this.zoomString = this.container.getAttribute('data-zoom') || 14;
      this.address = this.container.getAttribute('data-address');
      this.enableCorrection = this.container.getAttribute('data-latlong-correction');
      this.lat = this.container.getAttribute('data-lat');
      this.long = this.container.getAttribute('data-long');

      if (this.key) {
        this.initMaps();
      }
    }

    initMaps() {
      const apiLoaded = loadAPI(this.key);
      apiLoaded
        .then(() => {
          return this.enableCorrection === 'true' && this.lat !== '' && this.long !== '' ? new google.maps.LatLng(this.lat, this.long) : geocodeAddressPromise(this.address);
        })
        .then((center) => {
          const zoom = parseInt(this.zoomString, 10);
          const styles = mapStyle(this.styleString);
          const mapOptions = {
            zoom,
            styles,
            center,
            draggable: true,
            clickableIcons: false,
            scrollwheel: false,
            zoomControl: false,
            disableDefaultUI: true,
          };
          const map = createMap(this.mapContainer, mapOptions);

          return map;
        })
        .then((map) => {
          this.map = map;
          allMaps[this.id] = map;
        })
        .catch((e) => {
          console.log('Failed to load Google Map');
          console.log(e);
        });
    }

    unload() {
      if (typeof window.google !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  }

  const mapSection = {
    onLoad() {
      allMaps[this.id] = new Map(this);
    },
    onUnload() {
      if (typeof allMaps[this.id].unload === 'function') {
        allMaps[this.id].unload();
      }
    },
  };

  register('map', mapSection);

  function loadAPI(key) {
    if (window.theme.mapAPI === null) {
      const urlKey = `https://maps.googleapis.com/maps/api/js?key=${key}`;
      window.theme.mapAPI = loadScript({url: urlKey});
    }
    return window.theme.mapAPI;
  }

  function createMap(container, options) {
    var map = new google.maps.Map(container, options);
    var center = map.getCenter();

    // eslint-disable-next-line no-unused-vars
    var marker = new google.maps.Marker({
      map: map,
      position: center,
    });

    google.maps.event.addDomListener(window, 'resize', function () {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });
    return map;
  }

  function geocodeAddressPromise(address) {
    return new Promise((resolve, reject) => {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, function (results, status) {
        if (status == 'OK') {
          var latLong = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          resolve(latLong);
        } else {
          reject(status);
        }
      });
    });
  }

  register('search', [quickAddProduct, swatchGridSection]);

  const selectors$L = {
    largePromoInner: '[data-large-promo-inner]',
    trackingInner: '[data-tracking-consent-inner]',
    tracking: '[data-tracking-consent]',
    trackingAccept: '[data-confirm-cookies]',
    close: '[data-close-modal]',
    modalUnderlay: '[data-modal-underlay]',
    modalBody: '[data-modal-body]',
    newsletterPopup: '[data-newsletter]',
    newsletterPopupHolder: '[data-newsletter-holder]',
    newsletterClose: '[data-newsletter-close]',
    newsletterHeading: '[data-newsletter-heading]',
    newsletterField: '[data-newsletter-field]',
    promoPopup: '[data-promo-text]',
    newsletterForm: '[data-newsletter-form]',
    delayAttribite: 'data-popup-delay',
    cookieNameAttribute: 'data-cookie-name',
    dataTargetReferrer: 'data-target-referrer',
  };

  const classes$s = {
    hide: 'hide',
    hasValue: 'has-value',
    success: 'has-success',
    selected: 'selected',
    hasBlockSelected: 'has-block-selected',
  };

  let sections$n = {};

  class PopupCookie {
    constructor(name, value) {
      this.configuration = {
        expires: null, // session cookie
        path: '/',
        domain: window.location.hostname,
      };
      this.name = name;
      this.value = value;
    }

    write() {
      const hasCookie = document.cookie.indexOf('; ') !== -1 && !document.cookie.split('; ').find((row) => row.startsWith(this.name));
      if (hasCookie || document.cookie.indexOf('; ') === -1) {
        document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      }
    }

    read() {
      if (document.cookie.indexOf('; ') !== -1 && document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        const returnCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith(this.name))
          .split('=')[1];

        return returnCookie;
      } else return false;
    }

    destroy() {
      if (document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}`;
      }
    }
  }

  class DelayShow {
    constructor(holder, element, callback = null) {
      this.element = element;
      this.delay = holder.getAttribute(selectors$L.delayAttribite);
      this.isSubmitted = window.location.href.indexOf('accepts_marketing') !== -1 || window.location.href.indexOf('customer_posted=true') !== -1;
      this.callback = callback;

      if (this.delay === 'always' || this.isSubmitted) {
        this.always();
      }

      if (this.delay && this.delay.includes('delayed') && !this.isSubmitted) {
        const seconds = this.delay.includes('_') ? parseInt(this.delay.split('_')[1]) : 10;
        this.delayed(seconds);
      }

      if (this.delay === 'bottom' && !this.isSubmitted) {
        this.bottom();
      }

      if (this.delay === 'idle' && !this.isSubmitted) {
        this.idle();
      }
    }

    always() {
      fadeIn(this.element, null, this.callback);
    }

    delayed(seconds = 10) {
      // Show popup after specific seconds
      setTimeout(() => {
        fadeIn(this.element, null, this.callback);
      }, seconds * 1000);
    }

    // Scroll to the bottom of the page
    bottom() {
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
          fadeIn(this.element, null, this.callback);
        }
      });
    }

    // Idle for 1 min
    idle() {
      let timer = 0;
      let idleTime = 60000;
      const documentEvents = ['mousemove', 'mousedown', 'click', 'touchmove', 'touchstart', 'touchend', 'keydown', 'keypress'];
      const windowEvents = ['load', 'resize', 'scroll'];

      const startTimer = () => {
        timer = setTimeout(() => {
          timer = 0;
          fadeIn(this.element, null, this.callback);
        }, idleTime);

        documentEvents.forEach((eventType) => {
          document.addEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.addEventListener(eventType, resetTimer);
        });
      };

      const resetTimer = () => {
        if (timer) {
          clearTimeout(timer);
        }

        documentEvents.forEach((eventType) => {
          document.removeEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });

        startTimer();
      };

      startTimer();
    }
  }

  class TargetReferrer {
    constructor(el) {
      this.el = el;
      this.locationPath = location.href;

      if (!this.el.hasAttribute(selectors$L.dataTargetReferrer)) {
        return false;
      }

      this.init();
    }

    init() {
      if (this.locationPath.indexOf(this.el.getAttribute(selectors$L.dataTargetReferrer)) === -1 && !window.Shopify.designMode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  }

  class LargePopup {
    constructor(el) {
      this.popup = el;
      this.modal = this.popup.querySelector(selectors$L.largePromoInner);
      this.modalBody = this.popup.querySelector(selectors$L.modalBody);
      this.close = this.popup.querySelector(selectors$L.close);
      this.underlay = this.popup.querySelector(selectors$L.modalUnderlay);
      this.form = this.popup.querySelector(selectors$L.newsletterForm);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$L.cookieNameAttribute), 'user_has_closed');
      this.isTargeted = new TargetReferrer(this.popup);
      this.a11y = a11y;

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popup, this.modal, this.scrollLock.bind(this));
        }

        if (this.form && this.form.classList.contains(classes$s.success)) {
          this.checkForSuccess();
        }

        this.initClosers();
      }
    }

    checkForSuccess() {
      fadeIn(this.modal, null, this.scrollLock.bind(this));
      this.cookie.write();
    }

    initClosers() {
      this.close.addEventListener('click', this.closeModal.bind(this));
      this.underlay.addEventListener('click', this.closeModal.bind(this));
    }

    closeModal(e) {
      e.preventDefault();
      fadeOut(this.modal);
      this.cookie.write();
      this.scrollUnlock();
    }

    scrollLock() {
      this.a11y.trapFocus(this.modal);
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.modalBody}));
    }

    scrollUnlock() {
      this.a11y.removeTrapFocus();
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.modal, null, this.scrollLock.bind(this));
        this.popup.classList.add(classes$s.selected);
        this.popup.parentNode.classList.add(classes$s.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.modal);
        this.scrollUnlock();
        this.popup.classList.remove(classes$s.selected);
        this.popup.parentNode.classList.remove(classes$s.hasBlockSelected);
      }
    }
  }

  class Tracking {
    constructor(el) {
      this.popup = el;
      this.modal = document.querySelector(selectors$L.tracking);
      this.close = this.modal.querySelector(selectors$L.close);
      this.acceptButton = this.modal.querySelector(selectors$L.trackingAccept);
      this.enable = this.modal.getAttribute('data-enable') === 'true';
      this.showPopup = false;

      window.Shopify.loadFeatures(
        [
          {
            name: 'consent-tracking-api',
            version: '0.1',
          },
        ],
        (error) => {
          if (error) {
            throw error;
          }

          const userCanBeTracked = window.Shopify.customerPrivacy.userCanBeTracked();
          const userTrackingConsent = window.Shopify.customerPrivacy.getTrackingConsent();

          this.showPopup = !userCanBeTracked && userTrackingConsent === 'no_interaction' && this.enable;

          if (window.Shopify.designMode) {
            this.showPopup = true;
          }

          this.init();
        }
      );
    }

    init() {
      if (this.showPopup) {
        fadeIn(this.modal);
      }

      this.clickEvents();
    }

    clickEvents() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        window.Shopify.customerPrivacy.setTrackingConsent(false, () => fadeOut(this.modal));
        document.documentElement.style.setProperty('--cookie-bar-height', '0px');
      });

      this.acceptButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.Shopify.customerPrivacy.setTrackingConsent(true, () => fadeOut(this.modal));

        document.documentElement.style.setProperty('--cookie-bar-height', '0px');
      });

      document.addEventListener('trackingConsentAccepted', () => {
        // trackingConsentAccepted event fired
      });
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target) && this.showPopup) {
        fadeIn(this.modal);
        this.popup.classList.add(classes$s.selected);
        this.popup.parentNode.classList.add(classes$s.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.modal);
        this.popup.classList.remove(classes$s.selected);
        this.popup.parentNode.classList.remove(classes$s.hasBlockSelected);
      }
    }
  }

  class PromoText {
    constructor(el) {
      this.popup = el;
      this.close = this.popup.querySelector(selectors$L.close);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$L.cookieNameAttribute), 'user_has_closed');
      this.isTargeted = new TargetReferrer(this.popup);

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popup, this.popup);
        } else {
          fadeIn(this.popup);
        }

        this.clickEvents();
      }
    }

    clickEvents() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        fadeOut(this.popup);
        this.cookie.write();
      });
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.popup);
        this.popup.classList.add(classes$s.selected);
        this.popup.parentNode.classList.add(classes$s.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.popup);
        this.popup.classList.remove(classes$s.selected);
        this.popup.parentNode.classList.remove(classes$s.hasBlockSelected);
      }
    }
  }

  class NewsletterPopup {
    constructor(el) {
      this.popup = el;
      this.holder = this.popup.querySelector(selectors$L.newsletterPopupHolder);
      this.close = this.popup.querySelector(selectors$L.newsletterClose);
      this.heading = this.popup.querySelector(selectors$L.newsletterHeading);
      this.newsletterField = this.popup.querySelector(selectors$L.newsletterField);
      this.cookie = new PopupCookie(this.popup.getAttribute(selectors$L.cookieNameAttribute), 'newsletter_is_closed');
      this.form = this.popup.querySelector(selectors$L.newsletterForm);
      this.isTargeted = new TargetReferrer(this.popup);

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        this.show();

        if (this.form.classList.contains(classes$s.success)) {
          this.checkForSuccess();
        }
      }
    }

    show() {
      if (!window.Shopify.designMode) {
        new DelayShow(this.popup, this.holder);
      } else {
        fadeIn(this.holder);
      }

      this.showForm();
      this.inputField();
      this.closePopup();
    }

    checkForSuccess() {
      fadeIn(this.holder);
      this.cookie.write();
    }

    showForm() {
      this.heading.addEventListener('click', (event) => {
        event.preventDefault();

        this.heading.classList.add(classes$s.hide);
        this.newsletterField.focus();
      });
    }

    closePopup() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        fadeOut(this.holder);
        this.cookie.write();
      });
    }

    inputField() {
      this.newsletterField.addEventListener('input', () => {
        if (this.newsletterField.value !== '') {
          this.holder.classList.add(classes$s.hasValue, this.newsletterField.value !== '');
        }
      });

      this.newsletterField.addEventListener('focus', () => {
        if (this.newsletterField.value !== '') {
          this.holder.classList.add(classes$s.hasValue, this.newsletterField.value !== '');
        }
      });

      this.newsletterField.addEventListener('focusout', () => {
        setTimeout(() => {
          this.holder.classList.remove(classes$s.hasValue);
        }, 2000);
      });
    }

    onBlockSelect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeIn(this.holder);
        this.popup.classList.add(classes$s.selected);
        this.popup.parentNode.classList.add(classes$s.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popup.contains(evt.target)) {
        fadeOut(this.holder);
        this.popup.classList.remove(classes$s.selected);
        this.popup.parentNode.classList.remove(classes$s.hasBlockSelected);
      }
    }
  }

  const popupSection = {
    onLoad() {
      sections$n[this.id] = [];

      const newsletters = this.container.querySelectorAll('[data-large-promo]');
      newsletters.forEach((el) => {
        sections$n[this.id].push(new LargePopup(el));
      });

      const tracking = this.container.querySelectorAll(selectors$L.tracking);
      tracking.forEach((el) => {
        sections$n[this.id].push(new Tracking(el));
      });

      const newsletterPopup = this.container.querySelectorAll(selectors$L.newsletterPopup);
      newsletterPopup.forEach((el) => {
        sections$n[this.id].push(new NewsletterPopup(el));
      });

      const promoPopup = this.container.querySelectorAll(selectors$L.promoPopup);
      promoPopup.forEach((el) => {
        sections$n[this.id].push(new PromoText(el));
      });
    },
    onBlockSelect(evt) {
      sections$n[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(evt);
        }
      });
    },
    onBlockDeselect(evt) {
      sections$n[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(evt);
        }
      });
    },
  };

  register('popups', [popupSection, newsletterCheckForResultSection]);

  const selectors$M = {
    loginToggle: '#AdminLoginToggle',
    newsletterToggle: '#NewsletterToggle',
    login: '#AdminLogin',
    signup: '#CustomerSignup',
    errors: '.errors',
    contactErrors: '#contact_form .errors',
    loginErrors: '#login_form .errors',
  };

  class Password {
    constructor(section) {
      this.container = section.container;
      this.loginToggle = this.container.querySelector(selectors$M.loginToggle);
      this.newsletterToggle = this.container.querySelector(selectors$M.newsletterToggle);
      this.login = this.container.querySelector(selectors$M.login);
      this.signup = this.container.querySelector(selectors$M.signup);
      this.errors = this.container.querySelector(selectors$M.errors);
      this.contactErrors = this.container.querySelector(selectors$M.contactErrors);
      this.loginErrors = this.container.querySelector(selectors$M.loginErrors);
      this.init();
    }

    init() {
      this.loginToggle.addEventListener('click', (e) => {
        e.preventDefault();
        slideDown(this.login);
        hideElement(this.signup);
        if (this.errors) {
          hideElement(this.errors);
        }
      });

      this.newsletterToggle.addEventListener('click', (e) => {
        e.preventDefault();
        hideElement(this.login);
        slideDown(this.signup);
        if (this.errors) {
          hideElement(this.errors);
        }
      });

      if (this.contactErrors) {
        hideElement(this.login);
        slideDown(this.signup);
      }

      if (this.loginErrors) {
        slideDown(this.login);
        hideElement(this.signup);
      }
    }
  }

  const passwordSection = {
    onLoad() {
      new Password(this);
    },
  };

  register('password-template', passwordSection);

  register('faq', accordions);

  register('list-collections', [slider, quickAddProduct, swatchGridSection, blockScroll]);

  register('columns-with-image', [slider, blockScroll, videoPlay]);

  register('newsletter', newsletterCheckForResultSection);

  document.addEventListener('DOMContentLoaded', function () {
    // Load all registered sections on the page.
    load('*');

    // Animate on scroll
    const showAnimations = document.body.getAttribute('data-animations') === 'true';
    if (showAnimations) {
      AOS.init({
        once: true,
        offset: 0,
      });
    }

    // Scroll to top button
    const scrollTopButton = document.querySelector('[data-scroll-top-button]');
    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
      document.addEventListener('theme:scroll', () => {
        scrollTopButton.classList.toggle('is-visible', window.pageYOffset > window.innerHeight);
      });
    }

    // When images load, clear the background color
    document.addEventListener('lazyloaded', function (event) {
      const lazyImage = event.target.parentNode;
      if (lazyImage.classList.contains('lazy-image')) {
        lazyImage.style.backgroundImage = 'none';
      }
    });

    if (window.self !== window.top) {
      document.querySelector('html').classList.add('iframe');
    }

    // Safari smoothscroll polyfill
    let hasNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    if (!hasNativeSmoothScroll) {
      loadScript({url: window.theme.assets.smoothscroll});
    }
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (window.navigator.cookieEnabled) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }

}(themeVendor.BodyScrollLock, themeVendor.themeAddresses, themeVendor.themeCurrency, themeVendor.Sqrl, themeVendor.themeImages, themeVendor.Flickity, themeVendor.FlickityFade, themeVendor.Rellax, themeVendor.ellipsis, themeVendor.AOS));