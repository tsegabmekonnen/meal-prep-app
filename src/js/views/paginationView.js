import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    console.log('******inside paginationView ' + numPages);
    //page 1 and there are no other pages //no buttons
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${currentPage + 1}</span>
    </button>`;
    }
    //last pages //no right button
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    }

    //other page //both buttons
    if (currentPage < numPages) {
      return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }
    //TODO: other page //both buttons
    // if (currentPage < numPages) {
    //   return `
    //   ${_leftButton()}
    //   ${_rightButton()}
    //   `;
    // }

    //page 1 and there are other pages //no left button
    return 'only 1 page';
  }

  //   _rightButton() {
  //     return `<
  //     button class="btn--inline pagination__btn--next">
  //     <span>Page ${currentPage + 1}</span>
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-right"></use>
  //     </svg>
  //   </button>`;
  //   }
  //   _leftButton() {
  //     return `
  //     <button class="btn--inline pagination__btn--prev">
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-left"></use>
  //     </svg>
  //     <span>Page ${currentPage - 1}</span>
  //   </button>`;
  //   }
}

export default new PaginationView();
