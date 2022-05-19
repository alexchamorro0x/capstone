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
/* harmony export */   "showPopup": () => (/* binding */ showPopup),
/* harmony export */   "showPopupEpisodes": () => (/* binding */ showPopupEpisodes)
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

const showPopupEpisodes = (_showData, _domRect) => {
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
const isDesktop = window.innerWidth > 768;
window.onresize = () => {
  if (isDesktop && window.innerWidth <= 768) {
    window.location.reload();
  }

  if (!isDesktop && window.innerWidth > 768) {
    window.location.reload();
  }
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
          (0,_modules_involvement_js__WEBPACK_IMPORTED_MODULE_2__.postLike)(el.id);
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

        // Pop-up trigger event
        const showData = el;
        div.addEventListener('click', (e) => {
          if (!e.target.matches('.starBorder')) {
            (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_3__.showPopupEpisodes)(showData, e.target.closest('.cardItem').getBoundingClientRect());
          }
        });
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

// Mobile Menu Popup
const dropdownMenuContainer = document.querySelector('#dropdown-menu-container');
menuIcon.onclick = () => {
  dropdownMenuContainer.innerHTML = '';

  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobileMenu');
  mobileMenu.style.display = 'block';

  const mobileMenuContainer = document.createElement('div');
  mobileMenuContainer.classList.add('mobileMenuContainer');

  const cancel = document.createElement('span');
  cancel.classList.add('material-icons-round', 'icons', 'cancel');
  cancel.textContent = 'cancel';
  cancel.onclick = () => {
    mobileMenu.style.display = 'none';
  };
  const ul = document.createElement('ul');
  ul.classList.add('list');
  ul.innerHTML = '<li><a href="https://mavericks-db.github.io/capstone02/dist/">Home</a></li><li><a href="https://www.tvmaze.com/api">TvMaze API</a></li><li><a href="https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270">Involvement API</a></li><li><a href="https://github.com/mavericks-db/capstone02">Source Code</a></li>';

  mobileMenuContainer.append(cancel, ul);
  mobileMenu.append(mobileMenuContainer);
  dropdownMenuContainer.append(mobileMenu);
};

// If clicked outside, close the dropdown menu
document.addEventListener('click', (e) => {
  const mobileMenu = document.querySelector('.mobileMenu');
  if (mobileMenu && !e.target.closest('#menu-icon') && !e.target.closest('.mobileMenu')) {
    mobileMenu.style.display = 'none';
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksOERBQVc7QUFDZjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2FkZC1lbGVtLmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9pbnZvbHZlbWVudC5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL3R2bWF6ZS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBTaG9ydGhhbmQgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgRE9NIGVsZW1lbnRcbi8vIGVsZW0gPSBzdHJpbmcsIGNsYXNzZXMgPSBhcnJheSBvZiBzdHJpbmcocyksIHBhcmVudCA9IERPTSBlbGVtZW50XG5jb25zdCBhZGRFbGVtID0gKGVsZW0sIGNsYXNzZXMsIHBhcmVudCkgPT4ge1xuICBjb25zdCBjcmVhdGVkRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gIGlmIChjbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjbGFzc2VzLmZvckVhY2goKGNsKSA9PiBjcmVhdGVkRWxlbS5jbGFzc0xpc3QuYWRkKGNsKSk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZWRFbGVtKTtcblxuICByZXR1cm4gY3JlYXRlZEVsZW07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRFbGVtO1xuIiwiY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyc7XG5jb25zdCBhcHBJRCA9ICdPUUNsNXlFWGYzR3hKaHBhc0VIVic7XG5cbmNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKGl0ZW1JRCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBpdGVtSUQgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2ApO1xuICBjb25zdCBsaWtlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoX2lkLCBfbmFtZSwgX2NvbW1lbnQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHNgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IF9pZCxcbiAgICAgIHVzZXJuYW1lOiBfbmFtZSxcbiAgICAgIGNvbW1lbnQ6IF9jb21tZW50LFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgcG9zdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgcmV0dXJuIHBvc3Q7XG59O1xuXG5jb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChfaWQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHM/aXRlbV9pZD0ke19pZH1gKTtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBjb21tZW50cztcbn07XG5cbmV4cG9ydCB7XG4gIHBvc3RMaWtlLFxuICBnZXRMaWtlcyxcbiAgcG9zdENvbW1lbnQsXG4gIGdldENvbW1lbnRzLFxufTtcbiIsImltcG9ydCBhZGRFbGVtIGZyb20gJy4vYWRkLWVsZW0uanMnO1xuaW1wb3J0IHsgcG9zdENvbW1lbnQsIGdldENvbW1lbnRzIH0gZnJvbSAnLi9pbnZvbHZlbWVudC5qcyc7XG5cbmNvbnN0IGNsZWFyUG9wdXBzID0gKCkgPT4ge1xuICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cC1jb250YWluZXInKTtcblxuICBpZiAocG9wdXBDb250YWluZXIpIHtcbiAgICBwb3B1cENvbnRhaW5lci5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVDb21tZW50cyA9IGFzeW5jIChfaWQsIF9jb250YWluZXIpID0+IHtcbiAgbGV0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMoX2lkKTtcbiAgY29tbWVudHMgPSBBcnJheS5pc0FycmF5KGNvbW1lbnRzKSA/IGNvbW1lbnRzIDogW107XG5cbiAgLy8gQWRkIGNvbW1lbnRzIHNlY3Rpb24gdG8gdGhlIGNvbnRhaW5lclxuICBjb25zdCBuZXdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5ld0NvbnRlbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1jdXJyZW50IGZsZXgtY29sdW1uXCI+XG4gICAgICA8aDM+UmV2aWV3cyAoJHtjb21tZW50cy5sZW5ndGh9KTwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtYWxsIGZsZXgtY29sdW1uXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWFkZCBmbGV4LWNvbHVtblwiPlxuICAgICAgPGgzPkFkZCBhIHJldmlldzwvaDM+XG4gICAgICA8Zm9ybSBjbGFzcz1cImZvcm0tYWRkLWNvbW1lbnQgZmxleC1jb2x1bW5cIiBhY3Rpb249XCJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtY29tbWVudC1uYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWNvbW1lbnQtaW5zaWdodFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCJcbiAgICAgICAgICByb3dzPVwiNlwiXG4gICAgICAgICAgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+YDtcblxuICBfY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBfY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0NvbnRlbnQpO1xuXG4gIC8vIEdlbmVyYXRlIGN1cnJlbnQgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHNBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtYWxsJyk7XG4gIGlmIChjb21tZW50cykge1xuICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgIGNvbW1lbnRzQWxsLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWluc3RhbmNlIGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiY29tbWVudC1uYW1lXCI+JHtjb21tZW50LnVzZXJuYW1lfTwvaDQ+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2NvbW1lbnQuY3JlYXRpb25fZGF0ZX08L3NwYW4+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj4ke2NvbW1lbnQuY29tbWVudH08L3A+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgZm9ybSBldmVudCBsaXN0ZW5lclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tYWRkLWNvbW1lbnQnKTtcbiAgY29uc3QgaW5wdXROYW1lID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtY29tbWVudC1uYW1lJyk7XG4gIGNvbnN0IGlucHV0SW5zaWdodCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmlucHV0LWNvbW1lbnQtaW5zaWdodCcpO1xuXG4gIGZvcm0ub25zdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3N0Q29tbWVudChfaWQsIGlucHV0TmFtZS52YWx1ZSwgaW5wdXRJbnNpZ2h0LnZhbHVlKTtcblxuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZUNvbW1lbnRzKF9pZCwgX2NvbnRhaW5lciksIDEwMDApO1xuICB9O1xufTtcblxuY29uc3Qgc2hvd1BvcHVwID0gKF9zaG93RGF0YSwgX2RvbVJlY3QpID0+IHtcbiAgLy8gQ2xlYXIgYWxsIG90aGVyIHBvcC11cHMgaWYgYW55XG4gIGNsZWFyUG9wdXBzKCk7XG4gIC8vIENhbGN1bGF0ZSB5IHBvc2l0aW9uXG4gIGNvbnN0IHBvc1kgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBfZG9tUmVjdC55IC0gNTA7XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvbnNcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBhZGRFbGVtKCdkaXYnLCBbJ3BvcHVwLWNvbnRhaW5lciddLCBtYWluKTtcbiAgcG9wdXBDb250YWluZXIuc3R5bGUudG9wID0gYCR7cG9zWX1weGA7XG5cbiAgcG9wdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMj4ke19zaG93RGF0YS5uYW1lfTwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViLXRpdGxlIGZsZXgtcm93XCI+XG4gICAgICAgIDxzcGFuPiR7X3Nob3dEYXRhLnByZW1pZXJlZC5zdWJzdHJpbmcoMCwgNCl9PC9zcGFuPlxuICAgICAgICA8c3Bhbj4mbWlkZG90Ozwvc3Bhbj5cbiAgICAgICAgPHNwYW4+JHtfc2hvd0RhdGEuc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+Jm1pZGRvdDs8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtcm91bmQgaWNvbnNcIj5zdGFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nXCI+JHtfc2hvd0RhdGEucmF0aW5nLmF2ZXJhZ2V9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPi8xMDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aW1nIGNsYXNzPVwicG9wdXAtaW1nXCIgc3JjPVwiJHtfc2hvd0RhdGEuaW1hZ2Uub3JpZ2luYWx9XCIgYWx0PVwic2hvdyB0aHVtYm5haWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2VucmVzIGZsZXgtcm93XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN1bW1hcnlcIj4ke19zaG93RGF0YS5zdW1tYXJ5fTwvZGl2PlxuICAgIDxocj5cbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtY29udGFpbmVyXCI+PC9kaXY+YDtcblxuICAvLyBHZW5lcmF0ZSBnZW5yZXNcbiAgY29uc3QgZ2VucmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdlbnJlcycpO1xuICBfc2hvd0RhdGEuZ2VucmVzLmZvckVhY2goKGdlbnJlKSA9PiB7XG4gICAgZ2VucmVzLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cInRhZy1nZW5yZVwiPiR7Z2VucmV9PC9kaXY+YDtcbiAgfSk7XG5cbiAgLy8gR2VuZXJhdGUgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY29udGFpbmVyJyk7XG4gIHVwZGF0ZUNvbW1lbnRzKF9zaG93RGF0YS5pZCwgY29tbWVudHNDb250YWluZXIpO1xuXG4gIC8vIENsb3NlIGJ1dHRvbiBldmVudCBsaXN0ZW5lclxuICBjb25zdCBwb3B1cENsb3NlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNsb3NlLWNvbnRhaW5lcicpO1xuICBjb25zdCBwb3B1cENsb3NlID0gYWRkRWxlbSgnYnV0dG9uJywgWydwb3B1cC1jbG9zZSddLCBwb3B1cENsb3NlQ29udGFpbmVyKTtcbiAgY29uc3QgY2xvc2VJY29uID0gYWRkRWxlbSgnc3BhbicsIFsnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnXSwgcG9wdXBDbG9zZSk7XG4gIGNsb3NlSWNvbi50ZXh0Q29udGVudCA9ICdjbG9zZSc7XG5cbiAgcG9wdXBDbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xufTtcblxuY29uc3Qgc2hvd1BvcHVwRXBpc29kZXMgPSAoX3Nob3dEYXRhLCBfZG9tUmVjdCkgPT4ge1xuICAvLyBDbGVhciBhbGwgb3RoZXIgcG9wLXVwcyBpZiBhbnlcbiAgY2xlYXJQb3B1cHMoKTtcbiAgLy8gQ2FsY3VsYXRlIHkgcG9zaXRpb25cbiAgY29uc3QgcG9zWSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIF9kb21SZWN0LnkgLSA1MDtcblxuICAvLyBET00gbWFuaXB1bGF0aW9uc1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGFkZEVsZW0oJ2RpdicsIFsncG9wdXAtY29udGFpbmVyJ10sIG1haW4pO1xuICBwb3B1cENvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtwb3NZfXB4YDtcblxuICBwb3B1cENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbHVtblwiPlxuICAgICAgPGgyPiR7X3Nob3dEYXRhLm5hbWV9PC9oMj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGl0bGUgZmxleC1yb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZCBpY29uc1wiPnN0YXI8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYXRpbmdcIj4ke19zaG93RGF0YS5yYXRpbmcuYXZlcmFnZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4+LzEwPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbWcgY2xhc3M9XCJwb3B1cC1pbWdcIiBzcmM9XCIke19zaG93RGF0YS5pbWFnZS5vcmlnaW5hbH1cIiBhbHQ9XCJzaG93IHRodW1ibmFpbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJnZW5yZXMgZmxleC1yb3dcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPiR7X3Nob3dEYXRhLnN1bW1hcnl9PC9kaXY+XG4gICAgPGhyPlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1jb250YWluZXJcIj48L2Rpdj5gO1xuXG4gIC8vIEdlbmVyYXRlIGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvbnRhaW5lcicpO1xuICB1cGRhdGVDb21tZW50cyhfc2hvd0RhdGEuaWQsIGNvbW1lbnRzQ29udGFpbmVyKTtcblxuICAvLyBDbG9zZSBidXR0b24gZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgcG9wdXBDbG9zZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jbG9zZS1jb250YWluZXInKTtcbiAgY29uc3QgcG9wdXBDbG9zZSA9IGFkZEVsZW0oJ2J1dHRvbicsIFsncG9wdXAtY2xvc2UnXSwgcG9wdXBDbG9zZUNvbnRhaW5lcik7XG4gIGNvbnN0IGNsb3NlSWNvbiA9IGFkZEVsZW0oJ3NwYW4nLCBbJ21hdGVyaWFsLWljb25zLXJvdW5kJywgJ2ljb25zJ10sIHBvcHVwQ2xvc2UpO1xuICBjbG9zZUljb24udGV4dENvbnRlbnQgPSAnY2xvc2UnO1xuXG4gIHBvcHVwQ2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHNob3dQb3B1cCwgY2xlYXJQb3B1cHMsIHNob3dQb3B1cEVwaXNvZGVzIH07XG4iLCJjb25zdCBnZXREYXRhID0gYXN5bmMgKHVybCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0YTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IGdldERhdGEgZnJvbSAnLi9tb2R1bGVzL3R2bWF6ZS5qcyc7XG5pbXBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfSBmcm9tICcuL21vZHVsZXMvaW52b2x2ZW1lbnQuanMnO1xuaW1wb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcywgc2hvd1BvcHVwRXBpc29kZXMgfSBmcm9tICcuL21vZHVsZXMvcG9wdXAuanMnO1xuXG4vLyBTZWFyY2ggYnV0dG9uXG5jb25zdCBzZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcbmNvbnN0IHNlYXJjaEJhckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG5jb25zdCBzZWFyY2hDbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtY2xvc2UtYnRuJyk7XG5jb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LWljb24nKTtcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cbi8vIFNlYXJjaCBCYXIgRm9yIERlc2t0b3BcbmNvbnN0IGlzRGVza3RvcCA9IHdpbmRvdy5pbm5lcldpZHRoID4gNzY4O1xud2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuICBpZiAoaXNEZXNrdG9wICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIGlmICghaXNEZXNrdG9wICYmIHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG59O1xuXG5pZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBjb25zdCBtZW51VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbWVudVRleHQuc3R5bGUuZm9udFNpemUgPSAnMS4yNXJlbSc7XG4gIG1lbnVUZXh0LnRleHRDb250ZW50ICs9ICdNZW51JztcbiAgbWVudUljb24uYXBwZW5kKG1lbnVUZXh0KTtcbiAgc2VhcmNoQ2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBzZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAvLyBBZGQgU2VhcmNoIEljb25cbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzZWFyY2hJY29uRGVza3RvcEJ0bicpO1xuICBjb25zdCBzZWFyY2hJY29uRGVza3RvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wU3Bhbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucycpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4udGV4dENvbnRlbnQgPSAnc2VhcmNoJztcblxuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BTcGFuKTtcbiAgaGVhZGVyLmFwcGVuZChzZWFyY2hJY29uRGVza3RvcEJ0bik7XG59XG5cbi8vIEdldCBEYXRhIGZyb20gVFZNQVpFIEFQSVxuY29uc3Qgcm9vdFVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NpbmdsZXNlYXJjaC9zaG93cz9xPSc7XG5jb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDInKTtcbmxldCBxdWVyeSA9ICcnO1xuXG4vLyBVcGRhdGUgTGlrZXNcbmNvbnN0IHVwZGF0ZUxpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldExpa2VzKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyQ291bnQnKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAocmVzcG9uc2VbaV0uaXRlbV9pZCA9PT0gTnVtYmVyKGJ1dHRvbi5pZCkpIHtcbiAgICAgICAgYnV0dG9uLmxhc3RDaGlsZC50ZXh0Q29udGVudCA9IHJlc3BvbnNlW2ldLmxpa2VzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBEaXNwbGF5IENhcmRzIER5bmFtaWNhbGx5XG5jb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkcycpO1xuY29uc3QgY3JlYXRlRWxlbWVudCA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBjb25zdCBkYXRhQXJyYXkgPSBkYXRhLl9lbWJlZGRlZC5lcGlzb2RlcztcbiAgICAgIGRhdGFBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGgyLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgyLnRleHRDb250ZW50ID0gYFMke2VsLnNlYXNvbn1FJHtlbC5udW1iZXJ9ICR7ZWwubmFtZX1gO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2NhcmREZXRhaWxzJyk7XG4gICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFBsb3QgU3VtbWFyeTogPGJyPiR7ZWwuc3VtbWFyeX1gO1xuICAgICAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGgzLmNsYXNzTGlzdC5hZGQoJ2NhcmRSdW50aW1lJyk7XG4gICAgICAgIGgzLnRleHRDb250ZW50ID0gYFJ1bnRpbWU6ICR7ZWwucnVudGltZX0gbWlucyBSYXRpbmc6ICR7ZWwucmF0aW5nLmF2ZXJhZ2V9YDtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMiwgaDMsIGRldGFpbHMsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcblxuICAgICAgICAvLyBQb3AtdXAgdHJpZ2dlciBldmVudFxuICAgICAgICBjb25zdCBzaG93RGF0YSA9IGVsO1xuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmICghZS50YXJnZXQubWF0Y2hlcygnLnN0YXJCb3JkZXInKSkge1xuICAgICAgICAgICAgc2hvd1BvcHVwRXBpc29kZXMoc2hvd0RhdGEsIGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vLyBTZWFyY2ggRXZlbnQgLSBNb2JpbGUgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gIHNlYXJjaEljb24ub25jbGljayA9ICgpID0+IHtcbiAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgLy8gLy8gQWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgc2VhcmNoQ2xvc2VCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfTtcbiAgfTtcblxuICBzZWFyY2hJbnB1dC5vbmlucHV0ID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgICB1cGRhdGVMaWtlcygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH07XG59XG5cbi8vIFNlYXJjaCBFdmVudCAtIERlc2t0b3AgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICB9XG4gICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHNlYXJjaElucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICAgIHVwZGF0ZUxpa2VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfTtcbn1cblxuLy8gRGVmYXVsdCBTZWFyY2ggT24gUGFnZSBMb2FkXG5jb25zdCBjcmVhdGVFbGVtZW50Rm9yU2hvd3MgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgZGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGgyLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgyLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMiwgY0J0bik7XG4gICAgICAgIGNhcmRzLmFwcGVuZChkaXYpO1xuICAgICAgICBzZWFyY2hDb3VudCArPSAxO1xuICAgICAgICBzZWFyY2hSZXN1bHRzLnRleHRDb250ZW50ID0gYFNlYXJjaCBSZXN1bHRzICgke3NlYXJjaENvdW50fSlgO1xuXG4gICAgICAgIC8vIFBvcC11cCB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIGNvbnN0IHNob3dEYXRhID0gZWw7XG4gICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuc3RhckJvcmRlcicpKSB7XG4gICAgICAgICAgICBzaG93UG9wdXAoc2hvd0RhdGEsIGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBjb25zdCBkZWZhdWx0VVJMID0gJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MnO1xuICBjcmVhdGVFbGVtZW50Rm9yU2hvd3MoZGVmYXVsdFVSTCk7XG4gIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xufTtcblxuLy8gSG9tZXBhZ2UgTGlua1xuY29uc3QgaDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpO1xuaDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG4vLyBFdmVudCBsaXN0ZW5lciBvbiB0aGUgZG9jdW1lbnRcbi8vIElmIHRoZSBjbGljayBpcyBub3Qgb24gdGhlIGNhcmRJdGVtIGFuZCBub3Qgb24gdGhlIHBvcHVwLWNvbnRhaW5lciwgY2xlYXIgdGhlIHBvcHVwc1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpICYmICFlLnRhcmdldC5jbG9zZXN0KCcucG9wdXAtY29udGFpbmVyJykpIHtcbiAgICBjbGVhclBvcHVwcygpO1xuICB9XG59KTtcblxuLy8gTW9iaWxlIE1lbnUgUG9wdXBcbmNvbnN0IGRyb3Bkb3duTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wZG93bi1tZW51LWNvbnRhaW5lcicpO1xubWVudUljb24ub25jbGljayA9ICgpID0+IHtcbiAgZHJvcGRvd25NZW51Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gIGNvbnN0IG1vYmlsZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9iaWxlTWVudS5jbGFzc0xpc3QuYWRkKCdtb2JpbGVNZW51Jyk7XG4gIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgY29uc3QgbW9iaWxlTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2JpbGVNZW51Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vYmlsZU1lbnVDb250YWluZXInKTtcblxuICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNhbmNlbC5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucycsICdjYW5jZWwnKTtcbiAgY2FuY2VsLnRleHRDb250ZW50ID0gJ2NhbmNlbCc7XG4gIGNhbmNlbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfTtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICB1bC5jbGFzc0xpc3QuYWRkKCdsaXN0Jyk7XG4gIHVsLmlubmVySFRNTCA9ICc8bGk+PGEgaHJlZj1cImh0dHBzOi8vbWF2ZXJpY2tzLWRiLmdpdGh1Yi5pby9jYXBzdG9uZTAyL2Rpc3QvXCI+SG9tZTwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cHM6Ly93d3cudHZtYXplLmNvbS9hcGlcIj5Udk1hemUgQVBJPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwczovL3d3dy5ub3Rpb24uc28vbWljcm92ZXJzZS9JbnZvbHZlbWVudC1BUEktODY5ZTYwYjVhZDEwNDYwM2FhNmRiNTllMDgxNTAyNzBcIj5JbnZvbHZlbWVudCBBUEk8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9tYXZlcmlja3MtZGIvY2Fwc3RvbmUwMlwiPlNvdXJjZSBDb2RlPC9hPjwvbGk+JztcblxuICBtb2JpbGVNZW51Q29udGFpbmVyLmFwcGVuZChjYW5jZWwsIHVsKTtcbiAgbW9iaWxlTWVudS5hcHBlbmQobW9iaWxlTWVudUNvbnRhaW5lcik7XG4gIGRyb3Bkb3duTWVudUNvbnRhaW5lci5hcHBlbmQobW9iaWxlTWVudSk7XG59O1xuXG4vLyBJZiBjbGlja2VkIG91dHNpZGUsIGNsb3NlIHRoZSBkcm9wZG93biBtZW51XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnN0IG1vYmlsZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9iaWxlTWVudScpO1xuICBpZiAobW9iaWxlTWVudSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnI21lbnUtaWNvbicpICYmICFlLnRhcmdldC5jbG9zZXN0KCcubW9iaWxlTWVudScpKSB7XG4gICAgbW9iaWxlTWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==