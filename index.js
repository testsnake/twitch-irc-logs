import { ChatClient } from "@twurple/chat"
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(`Channel Name: `, channel => {
    const client = new ChatClient({channels: [channel], readOnly: true});

    client.onConnect(() => {
        console.log(`Connected to channel ${client.currentChannels.concat()}`);
    })

    client.onAuthenticationFailure((text, retryCount) => {
        console.log(`Failed to authenticate: ${text}`);
        console.log(`${retryCount} attempt(s)`);
    })

    client.onAuthenticationSuccess(() => {
        console.log(`Connected to twitch!`);
    })

    client.onJoin((channel, user) => {
        console.log(`User ${user} joined channel ${channel}`);
    })

    client.onJoinFailure(() => {
        console.log(`Failed to join channel ${channel}`)
    })

    client.onMessage((channel, user, text, msg) => {
        console.log(JSON.stringify(msg));
    })

    client.connect();
})
