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
const rootUrl = 'https://api.tvmaze.com/search/shows?q=';
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
      data.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('cardItem');
        const divImg = document.createElement('div');
        divImg.classList.add('cardImg');
        divImg.style.backgroundImage = `url(${el.show.image.original})`;
        const h1 = document.createElement('h1');
        h1.classList.add('cardName');
        h1.textContent = el.show.name;

        const starContainer = document.createElement('div');
        starContainer.classList.add('starContainer');

        const starRate = document.createElement('span');
        starRate.classList.add('material-icons-round');
        starRate.classList.add('icons');
        starRate.classList.add('starRate');
        starRate.textContent = 'star_rate';

        const starCount = document.createElement('span');
        starCount.classList.add('starCount');
        starCount.setAttribute('id', el.show.id);
        starCount.textContent = '0';

        const starBorder = document.createElement('span');
        starBorder.classList.add('material-icons-round');
        starBorder.classList.add('icons');
        starBorder.classList.add('starBorder');
        starBorder.textContent = 'star_border';
        starBorder.setAttribute('id', el.show.id);

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
        div.append(divImg, starContainer, h1, cBtn);
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

  // Add event listener
  searchCloseBtn.onclick = () => {
    searchBarContainer.classList.add('hide');
  };

  if (searchInput.value) {
    query = searchInput.value;
    searchInput.value = '';
  }
  if (!searchInput.value) {
    window.onload();
  }
  createElement(`${rootUrl}${query}`);
  updateLikes();
};

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
    createElement(`${rootUrl}${query}`);
    updateLikes();
  };
}

// Enter Keyboard Support - Search
window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    query = searchInput.value;
    searchInput.value = '';
    createElement(`${rootUrl}${query}`);
    updateLikes();
  }
  if (!searchInput.value) {
    window.onload();
  }
});

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
      });
    });
};

window.onload = () => {
  const defaultURL = 'https://api.tvmaze.com/shows';
  createElementForShows(defaultURL);
  setTimeout(updateLikes, 1000);
};

