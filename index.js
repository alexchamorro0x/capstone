/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/tvmaze.js
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/* harmony default export */ const tvmaze = (getData);

;// CONCATENATED MODULE: ./src/modules/involvement.js
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



;// CONCATENATED MODULE: ./src/modules/add-elem.js
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

/* harmony default export */ const add_elem = (addElem);

;// CONCATENATED MODULE: ./src/modules/popup.js



const clearPopups = () => {
  const popupContainer = document.querySelectorAll('.popup-container');

  if (popupContainer) {
    popupContainer.forEach((e) => {
      e.remove();
    });
  }
};

const updateComments = async (_id, _container) => {
  let comments = await getComments(_id);
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
    postComment(_id, inputName.value, inputInsight.value);

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
  const popupContainer = add_elem('div', ['popup-container'], main);
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
  const popupClose = add_elem('button', ['popup-close'], popupCloseContainer);
  const closeIcon = add_elem('span', ['material-icons-round', 'icons'], popupClose);
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
  const popupContainer = add_elem('div', ['popup-container'], main);
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
  const popupClose = add_elem('button', ['popup-close'], popupCloseContainer);
  const closeIcon = add_elem('span', ['material-icons-round', 'icons'], popupClose);
  closeIcon.textContent = 'close';

  popupClose.onclick = () => {
    popupContainer.remove();
  };
};



