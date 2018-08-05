import * as DeckAction from '../actions/deckAction'

function cardReducer(state = null, action) {
  switch (action.type) {

    /* Add new deck to the object of decks */
    case DeckAction.ADD_DECK: {
      return {
        ...state,
        [action.deckName]: {
          title: action.deckName,
          questions: []
        }
      }
    }

    /* Remove deck from the object of existing decks */
    case DeckAction.REMOVE_DECK: {
      const remindingDecks = {}
      Object.keys(state).filter(key => key !== action.deckName)
        .map(key => { remindingDecks[key] = state[key] })

      return {
        ...remindingDecks
      }
    }

    /* Add new Question to the array of existing questions */
    case DeckAction.ADD_QUESTION: {
      return {
        ...state,
        [action.deckName]: {
          ...state[action.deckName],
          questions: [...state[action.deckName].questions, action.question]
        }
      }
    }

    /* Remove questions from the array of existing questions */
    case DeckAction.REMOVE_QUESTION: {
      return {
        ...state,
        [action.deckName]: {
          ...state[action.deckName],
          questions: state[action.deckName].questions.filter(question => {
            return (
              question.question !== action.question.question ||
              question.answer !== action.question.answer
            )
          })
        }
      }
    }

    /* Initial Data loaded from AsyncStore */
    case DeckAction.DATA_LOADED: {
      return action.data
    }

    /* Default: return object as is */
    default: return state
  }
}

export default cardReducer