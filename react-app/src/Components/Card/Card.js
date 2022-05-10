import LazyLoad from "react-lazyload";

const Card = ({ launch }) => {
  return (
    <div className="card h-100 shadow p-3 mb-5 bg-white rounded">
      <LazyLoad height={200}>
        <div className="mt-2 d-flex justify-content-end">
          {launch?.launch_success ? (
            <span className="me-3 ps-4 pe-4 pt-1 pb-1 rounded bg-success text-white">Success</span>
          ) : (
            <span className="me-3 ps-4 pe-4 pt-1 pb-1 rounded bg-danger text-white">Fail</span>
          )}
        </div>
        <img src={launch?.links?.mission_patch_small} className="card-img-top ps-5 pe-5 pt-1 pb-3" alt="launch-img" />
      </LazyLoad>
      <div className="card-body bg-light">
        <h5 className="card-title">
          {launch?.rocket?.rocket_name}
          {"(Type-"}
          {launch?.rocket?.rocket_type}
          {")"}
        </h5>
        <p className="card-text" style={{ textAlign: "justify" }}>
          {launch?.details}
        </p>
      </div>
    </div>
  );
};

export default Card;
