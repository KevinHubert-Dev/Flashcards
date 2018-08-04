import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'CARD_STORAGE_KEY'

/**
 * Load all saved decks from AsyncStorage and return them as a JSON-object.
 * If no data has been found then a empty-object is returned
 */
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      return (result) ? JSON.parse(result) : {}
    })
}

/**
 * Adds a new deck. 
 * @param {string} key - Key/title for the new deck
 */
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

/**
 * Remove a deck by the key
 * @param {string} key - Key/title of the deck to be deleted
 */
export function removeDeck(key) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result)
      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

/**
 * Adds a card/question to a deck
 * @param {string} key - Key/title of the deck where the card should be added to
 * @param {string} question - Question of the card
 * @param {string} answer - Answer for the specific question
 */
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

/**
 * Removes a card/question from a deck
 * @param {string} key - Key/title of the deck from which the card/question should be removed
 * @param {object} questionObj - Question/Card to be removed. questionObj has to contain the answer and question as a prop
 */
export function removeCardFromDeck(deckTitle, questionObj) {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(result => {
      result = JSON.parse(result)
      result[deckTitle].questions = result[deckTitle].questions.filter(currQuestion => {
        return currQuestion.question !== questionObj.question ||
          currQuestion.answer !== questionObj.answer
      })
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    })
}