// // Homepage Link
const h1 = document.querySelector('h1');
h1.addEventListener('click', () => {
  window.location.reload();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQSx5RkFBeUYsTUFBTTtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwyQkFBMkIsaUJBQWlCO0FBQzVDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBHQUEwRyxNQUFNO0FBQ2hIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7OztVQ052QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDb0I7QUFDb0I7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLGlFQUFRO0FBQ2pDO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx1QkFBdUI7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsaUVBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxZQUFZO0FBQ25FLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFFBQVEsRUFBRSxNQUFNO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLEVBQUUsTUFBTTtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLEVBQUUsTUFBTTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0JBQWtCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGlFQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTtBQUNuRSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2ludm9sdmVtZW50LmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy90dm1hemUuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcG9zdExpa2UgPSBhc3luYyAoaXRlbUlEKSA9PiB7XG4gIGNvbnN0IGFwcElEID0gJ09RQ2w1eUVYZjNHeEpocGFzRUhWJztcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7YXBwSUR9L2xpa2VzYDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBpdGVtSUQgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBhcHBJRCA9ICdPUUNsNXlFWGYzR3hKaHBhc0VIVic7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyR7YXBwSUR9L2xpa2VzYCk7XG4gIGNvbnN0IGxpa2VzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gbGlrZXM7XG59O1xuXG5leHBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfTsiLCJjb25zdCBnZXREYXRhID0gYXN5bmMgKHVybCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IGdldERhdGEgZnJvbSAnLi9tb2R1bGVzL3R2bWF6ZS5qcyc7XG5pbXBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfSBmcm9tICcuL21vZHVsZXMvaW52b2x2ZW1lbnQuanMnO1xuLy8gaW1wb3J0IGFkZEVsZW0gZnJvbSAnLi9tb2R1bGVzL2FkZC1lbGVtLmpzJztcblxuLy8gU2VhcmNoIGJ1dHRvblxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBzZWFyY2hCYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpO1xuY29uc3Qgc2VhcmNoQ2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWNsb3NlLWJ0bicpO1xuY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1pY29uJyk7XG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcblxuLy8gU2VhcmNoIEJhciBGb3IgRGVza3RvcFxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgY29uc3QgbWVudVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG1lbnVUZXh0LnN0eWxlLmZvbnRTaXplID0gJzEuMjVyZW0nO1xuICBtZW51VGV4dC50ZXh0Q29udGVudCArPSAnTWVudSc7XG4gIG1lbnVJY29uLmFwcGVuZChtZW51VGV4dCk7XG4gIHNlYXJjaENsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgc2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgLy8gQWRkIFNlYXJjaCBJY29uXG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uY2xhc3NMaXN0LmFkZCgnc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BTcGFuLnRleHRDb250ZW50ID0gJ3NlYXJjaCc7XG5cbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uYXBwZW5kKHNlYXJjaEljb25EZXNrdG9wU3Bhbik7XG4gIGhlYWRlci5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BCdG4pO1xufVxuXG4vLyBHZXQgRGF0YSBmcm9tIFRWTUFaRSBBUElcbmNvbnN0IHJvb3RVcmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zZWFyY2gvc2hvd3M/cT0nO1xuY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG5sZXQgcXVlcnkgPSAnJztcblxuLy8gVXBkYXRlIExpa2VzXG5jb25zdCB1cGRhdGVMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhckNvdW50JykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHJlc3BvbnNlW2ldLml0ZW1faWQgPT09IE51bWJlcihidXR0b24uaWQpKSB7XG4gICAgICAgIGJ1dHRvbi5sYXN0Q2hpbGQudGV4dENvbnRlbnQgPSByZXNwb25zZVtpXS5saWtlcztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRGlzcGxheSBDYXJkcyBEeW5hbWljYWxseVxuY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgZGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLnNob3cuaW1hZ2Uub3JpZ2luYWx9KWA7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgaDEuY2xhc3NMaXN0LmFkZCgnY2FyZE5hbWUnKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBlbC5zaG93Lm5hbWU7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5zaG93LmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLnNob3cuaWQpO1xuXG4gICAgICAgIC8vIExpa2UgRXZlbnRcbiAgICAgICAgc3RhckJvcmRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBwb3N0TGlrZShlbC5zaG93LmlkKTtcbiAgICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2VkJyk7XG4gICAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRCdG4nKTtcbiAgICAgICAgY0J0bi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kKHN0YXJSYXRlLCBzdGFyQ291bnQsIHN0YXJCb3JkZXIpO1xuICAgICAgICBkaXYuYXBwZW5kKGRpdkltZywgc3RhckNvbnRhaW5lciwgaDEsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cbi8vIFNlYXJjaCBFdmVudCAtIE1vYmlsZSBWZXJzaW9uXG5zZWFyY2hJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyXG4gIHNlYXJjaENsb3NlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfTtcblxuICBpZiAoc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gIH1cbiAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgIHdpbmRvdy5vbmxvYWQoKTtcbiAgfVxuICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX1gKTtcbiAgdXBkYXRlTGlrZXMoKTtcbn07XG5cbi8vIFNlYXJjaCBFdmVudCAtIERlc2t0b3AgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgd2luZG93Lm9ubG9hZCgpO1xuICAgIH1cbiAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX1gKTtcbiAgICB1cGRhdGVMaWtlcygpO1xuICB9O1xufVxuXG4vLyBFbnRlciBLZXlib2FyZCBTdXBwb3J0IC0gU2VhcmNoXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9YCk7XG4gICAgdXBkYXRlTGlrZXMoKTtcbiAgfVxuICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgd2luZG93Lm9ubG9hZCgpO1xuICB9XG59KTtcblxuLy8gRGVmYXVsdCBTZWFyY2ggT24gUGFnZSBMb2FkXG5jb25zdCBjcmVhdGVFbGVtZW50Rm9yU2hvd3MgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgZGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgICAgIGgxLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgxLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMSwgY0J0bik7XG4gICAgICAgIGNhcmRzLmFwcGVuZChkaXYpO1xuICAgICAgICBzZWFyY2hDb3VudCArPSAxO1xuICAgICAgICBzZWFyY2hSZXN1bHRzLnRleHRDb250ZW50ID0gYFNlYXJjaCBSZXN1bHRzICgke3NlYXJjaENvdW50fSlgO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBjb25zdCBkZWZhdWx0VVJMID0gJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MnO1xuICBjcmVhdGVFbGVtZW50Rm9yU2hvd3MoZGVmYXVsdFVSTCk7XG4gIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xufTtcblxuLy8gLy8gSG9tZXBhZ2UgTGlua1xuY29uc3QgaDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpO1xuaDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==