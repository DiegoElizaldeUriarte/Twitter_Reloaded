const MainTweet = (props) => {
  console.log(props.tweet);
  return (
    <div className="card mb-1 w-80 mt-10 mr-3 tweet-card" key={props.tweet.id}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4>@{props.tweet.author}</h4>
        </div>
        <p className="body">{props.tweet.body}</p>
        <p className="date">{props.tweet.timestamp}</p>
      </div>
    </div>
  );
};

export default MainTweet;
