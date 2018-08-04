import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, } from 'redux'
import DeckReducer from './redux/reducer/deckReducer'
import Dashboard from './components/Dashboard'
import CreateDeck from './components/CreateDeck'
import CreateCard from './components/CreateCard'
import ManageDeck from './components/ManageDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
// import Card from './components/Card'
import MyStatusBar from './components/MyStatusBar'
import { createTabNavigator, createStackNavigator } from 'react-navigation'

import * as Colors from './utils/colors'

import * as API from './utils/API'

import * as Helpers from './utils/helpers'

import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'

const Tabs = createTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => { return <MaterialIcons name='question_answer' size={30} color={tintColor} /> }
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => { return <MaterialIcons name='question_answer' size={30} color={tintColor} /> }
    }
  }
},
  {
    activeTintColor: Platform.OS === 'ios' ? Colors.purple : Colors.white,
    style: {
      backgroundColor: Colors.blue,
      height: 56
    }
  }
)

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      tabBarLabel: 'Deck',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.blue
      }
    }
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: {
      tabBarLabel: 'Create card',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.blue
      }
    }
  },
  ManageDeck: {
    screen: ManageDeck,
    navigationOptions: {
      tabBarLabel: 'Manage Deck',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.blue
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.blue
      }
    }
  },

})

class App extends React.Component {

  componentDidMount() {
    Helpers.scheduleLocalNotification()
  }

  render() {
    const store = createStore(DeckReducer)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MyStatusBar backgroundColor={Colors.blue} />
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});


export default App