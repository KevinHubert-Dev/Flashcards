import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'

import DeckPreview from './DeckPreview'


class Dashboard extends Component {

  componentDidMount() {
    API.getDecks().then(result => {
      this.props.dispatch(CardActions.dataLoaded(result))
    })
  }

  navigateToCreateDeck = () => {
    this.props.navigation.navigate('CreateDeck')
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator size={50} />
    }
    if (Object.keys(this.props.decks).length < 1) {
      return (
        <View style={style.container}>
          <Text>You have no decks.</Text>
          <TouchableOpacity style={style.button} onPress={this.navigateToCreateDeck}>
            <Text style={style.buttonText}>Create new Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <ScrollView style={style.scrollContainer}>
        {/* <View style={style.container}> */}
          {
            Object.keys(this.props.decks).map(id => (
              <DeckPreview id={id} key={id} navigation={this.props.navigation} />
            ))
          }
        {/* </View> */}
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