;// CONCATENATED MODULE: ./src/index.js





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
  const response = await getLikes();
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
  await tvmaze(requestURL)
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
          postLike(el.id);
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
            showPopupEpisodes(showData, e.target.closest('.cardItem').getBoundingClientRect());
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
  await tvmaze(requestURL)
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
          postLike(el.id);
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
            showPopup(showData, e.target.closest('.cardItem').getBoundingClientRect());
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
    clearPopups();
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
  ul.innerHTML = '<li><a href="https://alexchamorro0x.github.io/capstone/">Home</a></li><li><a href="https://www.tvmaze.com/api">TvMaze API</a></li><li><a href="https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270">Involvement API</a></li><li><a href="https://github.com/alexchamorro0x/capstone">Source Code</a></li>';

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVEsRUFBRSxNQUFNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsTUFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGtCQUFrQjtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksV0FBVztBQUNmO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NhcHN0b25lLy4vc3JjL21vZHVsZXMvdHZtYXplLmpzIiwid2VicGFjazovL2NhcHN0b25lLy4vc3JjL21vZHVsZXMvaW52b2x2ZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUvLi9zcmMvbW9kdWxlcy9hZGQtZWxlbS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZS8uL3NyYy9tb2R1bGVzL3BvcHVwLmpzIiwid2VicGFjazovL2NhcHN0b25lLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldERhdGEgPSBhc3luYyAodXJsKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZXREYXRhO1xuIiwiY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzLyc7XG5jb25zdCBhcHBJRCA9ICdPUUNsNXlFWGYzR3hKaHBhc0VIVic7XG5cbmNvbnN0IHBvc3RMaWtlID0gYXN5bmMgKGl0ZW1JRCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBpdGVtX2lkOiBpdGVtSUQgfSksXG4gIH0pO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICByZXR1cm4gcG9zdDtcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0ke2FwcElEfS9saWtlc2ApO1xuICBjb25zdCBsaWtlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuY29uc3QgcG9zdENvbW1lbnQgPSBhc3luYyAoX2lkLCBfbmFtZSwgX2NvbW1lbnQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHNgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IF9pZCxcbiAgICAgIHVzZXJuYW1lOiBfbmFtZSxcbiAgICAgIGNvbW1lbnQ6IF9jb21tZW50LFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgcG9zdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgcmV0dXJuIHBvc3Q7XG59O1xuXG5jb25zdCBnZXRDb21tZW50cyA9IGFzeW5jIChfaWQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vY29tbWVudHM/aXRlbV9pZD0ke19pZH1gKTtcbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBjb21tZW50cztcbn07XG5cbmV4cG9ydCB7XG4gIHBvc3RMaWtlLFxuICBnZXRMaWtlcyxcbiAgcG9zdENvbW1lbnQsXG4gIGdldENvbW1lbnRzLFxufTtcbiIsIi8vIFNob3J0aGFuZCBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBET00gZWxlbWVudFxuLy8gZWxlbSA9IHN0cmluZywgY2xhc3NlcyA9IGFycmF5IG9mIHN0cmluZyhzKSwgcGFyZW50ID0gRE9NIGVsZW1lbnRcbmNvbnN0IGFkZEVsZW0gPSAoZWxlbSwgY2xhc3NlcywgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGNyZWF0ZWRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtKTtcbiAgaWYgKGNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNsYXNzZXMuZm9yRWFjaCgoY2wpID0+IGNyZWF0ZWRFbGVtLmNsYXNzTGlzdC5hZGQoY2wpKTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY3JlYXRlZEVsZW0pO1xuXG4gIHJldHVybiBjcmVhdGVkRWxlbTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkZEVsZW07XG4iLCJpbXBvcnQgYWRkRWxlbSBmcm9tICcuL2FkZC1lbGVtLmpzJztcbmltcG9ydCB7IHBvc3RDb21tZW50LCBnZXRDb21tZW50cyB9IGZyb20gJy4vaW52b2x2ZW1lbnQuanMnO1xuXG5jb25zdCBjbGVhclBvcHVwcyA9ICgpID0+IHtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAtY29udGFpbmVyJyk7XG5cbiAgaWYgKHBvcHVwQ29udGFpbmVyKSB7XG4gICAgcG9wdXBDb250YWluZXIuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAoX2lkLCBfY29udGFpbmVyKSA9PiB7XG4gIGxldCBjb21tZW50cyA9IGF3YWl0IGdldENvbW1lbnRzKF9pZCk7XG4gIGNvbW1lbnRzID0gQXJyYXkuaXNBcnJheShjb21tZW50cykgPyBjb21tZW50cyA6IFtdO1xuXG4gIC8vIEFkZCBjb21tZW50cyBzZWN0aW9uIHRvIHRoZSBjb250YWluZXJcbiAgY29uc3QgbmV3Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBuZXdDb250ZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtY3VycmVudCBmbGV4LWNvbHVtblwiPlxuICAgICAgPGgzPlJldmlld3MgKCR7Y29tbWVudHMubGVuZ3RofSk8L2gzPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWFsbCBmbGV4LWNvbHVtblwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1hZGQgZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMz5BZGQgYSByZXZpZXc8L2gzPlxuICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLWFkZC1jb21tZW50IGZsZXgtY29sdW1uXCIgYWN0aW9uPVwiXCI+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LWNvbW1lbnQtbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJZb3VyIG5hbWVcIiByZXF1aXJlZD5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgY2xhc3M9XCJpbnB1dC1jb21tZW50LWluc2lnaHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiWW91ciBpbnNpZ2h0c1wiXG4gICAgICAgICAgcm93cz1cIjZcIlxuICAgICAgICAgIHJlcXVpcmVkPjwvdGV4dGFyZWE+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PmA7XG5cbiAgX2NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgX2NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdDb250ZW50KTtcblxuICAvLyBHZW5lcmF0ZSBjdXJyZW50IGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWFsbCcpO1xuICBpZiAoY29tbWVudHMpIHtcbiAgICBjb21tZW50cy5mb3JFYWNoKChjb21tZW50KSA9PiB7XG4gICAgICBjb21tZW50c0FsbC5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbnN0YW5jZSBmbGV4LWNvbHVtblwiPlxuICAgICAgICAgIDxoNCBjbGFzcz1cImNvbW1lbnQtbmFtZVwiPiR7Y29tbWVudC51c2VybmFtZX08L2g0PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29tbWVudC1kYXRlXCI+JHtjb21tZW50LmNyZWF0aW9uX2RhdGV9PC9zcGFuPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY29tbWVudC1jb250ZW50XCI+JHtjb21tZW50LmNvbW1lbnR9PC9wPlxuICAgICAgICA8L2Rpdj5gO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQWRkIGZvcm0gZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFkZC1jb21tZW50Jyk7XG4gIGNvbnN0IGlucHV0TmFtZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmlucHV0LWNvbW1lbnQtbmFtZScpO1xuICBjb25zdCBpbnB1dEluc2lnaHQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1jb21tZW50LWluc2lnaHQnKTtcblxuICBmb3JtLm9uc3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcG9zdENvbW1lbnQoX2lkLCBpbnB1dE5hbWUudmFsdWUsIGlucHV0SW5zaWdodC52YWx1ZSk7XG5cbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGVDb21tZW50cyhfaWQsIF9jb250YWluZXIpLCAxMDAwKTtcbiAgfTtcbn07XG5cbmNvbnN0IHNob3dQb3B1cCA9IChfc2hvd0RhdGEsIF9kb21SZWN0KSA9PiB7XG4gIC8vIENsZWFyIGFsbCBvdGhlciBwb3AtdXBzIGlmIGFueVxuICBjbGVhclBvcHVwcygpO1xuICAvLyBDYWxjdWxhdGUgeSBwb3NpdGlvblxuICBjb25zdCBwb3NZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgX2RvbVJlY3QueSAtIDUwO1xuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25zXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gYWRkRWxlbSgnZGl2JywgWydwb3B1cC1jb250YWluZXInXSwgbWFpbik7XG4gIHBvcHVwQ29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3Bvc1l9cHhgO1xuXG4gIHBvcHVwQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2UtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgtY29sdW1uXCI+XG4gICAgICA8aDI+JHtfc2hvd0RhdGEubmFtZX08L2gyPlxuICAgICAgPGRpdiBjbGFzcz1cInN1Yi10aXRsZSBmbGV4LXJvd1wiPlxuICAgICAgICA8c3Bhbj4ke19zaG93RGF0YS5wcmVtaWVyZWQuc3Vic3RyaW5nKDAsIDQpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4+Jm1pZGRvdDs8L3NwYW4+XG4gICAgICAgIDxzcGFuPiR7X3Nob3dEYXRhLnN0YXR1c308L3NwYW4+XG4gICAgICAgIDxzcGFuPiZtaWRkb3Q7PC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLXJvdW5kIGljb25zXCI+c3Rhcjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhdGluZ1wiPiR7X3Nob3dEYXRhLnJhdGluZy5hdmVyYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj4vMTA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGltZyBjbGFzcz1cInBvcHVwLWltZ1wiIHNyYz1cIiR7X3Nob3dEYXRhLmltYWdlLm9yaWdpbmFsfVwiIGFsdD1cInNob3cgdGh1bWJuYWlsXCI+XG4gICAgPGRpdiBjbGFzcz1cImdlbnJlcyBmbGV4LXJvd1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdW1tYXJ5XCI+JHtfc2hvd0RhdGEuc3VtbWFyeX08L2Rpdj5cbiAgICA8aHI+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWNvbnRhaW5lclwiPjwvZGl2PmA7XG5cbiAgLy8gR2VuZXJhdGUgZ2VucmVzXG4gIGNvbnN0IGdlbnJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZW5yZXMnKTtcbiAgX3Nob3dEYXRhLmdlbnJlcy5mb3JFYWNoKChnZW5yZSkgPT4ge1xuICAgIGdlbnJlcy5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJ0YWctZ2VucmVcIj4ke2dlbnJlfTwvZGl2PmA7XG4gIH0pO1xuXG4gIC8vIEdlbmVyYXRlIGNvbW1lbnRzXG4gIGNvbnN0IGNvbW1lbnRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvbnRhaW5lcicpO1xuICB1cGRhdGVDb21tZW50cyhfc2hvd0RhdGEuaWQsIGNvbW1lbnRzQ29udGFpbmVyKTtcblxuICAvLyBDbG9zZSBidXR0b24gZXZlbnQgbGlzdGVuZXJcbiAgY29uc3QgcG9wdXBDbG9zZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jbG9zZS1jb250YWluZXInKTtcbiAgY29uc3QgcG9wdXBDbG9zZSA9IGFkZEVsZW0oJ2J1dHRvbicsIFsncG9wdXAtY2xvc2UnXSwgcG9wdXBDbG9zZUNvbnRhaW5lcik7XG4gIGNvbnN0IGNsb3NlSWNvbiA9IGFkZEVsZW0oJ3NwYW4nLCBbJ21hdGVyaWFsLWljb25zLXJvdW5kJywgJ2ljb25zJ10sIHBvcHVwQ2xvc2UpO1xuICBjbG9zZUljb24udGV4dENvbnRlbnQgPSAnY2xvc2UnO1xuXG4gIHBvcHVwQ2xvc2Uub25jbGljayA9ICgpID0+IHtcbiAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbmNvbnN0IHNob3dQb3B1cEVwaXNvZGVzID0gKF9zaG93RGF0YSwgX2RvbVJlY3QpID0+IHtcbiAgLy8gQ2xlYXIgYWxsIG90aGVyIHBvcC11cHMgaWYgYW55XG4gIGNsZWFyUG9wdXBzKCk7XG4gIC8vIENhbGN1bGF0ZSB5IHBvc2l0aW9uXG4gIGNvbnN0IHBvc1kgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBfZG9tUmVjdC55IC0gNTA7XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvbnNcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcG9wdXBDb250YWluZXIgPSBhZGRFbGVtKCdkaXYnLCBbJ3BvcHVwLWNvbnRhaW5lciddLCBtYWluKTtcbiAgcG9wdXBDb250YWluZXIuc3R5bGUudG9wID0gYCR7cG9zWX1weGA7XG5cbiAgcG9wdXBDb250YWluZXIuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMj4ke19zaG93RGF0YS5uYW1lfTwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViLXRpdGxlIGZsZXgtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LXJvd1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtcm91bmQgaWNvbnNcIj5zdGFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nXCI+JHtfc2hvd0RhdGEucmF0aW5nLmF2ZXJhZ2V9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPi8xMDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aW1nIGNsYXNzPVwicG9wdXAtaW1nXCIgc3JjPVwiJHtfc2hvd0RhdGEuaW1hZ2Uub3JpZ2luYWx9XCIgYWx0PVwic2hvdyB0aHVtYm5haWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ2VucmVzIGZsZXgtcm93XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN1bW1hcnlcIj4ke19zaG93RGF0YS5zdW1tYXJ5fTwvZGl2PlxuICAgIDxocj5cbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtY29udGFpbmVyXCI+PC9kaXY+YDtcblxuICAvLyBHZW5lcmF0ZSBjb21tZW50c1xuICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb250YWluZXInKTtcbiAgdXBkYXRlQ29tbWVudHMoX3Nob3dEYXRhLmlkLCBjb21tZW50c0NvbnRhaW5lcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IHBvcHVwQ2xvc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2UtY29udGFpbmVyJyk7XG4gIGNvbnN0IHBvcHVwQ2xvc2UgPSBhZGRFbGVtKCdidXR0b24nLCBbJ3BvcHVwLWNsb3NlJ10sIHBvcHVwQ2xvc2VDb250YWluZXIpO1xuICBjb25zdCBjbG9zZUljb24gPSBhZGRFbGVtKCdzcGFuJywgWydtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucyddLCBwb3B1cENsb3NlKTtcbiAgY2xvc2VJY29uLnRleHRDb250ZW50ID0gJ2Nsb3NlJztcblxuICBwb3B1cENsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gIH07XG59O1xuXG5leHBvcnQgeyBzaG93UG9wdXAsIGNsZWFyUG9wdXBzLCBzaG93UG9wdXBFcGlzb2RlcyB9O1xuIiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IGdldERhdGEgZnJvbSAnLi9tb2R1bGVzL3R2bWF6ZS5qcyc7XG5pbXBvcnQgeyBnZXRMaWtlcywgcG9zdExpa2UgfSBmcm9tICcuL21vZHVsZXMvaW52b2x2ZW1lbnQuanMnO1xuaW1wb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcywgc2hvd1BvcHVwRXBpc29kZXMgfSBmcm9tICcuL21vZHVsZXMvcG9wdXAuanMnO1xuXG4vLyBTZWFyY2ggYnV0dG9uXG5jb25zdCBzZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcbmNvbnN0IHNlYXJjaEJhckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJyk7XG5jb25zdCBzZWFyY2hDbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtY2xvc2UtYnRuJyk7XG5jb25zdCBtZW51SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LWljb24nKTtcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cbi8vIFNlYXJjaCBCYXIgRm9yIERlc2t0b3BcbmNvbnN0IGlzRGVza3RvcCA9IHdpbmRvdy5pbm5lcldpZHRoID4gNzY4O1xud2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuICBpZiAoaXNEZXNrdG9wICYmIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIGlmICghaXNEZXNrdG9wICYmIHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG59O1xuXG5pZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgbWVudUljb24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICBjb25zdCBtZW51VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbWVudVRleHQuc3R5bGUuZm9udFNpemUgPSAnMS4yNXJlbSc7XG4gIG1lbnVUZXh0LnRleHRDb250ZW50ICs9ICdNZW51JztcbiAgbWVudUljb24uYXBwZW5kKG1lbnVUZXh0KTtcbiAgc2VhcmNoQ2xvc2VCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICBzZWFyY2hJY29uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblxuICAvLyBBZGQgU2VhcmNoIEljb25cbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5jbGFzc0xpc3QuYWRkKCdzZWFyY2hJY29uRGVza3RvcEJ0bicpO1xuICBjb25zdCBzZWFyY2hJY29uRGVza3RvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wU3Bhbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucycpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4udGV4dENvbnRlbnQgPSAnc2VhcmNoJztcblxuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BTcGFuKTtcbiAgaGVhZGVyLmFwcGVuZChzZWFyY2hJY29uRGVza3RvcEJ0bik7XG59XG5cbi8vIEdldCBEYXRhIGZyb20gVFZNQVpFIEFQSVxuY29uc3Qgcm9vdFVybCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3NpbmdsZXNlYXJjaC9zaG93cz9xPSc7XG5jb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDInKTtcbmxldCBxdWVyeSA9ICcnO1xuXG4vLyBVcGRhdGUgTGlrZXNcbmNvbnN0IHVwZGF0ZUxpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldExpa2VzKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGFyQ291bnQnKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAocmVzcG9uc2VbaV0uaXRlbV9pZCA9PT0gTnVtYmVyKGJ1dHRvbi5pZCkpIHtcbiAgICAgICAgYnV0dG9uLmxhc3RDaGlsZC50ZXh0Q29udGVudCA9IHJlc3BvbnNlW2ldLmxpa2VzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyBEaXNwbGF5IENhcmRzIER5bmFtaWNhbGx5XG5jb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkcycpO1xuY29uc3QgY3JlYXRlRWxlbWVudCA9IGFzeW5jIChyZXF1ZXN0VVJMKSA9PiB7XG4gIGNhcmRzLmlubmVySFRNTCA9ICcnO1xuICBhd2FpdCBnZXREYXRhKHJlcXVlc3RVUkwpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGxldCBzZWFyY2hDb3VudCA9IDA7XG4gICAgICBjb25zdCBkYXRhQXJyYXkgPSBkYXRhLl9lbWJlZGRlZC5lcGlzb2RlcztcbiAgICAgIGRhdGFBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGgyLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgyLnRleHRDb250ZW50ID0gYFMke2VsLnNlYXNvbn1FJHtlbC5udW1iZXJ9ICR7ZWwubmFtZX1gO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2NhcmREZXRhaWxzJyk7XG4gICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFBsb3QgU3VtbWFyeTogPGJyPiR7ZWwuc3VtbWFyeX1gO1xuICAgICAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIGgzLmNsYXNzTGlzdC5hZGQoJ2NhcmRSdW50aW1lJyk7XG4gICAgICAgIGgzLnRleHRDb250ZW50ID0gYFJ1bnRpbWU6ICR7ZWwucnVudGltZX0gbWlucyBSYXRpbmc6ICR7ZWwucmF0aW5nLmF2ZXJhZ2V9YDtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMiwgaDMsIGRldGFpbHMsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcblxuICAgICAgICAvLyBQb3AtdXAgdHJpZ2dlciBldmVudFxuICAgICAgICBjb25zdCBzaG93RGF0YSA9IGVsO1xuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmICghZS50YXJnZXQubWF0Y2hlcygnLnN0YXJCb3JkZXInKSkge1xuICAgICAgICAgICAgc2hvd1BvcHVwRXBpc29kZXMoc2hvd0RhdGEsIGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vLyBTZWFyY2ggRXZlbnQgLSBNb2JpbGUgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gIHNlYXJjaEljb24ub25jbGljayA9ICgpID0+IHtcbiAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXG4gICAgLy8gLy8gQWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgc2VhcmNoQ2xvc2VCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfTtcbiAgfTtcblxuICBzZWFyY2hJbnB1dC5vbmlucHV0ID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgICB1cGRhdGVMaWtlcygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH07XG59XG5cbi8vIFNlYXJjaCBFdmVudCAtIERlc2t0b3AgVmVyc2lvblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaEljb25EZXNrdG9wQnRuJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICB9XG4gICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHNlYXJjaElucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBpZiAoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgY3JlYXRlRWxlbWVudChgJHtyb290VXJsfSR7cXVlcnl9JmVtYmVkPWVwaXNvZGVzYCk7XG4gICAgICAgIHVwZGF0ZUxpa2VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfTtcbn1cblxuLy8gRGVmYXVsdCBTZWFyY2ggT24gUGFnZSBMb2FkXG5jb25zdCBjcmVhdGVFbGVtZW50Rm9yU2hvd3MgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgZGF0YS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NhcmRJdGVtJyk7XG4gICAgICAgIGNvbnN0IGRpdkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZJbWcuY2xhc3NMaXN0LmFkZCgnY2FyZEltZycpO1xuICAgICAgICBkaXZJbWcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2VsLmltYWdlLm9yaWdpbmFsfSlgO1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGgyLmNsYXNzTGlzdC5hZGQoJ2NhcmROYW1lJyk7XG4gICAgICAgIGgyLnRleHRDb250ZW50ID0gZWwubmFtZTtcblxuICAgICAgICBjb25zdCBzdGFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN0YXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3RhckNvbnRhaW5lcicpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyUmF0ZS5jbGFzc0xpc3QuYWRkKCdzdGFyUmF0ZScpO1xuICAgICAgICBzdGFyUmF0ZS50ZXh0Q29udGVudCA9ICdzdGFyX3JhdGUnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhckNvdW50LmNsYXNzTGlzdC5hZGQoJ3N0YXJDb3VudCcpO1xuICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcbiAgICAgICAgc3RhckNvdW50LnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IHN0YXJCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdpY29ucycpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJCb3JkZXInKTtcbiAgICAgICAgc3RhckJvcmRlci50ZXh0Q29udGVudCA9ICdzdGFyX2JvcmRlcic7XG4gICAgICAgIHN0YXJCb3JkZXIuc2V0QXR0cmlidXRlKCdpZCcsIGVsLmlkKTtcblxuICAgICAgICAvLyBMaWtlIEV2ZW50XG4gICAgICAgIHN0YXJCb3JkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcG9zdExpa2UoZWwuaWQpO1xuICAgICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbGlrZWQnKTtcbiAgICAgICAgICBzdGFyQ291bnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNCdG4uY2xhc3NMaXN0LmFkZCgnY29tbWVudEJ0bicpO1xuICAgICAgICBjQnRuLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmQoc3RhclJhdGUsIHN0YXJDb3VudCwgc3RhckJvcmRlcik7XG4gICAgICAgIGRpdi5hcHBlbmQoZGl2SW1nLCBzdGFyQ29udGFpbmVyLCBoMiwgY0J0bik7XG4gICAgICAgIGNhcmRzLmFwcGVuZChkaXYpO1xuICAgICAgICBzZWFyY2hDb3VudCArPSAxO1xuICAgICAgICBzZWFyY2hSZXN1bHRzLnRleHRDb250ZW50ID0gYFNlYXJjaCBSZXN1bHRzICgke3NlYXJjaENvdW50fSlgO1xuXG4gICAgICAgIC8vIFBvcC11cCB0cmlnZ2VyIGV2ZW50XG4gICAgICAgIGNvbnN0IHNob3dEYXRhID0gZWw7XG4gICAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKCcuc3RhckJvcmRlcicpKSB7XG4gICAgICAgICAgICBzaG93UG9wdXAoc2hvd0RhdGEsIGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBjb25zdCBkZWZhdWx0VVJMID0gJ2h0dHBzOi8vYXBpLnR2bWF6ZS5jb20vc2hvd3MnO1xuICBjcmVhdGVFbGVtZW50Rm9yU2hvd3MoZGVmYXVsdFVSTCk7XG4gIHNldFRpbWVvdXQodXBkYXRlTGlrZXMsIDEwMDApO1xufTtcblxuLy8gSG9tZXBhZ2UgTGlua1xuY29uc3QgaDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpO1xuaDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG4vLyBFdmVudCBsaXN0ZW5lciBvbiB0aGUgZG9jdW1lbnRcbi8vIElmIHRoZSBjbGljayBpcyBub3Qgb24gdGhlIGNhcmRJdGVtIGFuZCBub3Qgb24gdGhlIHBvcHVwLWNvbnRhaW5lciwgY2xlYXIgdGhlIHBvcHVwc1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5jYXJkSXRlbScpICYmICFlLnRhcmdldC5jbG9zZXN0KCcucG9wdXAtY29udGFpbmVyJykpIHtcbiAgICBjbGVhclBvcHVwcygpO1xuICB9XG59KTtcblxuLy8gTW9iaWxlIE1lbnUgUG9wdXBcbmNvbnN0IGRyb3Bkb3duTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcm9wZG93bi1tZW51LWNvbnRhaW5lcicpO1xubWVudUljb24ub25jbGljayA9ICgpID0+IHtcbiAgZHJvcGRvd25NZW51Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gIGNvbnN0IG1vYmlsZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9iaWxlTWVudS5jbGFzc0xpc3QuYWRkKCdtb2JpbGVNZW51Jyk7XG4gIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgY29uc3QgbW9iaWxlTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtb2JpbGVNZW51Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vYmlsZU1lbnVDb250YWluZXInKTtcblxuICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNhbmNlbC5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucycsICdjYW5jZWwnKTtcbiAgY2FuY2VsLnRleHRDb250ZW50ID0gJ2NhbmNlbCc7XG4gIGNhbmNlbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfTtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICB1bC5jbGFzc0xpc3QuYWRkKCdsaXN0Jyk7XG4gIHVsLmlubmVySFRNTCA9ICc8bGk+PGEgaHJlZj1cImh0dHBzOi8vYWxleGNoYW1vcnJvMHguZ2l0aHViLmlvL2NhcHN0b25lL1wiPkhvbWU8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHBzOi8vd3d3LnR2bWF6ZS5jb20vYXBpXCI+VHZNYXplIEFQSTwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cHM6Ly93d3cubm90aW9uLnNvL21pY3JvdmVyc2UvSW52b2x2ZW1lbnQtQVBJLTg2OWU2MGI1YWQxMDQ2MDNhYTZkYjU5ZTA4MTUwMjcwXCI+SW52b2x2ZW1lbnQgQVBJPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYWxleGNoYW1vcnJvMHgvY2Fwc3RvbmVcIj5Tb3VyY2UgQ29kZTwvYT48L2xpPic7XG5cbiAgbW9iaWxlTWVudUNvbnRhaW5lci5hcHBlbmQoY2FuY2VsLCB1bCk7XG4gIG1vYmlsZU1lbnUuYXBwZW5kKG1vYmlsZU1lbnVDb250YWluZXIpO1xuICBkcm9wZG93bk1lbnVDb250YWluZXIuYXBwZW5kKG1vYmlsZU1lbnUpO1xufTtcblxuLy8gSWYgY2xpY2tlZCBvdXRzaWRlLCBjbG9zZSB0aGUgZHJvcGRvd24gbWVudVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zdCBtb2JpbGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZU1lbnUnKTtcbiAgaWYgKG1vYmlsZU1lbnUgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJyNtZW51LWljb24nKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLm1vYmlsZU1lbnUnKSkge1xuICAgIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=