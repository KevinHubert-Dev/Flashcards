import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'
import { MaterialIcons } from '@expo/vector-icons'

import { NavigationActions } from 'react-navigation'

{/* <MaterialIcons name='check_circle_outline' size={35} color={Colors.green} />
<MaterialIcons name='error_outline' size={35} color={Colors.green} /> */}

class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { id, handleDeleteDeck } = navigation.state.params
    return {
      title: `Deck - ${id}`,
      headerRight: (
        <MaterialIcons
          onPress={navigation.getParam('handleDeleteDeck')}
          name="delete"
          size={25}
          color="#fff"
          style={{ marginRight: 15 }}
        />
      ),
    }
  }


  componentDidMount() {
    this.props.navigation.setParams({ handleDeleteDeck: () => this.handleDeleteDeck() })
  }

  screenBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

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
          }
        },
      ]
    )
  }

  handleAddQuestion = () => {
    const { id } = this.props.navigation.state.params
    this.props.navigation.navigate('CreateCard', { id })
  }

  handleDeleteQuestion = () => {
    const { id } = this.props.navigation.state.params
    this.props.navigation.navigate('ManageDeck', { id })
  }

  handleStartQuiz = () => {
    if (this.props.deck.questions.length === 0) {
      return alert("Your Deck need to have at least one card.")
    }

    const { id } = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', { id })
  }

  render() {
    if (!this.props.deck) {
      this.screenBack()
      return null
    }

    return (
      <View style={style.container}>
        <View style={style.container}>
          <Text style={style.title}>{this.props.deck.title}</Text>
          <Text style={style.description}>
            {this.props.deck.questions.length} {this.props.deck.questions.length === 1 ? 'card' : 'cards'}
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: Colors.black,
    borderWidth: 3
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