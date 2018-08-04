import React, { Component } from 'react'
import { Platform, TextInput, ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'
import * as Colors from '../utils/colors'

import { NavigationActions } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons'

class ManageDeck extends Component {

  handleDeleteCard = (deckTitle, question) => {
    API.removeCardFromDeck(deckTitle, question)
    this.props.dispatch(CardActions.removeQuestionFromDeck(deckTitle, question))
  }

  renderCards() {
    const { decks, dispatch, navigation } = this.props
    const id = this.props.navigation.state.params.id
    return (
      <ScrollView >
        <View style={style.container}>
          <Text style={style.title} alignSelf='flex-start'>{decks[id].title}</Text>
          <Text style={style.text} alignSelf='flex-start'>{decks[id].questions.length} {decks[id].questions.length === 1 ? 'card' : 'cards'}</Text>
          {
            this.props.decks[id].questions.map((question, index) => (
              <View key={index} style={style.cardContainer}>
                <View style={style.cardData}>
                  <Text numberOfLines={1} style={style.cardDataText}>Q: {question.question}</Text>
                  <Text numberOfLines={1} style={style.cardDataText}>A: {question.answer}</Text>
                </View>
                <TouchableOpacity onPress={() => this.handleDeleteCard(id, question)}>
                  <View style={style.cardDelete}>
                    <MaterialIcons name='delete' size={30} />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </ScrollView>

    )
  }

  renderNoCards() {
    return (
      <View style={style.noCardsContainer}>
        {
          Platform.OS === 'ios'
            ? <Ionicons name='ios-sad-outline' size={120} color={Colors.grey} />
            : <MaterialCommunityIcons name='emoticon-sad' size={120} color={Colors.grey} />
        }
        <Text style={{ marginTop: 20 }}>This deck is empty</Text>
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const id = this.props.navigation.state.params.id

    return (
      decks[id].questions.length > 0
        ? this.renderCards()
        : this.renderNoCards()
    )
  }
}

const style = StyleSheet.create({
  noCardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 80,
    borderBottomColor: '#555',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    padding: 15,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.purple
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.grey
  },
  cardData: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardDataText: {
    fontSize: 18,
    color: Colors.black,
  },
  cardDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    padding: 10
  },
  container: {
    maxWidth: Dimensions.get('screen').width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.purple
  }

})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(ManageDeck)