export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const DATA_LOADED = 'DATA_LOADED'

export function addDeck(deckName) {
  return {
    type: ADD_DECK,
    deckName
  }
}

export function removeDeck(deckName) {
  return {
    type: REMOVE_DECK,
    deckName
  }
}

export function addQuestionToDeck(deckName, question) {
  return {
    type: ADD_QUESTION,
    deckName,
    question
  }
}

export function removeQuestionFromDeck(deckName, question) {
  return {
    type: REMOVE_QUESTION,
    deckName,
    question
  }
}

export function dataLoaded(data) {
  return {
    type: DATA_LOADED,
    data
  }
}