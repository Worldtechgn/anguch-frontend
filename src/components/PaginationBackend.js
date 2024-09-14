import { RenderDataCatastrophe } from "../pages/catastrophes/components/renderDataCatastrophe";
import "../assets/pagination.css";

const PaginationBackend = (props) => {

  // init
  const { currentPage, maxPageLimit, minPageLimit } = props;
  const totalPages = props.meta.totalPages;
  const data = props.catastrophes;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    props.onPrevClick();
  }

  const handleNextClick = () => {
    props.onNextClick();
  }

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  }

  const pageNumbers = pages.map(page => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li key={page} id={page} onClick={handlePageClick}
          className={currentPage === page ? 'page-item page-link active' : 'page-item page-link custom-item-page'}>
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  // page ellipses
  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li className="page-item page-link custom-item-page" onClick={handleNextClick}> &hellip;</li>
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li className="page-item page-link custom-item-page" onClick={handlePrevClick}>&hellip;</li>
  }

  return (
    <>
      {RenderDataCatastrophe(data, props.onRefreshData)}
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="btn btn-primary" onClick={handlePrevClick} disabled={currentPage === pages[0]}>Précédente</button>
          </li>
          {pageDecremenEllipses}
          {pageNumbers}
          {pageIncrementEllipses}
          <li>
            <button className="btn btn-primary" onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>Suivante</button>
          </li>
        </ul>
      </nav>
  </>
  )
}

export default PaginationBackend
