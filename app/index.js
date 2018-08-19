require( 'bootstrap/dist/css/bootstrap.min.css' )
require( './main.css' );
import React from 'react';
import ReactDOM from 'react-dom';


export default class Main extends React.Component {
  constructor( props, context ) {
    super( props, context );

    this.state = {
      search: '',
      movies: []
    }

    this.noPoster = 'https://bit.ly/2mx1zI0'
    this.handleChange = this.handleChange.bind( this );
    this.getMovies = this.getMovies.bind( this );
  }

  getMovies( event ) {
    event.preventDefault();
    let encodedSearchTerm = encodeURI( this.state.search );
    let searchUrl = `http://www.omdbapi.com/?s=${encodedSearchTerm}&apikey=9f572b90`;
    this.setState( {
      search: '',
      movies: []
    } );
    fetch( searchUrl )
      .then( results => {
        if ( results.status === 200 ) {
          return results.json()
        } else {
          this.setState( { movies: <div className="alert alert-danger" role="alert">A Error Occurred, Please Try Again Later.</div> } );
          throw `${results.status}: ${results.statusText}`;
        }
      } )
      .then( data => {
        let movies = data.Search.map( each => {
          console.log( each );
          return (
            <div key={each.imdbID} className='card-container col-xl-2 col-lg-3 col-md-4 col-sm-6'>
              <a href={`https://www.imdb.com/title/${each.imdbID}`} target='_blank' rel='noopener noreferrer'>
                <div className='movie-card card'>
                  <div className='card-body'>
                    <h5 className='movie-title card-title'>{each.Title} ({each.Year})</h5>
                  </div>
                  <img src={each.Poster === 'N/A' ? this.noPoster : each.Poster} className='movie-poster card-img-bottom img-fluid' />
                </div>
              </a>
            </div>
          );
        } );
        this.setState( { search: '', movies: movies } );
      } )
      .catch( err => {
        console.log( err );
      } );
  }

  handleChange( event ) {
    this.setState( { search: event.target.value } );
  }

  render() {
    return (
      <div className='text-center container-fluid main-container'>
        <h1>Search Movie Titles</h1>
        <form onSubmit={this.getMovies} className='form-group'>
          <div className='input-group'>
            <input type='text' value={this.state.search} onChange={this.handleChange} placeholder='search by movie title' className='search-box form-control' />
            <span className='input-group-btn'>
              <input type='submit' value='Search' className='btn btn-default'/>
            </span>
          </div>
        </form>
        <div className='row justify-content-md-center'>{this.state.movies}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById( 'app' )
);
