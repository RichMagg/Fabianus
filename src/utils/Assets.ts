import { ActivityType } from "discord.js";
import { listening, playing, watching, custom } from "../../assets/activities.json"

export function getActivities() {
    return [
        ...listening.map(s => ({ name: s.text, type: ActivityType.Listening })),
        ...playing.map(s => ({ name: s.text, type: ActivityType.Playing })),
        ...watching.map(s => ({ name: s.text, type: ActivityType.Watching })),
        ...custom.map(s => ({ name: s.text, type: ActivityType.Custom }))
    ];
}