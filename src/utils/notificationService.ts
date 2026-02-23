import * as Notifications from "expo-notifications";

export async function requestNotificationPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
}

export async function cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleAllNotifications() {
    await Promise.all([
        Notifications.scheduleNotificationAsync({
            content: { title: "🍳 Breakfast Time!", body: "Don't forget to log your breakfast" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 8, minute: 30 },
        }),
        Notifications.scheduleNotificationAsync({
            content: { title: "🍔 Lunch Time!", body: "Don't forget to log your lunch" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 12, minute: 30 },
        }),
        Notifications.scheduleNotificationAsync({
            content: { title: "🍕 Dinner Time!", body: "Don't forget to log your dinner" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 19, minute: 30 },
        }),
        Notifications.scheduleNotificationAsync({
            content: { title: "💧 Hydration Alert!", body: "Don't forget to stay hydrated" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 10, minute: 30 },
        }),
        Notifications.scheduleNotificationAsync({
            content: { title: "💧 Hydration Alert!", body: "Don't forget to stay hydrated" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 13, minute: 30 },
        }),
        Notifications.scheduleNotificationAsync({
            content: { title: "💧 Hydration Alert!", body: "Don't forget to stay hydrated" },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 15, minute: 30 },
        }),
    ]);
}