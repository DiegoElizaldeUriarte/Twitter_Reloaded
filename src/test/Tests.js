import { fireEvent, render } from "@testing-library/react";
import DisplayTweets from "../business/home/DisplayTweets";
import TweetForm from "../business/home/TweetForm";
import { MemoryRouter } from "react-router-dom";
import { db } from "../database/firebase";
import { onSnapshot } from "firebase/firestore";
import Responses from "../business/thread/Responses";
import { shallow } from "enzyme";

// Tests that tweets are retrieved successfully from the database and displayed.
it("test_get_tweets_successfully", () => {
  const onSnapshotMock = jest.fn((q, callback) => {
    const querySnapshot = {
      forEach: (callback) => {
        callback({
          get: () => "createTweet",
          data: () => ({
            author: "test author",
            body: "test body",
            timestamp: "test timestamp",
            replies: 0,
            date: new Date(),
          }),
        });
      },
    };
    callback(querySnapshot);
  });
  const collectionMock = jest.fn(() => ({ onSnapshot: onSnapshotMock }));
  const dbMock = { collection: collectionMock };
  const setTweets = jest.fn();

  DisplayTweets({ user: { displayName: "test user" } }, setTweets, dbMock);

  expect(collectionMock).toHaveBeenCalledWith(dbMock, "tweets");
  expect(onSnapshotMock).toHaveBeenCalled();
  expect(setTweets).toHaveBeenCalled();
});

// Tests that a tweet is successfully submitted with valid input.
it("test_submit_tweet_with_valid_input", async () => {
  const mockProps = {
    user: {
      displayName: "John Doe",
    },
  };
  const mockEvent = {
    preventDefault: jest.fn(),
  };
  const mockAddDoc = jest.fn();
  const mockCollection = jest.fn(() => ({
    addDoc: mockAddDoc,
  }));
  const mockDb = {
    collection: mockCollection,
  };
  const { getByPlaceholderText, getByText } = render(
    <TweetForm {...mockProps} />,
    { wrapper: MemoryRouter }
  );
  const input = getByPlaceholderText("¿Que estas pensando?");
  const submitButton = getByText("Publicar");
  fireEvent.change(input, { target: { value: "This is a valid tweet" } });
  fireEvent.click(submitButton);
  expect(mockAddDoc).toHaveBeenCalled();
});

// Tests that the getResponses function successfully retrieves tweets from the database.
it("test_get_responses_successfully_retrieves_tweets", () => {
  const mockProps = { tweet: { id: "123" } };
  const mockSnapshot = jest.fn();
  const mockCollection = jest.fn(() => ({ onSnapshot: mockSnapshot }));
  const mockDb = { collection: mockCollection };
  const mockData = [
    { author: "user1", body: "tweet1", timestamp: "2022-01-01", id: "456" },
  ];
  const mockQuerySnapshot = {
    forEach: jest.fn((callback) => mockData.forEach(callback)),
  };
  const mockOnSnapshot = jest.fn((callback) => callback(mockQuerySnapshot));
  jest.spyOn(db, "collection").mockImplementation(() => mockCollection);
  jest.spyOn(onSnapshot, "onSnapshot").mockImplementation(mockOnSnapshot);

  const wrapper = shallow(<Responses {...mockProps} />);
  const instance = wrapper.instance();
  instance.getResponses();

  expect(mockCollection).toHaveBeenCalledWith(db, "replies");
  expect(mockOnSnapshot).toHaveBeenCalled();
  expect(instance.state.tweets).toEqual(mockData);
});
