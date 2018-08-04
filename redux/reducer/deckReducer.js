import * as DeckAction from '../actions/deckAction'

function cardReducer(state = null, action) {
  switch (action.type) {
    case DeckAction.ADD_DECK: {
      return {
        ...state,
        [action.deckName]: {
          title: action.deckName,
          questions: []
        }
      }
    }

    case DeckAction.REMOVE_DECK: {
      const remindingDecks = (
        Object.keys(state).filter(key => key !== action.deckName)
      ).map(key => state[key])
      return {
        ...remindingDecks
      }
    }

    case DeckAction.ADD_QUESTION: {
      return {
        ...state,
        [action.deckName]: {
          ...state[action.deckName],
          questions: [...state[action.deckName].questions, action.question]
        }
      }
    }

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

    default: return state
  }
}

export default cardReducer