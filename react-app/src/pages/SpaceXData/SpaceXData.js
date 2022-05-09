import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Card from "../../Components/Card/Card";
import axiosInstance from "../../services/axiosInstance";

const PER_PAGE = 9;

const SpaceXData = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lunches, setLunches] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/v3/launches")
      .then((res) => {
        setLunches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const currentPageLunches = lunches.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(lunches.length / PER_PAGE);

  return (
    <div className="container">
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
