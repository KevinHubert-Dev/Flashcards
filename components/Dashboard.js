import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import * as CardActions from '../redux/actions/deckAction'
import * as API from '../utils/API'

import DeckPreview from './DeckPreview'

class Dashboard extends Component {

  /**
   * Load all existing decks from AsyncStorage
   */
  componentDidMount() {
    API.getDecks().then(result => {
      this.props.dispatch(CardActions.dataLoaded(result))
    })
  }

  /**
   * Open CreateDeck-screen
   */
  navigateToCreateDeck = () => {
    this.props.navigation.navigate('CreateDeck')
  }

  /**
   * Render Dashboard-Component which is responsible to show all existing decks
   */
  render() {
    const { loading, decks, navigation } = this.props

    /* Loading animation when loading */
    if (loading) {
      return <ActivityIndicator size={50} />
    }

    /* No decks -> help user to create decks */
    if (Object.keys(decks).length < 1) {
      return (
        <View style={style.container}>
          <Text>You have no decks.</Text>
          <TouchableOpacity style={style.button} onPress={this.navigateToCreateDeck}>
            <Text style={style.buttonText}>Create new Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    /* Otherwise render all existing decks */
    return (
      <ScrollView style={style.scrollContainer}>
        {
          Object.keys(decks).map(id => (
            <DeckPreview id={id} key={id} navigation={navigation} />
          ))
        }
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 75,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    padding: 15,
    fontSize: 18
  }
})

function mapStateToProps(decks) {
  return {
    decks,
    loading: decks === null
  }
}

export default connect(mapStateToProps)(Dashboard)