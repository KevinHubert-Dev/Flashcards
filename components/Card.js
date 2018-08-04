import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'
import { MaterialIcons } from '@expo/vector-icons'

import PropTypes from 'prop-types';

class Card extends Component {

  state = {
    showAnswer: false
  }

  handleAnswer = (isCorrect) => {
    /* Hide answer before handle answer, otherwise the 
    answer for the next question may be visible */
    if (this.state.showAnswer) {
      /* Because setState is async, i use the callBack-functionality */
      this.setState(
        { showAnswer: false },
        this.props.onHandleAnswer(isCorrect)
      )
    } else { 
      /* If answer was not visible, go ahead */
      this.props.onHandleAnswer(isCorrect)
    }
  }

  /* Toggle between show question or answer */
  toggleShowAnswer = () => {
    this.setState(currState => ({ showAnswer: !currState.showAnswer }))
  }


  render() {
    return (
      <View style={style.container}>
        <View style={[style.container]}>
          <Text style={style.title}>{this.state.showAnswer ? "Answer" : "Question"}</Text>
          <Text style={style.text}>{this.state.showAnswer ? this.props.answer : this.props.question}</Text>
          <TouchableOpacity style={style.button} onPress={this.toggleShowAnswer} >
            <Text style={style.buttonSmallText}>Show {this.state.showAnswer ? 'Question' : 'Answer'}</Text>
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
  buttonSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 75,
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
  handleAnswerGiven: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
}

export default Card