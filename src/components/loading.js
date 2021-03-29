export const LoadingItem = (props) => {
  if (props?.loading == false || false) return null;

  return (
    <div className="loading_item" type={props?.type}>
      <div className="item_content">
        <div className="loading_animation">
          <span className="l1"></span>
          <span className="l2"></span>
          <span className="l3"></span>
          <span className="l4"></span>
          <span className="l5"></span>
        </div>
        <p>{props.content || "loading..."}</p>
      </div>
    </div>
  );
};

export const setLoadingPromise = (arr, err, _finally) => {
  return Promise.all(arr)
    .catch(() => {
      err();
    })
    .finally(() => {
      _finally();
    });
};

export default LoadingItem;
