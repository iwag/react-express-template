window.$ = window.jQuery = require('jquery')
require('semantic-ui-css/semantic')
var React = require('react/addons')
var Router = require('react-router')
var Header = require('./header')


var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var Routes = Router.Routes;
var RouteHandler = Router.RouteHandler;

var About = React.createClass({
  render() {
  return (
    <div className="column">
      <div className="ui segment">
        <h4 className="ui black header">This is the about page.</h4>
      </div>
    </div>
    );
    }
    });


var Main = React.createClass({
                              render() {
                              return (
    <div>
      <Header/>
      <div className="ui page grid">
        <this.props.activeRouteHandler/>
      </div>
    </div>
    );
    }
    });

var IssueList = React.createClass({

  propTypes: {
    bookmarks: React.PropTypes.array.isRequired,
    onPressBookmark: React.PropTypes.func.isRequired
  },
  render: function() {

    var list = this.props.bookmarks.map(
        function(b) {
          return (
            <Issue bookmark={b} />
          )
        }
    );

    return (
          <div className="ui items">
          {list}
          </div>
    );
  }
});


var Issue = React.createClass({
    displayName: 'Issue',
    onClick: function () {
        window.location = this.props.bookmark.permalink;
    },
    render: function () {

        var bookmark = this.props.bookmark;

        return (
            <div className="item">
    <div className="image">
              <img
                src={bookmark.user.profile_image_url}
              />
              </div>
  <div className="right content">
      <a className="header" href={bookmark.link}>{bookmark.title}</a>
      <div className="meta">
        <span className="cinema">{bookmark.user.name}</span>
      </div>
      <div className="description">
        <p>{bookmark.description}</p>
        <p className="cinema">{bookmark.comment}</p>
      </div>

      <div className="extra">
        <div className="ui label"></div>
          <a href={bookmark.permalink}>
          <div className="ui right floated primary button">
                Bookmark
              <i className="right chevron icon"></i>
            </div>
          </a>
          </div>
        </div>
      </div>
        );

      }


});


var IssueListView = React.createClass({
  getInitialState: function() {
    return {
      bookmarks: null,
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {

$.ajax({
      url: 'http://feed.hbfav.com/iwg',
      dataType: 'json',
      success: function(data) {
        this.setState({bookmarks: data.bookmarks, loaded: true});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  openBookmark: function(rowData) {
  },

  renderLoadingView: function() {
    return (
<div className="ui icon message">
  <i className="notched circle loading icon"></i>
  <div className="content">
    <div className="header">
      Just one second
    </div>
    <p>We're fetching that content for you.</p>
  </div>
</div>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <IssueList
        bookmarks={this.state.bookmarks}
        onPressBookmark={this.openBookmark}
      />
    );
  }
});


var Home = React.createClass({
                              render() {
                              return (
    <div className="column">
      <div className="ui segment">
        <h1 className="ui header">
          <div className="sub header">

          </div>
        </h1>
                    <IssueListView/>
      </div>

    </div>
    );
    }
    });


var routes = (
  <Routes location="hash">
    <Route path="/" handler={Main}>
      <DefaultRoute name="home" handler={Home}/>
      <Route name="about" handler={About}/>
    </Route>
  </Routes>
)

$(function() {
	  return React.renderComponent(routes, document.body);
});

