class FilterSearchForm extends HTMLElement {
  static inputFormDesk = document.querySelector("#searchInput");
  static searchBtn = document.querySelector("#SearchButton");
    constructor() {
      super();
      this.onActiveFilterClick = this.onActiveFilterClick.bind(this);
  
      this.debouncedOnSubmit = debounce((event) => {
        this.onSubmitHandler(event); 
      }, 500);
  
      const facetForm = this.querySelector('form');
      facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));
      facetForm.addEventListener("click", (e) => {
        if(e.target.id == "FacetFiltersFormMobile"){
          this.closest('.mobile-facets__wrapper').querySelector('summary').click()
        }
      });
  
      const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
      if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
    }
  
    static setListeners() {
      const onHistoryChange = (event) => {
        const searchParams = event.state ? event.state.searchParams : FilterSearchForm.searchParamsInitial;
        if (searchParams === FilterSearchForm.searchParamsPrev) return;
        FilterSearchForm.renderPage(searchParams, null, false);
      }
      window.addEventListener('popstate', onHistoryChange);
      FilterSearchForm.inputFormDesk.addEventListener("input", debounce(FilterSearchForm.fetchProductGrid, 500));
      FilterSearchForm.searchBtn.addEventListener("click", FilterSearchForm.fetchProductGrid);
    }


  
    static toggleActiveFacets(disable = true) {
      document.querySelectorAll('.js-facet-remove').forEach((element) => {
        element.classList.toggle('disabled', disable);
      });
    }
  
    static renderPage(searchParams, event, updateURLHash = true) {
      FilterSearchForm.searchParamsPrev = searchParams;
      FilterSearchForm.updateURLHash(searchParams);
      FilterSearchForm.fetchProductGrid();
    }

      static fetchProductGrid(){
        document.querySelector(".custom_loader").classList.add("in_loading");
        let params = window.location.search.slice(1);
        let filterParams = params ? params : window.location.search.slice(1);
        filterParams = filterParams.replace("q=","");
        let searchParams = FilterSearchForm.inputFormDesk.value ? FilterSearchForm.inputFormDesk.value : "*";
        let checkurl = "";
        if(FilterSearchForm.inputFormDesk.value && FilterSearchForm.inputFormDesk.value != "" && FilterSearchForm.inputFormDesk.value != "*" ){
          checkurl = `/search?q=${searchParams}&options%5Bprefix%5D=last&${filterParams}`;
        }
        else{
          checkurl = `${window.location.pathname}?${filterParams}`;
        }
        fetch(checkurl)
          .then(response => response.text())
          .then((responseText) => {
            const html = responseText;
            FilterSearchForm.renderProductGridContainer(html);
            FilterSearchForm.renderProductCount(html);
            if(FilterSearchForm.inputFormDesk.value && FilterSearchForm.inputFormDesk.value != "" && FilterSearchForm.inputFormDesk.value != "*" ){
              fetch(`/search?q=${searchParams}&options%5Bprefix%5D=last&${filterParams}&sections=${document.getElementById('CustomFilters').dataset.id}`).then(res => res.json()).then(resJS => {
                FilterSearchForm.renderFilters(resJS[document.getElementById('CustomFilters').dataset.id]);
                FilterSearchForm.renderProductCount(resJS[document.getElementById('CustomFilters').dataset.id]);
              }).finally(() => {
                document.querySelector(".custom_loader").classList.remove("in_loading");
                setButtons();
              });
            }
            else{
              fetch(`${window.location.pathname}?${filterParams}&sections=${document.getElementById('CustomFilters').dataset.id}`).then(res => res.json()).then(resJS => {
                FilterSearchForm.renderFilters(resJS[document.getElementById('CustomFilters').dataset.id]);
                FilterSearchForm.renderProductCount(resJS[document.getElementById('CustomFilters').dataset.id]);
              }).finally(() => {
                document.querySelector(".custom_loader").classList.remove("in_loading");
                setButtons();
              });
            }
          })
      }
    // 
  
    static renderSectionFromFetch(url, event) {
      fetch(url)
        .then(response => response.text())
        .then((responseText) => {
          const html = responseText;
          FilterSearchForm.filterData = [...FilterSearchForm.filterData, { html, url }];
          const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
            if(parsedHTML.getElementById("CustomFilters")){
                FilterSearchForm.renderFilters(html, event);
                FilterSearchForm.renderProductCount(html);
            }
            FilterSearchForm.fetchProductGrid();
        });
    }
  
    static renderProductGridContainer(html) {
      const fetchedProductGrid = new DOMParser().parseFromString(html, 'text/html').querySelector('.collection__products');
        document.querySelector('.collection__products').innerHTML = fetchedProductGrid.innerHTML;
        let noResultsElem = document.querySelector(".no-results");
        if(noResultsElem){
          noResultsElem.querySelector("a").setAttribute("href", "/collections/all-products");
        }
    }
  
    static renderProductCount(html) {
      let count;
      try{
        count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
      }
      catch{
        return;
      }
      const container = document.getElementById('ProductCount');
      const containerDesktop = document.getElementById('ProductCountDesktop');
      container.innerHTML = count;
      container.classList.remove('loading');
      if (containerDesktop) {
        containerDesktop.innerHTML = count;
        containerDesktop.classList.remove('loading');
      }
    }
  
    static renderFilters(html, event) {
      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

      const facetDetailsElements =
        parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');
      const matchesIndex = (element) => {
        const jsFilter = event ? event.target.closest('.js-filter') : undefined;
        return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
      }
      const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
      const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);
      document.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter').forEach(element => {
        if(!parsedHTML.querySelector(`.js-filter[data-index="${element.dataset.index}"]`)){
          element.style = "visibility: hidden;";
        }
        else{
          element.style = "visibility: visible;";
        }
      })
  
      facetsToRender.forEach((element) => {
        document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
      });
  
      FilterSearchForm.renderActiveFacets(parsedHTML);
      FilterSearchForm.renderAdditionalElements(parsedHTML);
      setScrollsForUls();
      if (countsToRender) FilterSearchForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
    }
  
    static renderActiveFacets(html) {
      const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

      activeFacetElementSelectors.forEach((selector) => {
        const activeFacetsElement = html.querySelector(selector);
        if (!activeFacetsElement) return;
        document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
      })
  
      FilterSearchForm.toggleActiveFacets(false);
    }
  
    static renderAdditionalElements(html) {
      const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];
  
      mobileElementSelectors.forEach((selector) => {
        if (!html.querySelector(selector)) return;
        document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
      });
      document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
    }
  
    static renderCounts(source, target) {
      const targetElement = target.querySelector('.facets__selected');
      const sourceElement = source.querySelector('.facets__selected');
  
      const targetElementAccessibility = target.querySelector('.facets__summary');
      const sourceElementAccessibility = source.querySelector('.facets__summary');
  
      if (sourceElement && targetElement) {
        target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
      }
  
      if (targetElementAccessibility && sourceElementAccessibility) {
        target.querySelector('.facets__summary').outerHTML = source.querySelector('.facets__summary').outerHTML;
      }
    }
  
    static updateURLHash(searchParams) {
      history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    }
  
    static getSections() {
      return [
        {
            section: document.getElementById('CustomFilters').dataset.id,
        }
      ]
    }
  
    createSearchParams(form) {
      const formData = new FormData(form);
      return new URLSearchParams(formData).toString();
    }
  
    onSubmitForm(searchParams, event) {
      FilterSearchForm.renderPage(searchParams, event);
    }
  
    onSubmitHandler(event) {
      event.preventDefault();
      const sortFilterForms = document.querySelectorAll('filter-search-form form');
      if (event.srcElement.className == 'mobile-facets__checkbox') {
        const searchParams = this.createSearchParams(event.target.closest('form'))
        this.onSubmitForm(searchParams, event)
      } else {
        const forms = [];
        const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';
  
        sortFilterForms.forEach((form) => {
          if (!isMobile) {
            if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
              const noJsElements = document.querySelectorAll('.no-js-list');
              noJsElements.forEach((el) => el.remove());
              forms.push(this.createSearchParams(form));
            }
          } else if (form.id === 'FacetFiltersFormMobile') {
            forms.push(this.createSearchParams(form));
          }
        });
        this.onSubmitForm(forms.join('&'), event)
      }
    }
  
    onActiveFilterClick(event) {
      event.preventDefault();
      FilterSearchForm.toggleActiveFacets();
      const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
      FilterSearchForm.renderPage(url);
    }
  }
  
  FilterSearchForm.filterData = [];
  FilterSearchForm.searchParamsInitial = window.location.search.slice(1);
  FilterSearchForm.searchParamsPrev = window.location.search.slice(1);
  customElements.define('filter-search-form', FilterSearchForm);
  FilterSearchForm.setListeners();
  
  class FSPriceRange extends HTMLElement {
    constructor() {
      super();
      this.querySelectorAll('input')
        .forEach(element => element.addEventListener('change', this.onRangeChange.bind(this)));
      this.setMinAndMaxValues();
    }
  
    onRangeChange(event) {
      this.adjustToValidValues(event.currentTarget);
      this.setMinAndMaxValues();
    }

    updatePage = debounce(() => {
      const url = new URL(location.href);
      url.searchParams.set("filter.v.price.gte", this.querySelectorAll('input')[0].value);
      url.searchParams.set("filter.v.price.lte", this.querySelectorAll('input')[1].value);

      history.pushState(null, '', url);
      FilterSearchForm.fetchProductGrid();
    }, 500);
  
    setMinAndMaxValues() { 
      const inputs = this.querySelectorAll('input');
      let minInput = inputs[0];
      let maxInput = inputs[1];
      const slider = rangeSlider(document.querySelector('#range-slider'), {
        value: [minInput.value ? Number(minInput.value) : 0, maxInput.value ? Number(maxInput.value) : Number(maxInput.getAttribute('max'))],
        min: 0,
        max: Number(maxInput.getAttribute('max')),
        onInput: () => {
          this.querySelectorAll('input')[0].setAttribute("value", slider.value()[0]);
          this.querySelectorAll('input')[1].setAttribute("value", slider.value()[1]);
          this.updatePage();
        }
    })
      
      if (maxInput.value) minInput.setAttribute('max', maxInput.value);
      if (minInput.value) maxInput.setAttribute('min', minInput.value);
      if (minInput.value === '') maxInput.setAttribute('min', 0);
      if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
    }
  
    adjustToValidValues(input) {
      const value = Number(input.value);
      const min = Number(input.getAttribute('min'));
      const max = Number(input.getAttribute('max'));
  
      if (value < min) input.value = min;
      if (value > max) input.value = max;
    }
  }
  
  customElements.define('fs-price-range', FSPriceRange);
  
  class FilterSearchRemove extends HTMLElement {
    constructor() {
      super();
      const facetLink = this.querySelector('a');
      facetLink.setAttribute('role', 'button');
      facetLink.addEventListener('click', this.closeFilter.bind(this));
      facetLink.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
      });
    }
  
    closeFilter(event) {
      event.preventDefault();
      const form = this.closest('filter-search-form') || document.querySelector('filter-search-form');
      form.onActiveFilterClick(event);
    }
  }
  
  customElements.define('filter-search-remove', FilterSearchRemove);

  class FSShowMoreButton extends HTMLElement {
    constructor() {
      super();
      const button = this.querySelector('button');
      button.addEventListener('click', (event) => {
        this.expandShowMore(event);
        const nextElementToFocus = event.target.closest('.parent-display').querySelector('.show-more-item')
        if (nextElementToFocus && !nextElementToFocus.classList.contains('hidden')) {
          nextElementToFocus.querySelector('input').focus()
        }
      });
    }
    expandShowMore(event) {
      const parentDisplay = event.target.closest('[id^="Show-More-"]').closest('.parent-display');
      const parentWrap = parentDisplay.querySelector('.parent-wrap');
      this.querySelectorAll('.label-text').forEach(element => element.classList.toggle('hidden'));
      parentDisplay.querySelectorAll('.show-more-item').forEach(item => item.classList.toggle('hidden'))
    }
  }
  
  customElements.define('fs-show-more-button', FSShowMoreButton);
