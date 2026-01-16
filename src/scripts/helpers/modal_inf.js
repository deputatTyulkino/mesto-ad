export class CardInfo {
  static getCountLike = (data) => data.length;

  static formatDate = (date) => new Date(date).toLocaleDateString();
}

export class InfAboutCards {
  static getUserMaxLikes = (cards) => {
    const cardsWithLikes = cards.filter(card => card.likes.length)
    const cardsLikes = cardsWithLikes.flatMap(card => card.likes)
    const userLikes = this._getUserLikesInfo(cardsLikes)
    const userLikesInf = Object.values(userLikes)
    return userLikesInf.reduce((acc, user) => {
      return acc.likes > user.likes ? acc : user
    }, userLikesInf.at(0))
  }

  static getCountUsers = (cards) => {
    const arrayUsersId = cards.map((card) => card.owner['_id'])
    return new Set(arrayUsersId).size
  }

  static getAllCountLikes = (cards) => {
    return cards.reduce((acc, card) => acc += card.likes.length, 0)
  }

  static _getUserLikesInfo = (data) => {
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
}
