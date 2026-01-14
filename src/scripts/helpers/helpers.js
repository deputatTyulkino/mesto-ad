import { getTemplateInfoString, getTemplateUserCardInfo } from "../utils/template";

export const formatDate = (date) => new Date(date).toLocaleDateString();

export const getCountLike = (data) => data.length;

export const getUserLikesInfo = (data) => {
  return data.reduce((acc, user) => {
    if (acc[user._id]) {
      acc[user._id].likes += 1
      return acc
    } else {
      acc[user._id] = {
        name: user.name,
        likes: 1
      }
      return acc
    }
  }, {})
}

export const getUserMaxLikes = (cards) => {
  const cardsWithLikes = cards.filter(card => card.likes.length)
  const cardsLikes = cardsWithLikes.flatMap(card => card.likes)
  const userLikes = getUserLikesInfo(cardsLikes)
  const userLikesInf = Object.values(userLikes)
  return userLikesInf.reduce((acc, user) => {
    return acc.likes > user.likes ? acc : user
  }, userLikesInf.at(0))
}

export const getAllCountLikes = (cards) => {
  return cards.reduce((acc, card) => acc += card.likes.length, 0)
}

export const getPopularCards = (cards) => {
  const sortedCards = cards.sort((card, nextCard) => card.likes.length - nextCard.likes.length)
  const fivePopularCards = sortedCards.slice(-5)
  return fivePopularCards
}

export const appendInfoString = (list, terms, descriptions) => {
  Object.entries(terms).forEach(([keyTerm, valueTerm]) => {
    list.append(createInfoString(valueTerm, descriptions[keyTerm]));
  });
};

export const createInfoString = (term, description) => {
  const infoString = getTemplateInfoString();
  infoString.querySelector(".popup__info-term").textContent = term;
  infoString.querySelector(".popup__info-description").textContent =
    description;
  return infoString;
};

export const appendUserLikes = (list, users) => {
  users.forEach((user) => {
    list.append(createSecInfoItem(user.name));
  });
};

export const createSecInfoItem = (name) => {
  const userTemplate = getTemplateUserCardInfo();
  userTemplate.textContent = name;
  return userTemplate;
};

export const createDescriptionValues = (card) => {
  return {
    countLikes: getCountLike(card.likes),
    owner: card.owner.name,
    createdAt: formatDate(card.createdAt),
    name: card.name,
  };
};

export const createCardsDescriptionValues = (cards) => {
  const { name, likes } = getUserMaxLikes(cards)
  return {
    countUsers: getCountUsers(cards),
    countLikes: getAllCountLikes(cards),
    maxLikesOnlyUser: likes,
    champOfLikes: name,
  }
}

export const getCountUsers = (cards) => {
  const arrayUsersId = cards.map((card) => card.owner['_id'])
  return new Set(arrayUsersId).size
}

export const appendSecInfoString = (list, cards) => {
  const mostPopularCards = getPopularCards(cards)
  mostPopularCards.forEach((card) => {
    list.append(createSecInfoItem(card.name))
  })
}