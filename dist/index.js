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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0JBQWtCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGlFQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNERBQVM7QUFDckI7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQVc7QUFDZjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2FkZC1lbGVtLmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9pbnZvbHZlbWVudC5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL3R2bWF6ZS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhcHN0b25lMDIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBTaG9ydGhhbmQgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgRE9NIGVsZW1lbnRcbi8vIGVsZW0gPSBzdHJpbmcsIGNsYXNzZXMgPSBhcnJheSBvZiBzdHJpbmcocyksIHBhcmVudCA9IERPTSBlbGVtZW50XG5jb25zdCBhZGRFbGVtID0gKGVsZW0sIGNsYXNzZXMsIHBhcmVudCkgPT4ge1xuICBjb25zdCBjcmVhdGVkRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gIGlmIChjbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjbGFzc2VzLmZvckVhY2goKGNsKSA9PiBjcmVhdGVkRWxlbS5jbGFzc0xpc3QuYWRkKGNsKSk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZWRFbGVtKTtcblxuICByZXR1cm4gY3JlYXRlZEVsZW07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRFbGVtO1xuIiwiY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyc7XG5jb25zdCBhcHBJRCA9ICdPUUNsNXlFWGYzR3hKaHBhc0VIVic7XG5cbmNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKGl0ZW1JRCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBpdGVtSUQgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2ApO1xuICBjb25zdCBsaWtlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoX2lkLCBfbmFtZSwgX2NvbW1lbnQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHNgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IF9pZCxcbiAgICAgIHVzZXJuYW1lOiBfbmFtZSxcbiAgICAgIGNvbW1lbnQ6IF9jb21tZW50LFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgcG9zdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgcmV0dXJuIHBvc3Q7XG59O1xuXG5jb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChfaWQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHM/aXRlbV9pZD0ke19pZH1gKTtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBjb21tZW50cztcbn07XG5cbmV4cG9ydCB7XG4gIHBvc3RMaWtlLFxuICBnZXRMaWtlcyxcbiAgcG9zdENvbW1lbnQsXG4gIGdldENvbW1lbnRzLFxufTtcbiIsImltcG9ydCBhZGRFbGVtIGZyb20gJy4vYWRkLWVsZW0uanMnO1xuaW1wb3J0IHsgcG9zdENvbW1lbnQsIGdldENvbW1lbnRzIH0gZnJvbSAnLi9pbnZvbHZlbWVudC5qcyc7XG5cbmNvbnN0IGNsZWFyUG9wdXBzID0gKCkgPT4ge1xuICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cC1jb250YWluZXInKTtcblxuICBpZiAocG9wdXBDb250YWluZXIpIHtcbiAgICBwb3B1cENvbnRhaW5lci5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVDb21tZW50cyA9IGFzeW5jIChfaWQsIF9jb250YWluZXIpID0+IHtcbiAgbGV0IGNvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHMoX2lkKTtcbiAgY29tbWVudHMgPSBBcnJheS5pc0FycmF5KGNvbW1lbnRzKSA/IGNvbW1lbnRzIDogW107XG5cbiAgLy8gQWRkIGNvbW1lbnRzIHNlY3Rpb24gdG8gdGhlIGNvbnRhaW5lclxuICBjb25zdCBuZXdDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5ld0NvbnRlbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1jdXJyZW50IGZsZXgtY29sdW1uXCI+XG4gICAgICA8aDM+UmV2aWV3cyAoJHtjb21tZW50cy5sZW5ndGh9KTwvaDM+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtYWxsIGZsZXgtY29sdW1uXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWFkZCBmbGV4LWNvbHVtblwiPlxuICAgICAgPGgzPkFkZCBhIHJldmlldzwvaDM+XG4gICAgICA8Zm9ybSBjbGFzcz1cImZvcm0tYWRkLWNvbW1lbnQgZmxleC1jb2x1bW5cIiBhY3Rpb249XCJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtY29tbWVudC1uYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIllvdXIgbmFtZVwiIHJlcXVpcmVkPlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWNvbW1lbnQtaW5zaWdodFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJZb3VyIGluc2lnaHRzXCJcbiAgICAgICAgICByb3dzPVwiNlwiXG4gICAgICAgICAgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+YDtcblxuICBfY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBfY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0NvbnRlbnQpO1xuXG4gIC8vIEdlbmVyYXRlIGN1cnJlbnQgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHNBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtYWxsJyk7XG4gIGlmIChjb21tZW50cykge1xuICAgIGNvbW1lbnRzLmZvckVhY2goKGNvbW1lbnQpID0+IHtcbiAgICAgIGNvbW1lbnRzQWxsLmlubmVySFRNTCArPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWluc3RhbmNlIGZsZXgtY29sdW1uXCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiY29tbWVudC1uYW1lXCI+JHtjb21tZW50LnVzZXJuYW1lfTwvaDQ+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb21tZW50LWRhdGVcIj4ke2NvbW1lbnQuY3JlYXRpb25fZGF0ZX08L3NwYW4+XG4gICAgICAgICAgPHAgY2xhc3M9XCJjb21tZW50LWNvbnRlbnRcIj4ke2NvbW1lbnQuY29tbWVudH08L3A+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgZm9ybSBldmVudCBsaXN0ZW5lclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tYWRkLWNvbW1lbnQnKTtcbiAgY29uc3QgaW5wdXROYW1lID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtY29tbWVudC1uYW1lJyk7XG4gIGNvbnN0IGlucHV0SW5zaWdodCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmlucHV0LWNvbW1lbnQtaW5zaWdodCcpO1xuXG4gIGZvcm0ub25zdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwb3N0Q29tbWVudChfaWQsIGlucHV0TmFtZS52YWx1ZSwgaW5wdXRJbnNpZ2h0LnZhbHVlKTtcblxuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZUNvbW1lbnRzKF9pZCwgX2NvbnRhaW5lciksIDEwMDApO1xuICB9O1xufTtcblxuY29uc3Qgc2hvd1BvcHVwID0gKF9zaG93RGF0YSwgX2RvbVJlY3QpID0+IHtcbiAgLy8gQ2xlYXIgYWxsIG90aGVyIHBvcC11cHMgaWYgYW55XG4gIGNsZWFyUG9wdXBzKCk7XG4gIC8vIENhbGN1bGF0ZSB5IHBvc2l0aW9uXG4gIGNvbnN0IHBvc1kgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBfZG9tUmVjdC55IC0gNTA7XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvbnNcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBhZGRFbGVtKCdkaXYnLCBbJ3BvcHVwLWNvbnRhaW5lciddLCBtYWluKTtcbiAgcG9wdXBDb250YWluZXIuc3R5bGUudG9wID0gYCR7cG9zWX1weGA7XG5cbiAgcG9wdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMj4ke19zaG93RGF0YS5uYW1lfTwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViLXRpdGxlIGZsZXgtcm93XCI+XG4gICAgICAgIDxzcGFuPiR7X3Nob3dEYXRhLnByZW1pZXJlZC5zdWJzdHJpbmcoMCwgNCl9PC9zcGFuPlxuICAgICAgICA8c3Bhbj4mbWlkZG90Ozwvc3Bhbj5cbiAgICAgICAgPHNwYW4+JHtfc2hvd0RhdGEuc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+Jm1pZGRvdDs8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtcm91bmQgaWNvbnNcIj5zdGFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nXCI+JHtfc2hvd0RhdGEucmF0aW5nLmF2ZXJhZ2V9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPi8xMDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aW1nIGNsYXNzPVwicG9wdXAtaW1nXCIgc3JjPVwiJHtfc2hvd0RhdGEuaW1hZ2Uub3JpZ2luYWx9XCIgYWx0PVwic2hvdyB0aHVtYm5haWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2VucmVzIGZsZXgtcm93XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN1bW1hcnlcIj4ke19zaG93RGF0YS5zdW1tYXJ5fTwvZGl2PlxuICAgIDxocj5cbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtY29udGFpbmVyXCI+PC9kaXY+YDtcblxuICAvLyBHZW5lcmF0ZSBnZW5yZXNcbiAgY29uc3QgZ2VucmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdlbnJlcycpO1xuICBfc2hvd0RhdGEuZ2VucmVzLmZvckVhY2goKGdlbnJlKSA9PiB7XG4gICAgZ2VucmVzLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cInRhZy1nZW5yZVwiPiR7Z2VucmV9PC9kaXY+YDtcbiAgfSk7XG5cbiAgLy8gR2VuZXJhdGUgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY29udGFpbmVyJyk7XG4gIHVwZGF0ZUNvbW1lbnRzKF9zaG93RGF0YS5pZCwgY29tbWVudHNDb250YWluZXIpO1xuXG4gIC8vIENsb3NlIGJ1dHRvbiBldmVudCBsaXN0ZW5lclxuICBjb25zdCBwb3B1cENsb3NlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNsb3NlLWNvbnRhaW5lcicpO1xuICBjb25zdCBwb3B1cENsb3NlID0gYWRkRWxlbSgnYnV0dG9uJywgWydwb3B1cC1jbG9zZSddLCBwb3B1cENsb3NlQ29udGFpbmVyKTtcbiAgY29uc3QgY2xvc2VJY29uID0gYWRkRWxlbSgnc3BhbicsIFsnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnXSwgcG9wdXBDbG9zZSk7XG4gIGNsb3NlSWNvbi50ZXh0Q29udGVudCA9ICdjbG9zZSc7XG5cbiAgcG9wdXBDbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xufTtcblxuZXhwb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcyB9O1xuIiwiY29uc3QgZ2V0RGF0YSA9IGFzeW5jICh1cmwpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldERhdGE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCBnZXREYXRhIGZyb20gJy4vbW9kdWxlcy90dm1hemUuanMnO1xuaW1wb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH0gZnJvbSAnLi9tb2R1bGVzL2ludm9sdmVtZW50LmpzJztcbmltcG9ydCB7IHNob3dQb3B1cCwgY2xlYXJQb3B1cHMgfSBmcm9tICcuL21vZHVsZXMvcG9wdXAuanMnO1xuLy8gaW1wb3J0IGFkZEVsZW0gZnJvbSAnLi9tb2R1bGVzL2FkZC1lbGVtLmpzJztcblxuLy8gU2VhcmNoIGJ1dHRvblxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBzZWFyY2hCYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpO1xuY29uc3Qgc2VhcmNoQ2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWNsb3NlLWJ0bicpO1xuY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1pY29uJyk7XG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcblxuLy8gU2VhcmNoIEJhciBGb3IgRGVza3RvcFxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgY29uc3QgbWVudVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG1lbnVUZXh0LnN0eWxlLmZvbnRTaXplID0gJzEuMjVyZW0nO1xuICBtZW51VGV4dC50ZXh0Q29udGVudCArPSAnTWVudSc7XG4gIG1lbnVJY29uLmFwcGVuZChtZW51VGV4dCk7XG4gIHNlYXJjaENsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgc2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgLy8gQWRkIFNlYXJjaCBJY29uXG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uY2xhc3NMaXN0LmFkZCgnc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BTcGFuLnRleHRDb250ZW50ID0gJ3NlYXJjaCc7XG5cbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uYXBwZW5kKHNlYXJjaEljb25EZXNrdG9wU3Bhbik7XG4gIGhlYWRlci5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BCdG4pO1xufVxuXG4vLyBHZXQgRGF0YSBmcm9tIFRWTUFaRSBBUElcbmNvbnN0IHJvb3RVcmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaW5nbGVzZWFyY2gvc2hvd3M/cT0nO1xuY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG5sZXQgcXVlcnkgPSAnJztcblxuLy8gVXBkYXRlIExpa2VzXG5jb25zdCB1cGRhdGVMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhckNvdW50JykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHJlc3BvbnNlW2ldLml0ZW1faWQgPT09IE51bWJlcihidXR0b24uaWQpKSB7XG4gICAgICAgIGJ1dHRvbi5sYXN0Q2hpbGQudGV4dENvbnRlbnQgPSByZXNwb25zZVtpXS5saWtlcztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRGlzcGxheSBDYXJkcyBEeW5hbWljYWxseVxuY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgY29uc3QgZGF0YUFycmF5ID0gZGF0YS5fZW1iZWRkZWQuZXBpc29kZXM7XG4gICAgICBkYXRhQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXJkSXRlbScpO1xuICAgICAgICBjb25zdCBkaXZJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2SW1nLmNsYXNzTGlzdC5hZGQoJ2NhcmRJbWcnKTtcbiAgICAgICAgZGl2SW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5pbWFnZS5vcmlnaW5hbH0pYDtcbiAgICAgICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBoMS5jbGFzc0xpc3QuYWRkKCdjYXJkTmFtZScpO1xuICAgICAgICBoMS50ZXh0Q29udGVudCA9IGBTJHtlbC5zZWFzb259RSR7ZWwubnVtYmVyfSAke2VsLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdjYXJkRGV0YWlscycpO1xuICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBQbG90IFN1bW1hcnk6IDxicj4ke2VsLnN1bW1hcnl9YDtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBoMi5jbGFzc0xpc3QuYWRkKCdjYXJkUnVudGltZScpO1xuICAgICAgICBoMi50ZXh0Q29udGVudCA9IGBSdW50aW1lOiAke2VsLnJ1bnRpbWV9IG1pbnMgUmF0aW5nOiAke2VsLnJhdGluZy5hdmVyYWdlfWA7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG4gICAgICAgIHN0YXJDb3VudC50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICBjb25zdCBzdGFyQm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdzdGFyQm9yZGVyJyk7XG4gICAgICAgIHN0YXJCb3JkZXIudGV4dENvbnRlbnQgPSAnc3Rhcl9ib3JkZXInO1xuICAgICAgICBzdGFyQm9yZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG5cbiAgICAgICAgLy8gTGlrZSBFdmVudFxuICAgICAgICBzdGFyQm9yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHBvc3RMaWtlKGVsLnNob3cuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMSwgaDIsIGRldGFpbHMsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cbi8vIFNlYXJjaCBFdmVudCAtIE1vYmlsZSBWZXJzaW9uXG5zZWFyY2hJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgLy8gLy8gQWRkIGV2ZW50IGxpc3RlbmVyXG4gIHNlYXJjaENsb3NlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfTtcbn07XG5cbi8vIEVudGVyIEtleWJvYXJkIFN1cHBvcnQgLSBTZWFyY2ggTW9iaWxlXG5pZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGlmICghc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgICAgd2luZG93Lm9ubG9hZCgpO1xuICAgICAgfVxuICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICB1cGRhdGVMaWtlcygpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIFNlYXJjaCBFdmVudCAtIERlc2t0b3AgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgd2luZG93Lm9ubG9hZCgpO1xuICAgIH1cbiAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICB1cGRhdGVMaWtlcygpO1xuICB9O1xufVxuXG4vLyBFbnRlciBLZXlib2FyZCBTdXBwb3J0IC0gU2VhcmNoIERlc2t0b3BcbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICB3aW5kb3cub25sb2FkKCk7XG4gICAgICB9XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZWZhdWx0IFNlYXJjaCBPbiBQYWdlIExvYWRcbmNvbnN0IGNyZWF0ZUVsZW1lbnRGb3JTaG93cyA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBkYXRhLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2FyZEl0ZW0nKTtcbiAgICAgICAgY29uc3QgZGl2SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkltZy5jbGFzc0xpc3QuYWRkKCdjYXJkSW1nJyk7XG4gICAgICAgIGRpdkltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZWwuaW1hZ2Uub3JpZ2luYWx9KWA7XG4gICAgICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgaDEuY2xhc3NMaXN0LmFkZCgnY2FyZE5hbWUnKTtcbiAgICAgICAgaDEudGV4dENvbnRlbnQgPSBlbC5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3RhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdGFyQ29udGFpbmVyJyk7XG5cbiAgICAgICAgY29uc3Qgc3RhclJhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJSYXRlLmNsYXNzTGlzdC5hZGQoJ3N0YXJSYXRlJyk7XG4gICAgICAgIHN0YXJSYXRlLnRleHRDb250ZW50ID0gJ3N0YXJfcmF0ZSc7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQ291bnQuY2xhc3NMaXN0LmFkZCgnc3RhckNvdW50Jyk7XG4gICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuICAgICAgICBzdGFyQ291bnQudGV4dENvbnRlbnQgPSAnMCc7XG5cbiAgICAgICAgY29uc3Qgc3RhckJvcmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ2ljb25zJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnc3RhckJvcmRlcicpO1xuICAgICAgICBzdGFyQm9yZGVyLnRleHRDb250ZW50ID0gJ3N0YXJfYm9yZGVyJztcbiAgICAgICAgc3RhckJvcmRlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZWwuaWQpO1xuXG4gICAgICAgIC8vIExpa2UgRXZlbnRcbiAgICAgICAgc3RhckJvcmRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBwb3N0TGlrZShlbC5pZCk7XG4gICAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QudG9nZ2xlKCdsaWtlZCcpO1xuICAgICAgICAgIHN0YXJDb3VudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY0J0bi5jbGFzc0xpc3QuYWRkKCdjb21tZW50QnRuJyk7XG4gICAgICAgIGNCdG4udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmFwcGVuZChzdGFyUmF0ZSwgc3RhckNvdW50LCBzdGFyQm9yZGVyKTtcbiAgICAgICAgZGl2LmFwcGVuZChkaXZJbWcsIHN0YXJDb250YWluZXIsIGgxLCBjQnRuKTtcbiAgICAgICAgY2FyZHMuYXBwZW5kKGRpdik7XG4gICAgICAgIHNlYXJjaENvdW50ICs9IDE7XG4gICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSBgU2VhcmNoIFJlc3VsdHMgKCR7c2VhcmNoQ291bnR9KWA7XG5cbiAgICAgICAgLy8gUG9wLXVwIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgY29uc3Qgc2hvd0RhdGEgPSBlbDtcbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoJy5zdGFyQm9yZGVyJykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNob3dQb3B1cChzaG93RGF0YSwgZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRVUkwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaG93cyc7XG4gIGNyZWF0ZUVsZW1lbnRGb3JTaG93cyhkZWZhdWx0VVJMKTtcbiAgc2V0VGltZW91dCh1cGRhdGVMaWtlcywgMTAwMCk7XG59O1xuXG4vLyBIb21lcGFnZSBMaW5rXG5jb25zdCBoMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XG5oMS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG5cbi8vIEV2ZW50IGxpc3RlbmVyIG9uIHRoZSBkb2N1bWVudFxuLy8gSWYgdGhlIGNsaWNrIGlzIG5vdCBvbiB0aGUgY2FyZEl0ZW0gYW5kIG5vdCBvbiB0aGUgcG9wdXAtY29udGFpbmVyLCBjbGVhciB0aGUgcG9wdXBzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmNhcmRJdGVtJykgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1jb250YWluZXInKSkge1xuICAgIGNsZWFyUG9wdXBzKCk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
