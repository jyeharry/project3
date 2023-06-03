import 'semantic-ui-css/semantic.css';

const Home = () => {
  return (
    <>
      <h1>Investment Calculator</h1>
      <p>
        Type a ticker symbol in the search bar up the top to see a price chart on your favourite company! <strong>Note: only american companies can be searched</strong>
      </p>
      <p>
        Use the form on the following page to calculate what an investment in that company would look like.
      </p>
      <h3>
        Examples of companies to search
      </h3>
      <ul>
        <li>Apple: AAPL</li>
        <li>Netflix: NFLX</li>
        <li>Amazon: AMZN</li>
        <li>Tesla Motors, Inc: TSLA</li>
        <li>Google: GOOG or GOOGL</li>
      </ul>
    </>
  );
}

export default Home;
