import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../database/firebase";

const TweetForm = (props) => {
  const initialStateValues = "";
  const [bodyTweet, setBodyTweet] = useState(initialStateValues);

  const typeOfTweet = "createTweet";
  const today = new Date();
  let tweetObject = {};

  var onlyDay =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const handleInputChange = (e) => {
    colorNumber();
    setBodyTweet(e.target.value);
  };

  const getTweefInfo = () => {
    var date =
      today.getHours() +
      ":" +
      today.getMinutes() +
      " " +
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    tweetObject = {
      date: today,
      action: typeOfTweet,
      body: bodyTweet,
      author: props.user.displayName,
      timestamp: date,
      day: onlyDay,
      replies: 0,
    };

    return tweetObject;
  };

  const createTweet = async (tweetObject) => {
    await addDoc(collection(db, "tweets"), tweetObject);
    await addDoc(collection(db, "events"), {
      typeOfAction: "createTweet",
      user: props.user.displayName,
      timestamp: onlyDay,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    tweetObject = getTweefInfo();
    setBodyTweet(initialStateValues);
    createTweet(tweetObject);
  };

  const colorNumber = () => {
    if (bodyTweet.length > 200) {
      document.getElementById("len-tweet").style.color = "red";
    } else {
      document.getElementById("len-tweet").style.color = "black";
    }
  };

  return (
    <>
      <form className="card card-body w-50 m-auto" onSubmit={handleSubmit}>
        <div className="form-group input-group pb-3">
          <textarea
            maxLength="300"
            type="text"
            className="form-control"
            placeholder="¿Que estas pensando?"
            name="body"
            onChange={handleInputChange}
            value={bodyTweet}
          ></textarea>
        </div>
        <span className="container-len" id="len-tweet">
          {bodyTweet.length}
        </span>
        <button className="btn btn-secondary btn-block">Publicar</button>
      </form>
    </>
  );
};

export default TweetForm;
