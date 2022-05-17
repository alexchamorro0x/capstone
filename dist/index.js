/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/add-elem.js":
/*!*********************************!*\
  !*** ./src/modules/add-elem.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Shorthand function for creating a DOM element
// elem = string, classes = array of string(s), parent = DOM element
const addElem = (elem, classes, parent) => {
  const createdElem = document.createElement(elem);
  if (classes !== undefined) {
    classes.forEach((cl) => createdElem.classList.add(cl));
  }
  parent.appendChild(createdElem);

  return createdElem;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addElem);


/***/ }),

/***/ "./src/modules/involvement.js":
/*!************************************!*\
  !*** ./src/modules/involvement.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postLike": () => (/* binding */ postLike)
/* harmony export */ });
const postLike = async (itemID) => {
  const appID = 'OQCl5yEXf3GxJhpasEHV';
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemID }),
  });
  const post = await response.text();
  return post;
};

const getLikes = async () => {
  const appID = 'OQCl5yEXf3GxJhpasEHV';
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`);
  const likes = await response.json();
  return likes;
};



/***/ }),

/***/ "./src/modules/popup.js":
/*!******************************!*\
  !*** ./src/modules/popup.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearPopups": () => (/* binding */ clearPopups),
/* harmony export */   "showPopup": () => (/* binding */ showPopup)
/* harmony export */ });
/* harmony import */ var _add_elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-elem.js */ "./src/modules/add-elem.js");


const clearPopups = () => {
  const popupContainer = document.querySelectorAll('.popup-container');

  if (popupContainer) {
    popupContainer.forEach((e) => {
      e.remove();
    });
  }
};

const showPopup = (_showData, _domRect) => {
  // Clear all other pop-ups if any
  clearPopups();

  // Calculate y position
  const posY = window.pageYOffset + _domRect.y - 50;

  // DOM manipulations
  const main = document.querySelector('main');
  const popupContainer = (0,_add_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])('div', ['popup-container'], main);
  popupContainer.style.top = `${posY}px`;

  popupContainer.innerHTML = `
    <div class="popup-close-container"></div>
    <div class="flex-column">
      <h2>${_showData.name}</h2>
      <div class="sub-title flex-row">
        <span>${_showData.premiered.substring(0, 4)}</span>
        <span>&middot;</span>
        <span>${_showData.status}</span>
        <span>&middot;</span>
        <div class="flex-row">
          <span class="material-icons-round icons">star</span>
          <span class="rating">${_showData.rating.average}</span>
          <span>/10</span>
        </div>
      </div>
    </div>
    <img class="popup-img" src="${_showData.image.original}" alt="show thumbnail">
    <div class="genres flex-row"></div>
    <div>${_showData.summary}</div>`;

  // Generate genres
  const genres = document.querySelector('.genres');
  _showData.genres.forEach((genre) => {
    genres.innerHTML += `<div class="tag-genre">${genre}</div>`;
  });

  // Close button event listener
  const popupCloseContainer = document.querySelector('.popup-close-container');
  const popupClose = (0,_add_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])('button', ['popup-close'], popupCloseContainer);
  const closeIcon = (0,_add_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])('span', ['material-icons-round', 'icons'], popupClose);
  closeIcon.textContent = 'close';

  popupClose.onclick = () => {
    popupContainer.remove();
  };
};




/***/ }),

/***/ "./src/modules/tvmaze.js":
/*!*******************************!*\
  !*** ./src/modules/tvmaze.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getData);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _modules_tvmaze_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tvmaze.js */ "./src/modules/tvmaze.js");
/* harmony import */ var _modules_involvement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/involvement.js */ "./src/modules/involvement.js");
/* harmony import */ var _modules_popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/popup.js */ "./src/modules/popup.js");




// import addElem from './modules/add-elem.js';

// Search button
const searchIcon = document.querySelector('#search-btn');
const searchBarContainer = document.querySelector('.search-bar');
const searchCloseBtn = document.querySelector('#search-close-btn');
const menuIcon = document.querySelector('#menu-icon');
const header = document.querySelector('header');

// Search Bar For Desktop
if (window.innerWidth > 768) {
  searchBarContainer.classList.remove('hide');
  menuIcon.classList.remove('hide');
  const menuText = document.createElement('span');
  menuText.style.fontSize = '1.25rem';
  menuText.textContent += 'Menu';
  menuIcon.append(menuText);
  searchCloseBtn.classList.add('hide');
  searchIcon.classList.add('hide');

  // Add Search Icon
  const searchIconDesktopBtn = document.createElement('button');
  searchIconDesktopBtn.setAttribute('type', 'button');
  searchIconDesktopBtn.classList.add('searchIconDesktopBtn');
  const searchIconDesktopSpan = document.createElement('span');
  searchIconDesktopSpan.classList.add('material-icons-round', 'icons');
  searchIconDesktopSpan.textContent = 'search';

  searchIconDesktopBtn.append(searchIconDesktopSpan);
  header.append(searchIconDesktopBtn);
}

// Get Data from TVMAZE API
const rootUrl = 'https://api.tvmaze.com/singlesearch/shows?q=';
const searchResults = document.querySelector('h2');
let query = '';

// Update Likes
const updateLikes = async () => {
  const response = await (0,_modules_involvement_js__WEBPACK_IMPORTED_MODULE_2__.getLikes)();
  document.querySelectorAll('.starCount').forEach((button) => {
    for (let i = 0; i < response.length; i += 1) {
      if (response[i].item_id === Number(button.id)) {
        button.lastChild.textContent = response[i].likes;
      }
    }
  });
};

// Display Cards Dynamically
const cards = document.querySelector('.cards');
const createElement = async (requestURL) => {
  cards.innerHTML = '';
  await (0,_modules_tvmaze_js__WEBPACK_IMPORTED_MODULE_1__["default"])(requestURL)
    .then((data) => {
      let searchCount = 0;
      const dataArray = data._embedded.episodes;
      dataArray.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('cardItem');
        const divImg = document.createElement('div');
        divImg.classList.add('cardImg');
        divImg.style.backgroundImage = `url(${el.image.original})`;
        const h1 = document.createElement('h1');
        h1.classList.add('cardName');
        h1.textContent = `S${el.season}E${el.number} ${el.name}`;
        const details = document.createElement('p');
        details.classList.add('cardDetails');
        details.innerHTML = `Plot Summary: <br>${el.summary}`;
        const h2 = document.createElement('h2');
        h2.classList.add('cardRuntime');
        h2.textContent = `Runtime: ${el.runtime} mins Rating: ${el.rating.average}`;

        const starContainer = document.createElement('div');
        starContainer.classList.add('starContainer');

        const starRate = document.createElement('span');
        starRate.classList.add('material-icons-round');
        starRate.classList.add('icons');
        starRate.classList.add('starRate');
        starRate.textContent = 'star_rate';

        const starCount = document.createElement('span');
        starCount.classList.add('starCount');
        starCount.setAttribute('id', el.id);
        starCount.textContent = '0';

        const starBorder = document.createElement('span');
        starBorder.classList.add('material-icons-round');
        starBorder.classList.add('icons');
        starBorder.classList.add('starBorder');
        starBorder.textContent = 'star_border';
        starBorder.setAttribute('id', el.id);

        // Like Event
        starBorder.addEventListener('click', () => {
          (0,_modules_involvement_js__WEBPACK_IMPORTED_MODULE_2__.postLike)(el.show.id);
          starBorder.classList.toggle('liked');
          starCount.setAttribute('disabled', true);
          setTimeout(updateLikes, 1000);
        });

        const cBtn = document.createElement('button');
        cBtn.classList.add('commentBtn');
        cBtn.textContent = 'Comments';
        starContainer.append(starRate, starCount, starBorder);
        div.append(divImg, starContainer, h1, h2, details, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;
      });
    });
};

const searchInput = document.querySelector('#search-input');

// Search Event - Mobile Version
searchIcon.onclick = () => {
  searchBarContainer.classList.remove('hide');

  // // Add event listener
  searchCloseBtn.onclick = () => {
    searchBarContainer.classList.add('hide');
  };
};

// Enter Keyboard Support - Search Mobile
if (window.innerWidth < 768) {
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (!searchInput.value) {
        window.onload();
      }
      query = searchInput.value;
      searchInput.value = '';
      searchBarContainer.classList.add('hide');
      createElement(`${rootUrl}${query}&embed=episodes`);
      updateLikes();
    }
  });
}

// Search Event - Desktop Version
if (window.innerWidth > 768) {
  const searchIconDesktopBtn = document.querySelector('.searchIconDesktopBtn');
  searchIconDesktopBtn.onclick = () => {
    if (searchInput.value) {
      query = searchInput.value;
      searchInput.value = '';
    }
    if (!searchInput.value) {
      window.onload();
    }
    createElement(`${rootUrl}${query}&embed=episodes`);
    updateLikes();
  };
}

// Enter Keyboard Support - Search Desktop
if (window.innerWidth > 768) {
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (!searchInput.value) {
        window.onload();
      }
      query = searchInput.value;
      searchInput.value = '';
      createElement(`${rootUrl}${query}&embed=episodes`);
      updateLikes();
    }
  });
}

// Default Search On Page Load
const createElementForShows = async (requestURL) => {
  cards.innerHTML = '';
  await (0,_modules_tvmaze_js__WEBPACK_IMPORTED_MODULE_1__["default"])(requestURL)
    .then((data) => {
      let searchCount = 0;
      data.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('cardItem');
        const divImg = document.createElement('div');
        divImg.classList.add('cardImg');
        divImg.style.backgroundImage = `url(${el.image.original})`;
        const h1 = document.createElement('h1');
        h1.classList.add('cardName');
        h1.textContent = el.name;

        const starContainer = document.createElement('div');
        starContainer.classList.add('starContainer');

        const starRate = document.createElement('span');
        starRate.classList.add('material-icons-round');
        starRate.classList.add('icons');
        starRate.classList.add('starRate');
        starRate.textContent = 'star_rate';

        const starCount = document.createElement('span');
        starCount.classList.add('starCount');
        starCount.setAttribute('id', el.id);
        starCount.textContent = '0';

        const starBorder = document.createElement('span');
        starBorder.classList.add('material-icons-round');
        starBorder.classList.add('icons');
        starBorder.classList.add('starBorder');
        starBorder.textContent = 'star_border';
        starBorder.setAttribute('id', el.id);

        // Like Event
        starBorder.addEventListener('click', () => {
          (0,_modules_involvement_js__WEBPACK_IMPORTED_MODULE_2__.postLike)(el.id);
          starBorder.classList.toggle('liked');
          starCount.setAttribute('disabled', true);
          setTimeout(updateLikes, 1000);
        });

        const cBtn = document.createElement('button');
        cBtn.classList.add('commentBtn');
        cBtn.textContent = 'Comments';
        starContainer.append(starRate, starCount, starBorder);
        div.append(divImg, starContainer, h1, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;

        // Pop-up trigger event
        const showData = el;
        div.addEventListener('click', (e) => {
          // console.log(showData);
          (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_3__.showPopup)(showData, e.target.getBoundingClientRect());
        });
      });
    });
};

window.onload = () => {
  const defaultURL = 'https://api.tvmaze.com/shows';
  createElementForShows(defaultURL);
  setTimeout(updateLikes, 1000);
};

// Homepage Link
const h1 = document.querySelector('h1');
h1.addEventListener('click', () => {
  window.location.reload();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUSxFQUFFLE1BQU07QUFDdkM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsRUFBRSxNQUFNO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUSxFQUFFLE1BQU07QUFDdkM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0JBQWtCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGlFQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDREQUFTO0FBQ25CLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2FkZC1lbGVtLmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9pbnZvbHZlbWVudC5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL3R2bWF6ZS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBTaG9ydGhhbmQgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgRE9NIGVsZW1lbnRcbi8vIGVsZW0gPSBzdHJpbmcsIGNsYXNzZXMgPSBhcnJheSBvZiBzdHJpbmcocyksIHBhcmVudCA9IERPTSBlbGVtZW50XG5jb25zdCBhZGRFbGVtID0gKGVsZW0sIGNsYXNzZXMsIHBhcmVudCkgPT4ge1xuICBjb25zdCBjcmVhdGVkRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gIGlmIChjbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjbGFzc2VzLmZvckVhY2goKGNsKSA9PiBjcmVhdGVkRWxlbS5jbGFzc0xpc3QuYWRkKGNsKSk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZWRFbGVtKTtcblxuICByZXR1cm4gY3JlYXRlZEVsZW07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRFbGVtO1xuIiwiY29uc3QgcG9zdExpa2UgPSBhc3luYyAoaXRlbUlEKSA9PiB7XG4gIGNvbnN0IGFwcElEID0gJ09RQ2w1eUVYZjNHeEpocGFzRUhWJztcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7YXBwSUR9L2xpa2VzYDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBpdGVtSUQgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBhcHBJRCA9ICdPUUNsNXlFWGYzR3hKaHBhc0VIVic7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7YXBwSUR9L2xpa2VzYCk7XG4gIGNvbnN0IGxpa2VzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gbGlrZXM7XG59O1xuXG5leHBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfTsiLCJpbXBvcnQgYWRkRWxlbSBmcm9tICcuL2FkZC1lbGVtLmpzJztcblxuY29uc3QgY2xlYXJQb3B1cHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwLWNvbnRhaW5lcicpO1xuXG4gIGlmIChwb3B1cENvbnRhaW5lcikge1xuICAgIHBvcHVwQ29udGFpbmVyLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3dQb3B1cCA9IChfc2hvd0RhdGEsIF9kb21SZWN0KSA9PiB7XG4gIC8vIENsZWFyIGFsbCBvdGhlciBwb3AtdXBzIGlmIGFueVxuICBjbGVhclBvcHVwcygpO1xuXG4gIC8vIENhbGN1bGF0ZSB5IHBvc2l0aW9uXG4gIGNvbnN0IHBvc1kgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBfZG9tUmVjdC55IC0gNTA7XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvbnNcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBhZGRFbGVtKCdkaXYnLCBbJ3BvcHVwLWNvbnRhaW5lciddLCBtYWluKTtcbiAgcG9wdXBDb250YWluZXIuc3R5bGUudG9wID0gYCR7cG9zWX1weGA7XG5cbiAgcG9wdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMj4ke19zaG93RGF0YS5uYW1lfTwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViLXRpdGxlIGZsZXgtcm93XCI+XG4gICAgICAgIDxzcGFuPiR7X3Nob3dEYXRhLnByZW1pZXJlZC5zdWJzdHJpbmcoMCwgNCl9PC9zcGFuPlxuICAgICAgICA8c3Bhbj4mbWlkZG90Ozwvc3Bhbj5cbiAgICAgICAgPHNwYW4+JHtfc2hvd0RhdGEuc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+Jm1pZGRvdDs8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtcm91bmQgaWNvbnNcIj5zdGFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nXCI+JHtfc2hvd0RhdGEucmF0aW5nLmF2ZXJhZ2V9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPi8xMDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aW1nIGNsYXNzPVwicG9wdXAtaW1nXCIgc3JjPVwiJHtfc2hvd0RhdGEuaW1hZ2Uub3JpZ2luYWx9XCIgYWx0PVwic2hvdyB0aHVtYm5haWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2VucmVzIGZsZXgtcm93XCI+PC9kaXY+XG4gICAgPGRpdj4ke19zaG93RGF0YS5zdW1tYXJ5fTwvZGl2PmA7XG5cbiAgLy8gR2VuZXJhdGUgZ2VucmVzXG4gIGNvbnN0IGdlbnJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZW5yZXMnKTtcbiAgX3Nob3dEYXRhLmdlbnJlcy5mb3JFYWNoKChnZW5yZSkgPT4ge1xuICAgIGdlbnJlcy5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJ0YWctZ2VucmVcIj4ke2dlbnJlfTwvZGl2PmA7XG4gIH0pO1xuXG4gIC8vIENsb3NlIGJ1dHRvbiBldmVudCBsaXN0ZW5lclxuICBjb25zdCBwb3B1cENsb3NlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNsb3NlLWNvbnRhaW5lcicpO1xuICBjb25zdCBwb3B1cENsb3NlID0gYWRkRWxlbSgnYnV0dG9uJywgWydwb3B1cC1jbG9zZSddLCBwb3B1cENsb3NlQ29udGFpbmVyKTtcbiAgY29uc3QgY2xvc2VJY29uID0gYWRkRWxlbSgnc3BhbicsIFsnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnXSwgcG9wdXBDbG9zZSk7XG4gIGNsb3NlSWNvbi50ZXh0Q29udGVudCA9ICdjbG9zZSc7XG5cbiAgcG9wdXBDbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xufTtcblxuZXhwb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcyB9O1xuIiwiY29uc3QgZ2V0RGF0YSA9IGFzeW5jICh1cmwpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldERhdGE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCBnZXREYXRhIGZyb20gJy4vbW9kdWxlcy90dm1hemUuanMnO1xuaW1wb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH0gZnJvbSAnLi9tb2R1bGVzL2ludm9sdmVtZW50LmpzJztcbmltcG9ydCB7IHNob3dQb3B1cCB9IGZyb20gJy4vbW9kdWxlcy9wb3B1cC5qcyc7XG4vLyBpbXBvcnQgYWRkRWxlbSBmcm9tICcuL21vZHVsZXMvYWRkLWVsZW0uanMnO1xuXG4vLyBTZWFyY2ggYnV0dG9uXG5jb25zdCBzZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcbmNvbnN0IHNlYXJjaEJhckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG5jb25zdCBzZWFyY2hDbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtY2xvc2UtYnRuJyk7XG5jb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LWljb24nKTtcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuXG4vLyBTZWFyY2ggQmFyIEZvciBEZXNrdG9wXG5pZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBjb25zdCBtZW51VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbWVudVRleHQuc3R5bGUuZm9udFNpemUgPSAnMS4yNXJlbSc7XG4gIG1lbnVUZXh0LnRleHRDb250ZW50ICs9ICdNZW51JztcbiAgbWVudUljb24uYXBwZW5kKG1lbnVUZXh0KTtcbiAgc2VhcmNoQ2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBzZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAvLyBBZGQgU2VhcmNoIEljb25cbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzZWFyY2hJY29uRGVza3RvcEJ0bicpO1xuICBjb25zdCBzZWFyY2hJY29uRGVza3RvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wU3Bhbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucycpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4udGV4dENvbnRlbnQgPSAnc2VhcmNoJztcblxuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BTcGFuKTtcbiAgaGVhZGVyLmFwcGVuZChzZWFyY2hJY29uRGVza3RvcEJ0bik7XG59XG5cbi8vIEdldCBEYXRhIGZyb20gVFZNQVpFIEFQSVxuY29uc3Qgcm9vdFVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NpbmdsZXNlYXJjaC9zaG93cz9xPSc7XG5jb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDInKTtcbmxldCBxdWVyeSA9ICcnO1xuXG4vLyBVcGRhdGUgTGlrZXNcbmNvbnN0IHVwZGF0ZUxpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldExpa2VzKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyQ291bnQnKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAocmVzcG9uc2VbaV0uaXRlbV9pZCA9PT0gTnVtYmVyKGJ1dHRvbi5pZCkpIHtcbiAgICAgICAgYnV0dG9uLmxhc3RDaGlsZC50ZXh0Q29udGVudCA9IHJlc3BvbnNlW2ldLmxpa2VzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBEaXNwbGF5IENhcmRzIER5bmFtaWNhbGx5XG5jb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkcycpO1xuY29uc3QgY3JlYXRlRWxlbWVudCA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBjb25zdCBkYXRhQXJyYXkgPSBkYXRhLl9lbWJlZGRlZC5lcGlzb2RlcztcbiAgICAgIGRhdGFBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgICAgIGgxLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gYFMke2VsLnNlYXNvbn1FJHtlbC5udW1iZXJ9ICR7ZWwubmFtZX1gO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2NhcmREZXRhaWxzJyk7XG4gICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFBsb3QgU3VtbWFyeTogPGJyPiR7ZWwuc3VtbWFyeX1gO1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGgyLmNsYXNzTGlzdC5hZGQoJ2NhcmRSdW50aW1lJyk7XG4gICAgICAgIGgyLnRleHRDb250ZW50ID0gYFJ1bnRpbWU6ICR7ZWwucnVudGltZX0gbWlucyBSYXRpbmc6ICR7ZWwucmF0aW5nLmF2ZXJhZ2V9YDtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuc2hvdy5pZCk7XG4gICAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QudG9nZ2xlKCdsaWtlZCcpO1xuICAgICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY0J0bi5jbGFzc0xpc3QuYWRkKCdjb21tZW50QnRuJyk7XG4gICAgICAgIGNCdG4udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmFwcGVuZChzdGFyUmF0ZSwgc3RhckNvdW50LCBzdGFyQm9yZGVyKTtcbiAgICAgICAgZGl2LmFwcGVuZChkaXZJbWcsIHN0YXJDb250YWluZXIsIGgxLCBoMiwgZGV0YWlscywgY0J0bik7XG4gICAgICAgIGNhcmRzLmFwcGVuZChkaXYpO1xuICAgICAgICBzZWFyY2hDb3VudCArPSAxO1xuICAgICAgICBzZWFyY2hSZXN1bHRzLnRleHRDb250ZW50ID0gYFNlYXJjaCBSZXN1bHRzICgke3NlYXJjaENvdW50fSlgO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblxuLy8gU2VhcmNoIEV2ZW50IC0gTW9iaWxlIFZlcnNpb25cbnNlYXJjaEljb24ub25jbGljayA9ICgpID0+IHtcbiAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAvLyAvLyBBZGQgZXZlbnQgbGlzdGVuZXJcbiAgc2VhcmNoQ2xvc2VCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICB9O1xufTtcblxuLy8gRW50ZXIgS2V5Ym9hcmQgU3VwcG9ydCAtIFNlYXJjaCBNb2JpbGVcbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICB3aW5kb3cub25sb2FkKCk7XG4gICAgICB9XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICAgIHVwZGF0ZUxpa2VzKCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gU2VhcmNoIEV2ZW50IC0gRGVza3RvcCBWZXJzaW9uXG5pZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICB3aW5kb3cub25sb2FkKCk7XG4gICAgfVxuICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgIHVwZGF0ZUxpa2VzKCk7XG4gIH07XG59XG5cbi8vIEVudGVyIEtleWJvYXJkIFN1cHBvcnQgLSBTZWFyY2ggRGVza3RvcFxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICAgIHdpbmRvdy5vbmxvYWQoKTtcbiAgICAgIH1cbiAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICB1cGRhdGVMaWtlcygpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERlZmF1bHQgU2VhcmNoIE9uIFBhZ2UgTG9hZFxuY29uc3QgY3JlYXRlRWxlbWVudEZvclNob3dzID0gYXN5bmMgKHJlcXVlc3RVUkwpID0+IHtcbiAgY2FyZHMuaW5uZXJIVE1MID0gJyc7XG4gIGF3YWl0IGdldERhdGEocmVxdWVzdFVSTClcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgbGV0IHNlYXJjaENvdW50ID0gMDtcbiAgICAgIGRhdGEuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXJkSXRlbScpO1xuICAgICAgICBjb25zdCBkaXZJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2SW1nLmNsYXNzTGlzdC5hZGQoJ2NhcmRJbWcnKTtcbiAgICAgICAgZGl2SW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5pbWFnZS5vcmlnaW5hbH0pYDtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBoMS5jbGFzc0xpc3QuYWRkKCdjYXJkTmFtZScpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IGVsLm5hbWU7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG4gICAgICAgIHN0YXJDb3VudC50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICBjb25zdCBzdGFyQm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdzdGFyQm9yZGVyJyk7XG4gICAgICAgIHN0YXJCb3JkZXIudGV4dENvbnRlbnQgPSAnc3Rhcl9ib3JkZXInO1xuICAgICAgICBzdGFyQm9yZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG5cbiAgICAgICAgLy8gTGlrZSBFdmVudFxuICAgICAgICBzdGFyQm9yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHBvc3RMaWtlKGVsLmlkKTtcbiAgICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2VkJyk7XG4gICAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRCdG4nKTtcbiAgICAgICAgY0J0bi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kKHN0YXJSYXRlLCBzdGFyQ291bnQsIHN0YXJCb3JkZXIpO1xuICAgICAgICBkaXYuYXBwZW5kKGRpdkltZywgc3RhckNvbnRhaW5lciwgaDEsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcblxuICAgICAgICAvLyBQb3AtdXAgdHJpZ2dlciBldmVudFxuICAgICAgICBjb25zdCBzaG93RGF0YSA9IGVsO1xuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNob3dEYXRhKTtcbiAgICAgICAgICBzaG93UG9wdXAoc2hvd0RhdGEsIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRVUkwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cyc7XG4gIGNyZWF0ZUVsZW1lbnRGb3JTaG93cyhkZWZhdWx0VVJMKTtcbiAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG59O1xuXG4vLyBIb21lcGFnZSBMaW5rXG5jb25zdCBoMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XG5oMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=