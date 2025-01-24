const NotFound = () => {
  return (
    <div className="container-404">
      <div className="error">404</div>
      <div className="message">Page Not Found</div>
      <div className="descrip404">
        Oops! It seems like the page you're looking for doesn't exist.
      </div>
      <a href="/" className="home-link">
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
