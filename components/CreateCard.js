import React, { Component } from 'react'

import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import * as CardActions from '../redux/actions/deckAction'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'

class CreateCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  /**
   * Navigate to previous screen.
   */
  screenBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  /**
   * Update state.question
   */
  handleQuestionChange = (value) => {
    this.setState(() => ({ question: value }))
  }

  /**
   * Update state.answer
   */
  handleAnswerChange = (value) => {
    this.setState(() => ({ answer: value }))
  }

  /**
   * Add new Card to currently opened deck.
   * Dispatch action to update redux-store and call API to store card in AsyncStorage.
   * Then navigate back to previous screen
   */
  handleCreateCard = () => {
    const { decks, dispatch, navigation } = this.props
    const { question, answer } = this.state

    if (question.length < 1) {
      return alert("Please enter a question for your Card.")
    }
    if (answer.length < 1) {
      return alert("Please enter a answer for your Card.")
    }

    dispatch(CardActions.addQuestionToDeck(
      navigation.state.params.id,
      { question, answer }
    ))
    API.addCardToDeck(
      navigation.state.params.id,
      question,
      answer
    )
    this.setState({
      answer: '',
      question: ''
    })
    this.screenBack()
  }

  /**
   * Render CreateCard-component
   */
  render() {
    const { value } = this.state
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
        <TextInput
          placeholder='What is the question?'
          style={style.input}
          value={value}
          onChangeText={(val) => { this.handleQuestionChange(val) }}
        />
        <TextInput
          placeholder='What is the answer?'
          style={style.input}
          value={value}
          onChangeText={(val) => { this.handleAnswerChange(val) }}
        />
        <TouchableOpacity style={style.button} onPress={this.handleCreateCard} >
          <Text style={style.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    margin: 15,
    fontSize: 24,
    padding: 10,
    width: "80%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#555'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    borderRadius: 5,
    backgroundColor: Colors.purple,
    borderColor: Colors.purple
  },
  buttonText: {
    fontSize: 24,
    color: Colors.white
  }

})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(CreateCard)