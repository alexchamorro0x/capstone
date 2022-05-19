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
/* harmony export */   "getComments": () => (/* binding */ getComments),
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "postComment": () => (/* binding */ postComment),
/* harmony export */   "postLike": () => (/* binding */ postLike)
/* harmony export */ });
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'OQCl5yEXf3GxJhpasEHV';

const postLike = async (itemID) => {
  const response = await fetch(`${url}${appID}/likes`, {
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
  const response = await fetch(`${url}${appID}/likes`);
  const likes = await response.json();
  return likes;
};

const postComment = async (_id, _name, _comment) => {
  const response = await fetch(`${url}${appID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: _id,
      username: _name,
      comment: _comment,
    }),
  });
  const post = await response.text();
  return post;
};

const getComments = async (_id) => {
  const response = await fetch(`${url}${appID}/comments?item_id=${_id}`);
  const comments = await response.json();
  return comments;
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
/* harmony import */ var _involvement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./involvement.js */ "./src/modules/involvement.js");



const clearPopups = () => {
  const popupContainer = document.querySelectorAll('.popup-container');

  if (popupContainer) {
    popupContainer.forEach((e) => {
      e.remove();
    });
  }
};

const updateComments = async (_id, _container) => {
  let comments = await (0,_involvement_js__WEBPACK_IMPORTED_MODULE_1__.getComments)(_id);
  comments = Array.isArray(comments) ? comments : [];

  // Add comments section to the container
  const newContent = document.createElement('div');
  newContent.innerHTML = `
    <div class="comments-current flex-column">
      <h3>Reviews (${comments.length})</h3>
      <div class="comments-all flex-column"></div>
    </div>
    <div class="comments-add flex-column">
      <h3>Add a review</h3>
      <form class="form-add-comment flex-column" action="">
        <input class="input-comment-name" type="text" placeholder="Your name" required>
        <textarea
          class="input-comment-insight"
          placeholder="Your insights"
          rows="6"
          required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>`;

  _container.innerHTML = '';
  _container.appendChild(newContent);

  // Generate current comments
  const commentsAll = document.querySelector('.comments-all');
  if (comments) {
    comments.forEach((comment) => {
      commentsAll.innerHTML += `
        <div class="comment-instance flex-column">
          <h4 class="comment-name">${comment.username}</h4>
          <span class="comment-date">${comment.creation_date}</span>
          <p class="comment-content">${comment.comment}</p>
        </div>`;
    });
  }

  // Add form event listener
  const form = document.querySelector('.form-add-comment');
  const inputName = form.querySelector('.input-comment-name');
  const inputInsight = form.querySelector('.input-comment-insight');

  form.onsubmit = (e) => {
    e.preventDefault();
    (0,_involvement_js__WEBPACK_IMPORTED_MODULE_1__.postComment)(_id, inputName.value, inputInsight.value);

    form.reset();
    setTimeout(() => updateComments(_id, _container), 1000);
  };
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
    <div class="summary">${_showData.summary}</div>
    <hr>
    <div class="comments-container"></div>`;

  // Generate genres
  const genres = document.querySelector('.genres');
  _showData.genres.forEach((genre) => {
    genres.innerHTML += `<div class="tag-genre">${genre}</div>`;
  });

  // Generate comments
  const commentsContainer = document.querySelector('.comments-container');
  updateComments(_showData.id, commentsContainer);

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





// Search button
const searchIcon = document.querySelector('#search-btn');
const searchBarContainer = document.querySelector('.search-bar');
const searchCloseBtn = document.querySelector('#search-close-btn');
const menuIcon = document.querySelector('#menu-icon');
const header = document.querySelector('header');
const searchInput = document.querySelector('#search-input');

// Search Bar For Desktop
window.onresize = () => {
  window.location.reload();
};

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
        const h2 = document.createElement('h2');
        h2.classList.add('cardName');
        h2.textContent = `S${el.season}E${el.number} ${el.name}`;
        const details = document.createElement('p');
        details.classList.add('cardDetails');
        details.innerHTML = `Plot Summary: <br>${el.summary}`;
        const h3 = document.createElement('h3');
        h3.classList.add('cardRuntime');
        h3.textContent = `Runtime: ${el.runtime} mins Rating: ${el.rating.average}`;

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
        div.append(divImg, starContainer, h2, h3, details, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;
      });
    });
};

