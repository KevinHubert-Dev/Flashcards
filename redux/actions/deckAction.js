export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const DATA_LOADED = 'DATA_LOADED'

/**
 * Returns dispatchable-object to add a new deck
 * @param {string} deckName - title/name of the deck to add.
 */
export function addDeck(deckName) {
  return {
    type: ADD_DECK,
    deckName
  }
}

/**
 * Returns dispatchable-object to remove a deck 
 * @param {string} deckName - title/name of the deck to remove.
 */
export function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    deckName
  }
}

/**
 * Returns dispatchable-object to add question to a deck
 * @param {string} deckName - deckName of the existing deck.
 * @param {object} question - Question to add - contains the 'answer' and 'question' as a prop.
 */
export function addQuestionToDeck(deckName, question) {
  return {
    type: ADD_QUESTION,
    deckName,
    question
  }
}

/**
 * Returns dispatchable-object to remove a question from a deck
 * @param {string} deckName - deckName of the existing deck.
 * @param {object} question - Question to remove - contains the 'answer' and 'question' as a prop.
 */
export function removeQuestionFromDeck(deckName, question) {
  return {
    type: REMOVE_QUESTION,
    deckName,
    question
  }
}

/**
 * Returns dispatchable-object to set initial data
 * @param {string} data - Object of deck-objects.
 */
export function dataLoaded(data) {
  return {
    type: DATA_LOADED,
    data
  }
}