import React, { Component } from 'react'
import {  View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import * as Colors from '../utils/colors'
import PropTypes from 'prop-types';

class Card extends Component {

  state = {
    showAnswer: false
  }

  /**
   * Call the parent-function which handles given answers.
   * Hide the answer of the current question because otherwise 
   * the answer of the next-question will be displayed by default
   */
  handleAnswer = (isCorrect) => {
    if (this.state.showAnswer) {
      /* Use setState-callback to avoid race-conditions (e.g: next question loaded before setState) */
      this.setState(
        { showAnswer: false },
        this.props.onHandleAnswer(isCorrect)
      )
    } else {
      /* If answer was not visible, go ahead */
      this.props.onHandleAnswer(isCorrect)
    }
  }

  /**
   * Toggle between show question or answer
   */
  toggleShowAnswer = () => {
    this.setState(currState => ({ showAnswer: !currState.showAnswer }))
  }

  /**
   * Render Card-component
   */
  render() {
    const { answer, question } = this.props
    const { showAnswer } = this.state
    return (
      <View style={style.container}>
        <View style={[style.container]}>
          <Text style={style.title}>{showAnswer ? "Answer" : "Question"}</Text>
          <Text style={style.text}>{showAnswer ? answer : question}</Text>
          <TouchableOpacity style={style.button} onPress={this.toggleShowAnswer} >
            <Text style={style.buttonSmallText}>Show {showAnswer ? 'Question' : 'Answer'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.container]}>
          <TouchableOpacity style={[style.button, style.correctBTN]} onPress={() => this.handleAnswer(true)} >
            <Text style={style.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, style.falseBTN]} onPress={() => this.handleAnswer(false)} >
            <Text style={style.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: Colors.purple,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black
  },
  buttonSmallText: {
    fontSize: 16,
    color: Colors.purple
  },
  button: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    borderRadius: 5,
  },
  correctBTN: {
    backgroundColor: Colors.green
  },
  falseBTN: {
    backgroundColor: Colors.red
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white
  }
})

Card.propTypes = {
  onHandleAnswer: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
}

export default Card