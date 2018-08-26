require('dotenv').config();

module.exports = {
    witToken:process.env.WIT_TOKEN,
    slackToken:process.env.SLACK_TOKEN,
    googleApiKey:process.env.GOOGLE_TIME_API_KEY,
}