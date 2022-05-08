const Card = ({ lunch }) => {
  return (
    <div className="card h-100">
      <img src={lunch?.links?.mission_patch_small} className="card-img-top" alt="lunch-img" />
      <div className="card-body">
        <h5 className="card-title">{lunch?.rocket?.rocket_name}</h5>
        <p className="card-text">{lunch?.details}</p>
      </div>
    </div>
  );
};

export default Card;
