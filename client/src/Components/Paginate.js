import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/ComponentCSS/Paginate.css';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1]?.split('&')[0] || '';
  }

  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((x) => {
          const pageNumber = x + 1;
          const link = !isAdmin
            ? `/?keyword=${keyword}&page=${pageNumber}`
            : `/admin/productlist/?keyword=${keyword}&page=${pageNumber}`;

          return (
            <Link
              key={pageNumber}
              to={link}
              className={`page-item ${pageNumber === page ? 'active' : ''}`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
    )
  );
}

export default Paginate;
