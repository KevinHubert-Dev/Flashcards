import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'

import { NavigationActions } from 'react-navigation'

class CreateDeck extends Component {

  state = {
    title: ''
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'CreateDeck'
    }))
  }

  handleTitleChange = (value) => {
    this.setState(() => ({ title: value }))
  }

  handleCreateDeck = () => {
    const { decks, dispatch, navigation } = this.props

    if (decks[this.state.title]) {
      return alert("The entered title is already in use.")
    }
    if (this.state.title.length < 1) {
      return alert("Please enter a title for your deck.")
    }

    dispatch(CardActions.addDeck(this.state.title))
    API.addDeck(this.state.title)
    this.setState({ title: '' })
    this.toHome()
  }

  render() {
    const { value } = this.state
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
        <Text style={style.title}>What is the title of your new Deck?</Text>
        <TextInput style={style.input} value={value} onChangeText={(val) => { this.handleTitleChange(val) }} />
        <TouchableOpacity style={style.button} onPress={this.handleCreateDeck} >
          <Text style={style.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: Colors.purple
  },
  input: {
    margin: 20,
    fontSize: 24,
    padding: 15,
    width: "80%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#555'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 75,
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

export default connect(mapStateToProps)(CreateDeck)