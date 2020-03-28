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

const postTweet = async (message) => {
    client.post("statuses/update", { status: message }, function (error, tweet, response) {
        if (error) {
            console.log(error)
        } else {
            console.log(tweet)
        }
    })
}

exports.handler = async () => {
    
    var result = await fetchData();

    title = result.title;
    content = result.content.slice(0,220);
    url = result.url;

    result = postTweet(title + '\n' + content + '...\n' + url);
    
    return {
        title,
        content,
        result
    };
};

exports.handler();