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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWnZCO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsSUFBSSxFQUFFLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDJCQUEyQixpQkFBaUI7QUFDNUMsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxJQUFJLEVBQUUsTUFBTTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsSUFBSSxFQUFFLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLElBQUk7QUFDdEU7QUFDQTtBQUNBOztBQU9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRGtDO0FBQ3dCOztBQUU1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDREQUFXO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGlCQUFpQjtBQUN0RCx1Q0FBdUMsc0JBQXNCO0FBQzdELHVDQUF1QyxnQkFBZ0I7QUFDdkQ7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksNERBQVc7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLHdEQUFPO0FBQ2hDLGdDQUFnQyxLQUFLOztBQUVyQztBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0I7QUFDQSxnQkFBZ0Isb0NBQW9DO0FBQ3BELHNCQUFzQjtBQUN0QixnQkFBZ0IsaUJBQWlCO0FBQ2pDLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUNBQWlDLHlCQUF5QjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5QkFBeUI7QUFDM0Q7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELE1BQU07QUFDeEQsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQix3REFBTztBQUM1QixvQkFBb0Isd0RBQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWtDOzs7Ozs7Ozs7Ozs7Ozs7QUN6SGxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7O1VDTnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDb0I7QUFDb0I7QUFDRjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixpRUFBUTtBQUNqQztBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxrQkFBa0I7QUFDaEU7QUFDQTtBQUNBLDZCQUE2QixVQUFVLEdBQUcsV0FBVyxFQUFFLFFBQVE7QUFDL0Q7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEO0FBQ0E7QUFDQSxxQ0FBcUMsWUFBWSxlQUFlLGtCQUFrQjs7QUFFbEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxpRUFBUTtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFlBQVk7QUFDbkUsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRLEVBQUUsTUFBTTtBQUN2QztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUSxFQUFFLE1BQU07QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRLEVBQUUsTUFBTTtBQUN2QztBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxrQkFBa0I7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsaUVBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxZQUFZOztBQUVuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0REFBUztBQUNyQjtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBVztBQUNmO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvYWRkLWVsZW0uanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2ludm9sdmVtZW50LmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9wb3B1cC5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvdHZtYXplLmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFNob3J0aGFuZCBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBET00gZWxlbWVudFxuLy8gZWxlbSA9IHN0cmluZywgY2xhc3NlcyA9IGFycmF5IG9mIHN0cmluZyhzKSwgcGFyZW50ID0gRE9NIGVsZW1lbnRcbmNvbnN0IGFkZEVsZW0gPSAoZWxlbSwgY2xhc3NlcywgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGNyZWF0ZWRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtKTtcbiAgaWYgKGNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNsYXNzZXMuZm9yRWFjaCgoY2wpID0+IGNyZWF0ZWRFbGVtLmNsYXNzTGlzdC5hZGQoY2wpKTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlZEVsZW0pO1xuXG4gIHJldHVybiBjcmVhdGVkRWxlbTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZEVsZW07XG4iLCJjb25zdCB1cmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvJztcbmNvbnN0IGFwcElEID0gJ09RQ2w1eUVYZjNHeEpocGFzRUhWJztcblxuY29uc3QgcG9zdExpa2UgPSBhc3luYyAoaXRlbUlEKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2xpa2VzYCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGl0ZW1faWQ6IGl0ZW1JRCB9KSxcbiAgfSk7XG4gIGNvbnN0IHBvc3QgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIHJldHVybiBwb3N0O1xufTtcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2xpa2VzYCk7XG4gIGNvbnN0IGxpa2VzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gbGlrZXM7XG59O1xuXG5jb25zdCBwb3N0Q29tbWVudCA9IGFzeW5jIChfaWQsIF9uYW1lLCBfY29tbWVudCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9jb21tZW50c2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaXRlbV9pZDogX2lkLFxuICAgICAgdXNlcm5hbWU6IF9uYW1lLFxuICAgICAgY29tbWVudDogX2NvbW1lbnQsXG4gICAgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldENvbW1lbnRzID0gYXN5bmMgKF9pZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9jb21tZW50cz9pdGVtX2lkPSR7X2lkfWApO1xuICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGNvbW1lbnRzO1xufTtcblxuZXhwb3J0IHtcbiAgcG9zdExpa2UsXG4gIGdldExpa2VzLFxuICBwb3N0Q29tbWVudCxcbiAgZ2V0Q29tbWVudHMsXG59O1xuIiwiaW1wb3J0IGFkZEVsZW0gZnJvbSAnLi9hZGQtZWxlbS5qcyc7XG5pbXBvcnQgeyBwb3N0Q29tbWVudCwgZ2V0Q29tbWVudHMgfSBmcm9tICcuL2ludm9sdmVtZW50LmpzJztcblxuY29uc3QgY2xlYXJQb3B1cHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwLWNvbnRhaW5lcicpO1xuXG4gIGlmIChwb3B1cENvbnRhaW5lcikge1xuICAgIHBvcHVwQ29udGFpbmVyLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUNvbW1lbnRzID0gYXN5bmMgKF9pZCwgX2NvbnRhaW5lcikgPT4ge1xuICBsZXQgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyhfaWQpO1xuICBjb21tZW50cyA9IEFycmF5LmlzQXJyYXkoY29tbWVudHMpID8gY29tbWVudHMgOiBbXTtcblxuICAvLyBBZGQgY29tbWVudHMgc2VjdGlvbiB0byB0aGUgY29udGFpbmVyXG4gIGNvbnN0IG5ld0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbmV3Q29udGVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWN1cnJlbnQgZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMz5SZXZpZXdzICgke2NvbW1lbnRzLmxlbmd0aH0pPC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1hbGwgZmxleC1jb2x1bW5cIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtYWRkIGZsZXgtY29sdW1uXCI+XG4gICAgICA8aDM+QWRkIGEgcmV2aWV3PC9oMz5cbiAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1hZGQtY29tbWVudCBmbGV4LWNvbHVtblwiIGFjdGlvbj1cIlwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1jb21tZW50LW5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgcmVxdWlyZWQ+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtY29tbWVudC1pbnNpZ2h0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIlxuICAgICAgICAgIHJvd3M9XCI2XCJcbiAgICAgICAgICByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5gO1xuXG4gIF9jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIF9jb250YWluZXIuYXBwZW5kQ2hpbGQobmV3Q29udGVudCk7XG5cbiAgLy8gR2VuZXJhdGUgY3VycmVudCBjb21tZW50c1xuICBjb25zdCBjb21tZW50c0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1hbGwnKTtcbiAgaWYgKGNvbW1lbnRzKSB7XG4gICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgY29tbWVudHNBbGwuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW5zdGFuY2UgZmxleC1jb2x1bW5cIj5cbiAgICAgICAgICA8aDQgY2xhc3M9XCJjb21tZW50LW5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9PC9oND5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfTwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPiR7Y29tbWVudC5jb21tZW50fTwvcD5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFkZCBmb3JtIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hZGQtY29tbWVudCcpO1xuICBjb25zdCBpbnB1dE5hbWUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1jb21tZW50LW5hbWUnKTtcbiAgY29uc3QgaW5wdXRJbnNpZ2h0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtY29tbWVudC1pbnNpZ2h0Jyk7XG5cbiAgZm9ybS5vbnN1Ym1pdCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvc3RDb21tZW50KF9pZCwgaW5wdXROYW1lLnZhbHVlLCBpbnB1dEluc2lnaHQudmFsdWUpO1xuXG4gICAgZm9ybS5yZXNldCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlQ29tbWVudHMoX2lkLCBfY29udGFpbmVyKSwgMTAwMCk7XG4gIH07XG59O1xuXG5jb25zdCBzaG93UG9wdXAgPSAoX3Nob3dEYXRhLCBfZG9tUmVjdCkgPT4ge1xuICAvLyBDbGVhciBhbGwgb3RoZXIgcG9wLXVwcyBpZiBhbnlcbiAgY2xlYXJQb3B1cHMoKTtcbiAgLy8gQ2FsY3VsYXRlIHkgcG9zaXRpb25cbiAgY29uc3QgcG9zWSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIF9kb21SZWN0LnkgLSA1MDtcblxuICAvLyBET00gbWFuaXB1bGF0aW9uc1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGFkZEVsZW0oJ2RpdicsIFsncG9wdXAtY29udGFpbmVyJ10sIG1haW4pO1xuICBwb3B1cENvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtwb3NZfXB4YDtcblxuICBwb3B1cENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbHVtblwiPlxuICAgICAgPGgyPiR7X3Nob3dEYXRhLm5hbWV9PC9oMj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGl0bGUgZmxleC1yb3dcIj5cbiAgICAgICAgPHNwYW4+JHtfc2hvd0RhdGEucHJlbWllcmVkLnN1YnN0cmluZygwLCA0KX08L3NwYW4+XG4gICAgICAgIDxzcGFuPiZtaWRkb3Q7PC9zcGFuPlxuICAgICAgICA8c3Bhbj4ke19zaG93RGF0YS5zdGF0dXN9PC9zcGFuPlxuICAgICAgICA8c3Bhbj4mbWlkZG90Ozwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZCBpY29uc1wiPnN0YXI8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYXRpbmdcIj4ke19zaG93RGF0YS5yYXRpbmcuYXZlcmFnZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4+LzEwPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbWcgY2xhc3M9XCJwb3B1cC1pbWdcIiBzcmM9XCIke19zaG93RGF0YS5pbWFnZS5vcmlnaW5hbH1cIiBhbHQ9XCJzaG93IHRodW1ibmFpbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJnZW5yZXMgZmxleC1yb3dcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPiR7X3Nob3dEYXRhLnN1bW1hcnl9PC9kaXY+XG4gICAgPGhyPlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1jb250YWluZXJcIj48L2Rpdj5gO1xuXG4gIC8vIEdlbmVyYXRlIGdlbnJlc1xuICBjb25zdCBnZW5yZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2VucmVzJyk7XG4gIF9zaG93RGF0YS5nZW5yZXMuZm9yRWFjaCgoZ2VucmUpID0+IHtcbiAgICBnZW5yZXMuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwidGFnLWdlbnJlXCI+JHtnZW5yZX08L2Rpdj5gO1xuICB9KTtcblxuICAvLyBHZW5lcmF0ZSBjb21tZW50c1xuICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb250YWluZXInKTtcbiAgdXBkYXRlQ29tbWVudHMoX3Nob3dEYXRhLmlkLCBjb21tZW50c0NvbnRhaW5lcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IHBvcHVwQ2xvc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2UtY29udGFpbmVyJyk7XG4gIGNvbnN0IHBvcHVwQ2xvc2UgPSBhZGRFbGVtKCdidXR0b24nLCBbJ3BvcHVwLWNsb3NlJ10sIHBvcHVwQ2xvc2VDb250YWluZXIpO1xuICBjb25zdCBjbG9zZUljb24gPSBhZGRFbGVtKCdzcGFuJywgWydtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucyddLCBwb3B1cENsb3NlKTtcbiAgY2xvc2VJY29uLnRleHRDb250ZW50ID0gJ2Nsb3NlJztcblxuICBwb3B1cENsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gIH07XG59O1xuXG5leHBvcnQgeyBzaG93UG9wdXAsIGNsZWFyUG9wdXBzIH07XG4iLCJjb25zdCBnZXREYXRhID0gYXN5bmMgKHVybCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IGdldERhdGEgZnJvbSAnLi9tb2R1bGVzL3R2bWF6ZS5qcyc7XG5pbXBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfSBmcm9tICcuL21vZHVsZXMvaW52b2x2ZW1lbnQuanMnO1xuaW1wb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcyB9IGZyb20gJy4vbW9kdWxlcy9wb3B1cC5qcyc7XG5cbi8vIFNlYXJjaCBidXR0b25cbmNvbnN0IHNlYXJjaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuY29uc3Qgc2VhcmNoQmFyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKTtcbmNvbnN0IHNlYXJjaENsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1jbG9zZS1idG4nKTtcbmNvbnN0IG1lbnVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lbnUtaWNvbicpO1xuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG5cbi8vIFNlYXJjaCBCYXIgRm9yIERlc2t0b3BcbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufTtcblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgY29uc3QgbWVudVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG1lbnVUZXh0LnN0eWxlLmZvbnRTaXplID0gJzEuMjVyZW0nO1xuICBtZW51VGV4dC50ZXh0Q29udGVudCArPSAnTWVudSc7XG4gIG1lbnVJY29uLmFwcGVuZChtZW51VGV4dCk7XG4gIHNlYXJjaENsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgc2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgLy8gQWRkIFNlYXJjaCBJY29uXG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uY2xhc3NMaXN0LmFkZCgnc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BTcGFuLnRleHRDb250ZW50ID0gJ3NlYXJjaCc7XG5cbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uYXBwZW5kKHNlYXJjaEljb25EZXNrdG9wU3Bhbik7XG4gIGhlYWRlci5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BCdG4pO1xufVxuXG4vLyBHZXQgRGF0YSBmcm9tIFRWTUFaRSBBUElcbmNvbnN0IHJvb3RVcmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaW5nbGVzZWFyY2gvc2hvd3M/cT0nO1xuY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG5sZXQgcXVlcnkgPSAnJztcblxuLy8gVXBkYXRlIExpa2VzXG5jb25zdCB1cGRhdGVMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhckNvdW50JykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHJlc3BvbnNlW2ldLml0ZW1faWQgPT09IE51bWJlcihidXR0b24uaWQpKSB7XG4gICAgICAgIGJ1dHRvbi5sYXN0Q2hpbGQudGV4dENvbnRlbnQgPSByZXNwb25zZVtpXS5saWtlcztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRGlzcGxheSBDYXJkcyBEeW5hbWljYWxseVxuY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgY29uc3QgZGF0YUFycmF5ID0gZGF0YS5fZW1iZWRkZWQuZXBpc29kZXM7XG4gICAgICBkYXRhQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXJkSXRlbScpO1xuICAgICAgICBjb25zdCBkaXZJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2SW1nLmNsYXNzTGlzdC5hZGQoJ2NhcmRJbWcnKTtcbiAgICAgICAgZGl2SW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5pbWFnZS5vcmlnaW5hbH0pYDtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBoMi5jbGFzc0xpc3QuYWRkKCdjYXJkTmFtZScpO1xuICAgICAgICBoMi50ZXh0Q29udGVudCA9IGBTJHtlbC5zZWFzb259RSR7ZWwubnVtYmVyfSAke2VsLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdjYXJkRGV0YWlscycpO1xuICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBQbG90IFN1bW1hcnk6IDxicj4ke2VsLnN1bW1hcnl9YDtcbiAgICAgICAgY29uc3QgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBoMy5jbGFzc0xpc3QuYWRkKCdjYXJkUnVudGltZScpO1xuICAgICAgICBoMy50ZXh0Q29udGVudCA9IGBSdW50aW1lOiAke2VsLnJ1bnRpbWV9IG1pbnMgUmF0aW5nOiAke2VsLnJhdGluZy5hdmVyYWdlfWA7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG4gICAgICAgIHN0YXJDb3VudC50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICBjb25zdCBzdGFyQm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdzdGFyQm9yZGVyJyk7XG4gICAgICAgIHN0YXJCb3JkZXIudGV4dENvbnRlbnQgPSAnc3Rhcl9ib3JkZXInO1xuICAgICAgICBzdGFyQm9yZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG5cbiAgICAgICAgLy8gTGlrZSBFdmVudFxuICAgICAgICBzdGFyQm9yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHBvc3RMaWtlKGVsLnNob3cuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMiwgaDMsIGRldGFpbHMsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cbi8vIFNlYXJjaCBFdmVudCAtIE1vYmlsZSBWZXJzaW9uXG5zZWFyY2hJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgLy8gLy8gQWRkIGV2ZW50IGxpc3RlbmVyXG4gIHNlYXJjaENsb3NlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfTtcbn07XG5cbi8vIEVudGVyIEtleWJvYXJkIFN1cHBvcnQgLSBTZWFyY2ggTW9iaWxlXG5pZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGlmICghc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgICAgd2luZG93Lm9ubG9hZCgpO1xuICAgICAgfVxuICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICB1cGRhdGVMaWtlcygpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFNlYXJjaCBFdmVudCAtIERlc2t0b3AgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgd2luZG93Lm9ubG9hZCgpO1xuICAgIH1cbiAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICB1cGRhdGVMaWtlcygpO1xuICB9O1xufVxuXG4vLyBFbnRlciBLZXlib2FyZCBTdXBwb3J0IC0gU2VhcmNoIERlc2t0b3BcbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICB3aW5kb3cub25sb2FkKCk7XG4gICAgICB9XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZWZhdWx0IFNlYXJjaCBPbiBQYWdlIExvYWRcbmNvbnN0IGNyZWF0ZUVsZW1lbnRGb3JTaG93cyA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBkYXRhLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2FyZEl0ZW0nKTtcbiAgICAgICAgY29uc3QgZGl2SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkltZy5jbGFzc0xpc3QuYWRkKCdjYXJkSW1nJyk7XG4gICAgICAgIGRpdkltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZWwuaW1hZ2Uub3JpZ2luYWx9KWA7XG4gICAgICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgaDIuY2xhc3NMaXN0LmFkZCgnY2FyZE5hbWUnKTtcbiAgICAgICAgaDIudGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdGFyQ29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhclJhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ3N0YXJSYXRlJyk7XG4gICAgICAgIHN0YXJSYXRlLnRleHRDb250ZW50ID0gJ3N0YXJfcmF0ZSc7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQ291bnQuY2xhc3NMaXN0LmFkZCgnc3RhckNvdW50Jyk7XG4gICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuICAgICAgICBzdGFyQ291bnQudGV4dENvbnRlbnQgPSAnMCc7XG5cbiAgICAgICAgY29uc3Qgc3RhckJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnc3RhckJvcmRlcicpO1xuICAgICAgICBzdGFyQm9yZGVyLnRleHRDb250ZW50ID0gJ3N0YXJfYm9yZGVyJztcbiAgICAgICAgc3RhckJvcmRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuXG4gICAgICAgIC8vIExpa2UgRXZlbnRcbiAgICAgICAgc3RhckJvcmRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBwb3N0TGlrZShlbC5pZCk7XG4gICAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QudG9nZ2xlKCdsaWtlZCcpO1xuICAgICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY0J0bi5jbGFzc0xpc3QuYWRkKCdjb21tZW50QnRuJyk7XG4gICAgICAgIGNCdG4udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmFwcGVuZChzdGFyUmF0ZSwgc3RhckNvdW50LCBzdGFyQm9yZGVyKTtcbiAgICAgICAgZGl2LmFwcGVuZChkaXZJbWcsIHN0YXJDb250YWluZXIsIGgyLCBjQnRuKTtcbiAgICAgICAgY2FyZHMuYXBwZW5kKGRpdik7XG4gICAgICAgIHNlYXJjaENvdW50ICs9IDE7XG4gICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSBgU2VhcmNoIFJlc3VsdHMgKCR7c2VhcmNoQ291bnR9KWA7XG5cbiAgICAgICAgLy8gUG9wLXVwIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgY29uc3Qgc2hvd0RhdGEgPSBlbDtcbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoJy5zdGFyQm9yZGVyJykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNob3dQb3B1cChzaG93RGF0YSwgZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRVUkwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cyc7XG4gIGNyZWF0ZUVsZW1lbnRGb3JTaG93cyhkZWZhdWx0VVJMKTtcbiAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG59O1xuXG4vLyBIb21lcGFnZSBMaW5rXG5jb25zdCBoMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XG5oMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG5cbi8vIEV2ZW50IGxpc3RlbmVyIG9uIHRoZSBkb2N1bWVudFxuLy8gSWYgdGhlIGNsaWNrIGlzIG5vdCBvbiB0aGUgY2FyZEl0ZW0gYW5kIG5vdCBvbiB0aGUgcG9wdXAtY29udGFpbmVyLCBjbGVhciB0aGUgcG9wdXBzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1jb250YWluZXInKSkge1xuICAgIGNsZWFyUG9wdXBzKCk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9