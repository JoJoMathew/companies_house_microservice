/**
 * Technical Exercise Answer, Companies House
 * Mathew Thomas 16/05/2020
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 8080;
const app = express();
app.use(bodyParser.json());

/* This data would usually be stored in a database but,
 for the sake of this exercise I will define as a const */
const games = [
  {
    "title": "Uncharted 4",
    "id": 1,
    "description": "For the first time ever in Uncharted history, drive vehicles during gameplay",
    "by": "Sony",
    "platform": ["PS4"],
    "age_rating": "16",
    "likes": 100,
    "comments": [{
      "user": "bob",
      "message": "Cracking game far too much cinematic",
      "dateCreated": "2011-01-03",
      "like": 6
    }, {
      "user": "testingPriest",
      "message": "Not enough shooting for me,far too easy ",
      "dateCreated": "2011-04-02",
      "like": 5
    }]
  },

  {
    "title": "Call of Duty, Infinite Warfare",
    "id": 2,
    "description": "Fast paced shooter",
    "by": "Infiniward",
    "platform": ["XBOX", "PS4"],
    "age_rating": "18",
    "likes": 40,
    "comments": [{
      "user": "jim",
      "message": "Awesome game",
      "dateCreated": "2015-01-25",
      "like": 7
    }, {
      "user": "Dave",
      "message": "Too many n00bs ",
      "dateCreated": "2016-05-00",
      "like": 8
    }, {
      "user": "bob",
      "message": "some comment",
      "dateCreated": "2011-09-19",
      "like": 2
    }, {
      "user": "richard",
      "message": "some other comment",
      "dateCreated": "2011-10-19",
      "like": 1
    }]
  }
]

//// Part 2 Task ////
// Get Report
app.get('/games/report', (req, res) => {
  console.log('Returning games report');

  // Highest likes 
  var highestLikes = getMax(games, "likes");

  // Most comments
  var comms = [];
  var usrs = [];
  var msgs = [];

  for (var i = 0; i < games.length; i++) {
    comms.push(games[i].comments);
  }

  for (var i = 0; i < comms.length; i++) {
    if (comms.hasOwnProperty(i)) {
      msgs.push(comms[i]);
    }
  }

  var mergedMessgaeArray = [].concat.apply([], msgs);
  for (var i = 0; i < mergedMessgaeArray.length; i++) {
    usrs.push(mergedMessgaeArray[i].user);
  }

  // Avg likes per game
  var gameArr = [];
  for (var i = 0; i < games.length; i++) {

    for (game of games) {
      var gme = new Object();
      gme.title = game.title;
      gme.comments = game.comments;
      gme.commentCount = gme.comments.length;

      var commentTotalValue = 0;
      for (var c of gme.comments) {
        commentTotalValue += c.like;
      }

      gme.averageLikeValue = Math.ceil(commentTotalValue / gme.commentCount);

      var obj = new Object();
      obj.title = gme.title;
      obj.average_likes = gme.averageLikeValue;
      gameArr.push(obj);

    }
  }

  // Return Object
  var returnObject = new Object();
  returnObject.user_with_most_comments = highest(usrs);
  returnObject.highest_rated_game = highestLikes.title;
  returnObject.average_likes_per_game = gameArr;

  res.send(returnObject);

});

//// Part 1 Task ////
// Get game by ID
app.get('/games/**', (req, res) => {
  console.log('Returning game by ID');
  const gameId = parseInt(req.params[0]);
  const foundGame = games.find(subject => subject.id === gameId);

  if (foundGame) {
    for (let attribute in foundGame) {
      if (req.body[attribute]) {
        foundGame[attribute] = req.body[attribute];
        console.log(`Set ${attribute} to ${req.body[attribute]} in game: ${gameId}`);
      }
    }
    res.send(foundGame);
  } else {
    console.log(`Game not found.`);
    res.status(404).send();
  }
});

//// Helpers ////
// Get Max (compare array elements)
function getMax(arr, prop) {
  var max;
  for (var i = 0; i < arr.length; i++) {
    if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
      max = arr[i];
  }
  return max;
}

// Highest appearences 
const highest = arr => (arr || []).reduce((acc, el) => {
  acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1
  acc.max = acc.max ? acc.max < acc.k[el] ? el : acc.max : el
  return acc
}, { k: {} }).max

console.log(`Games service listening on port ${port}`);
app.listen(port);
