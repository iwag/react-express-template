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

class About extends React.Component {
  render() {
    return (
      <div className="column">
      <div className="ui segment">
      <h4 className="ui black header">This is the about page.</h4>
      </div>
      </div>
    );
    }
}


class Main extends React.Component {
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
}

var IssueList = React.createClass({

  propTypes: {
    bookmarks: React.PropTypes.array.isRequired,
    onPressBookmark: React.PropTypes.func.isRequired
  },
  render() {

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

var Tag = React.createClass({
  render() {
    console.log(this.props.tag);
    return(
      <a href=""><div className="ui basic button"><i className="info icon" /> {this.props.tag}</div></a>
    );
  }
});

var TagList =  React.createClass({
  render () {
    var list = this.props.tags.map(
        function(t) {
          return (<Tag tag={t} />);
        }
    );
    return (
      <div className="meta">{list}</div>
  );
  }
});

var Issue = React.createClass({
  displayName: 'Issue',
  onClick () {
    window.location = this.props.bookmark.permalink;
  },
  render () {

    var bookmark = this.props.bookmark;
    var watch_url = "http://nicovideo.jp/watch/" + bookmark.cmsid

    return (
      <div className="item">
      <div className="image">
      <img  src={bookmark.thumbnail_url} />
      </div>
      <div className="content">
      <a className="header" href={watch_url}>{bookmark.title}</a>
      <TagList tags={bookmark.tags.split(" ")} />

      <div className="description">
      <p>{bookmark.description}</p>
      </div>

      <div className="extra right">
      <a className="smile">
      <i className="smile icon"></i> {bookmark.view_counter} Views
      </a>
      <a className="star">
        <i className="star icon"></i> {bookmark.mylist_counter} Likes
      </a>
      </div>

      </div>
      </div>
    );

  }


});


var IssueListView = React.createClass({
  getInitialState() {
    return {
      bookmarks: null,
      loaded: false
    };
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    var q = {
      query: 'blood game',
      service: ['video'],
      search: ['title','description','tags'],
      join: ['cmsid','title','description','tags', 'thumbnail_url', 'view_counter', 'mylist_counter'],
      sort_by: '_popular',
      order: false,
      size:50
    };
    $.ajax({
      type: 'post',
      url: "http://api.search.nicovideo.jp/api/",
      data: JSON.stringify(q),
      contentType: 'application/JSON',
      dataType: 'JSON',
      scriptCharset: 'utf-8',
      error: function(data) {
        var a = data.responseText.split('\n');
        var v = JSON.parse(a[2]).values;
        this.setState({bookmarks: v, loaded: true});
      }.bind(this)
    });

  },

  openBookmark(rowData) {
  },

  renderLoadingView() {
    return (
      <div className="ui icon message">
      <i className="notched circle loading icon"></i>
      <div className="content">
      <div className="header">
      Just one second
      </div>
      <p>We re fetching that content for you.</p>
      </div>
      </div>
    );
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <IssueList bookmarks={this.state.bookmarks} onPressBookmark={this.openBookmark} />
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
    <Route path="/" handler={Main}>
      <DefaultRoute name="home" handler={Home}/>
      <Route name="about" handler={About}/>
    </Route>
)

Router.run(routes, function(Handler){
	  React.render(<Handler/>, document.body);
});
