const Twitter = require('twitter');
const axios = require("axios");
const dotenv = require('dotenv');

const result = dotenv.config()

if (result.error) {
    throw result.error
}

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

let siteUrl = "https://n06yidj8d0.execute-api.us-east-1.amazonaws.com/covid19bot";

const fetchData = async () => {

    try {
        let result = await axios.get(siteUrl);
        return result.data
    } catch (err) {
        throw (err);
    }

};

exports.handler = async () => {
    
    var result = await fetchData();

    var title = result.title;
    var content = result.content.slice(0,220);
    var url = result.url;

    var message = title + '\n' + content + '...\n' + url;
    var tweet = await client.post("statuses/update", { status: message });
    
    return {
        result,
        tweet,
    };
};

exports.handler();