import React from "react";
import { useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../database/firebase";

const ThreadResponse = (props) => {
  const [bodyTweet, setBodyTweet] = useState("");

  const today = new Date();
  let tweetObject = {};
  const typeOfTweet = "replyTweet";
  const initialStateValues = "";

  var onlyDay =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const handleInputChange = (e) => {
    setBodyTweet(e.target.value);
  };

  const getTweefInfo = () => {
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    tweetObject = {
      responseTo: props.tweet.id,
      action: typeOfTweet,
      body: bodyTweet,
      author: props.user.displayName,
      timestamp: date,
      day: onlyDay,
    };

    return tweetObject;
  };

  const createResponse = async (tweetObject) => {
    await addDoc(collection(db, "replies"), tweetObject);
    await addDoc(collection(db, "events"), {
      typeOfAction: "replyTweet",
      user: props.user.displayName,
      timestamp: onlyDay,
    });
    const docRef = doc(db, "tweets", props.tweet.id);
    const docSnap = await getDoc(docRef);

    let replies = docSnap.get("replies");
    await updateDoc(docRef, {
      replies: replies + 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    tweetObject = getTweefInfo();
    createResponse(tweetObject);
    setBodyTweet(initialStateValues);
  };

  return (
    <>
      <form className="card card-body w-50 m-auto" onSubmit={handleSubmit}>
        <div className="form-group input-group pb-3">
          <textarea
            maxLength="300"
            type="text"
            className="form-control"
            placeholder="Responder al tweet"
            name="body"
            onChange={handleInputChange}
            value={bodyTweet}
          ></textarea>
        </div>
        <span className="container-len">{bodyTweet.length}</span>
        <button className="btn btn-secondary btn-block">Publicar</button>
      </form>
    </>
  );
};

export default ThreadResponse;
