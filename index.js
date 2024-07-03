import { ChatClient, buildEmoteImageUrl } from "@twurple/chat"
import { StaticAuthProvider } from "@twurple/auth";
import "dotenv/config";


const clientId = process.env.CLIENT_ID;
const accessToken = process.env.ACCESS_TOKEN;
const channel = process.env.CHANNEL;

const auth = new StaticAuthProvider(clientId, accessToken);

const client = new ChatClient({channels: [channel], readOnly: true, authProvider: auth});

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
    console.log('emotes', JSON.stringify(Array.from(msg.emoteOffsets.entries())))

    msg.emoteOffsets.forEach((value, key, map) => {
        const url = buildEmoteImageUrl(key);
        console.log("EMOTE: ", key)
        console.log("VALUE: ", value);
        console.log("URL: ", url);
    })

})

client.connect();

