import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckPreview extends Component {

  /**
   * Deck-screen which shows the data and options to work with a specific deck
   */
  openDeck = () => {
    const { navigation, id } = this.props
    navigation.navigate('Deck', { id })
  }

  /**
   * Render DeckPreview-component.
   */
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