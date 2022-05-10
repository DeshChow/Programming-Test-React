import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLunches, setLastWeekLunches, setLastMonthLunches, setLastYearLunches } from "../../redux/slice/launchesSlice";
import Card from "../../components/Card/Card";
import axiosInstance from "../../services/axiosInstance";
import ReactPaginate from "react-paginate";

const PER_PAGE = 9;

const SpaceXData = () => {
  const lunches = useSelector((state) => state.lunches);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchLunches();
  }, []);

  const fetchLunches = () => {
    axiosInstance
      .get("/v3/launches")
      .then((res) => {
        dispatch(setLunches(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const currentPageLunches = lunches?.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(lunches?.length / PER_PAGE);

  const handleFilteringLunches = (e) => {
    if (e.target.value === "last-week") {
      dispatch(setLastWeekLunches(lunches));
    } else if (e.target.value === "last-month") {
      dispatch(setLastMonthLunches(lunches));
    } else {
      dispatch(setLastYearLunches(lunches));
    }
  };

  return (
    <div className="container">
      <div className="filter-lunches">
        <label htmlFor="lunches">Filter By</label>
        <select name="lunches" id="lunches" onChange={(e) => handleFilteringLunches(e)}>
          <option value="select-item" selected disabled>
            Select
          </option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
        </select>
      </div>
      <div className="row g-3">
        {currentPageLunches &&
          currentPageLunches.length > 0 &&
          currentPageLunches.map((lunch) => {
            return (
              <div className="col-12 col-md-6 col-lg-4">
                <Card lunch={lunch} />
              </div>
            );
          })}
      </div>
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
  );
};

export default SpaceXData;
