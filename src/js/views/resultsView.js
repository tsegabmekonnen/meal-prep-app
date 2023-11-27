import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! please try again';
  _message = '';

  _generateMarkup() {
    // console.log('*inside _generateMarkup in ResultsView*******');
    // console.log(this._data);
    //what you are doing here basically is calling the previewView (which is a child view)
    // inside its parent view (i.e. the ResultsView)
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  // _generateMarkup() {
  //   console.log('*inside _generateMarkupPreview*******');
  //   console.log(this._data);
  //   return this._data.map(this._generateMarkupPreview).join('');
  // }

  //NB: THis part is refactored and made more 'generic' with this.data property
  // in the preview.js

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);

  //   return `
  //   <li class="preview">
  //   <a class="preview__link ${
  //     result.id === id ? 'preview__link--active' : ''
  //   }" href="#${result.id}">
  //     <figure class="preview__fig">
  //       <img src="${result.image}" alt=${result.title} />
  //     </figure>
  //     <div class="preview__result">
  //       <h4 class="preview__title">${result.title}</h4>
  //       <p class="preview__publisher">${result.publisher}</p>
  //       <div class="preview__user-generated">
  //         <svg>
  //           <use href="src/img/icons.svg#icon-user"></use>
  //         </svg>
  //       </div>
  //     </div>
  //   </a>
  //   </li>
  //   `;
  // }
}

export default new ResultsView();
