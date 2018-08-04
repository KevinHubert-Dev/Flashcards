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

/**
 * Clears all sheduled notifications
 */
export function clearLocalNotficiation() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => { Notifications.cancelAllScheduledNotificationsAsync() })
}

/**
 * Schedules a local notifcation for the next day repeats every day
 */
export function scheduleLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(data => {
    /* If not already scheduled */
    if (data === null) {
      /* Check for permission */
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(result => {
        if (result.status === 'granted') {

          /* Remove all scheduled notifications */
          Notifications.cancelAllScheduledNotificationsAsync()

          /* Set schedule-timing for the next day at 6pm (german: 18:00Uhr) */
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(18)
          tomorrow.setMinutes(0)

          /* Schedule the notification and repeat the notification daily */
          Notifications.scheduleLocalNotificationAsync(
            NOTIFICATION_OBJ,
            {
              time: tomorrow,
              repeat: 'day'
            }
          )
          /* Store that the notification was scheduled */
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}