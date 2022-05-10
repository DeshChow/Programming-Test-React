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
import "./SpaceXData.css";
import Loader from "../../components/Loader/Loader";

const PER_PAGE = 9;

const SpaceXData = () => {
  const [loading, setLoading] = useState(true);

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
      dispatch(getLastWeekLaunches(launches));
    } else if (e.target.value === "last-month") {
      dispatch(getLastMonthLaunches(launches));
    } else if (e.target.value === "failure") {
      dispatch(getFailureLaunches(launches));
    } else if (e.target.value === "success") {
      dispatch(getSuccessfullLaunches(launches));
    } else if (e.target.value === "upcoming") {
      dispatch(getUpcomingLaunches(launches));
    } else {
      dispatch(getLastYearLaunches(launches));
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
            <div className="w-75 filter-launches">
              <select
                className="form-select shadow-sm p-3 bg-white rounded"
                name="launches"
                id="launches"
                onChange={(e) => handleFilteringlaunches(e)}
                style={{ marginBottom: "2rem" }}
              >
                <option value="select-item" selected disabled>
                  Select to Filter the Launches
                </option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
                <option value="failure">Failure</option>
                <option value="success">Success</option>
                <option value="upcoming">Upcoming</option>
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
                .map((launch) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4">
                      <Card launch={launch} />
                    </div>
                  );
                })}
          </div>
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
        </>
      )}
    </div>
  );
};

export default SpaceXData;
