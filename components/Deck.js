import React, { Component } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import * as CardActions from '../redux/actions/deckAction'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'


class Deck extends Component {

  /**
   * Sets the title for the navigation-header bar based on passed params
   * Moreover adds a delete-button in the top-right-corner
   */
  static navigationOptions = ({ navigation }) => {
    const { id, handleDeleteDeck } = navigation.state.params
    return {
      title: `Deck - ${id}`,
      headerRight: (
        <MaterialIcons
          onPress={navigation.getParam('handleDeleteDeck')} /* required to access component-intern functions from static function */
          name="delete"
          size={25}
          color="#fff"
          style={{ marginRight: 15 }}
        />
      ),
    }
  }

  /**
   * Use setParams method of react-nativigation-obj to allow the static navigationOptions-func 
   * to access the "handleDeleteDeck"-function of the component
   */
  componentDidMount() {
    this.props.navigation.setParams({ handleDeleteDeck: () => this.handleDeleteDeck() })
  }

  /**
   * Go back to previous screen
   */
  screenBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  /**
   * Delete the deck and navigate back to previous screen
   */
  handleDeleteDeck = () => {
    const deckID = this.props.navigation.state.params.id

    Alert.alert(
      'Delete ',
      `Do you really want to delete ${deckID}`,
      [
        { text: 'Cancel' },
        {
          text: 'Yes', onPress: () => {
            API.removeDeck(deckID)
            this.props.dispatch(CardActions.removeDeck(deckID))
            this.screenBack()
          }
        },
      ]
    )
  }

  /**
   * Open CreateCard screen 
   */
  handleAddQuestion = () => {
    const { id } = this.props.navigation.state.params
    this.props.navigation.navigate('CreateCard', { id })
  }

  /**
   * Open ManageDeck-Screen (where cards can be deleted) 
   */
  handleDeleteQuestion = () => {
    const { id } = this.props.navigation.state.params
    this.props.navigation.navigate('ManageDeck', { id })
  }

  /**
   * Open Quiz-Screen 
   */
  handleStartQuiz = () => {
    const { deck, navigation } = this.props

    if (deck.questions.length === 0) {
      return alert("Your Deck need to have at least one card.")
    }

    const { id } = navigation.state.params
    navigation.navigate('Quiz', { id })
  }

  /**
   * Render Deck-component 
   */
  render() {
    const { deck } = this.props

    /* If deck does not exists (was deleted) render nothing till navigate to previous screen is done */
    if (!deck) {
      return null
    }

    return (
      <View style={style.container}>
        <View style={style.container}>
          <Text style={style.title}>{deck.title}</Text>
          <Text style={style.description}>
            {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>
        </View >

        <View style={[style.container, { flex: 2 }]}>
          <TouchableOpacity style={[style.button, style.editDeckBTN]} onPress={this.handleAddQuestion}>
            <Text style={[style.editDeckText, style.buttonText]}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, style.editDeckBTN]} onPress={this.handleDeleteQuestion}>
            <Text style={[style.editDeckText, style.buttonText]}>
              Delete Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, style.startQuizBTN]} onPress={this.handleStartQuiz}>
            <Text style={[style.startQuizText, style.buttonText]}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View >
      </View >
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    borderRadius: 5,
    margin: 10
  },
  editDeckBTN: {
    borderColor: Colors.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.transparent
  },
  startQuizBTN: {
    backgroundColor: Colors.purple
  },
  editDeckText: {
    color: Colors.black
  },
  startQuizText: {
    color: Colors.white
  },
  buttonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 36,
    color: Colors.purple
  },
  description: {
    fontSize: 24,
    color: Colors.grey
  }
})

function mapStateToProps(decks, props) {
  const { id } = props.navigation.state.params
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(Deck)