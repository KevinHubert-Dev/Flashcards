import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import * as CardActions from '../redux/actions/deckAction'

import { connect } from 'react-redux'
import * as API from '../utils/API'

class DeckPreview extends Component {

  openDeck = () => {
    const { navigation, id } = this.props
    navigation.navigate('Deck', { id })
  }

  render() {
    const { title, questions } = this.props.data
    return (
      <TouchableOpacity onPress={this.openDeck}>
        <View style={style.container}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.description}>{questions.length} {questions.length === 1 ? 'card' : 'cards'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#555',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 36,
  },
  description: {
    fontSize: 16
  }

})

function mapStateToProps(state, { id }) {
  return {
    data: state[id]
  }
}

export default connect(mapStateToProps)(DeckPreview)