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

export { getLikes, postLike };