//Custom
  class MenuDrawer extends HTMLElement {
    constructor() {
      super();
  
      this.mainDetailsToggle = this.querySelector('details');
  
      this.addEventListener('keyup', this.onKeyUp.bind(this));
      this.addEventListener('focusout', this.onFocusOut.bind(this));
      this.bindEvents();
    }
  
    bindEvents() {
      this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
      this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
    }
  
    onKeyUp(event) {
      if(event.code.toUpperCase() !== 'ESCAPE') return;
  
      const openDetailsElement = event.target.closest('details[open]');
      if(!openDetailsElement) return;
  
      openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
    }
  
    onSummaryClick(event) {
      const summaryElement = event.currentTarget;
      const detailsElement = summaryElement.parentNode;
      const parentMenuElement = detailsElement.closest('.has-submenu');
      const isOpen = detailsElement.hasAttribute('open');
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  
      function addTrapFocus() {
        trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
        summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
      }
  
      if (detailsElement === this.mainDetailsToggle) {
        if(isOpen) event.preventDefault();
        isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
  
        if (window.matchMedia('(max-width: 990px)')) {
          document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
        }
      } else {
        setTimeout(() => {
          detailsElement.classList.add('menu-opening');
          summaryElement.setAttribute('aria-expanded', true);
          parentMenuElement && parentMenuElement.classList.add('submenu-open');
          !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
        }, 100);
      }
      setScrollsForUls()
    }
  
    openMenuDrawer(summaryElement) {
      setTimeout(() => {
        this.mainDetailsToggle.classList.add('menu-opening');
      });
      summaryElement.setAttribute('aria-expanded', true);
      trapFocus(this.mainDetailsToggle, summaryElement);
      document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);

      setTimeout(() => {
        document.querySelector('#range-slider').dispatchEvent(new Event("resize"));
        setScrollsForUls();
      }, 500);
    }
  
    closeMenuDrawer(event, elementToFocus = false) {
      if (event === undefined) return;
  
      this.mainDetailsToggle.classList.remove('menu-opening');
      this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
        details.removeAttribute('open');
        details.classList.remove('menu-opening');
      });
      this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach(submenu => {
        submenu.classList.remove('submenu-open');
      });
      document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
      removeTrapFocus(elementToFocus);
      this.closeAnimation(this.mainDetailsToggle);
    }
  
    onFocusOut(event) {
      setTimeout(() => {
        if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
      });
    }
  
    onCloseButtonClick(event) {
      const detailsElement = event.currentTarget.closest('details');
      this.closeSubmenu(detailsElement);
    }
  
    closeSubmenu(detailsElement) {
      const parentMenuElement = detailsElement.closest('.submenu-open');
      parentMenuElement && parentMenuElement.classList.remove('submenu-open');
      detailsElement.classList.remove('menu-opening');
      detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
      removeTrapFocus(detailsElement.querySelector('summary'));
      this.closeAnimation(detailsElement);
    }
  
    closeAnimation(detailsElement) {
      let animationStart;
  
      const handleAnimation = (time) => {
        if (animationStart === undefined) {
          animationStart = time;
        }
  
        const elapsedTime = time - animationStart;
  
        if (elapsedTime < 400) {
          window.requestAnimationFrame(handleAnimation);
        } else {
          detailsElement.removeAttribute('open');
          if (detailsElement.closest('details[open]')) {
            trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
          }
        }
      }
  
      window.requestAnimationFrame(handleAnimation);
    }
  }
  
  customElements.define('menu-drawer', MenuDrawer);

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const trapFocusHandlers = {};

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
      )
    );
  }

  function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container);
    var first = elements[0];
    var last = elements[elements.length - 1];
  
    removeTrapFocus();
  
    trapFocusHandlers.focusin = (event) => {
      if (
        event.target !== container &&
        event.target !== last &&
        event.target !== first
      )
        return;
  
      document.addEventListener('keydown', trapFocusHandlers.keydown);
    };
  
    trapFocusHandlers.focusout = function() {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };
  
    trapFocusHandlers.keydown = function(event) {
      if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
      // On the last focusable element and tab forward, focus the first element.
      if (event.target === last && !event.shiftKey) {
        event.preventDefault();
        first.focus();
      }
  
      //  On the first focusable element and tab backward, focus the last element.
      if (
        (event.target === container || event.target === first) &&
        event.shiftKey
      ) {
        event.preventDefault();
        last.focus();
      }
    };
  
    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);
  
    elementToFocus.focus();
  }

  function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  
    if (elementToFocus) elementToFocus.focus();
  }

  function setScrollsForUls(){
    document.querySelectorAll('.mobile-facets__list').forEach(list => {
      if(list.childElementCount > 0){
        if(Number((list.querySelector('li').offsetHeight * list.childElementCount)) > Number(list.offsetHeight) + 10){
          list.classList.add('mag-overflow');
        }
      }
      else{
        list.closest("details").style = 'position: absolute; opacity: 0; pointer-events: none;';
      }
    });
  }
  