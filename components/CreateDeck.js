import React, { Component } from 'react'

import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import * as CardActions from '../redux/actions/deckAction'
import * as Colors from '../utils/colors'
import * as API from '../utils/API'

class CreateDeck extends Component {

  state = {
    title: ''
  }

  /**
   * Close 'CreateDeck' screen and navigate to previous
   */
  toDeck = (id) => {
    this.props.navigation.navigate('Deck', { id })
  }

  /**
   * Update title-prop in state
   */
  handleTitleChange = (value) => {
    this.setState(() => ({ title: value }))
  }

  /**
   * Create new deck and save in AsyncStorage and dispatch action to add to redux-store.
   * Then navigate to previous screen.
   */
  handleCreateDeck = () => {
    const { decks, dispatch, navigation } = this.props
    const { title } = this.state

    if (decks[title]) {
      return alert("The entered title is already in use.")
    }
    if (title.length < 1) {
      return alert("Please enter a title for your deck.")
    }
    
    this.setState({ title: '' })
    
    dispatch(CardActions.addDeck(title))
    API.addDeck(title)
    this.toDeck(title)
  }

  /**
   * Render CreateDeck-component
   */
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
        <Text style={style.title}>What is the title of your new Deck?</Text>
        <TextInput style={style.input} value={title} onChangeText={(val) => { this.handleTitleChange(val) }} />
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