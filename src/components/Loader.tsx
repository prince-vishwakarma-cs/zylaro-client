const Loader = () => {
  return (
    <div className="load-contain">
      <div className="sync-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;


export const Skeleton = () => {
  return (<div className="skeleton-shape"></div>
  );
}
