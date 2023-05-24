import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";
import ThreadResponse from "../business/thread/ThreadResponse";
import BackButton from "../business/commons/BackButton";
import MainTweet from "../business/thread/MainTweet";
import Responses from "../business/thread/Responses";
import { useAuth } from "../business/context/authContext";

const TweetThread = () => {
  const { user, loading } = useAuth();

  const location = useLocation();
  let tweet = location.state;

  return (
    <>
      <div className="container">
        <BackButton />
        <div className="app-welcome">
          <h2>Tweet Thread</h2>
        </div>
        <div className="d-flex flex-column justify-content-center tweetsDashboard ">
          <MainTweet {...{ tweet }} />
        </div>
        <div className="tweetsDashboard">
          <Responses {...{ tweet }} />
        </div>
        <div className="newTweetContainer mt-5">
          <ThreadResponse {...{ tweet, user }} />
        </div>
      </div>
    </>
  );
};

export default TweetThread;
