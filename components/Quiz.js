import React, { Component } from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as API from '../utils/API'
import * as Colors from '../utils/colors'
import * as Helpers from '../utils/helpers'

import Card from './Card'

class CreateCard extends Component {

  state = {
    correct: 0,
    incorrect: 0,
    currentQuestionIndex: 0
  }

  /**
  * Updates the state of the component. To count in-/correct answers and current question
  * @param {boolean} isCorrect - Was the given answer correct?
  */
  handleAnswerGiven = (isCorrect) => {
    this.setState((currState) => ({
      correct: isCorrect ? currState.correct + 1 : currState.correct,
      incorrect: !isCorrect ? currState.incorrect + 1 : currState.incorrect,
      currentQuestionIndex: currState.currentQuestionIndex + 1
    }))
  }

  /**
  * Resets the state-properties which restarts the quiz
  */
  handleRestartQuiz = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
      currentQuestionIndex: 0
    })
  }

  /**
   * Navigate to previous screen
   */
  handleBackToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  /**
   * Render Quiz-component
   */
  render() {

    const { correct, incorrect, currentQuestionIndex } = this.state
    const { deck } = this.props

    const currCard = deck.questions[currentQuestionIndex]
    const percentCorrect = Math.round(correct / (correct + incorrect) * 100)

    /* When all questions has been answered render statistic */
    if (currentQuestionIndex + 1 > deck.questions.length) {

      /* clear Notification for today and plan a new 
         series of notification starting tomorrow */
      Helpers.clearLocalNotficiation()
        .then(() => { Helpers.scheduleLocalNotification() })

      return (
        <View style={style.resultContainer}>
          <Text style={style.title}>
            {percentCorrect >= 50 ? 'Congratulation' : 'Try again'}
          </Text>
          {
            percentCorrect >= 50
              ? <MaterialCommunityIcons name='check-circle-outline' color={Colors.green} size={75} />
              : <MaterialCommunityIcons name='close-circle-outline' color={Colors.red} size={75} />
          }
          <Text style={style.statisticText}>Correct: {correct} ({percentCorrect}%)</Text>
          <Text style={style.statisticText}>Incorrect: {incorrect} ({100 - percentCorrect}%)</Text>
          <Text style={style.infoText}>Reach +50% correct to pass</Text>

          <View style={style.resultContainer}>
            <TouchableOpacity style={style.button} onPress={this.handleRestartQuiz}>
              <Text style={style.buttonText}>
                Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={this.handleBackToDeck}>
              <Text style={style.buttonText}>
                Back
              </Text>
            </TouchableOpacity>
          </View >
        </View>
      )
    }

    /* Render current questions when there are still unanswered cards */
    return (
      <View style={style.container}>
        <Text style={style.quizProgressText}>
          Card {currentQuestionIndex + 1} / {deck.questions.length}
        </Text>
        <Card
          answer={currCard.answer}
          question={currCard.question}
          onHandleAnswer={this.handleAnswerGiven}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  quizProgressText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.purple
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 200,
    height: 60,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.black
  },
  statisticText: {
    margin: 10,
    fontSize: 20,
  },
  infoText: {
    fontSize: 12,
    color: Colors.grey
  }
})

function mapStateToProps(decks, props) {
  const { id } = props.navigation.state.params
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(CreateCard)