// Search Event - Mobile Version
if (window.innerWidth < 768) {
  searchIcon.onclick = () => {
    searchBarContainer.classList.remove('hide');

    // // Add event listener
    searchCloseBtn.onclick = () => {
      searchBarContainer.classList.add('hide');
    };
  };

  searchInput.oninput = () => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (!searchInput.value) {
          return null;
        }
        searchBarContainer.classList.add('hide');
        query = searchInput.value;
        searchInput.value = '';
        createElement(`${rootUrl}${query}&embed=episodes`);
        updateLikes();
      }
      return null;
    });
  };
}

// Search Event - Desktop Version
if (window.innerWidth > 768) {
  const searchIconDesktopBtn = document.querySelector('.searchIconDesktopBtn');
  searchIconDesktopBtn.onclick = () => {
    if (searchInput.value) {
      query = searchInput.value;
      searchInput.value = '';
      createElement(`${rootUrl}${query}&embed=episodes`);
      updateLikes();
    }
    if (!searchInput.value) {
      return null;
    }
    return null;
  };

  searchInput.oninput = () => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (!searchInput.value) {
          return null;
        }
        query = searchInput.value;
        searchInput.value = '';
        createElement(`${rootUrl}${query}&embed=episodes`);
        updateLikes();
      }
      return null;
    });
  };
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
        const h2 = document.createElement('h2');
        h2.classList.add('cardName');
        h2.textContent = el.name;

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
        div.append(divImg, starContainer, h2, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;

        // Pop-up trigger event
        const showData = el;
        div.addEventListener('click', (e) => {
          if (!e.target.matches('.starBorder')) {
            // console.log(e.target);
            (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_3__.showPopup)(showData, e.target.closest('.cardItem').getBoundingClientRect());
          }
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

// Event listener on the document
// If the click is not on the cardItem and not on the popup-container, clear the popups
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cardItem') && !e.target.closest('.popup-container')) {
    (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_3__.clearPopups)();
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxFQUFFLE1BQU07QUFDekM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGtCQUFrQjtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxpRUFBUTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFlBQVk7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDREQUFTO0FBQ3JCO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFXO0FBQ2Y7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9hZGQtZWxlbS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvaW52b2x2ZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL3BvcHVwLmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy90dm1hemUuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gU2hvcnRoYW5kIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIERPTSBlbGVtZW50XG4vLyBlbGVtID0gc3RyaW5nLCBjbGFzc2VzID0gYXJyYXkgb2Ygc3RyaW5nKHMpLCBwYXJlbnQgPSBET00gZWxlbWVudFxuY29uc3QgYWRkRWxlbSA9IChlbGVtLCBjbGFzc2VzLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgY3JlYXRlZEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW0pO1xuICBpZiAoY2xhc3NlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2xhc3Nlcy5mb3JFYWNoKChjbCkgPT4gY3JlYXRlZEVsZW0uY2xhc3NMaXN0LmFkZChjbCkpO1xuICB9XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjcmVhdGVkRWxlbSk7XG5cbiAgcmV0dXJuIGNyZWF0ZWRFbGVtO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRkRWxlbTtcbiIsImNvbnN0IHVybCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy8nO1xuY29uc3QgYXBwSUQgPSAnT1FDbDV5RVhmM0d4SmhwYXNFSFYnO1xuXG5jb25zdCBwb3N0TGlrZSA9IGFzeW5jIChpdGVtSUQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vbGlrZXNgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgaXRlbV9pZDogaXRlbUlEIH0pLFxuICB9KTtcbiAgY29uc3QgcG9zdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgcmV0dXJuIHBvc3Q7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vbGlrZXNgKTtcbiAgY29uc3QgbGlrZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBsaWtlcztcbn07XG5cbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKF9pZCwgX25hbWUsIF9jb21tZW50KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2NvbW1lbnRzYCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBfaWQsXG4gICAgICB1c2VybmFtZTogX25hbWUsXG4gICAgICBjb21tZW50OiBfY29tbWVudCxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IHBvc3QgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIHJldHVybiBwb3N0O1xufTtcblxuY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoX2lkKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2NvbW1lbnRzP2l0ZW1faWQ9JHtfaWR9YCk7XG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gY29tbWVudHM7XG59O1xuXG5leHBvcnQge1xuICBwb3N0TGlrZSxcbiAgZ2V0TGlrZXMsXG4gIHBvc3RDb21tZW50LFxuICBnZXRDb21tZW50cyxcbn07XG4iLCJpbXBvcnQgYWRkRWxlbSBmcm9tICcuL2FkZC1lbGVtLmpzJztcbmltcG9ydCB7IHBvc3RDb21tZW50LCBnZXRDb21tZW50cyB9IGZyb20gJy4vaW52b2x2ZW1lbnQuanMnO1xuXG5jb25zdCBjbGVhclBvcHVwcyA9ICgpID0+IHtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAtY29udGFpbmVyJyk7XG5cbiAgaWYgKHBvcHVwQ29udGFpbmVyKSB7XG4gICAgcG9wdXBDb250YWluZXIuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAoX2lkLCBfY29udGFpbmVyKSA9PiB7XG4gIGxldCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKF9pZCk7XG4gIGNvbW1lbnRzID0gQXJyYXkuaXNBcnJheShjb21tZW50cykgPyBjb21tZW50cyA6IFtdO1xuXG4gIC8vIEFkZCBjb21tZW50cyBzZWN0aW9uIHRvIHRoZSBjb250YWluZXJcbiAgY29uc3QgbmV3Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBuZXdDb250ZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtY3VycmVudCBmbGV4LWNvbHVtblwiPlxuICAgICAgPGgzPlJldmlld3MgKCR7Y29tbWVudHMubGVuZ3RofSk8L2gzPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWFsbCBmbGV4LWNvbHVtblwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1hZGQgZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMz5BZGQgYSByZXZpZXc8L2gzPlxuICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLWFkZC1jb21tZW50IGZsZXgtY29sdW1uXCIgYWN0aW9uPVwiXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LWNvbW1lbnQtbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIiByZXF1aXJlZD5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgY2xhc3M9XCJpbnB1dC1jb21tZW50LWluc2lnaHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiWW91ciBpbnNpZ2h0c1wiXG4gICAgICAgICAgcm93cz1cIjZcIlxuICAgICAgICAgIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PmA7XG5cbiAgX2NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgX2NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdDb250ZW50KTtcblxuICAvLyBHZW5lcmF0ZSBjdXJyZW50IGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWFsbCcpO1xuICBpZiAoY29tbWVudHMpIHtcbiAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICBjb21tZW50c0FsbC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbnN0YW5jZSBmbGV4LWNvbHVtblwiPlxuICAgICAgICAgIDxoNCBjbGFzcz1cImNvbW1lbnQtbmFtZVwiPiR7Y29tbWVudC51c2VybmFtZX08L2g0PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+JHtjb21tZW50LmNvbW1lbnR9PC9wPlxuICAgICAgICA8L2Rpdj5gO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQWRkIGZvcm0gZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFkZC1jb21tZW50Jyk7XG4gIGNvbnN0IGlucHV0TmFtZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmlucHV0LWNvbW1lbnQtbmFtZScpO1xuICBjb25zdCBpbnB1dEluc2lnaHQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1jb21tZW50LWluc2lnaHQnKTtcblxuICBmb3JtLm9uc3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zdENvbW1lbnQoX2lkLCBpbnB1dE5hbWUudmFsdWUsIGlucHV0SW5zaWdodC52YWx1ZSk7XG5cbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGVDb21tZW50cyhfaWQsIF9jb250YWluZXIpLCAxMDAwKTtcbiAgfTtcbn07XG5cbmNvbnN0IHNob3dQb3B1cCA9IChfc2hvd0RhdGEsIF9kb21SZWN0KSA9PiB7XG4gIC8vIENsZWFyIGFsbCBvdGhlciBwb3AtdXBzIGlmIGFueVxuICBjbGVhclBvcHVwcygpO1xuICAvLyBDYWxjdWxhdGUgeSBwb3NpdGlvblxuICBjb25zdCBwb3NZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgX2RvbVJlY3QueSAtIDUwO1xuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25zXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gYWRkRWxlbSgnZGl2JywgWydwb3B1cC1jb250YWluZXInXSwgbWFpbik7XG4gIHBvcHVwQ29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3Bvc1l9cHhgO1xuXG4gIHBvcHVwQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2UtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgtY29sdW1uXCI+XG4gICAgICA8aDI+JHtfc2hvd0RhdGEubmFtZX08L2gyPlxuICAgICAgPGRpdiBjbGFzcz1cInN1Yi10aXRsZSBmbGV4LXJvd1wiPlxuICAgICAgICA8c3Bhbj4ke19zaG93RGF0YS5wcmVtaWVyZWQuc3Vic3RyaW5nKDAsIDQpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+Jm1pZGRvdDs8L3NwYW4+XG4gICAgICAgIDxzcGFuPiR7X3Nob3dEYXRhLnN0YXR1c308L3NwYW4+XG4gICAgICAgIDxzcGFuPiZtaWRkb3Q7PC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLXJvdW5kIGljb25zXCI+c3Rhcjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhdGluZ1wiPiR7X3Nob3dEYXRhLnJhdGluZy5hdmVyYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj4vMTA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGltZyBjbGFzcz1cInBvcHVwLWltZ1wiIHNyYz1cIiR7X3Nob3dEYXRhLmltYWdlLm9yaWdpbmFsfVwiIGFsdD1cInNob3cgdGh1bWJuYWlsXCI+XG4gICAgPGRpdiBjbGFzcz1cImdlbnJlcyBmbGV4LXJvd1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdW1tYXJ5XCI+JHtfc2hvd0RhdGEuc3VtbWFyeX08L2Rpdj5cbiAgICA8aHI+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWNvbnRhaW5lclwiPjwvZGl2PmA7XG5cbiAgLy8gR2VuZXJhdGUgZ2VucmVzXG4gIGNvbnN0IGdlbnJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZW5yZXMnKTtcbiAgX3Nob3dEYXRhLmdlbnJlcy5mb3JFYWNoKChnZW5yZSkgPT4ge1xuICAgIGdlbnJlcy5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJ0YWctZ2VucmVcIj4ke2dlbnJlfTwvZGl2PmA7XG4gIH0pO1xuXG4gIC8vIEdlbmVyYXRlIGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvbnRhaW5lcicpO1xuICB1cGRhdGVDb21tZW50cyhfc2hvd0RhdGEuaWQsIGNvbW1lbnRzQ29udGFpbmVyKTtcblxuICAvLyBDbG9zZSBidXR0b24gZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgcG9wdXBDbG9zZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jbG9zZS1jb250YWluZXInKTtcbiAgY29uc3QgcG9wdXBDbG9zZSA9IGFkZEVsZW0oJ2J1dHRvbicsIFsncG9wdXAtY2xvc2UnXSwgcG9wdXBDbG9zZUNvbnRhaW5lcik7XG4gIGNvbnN0IGNsb3NlSWNvbiA9IGFkZEVsZW0oJ3NwYW4nLCBbJ21hdGVyaWFsLWljb25zLXJvdW5kJywgJ2ljb25zJ10sIHBvcHVwQ2xvc2UpO1xuICBjbG9zZUljb24udGV4dENvbnRlbnQgPSAnY2xvc2UnO1xuXG4gIHBvcHVwQ2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNob3dQb3B1cCwgY2xlYXJQb3B1cHMgfTtcbiIsImNvbnN0IGdldERhdGEgPSBhc3luYyAodXJsKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXREYXRhO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL21vZHVsZXMvdHZtYXplLmpzJztcbmltcG9ydCB7IGdldExpa2VzLCBwb3N0TGlrZSB9IGZyb20gJy4vbW9kdWxlcy9pbnZvbHZlbWVudC5qcyc7XG5pbXBvcnQgeyBzaG93UG9wdXAsIGNsZWFyUG9wdXBzIH0gZnJvbSAnLi9tb2R1bGVzL3BvcHVwLmpzJztcblxuLy8gU2VhcmNoIGJ1dHRvblxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBzZWFyY2hCYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpO1xuY29uc3Qgc2VhcmNoQ2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWNsb3NlLWJ0bicpO1xuY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1pY29uJyk7XG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuXG4vLyBTZWFyY2ggQmFyIEZvciBEZXNrdG9wXG53aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn07XG5cbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBtZW51SWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIGNvbnN0IG1lbnVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBtZW51VGV4dC5zdHlsZS5mb250U2l6ZSA9ICcxLjI1cmVtJztcbiAgbWVudVRleHQudGV4dENvbnRlbnQgKz0gJ01lbnUnO1xuICBtZW51SWNvbi5hcHBlbmQobWVudVRleHQpO1xuICBzZWFyY2hDbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIHNlYXJjaEljb24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXG4gIC8vIEFkZCBTZWFyY2ggSWNvblxuICBjb25zdCBzZWFyY2hJY29uRGVza3RvcEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3NlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BTcGFuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJywgJ2ljb25zJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wU3Bhbi50ZXh0Q29udGVudCA9ICdzZWFyY2gnO1xuXG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLmFwcGVuZChzZWFyY2hJY29uRGVza3RvcFNwYW4pO1xuICBoZWFkZXIuYXBwZW5kKHNlYXJjaEljb25EZXNrdG9wQnRuKTtcbn1cblxuLy8gR2V0IERhdGEgZnJvbSBUVk1BWkUgQVBJXG5jb25zdCByb290VXJsID0gJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2luZ2xlc2VhcmNoL3Nob3dzP3E9JztcbmNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMicpO1xubGV0IHF1ZXJ5ID0gJyc7XG5cbi8vIFVwZGF0ZSBMaWtlc1xuY29uc3QgdXBkYXRlTGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0TGlrZXMoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXJDb3VudCcpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChyZXNwb25zZVtpXS5pdGVtX2lkID09PSBOdW1iZXIoYnV0dG9uLmlkKSkge1xuICAgICAgICBidXR0b24ubGFzdENoaWxkLnRleHRDb250ZW50ID0gcmVzcG9uc2VbaV0ubGlrZXM7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbi8vIERpc3BsYXkgQ2FyZHMgRHluYW1pY2FsbHlcbmNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzJyk7XG5jb25zdCBjcmVhdGVFbGVtZW50ID0gYXN5bmMgKHJlcXVlc3RVUkwpID0+IHtcbiAgY2FyZHMuaW5uZXJIVE1MID0gJyc7XG4gIGF3YWl0IGdldERhdGEocmVxdWVzdFVSTClcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgbGV0IHNlYXJjaENvdW50ID0gMDtcbiAgICAgIGNvbnN0IGRhdGFBcnJheSA9IGRhdGEuX2VtYmVkZGVkLmVwaXNvZGVzO1xuICAgICAgZGF0YUFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2FyZEl0ZW0nKTtcbiAgICAgICAgY29uc3QgZGl2SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkltZy5jbGFzc0xpc3QuYWRkKCdjYXJkSW1nJyk7XG4gICAgICAgIGRpdkltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZWwuaW1hZ2Uub3JpZ2luYWx9KWA7XG4gICAgICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgaDIuY2xhc3NMaXN0LmFkZCgnY2FyZE5hbWUnKTtcbiAgICAgICAgaDIudGV4dENvbnRlbnQgPSBgUyR7ZWwuc2Vhc29ufUUke2VsLm51bWJlcn0gJHtlbC5uYW1lfWA7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGRldGFpbHMuY2xhc3NMaXN0LmFkZCgnY2FyZERldGFpbHMnKTtcbiAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgUGxvdCBTdW1tYXJ5OiA8YnI+JHtlbC5zdW1tYXJ5fWA7XG4gICAgICAgIGNvbnN0IGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgaDMuY2xhc3NMaXN0LmFkZCgnY2FyZFJ1bnRpbWUnKTtcbiAgICAgICAgaDMudGV4dENvbnRlbnQgPSBgUnVudGltZTogJHtlbC5ydW50aW1lfSBtaW5zIFJhdGluZzogJHtlbC5yYXRpbmcuYXZlcmFnZX1gO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdGFyQ29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhclJhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ3N0YXJSYXRlJyk7XG4gICAgICAgIHN0YXJSYXRlLnRleHRDb250ZW50ID0gJ3N0YXJfcmF0ZSc7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQ291bnQuY2xhc3NMaXN0LmFkZCgnc3RhckNvdW50Jyk7XG4gICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuICAgICAgICBzdGFyQ291bnQudGV4dENvbnRlbnQgPSAnMCc7XG5cbiAgICAgICAgY29uc3Qgc3RhckJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnc3RhckJvcmRlcicpO1xuICAgICAgICBzdGFyQm9yZGVyLnRleHRDb250ZW50ID0gJ3N0YXJfYm9yZGVyJztcbiAgICAgICAgc3RhckJvcmRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuXG4gICAgICAgIC8vIExpa2UgRXZlbnRcbiAgICAgICAgc3RhckJvcmRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBwb3N0TGlrZShlbC5zaG93LmlkKTtcbiAgICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2VkJyk7XG4gICAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRCdG4nKTtcbiAgICAgICAgY0J0bi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kKHN0YXJSYXRlLCBzdGFyQ291bnQsIHN0YXJCb3JkZXIpO1xuICAgICAgICBkaXYuYXBwZW5kKGRpdkltZywgc3RhckNvbnRhaW5lciwgaDIsIGgzLCBkZXRhaWxzLCBjQnRuKTtcbiAgICAgICAgY2FyZHMuYXBwZW5kKGRpdik7XG4gICAgICAgIHNlYXJjaENvdW50ICs9IDE7XG4gICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSBgU2VhcmNoIFJlc3VsdHMgKCR7c2VhcmNoQ291bnR9KWA7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIFNlYXJjaCBFdmVudCAtIE1vYmlsZSBWZXJzaW9uXG5pZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgc2VhcmNoSWNvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICAvLyAvLyBBZGQgZXZlbnQgbGlzdGVuZXJcbiAgICBzZWFyY2hDbG9zZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9O1xuICB9O1xuXG4gIHNlYXJjaElucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICAgIHVwZGF0ZUxpa2VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfTtcbn1cblxuLy8gU2VhcmNoIEV2ZW50IC0gRGVza3RvcCBWZXJzaW9uXG5pZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICB1cGRhdGVMaWtlcygpO1xuICAgIH1cbiAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgc2VhcmNoSW5wdXQub25pbnB1dCA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGlmICghc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICB9O1xufVxuXG4vLyBEZWZhdWx0IFNlYXJjaCBPbiBQYWdlIExvYWRcbmNvbnN0IGNyZWF0ZUVsZW1lbnRGb3JTaG93cyA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBkYXRhLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2FyZEl0ZW0nKTtcbiAgICAgICAgY29uc3QgZGl2SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkltZy5jbGFzc0xpc3QuYWRkKCdjYXJkSW1nJyk7XG4gICAgICAgIGRpdkltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZWwuaW1hZ2Uub3JpZ2luYWx9KWA7XG4gICAgICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgaDIuY2xhc3NMaXN0LmFkZCgnY2FyZE5hbWUnKTtcbiAgICAgICAgaDIudGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdGFyQ29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhclJhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ3N0YXJSYXRlJyk7XG4gICAgICAgIHN0YXJSYXRlLnRleHRDb250ZW50ID0gJ3N0YXJfcmF0ZSc7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQ291bnQuY2xhc3NMaXN0LmFkZCgnc3RhckNvdW50Jyk7XG4gICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuICAgICAgICBzdGFyQ291bnQudGV4dENvbnRlbnQgPSAnMCc7XG5cbiAgICAgICAgY29uc3Qgc3RhckJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnc3RhckJvcmRlcicpO1xuICAgICAgICBzdGFyQm9yZGVyLnRleHRDb250ZW50ID0gJ3N0YXJfYm9yZGVyJztcbiAgICAgICAgc3RhckJvcmRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuXG4gICAgICAgIC8vIExpa2UgRXZlbnRcbiAgICAgICAgc3RhckJvcmRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBwb3N0TGlrZShlbC5pZCk7XG4gICAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QudG9nZ2xlKCdsaWtlZCcpO1xuICAgICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY0J0bi5jbGFzc0xpc3QuYWRkKCdjb21tZW50QnRuJyk7XG4gICAgICAgIGNCdG4udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmFwcGVuZChzdGFyUmF0ZSwgc3RhckNvdW50LCBzdGFyQm9yZGVyKTtcbiAgICAgICAgZGl2LmFwcGVuZChkaXZJbWcsIHN0YXJDb250YWluZXIsIGgyLCBjQnRuKTtcbiAgICAgICAgY2FyZHMuYXBwZW5kKGRpdik7XG4gICAgICAgIHNlYXJjaENvdW50ICs9IDE7XG4gICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSBgU2VhcmNoIFJlc3VsdHMgKCR7c2VhcmNoQ291bnR9KWA7XG5cbiAgICAgICAgLy8gUG9wLXVwIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgY29uc3Qgc2hvd0RhdGEgPSBlbDtcbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoJy5zdGFyQm9yZGVyJykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNob3dQb3B1cChzaG93RGF0YSwgZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRVUkwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cyc7XG4gIGNyZWF0ZUVsZW1lbnRGb3JTaG93cyhkZWZhdWx0VVJMKTtcbiAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG59O1xuXG4vLyBIb21lcGFnZSBMaW5rXG5jb25zdCBoMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XG5oMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG5cbi8vIEV2ZW50IGxpc3RlbmVyIG9uIHRoZSBkb2N1bWVudFxuLy8gSWYgdGhlIGNsaWNrIGlzIG5vdCBvbiB0aGUgY2FyZEl0ZW0gYW5kIG5vdCBvbiB0aGUgcG9wdXAtY29udGFpbmVyLCBjbGVhciB0aGUgcG9wdXBzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1jb250YWluZXInKSkge1xuICAgIGNsZWFyUG9wdXBzKCk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9