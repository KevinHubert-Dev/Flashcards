import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = "Flashcards:Notify"

const NOTIFICATION_OBJ = {
  title: "Do your daily quiz!",
  body: "Don't miss your Quiz for today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
}

export function clearLocalNotficiation() {
  console.log("UNSCHEDULING!")
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => { Notifications.cancelAllScheduledNotificationsAsync() })
}

export function scheduleLocalNotification() {
console.log("SCHEDULING!")
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(data => {
    /* If not already scheduled */
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(result => {
        if (result.status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          /* Schedule for the next day on 6pm (german: 18:00Uhr) */
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(18)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            NOTIFICATION_OBJ,
            {
              time: tomorrow,
              repeat: 'day'
            }
          )
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}