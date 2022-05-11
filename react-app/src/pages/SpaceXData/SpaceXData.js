import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLaunches,
  getLastWeekLaunches,
  getLastMonthLaunches,
  getLastYearLaunches,
  getFailureLaunches,
  getSuccessfullLaunches,
  getUpcomingLaunches,
} from "../../redux/slice/launchesSlice";
import Card from "../../components/Card/Card";
import axiosInstance from "../../services/axiosInstance";
import ReactPaginate from "react-paginate";
import Loader from "../../components/Loader/Loader";
import "./SpaceXData.css";

const PER_PAGE = 9;

const SpaceXData = () => {
  const [loading, setLoading] = useState(true);

  const [allLaunchesData, setAllLaunchesData] = useState([]);
  const launches = useSelector((state) => state.launches);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    fetchlaunches();
  }, []);

  const fetchlaunches = () => {
    axiosInstance
      .get("/v3/launches")
      .then((res) => {
        setAllLaunchesData(res.data);
        dispatch(getLaunches(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const currentPagelaunches = launches?.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(launches?.length / PER_PAGE);

  const handleFilteringlaunches = (e) => {
    if (e.target.value === "last-week") {
      dispatch(getLastWeekLaunches(allLaunchesData));
    } else if (e.target.value === "last-month") {
      dispatch(getLastMonthLaunches(allLaunchesData));
    } else if (e.target.value === "failure") {
      dispatch(getFailureLaunches(allLaunchesData));
    } else if (e.target.value === "success") {
      dispatch(getSuccessfullLaunches(allLaunchesData));
    } else if (e.target.value === "upcoming") {
      dispatch(getUpcomingLaunches(allLaunchesData));
    } else {
      dispatch(getLastYearLaunches(allLaunchesData));
    }
  };

  const handleSearchByName = (e) => {
    setSearchByName(e.target.value);
  };

  return (
    <div className="container">
      <div className="w-100 d-flex justify-content-center">
        <h1 className="display-1">SpaceX</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-100 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="w-75  input-group">
              <select
                className="form-select shadow-sm p-3 bg-white rounded"
                name="launches"
                id="launches"
                defaultValue=""
                onChange={(e) => handleFilteringlaunches(e)}
                style={{ marginBottom: "2rem" }}
              >
                <option value="" disabled>
                  Select to Filter the Launches
                </option>
                <option value="last-week">Last Week Launches</option>
                <option value="last-month">Last Month Launches</option>
                <option value="last-year">Last Year Launches</option>
                <option value="failure">Failure Launches</option>
                <option value="success">Successful Launches</option>
                <option value="upcoming">Upcoming Launches</option>
              </select>
            </div>
            <div className="w-75 input-group mb-3">
              <input
                type="text"
                className="form-control shadow-sm p-3 mb-3 bg-white rounded"
                placeholder="Search by Rocket Name"
                aria-label="Search by Rocket Name"
                aria-describedby="basic-addon2"
                onChange={(e) => handleSearchByName(e)}
              />
              <span className="input-group-text  p-3 mb-3" id="basic-addon2">
                SEARCH
              </span>
            </div>
          </div>
          <div className="row g-3">
            {currentPagelaunches &&
              currentPagelaunches.length > 0 &&
              currentPagelaunches
                // eslint-disable-next-line array-callback-return
                .filter((launch) => {
                  if (searchByName === "") return launch;
                  else if (launch?.rocket?.rocket_name?.toLowerCase().includes(searchByName.toLowerCase())) return launch;
                })
                .map((launch, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <Card launch={launch} />
                    </div>
                  );
                })}
          </div>
          {currentPagelaunches && currentPagelaunches.length > 0 && (
            <div className="mt-4 mb-4">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SpaceXData;
