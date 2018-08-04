import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'CARD_STORAGE_KEY'

export function throwAllAway() {
  AsyncStorage.clear()
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      return (result) ? JSON.parse(result) : {}
    })
}

export function addDeck(key) {
  return AsyncStorage.mergeItem(STORAGE_KEY,
    JSON.stringify({
      [key]: {
        title: key,
        questions: []
      }
    })
  )
}

export function removeDeck(key) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result)
      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function updateDeck({ key, entry }) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      result = JSON.parse(result)
      result[key] = entry
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    })
}

export function addCardToDeck(key, question, answer) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      result = JSON.parse(result)
      result[key] = {
        ...result[key],
        questions: [...result[key].questions, { question, answer }]
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    })
}

export function removeCardFromDeck(deckTitle, questionObj) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      result = JSON.parse(result)
      result[deckTitle].questions = result[deckTitle].questions.filter(currQuestion => {
        return  currQuestion.question !== questionObj.question || 
        currQuestion.answer !== questionObj.answer
      })
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    })
}
