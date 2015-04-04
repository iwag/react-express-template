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
      <h4 className="ui black header"></h4>
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

var Input = React.createClass({
  getInitialState() {
    return {
      textValue: ""
    };
  },
  changeText(e) {
    this.setState({textValue: e.target.value});
  },
  onClick(e) {
    this.props.onSearchSubmit({keyword: this.state.textValue});
  },
  render() {
    return (
      <div>
      <div className="ui icon input">
        <input type="text" placeholder="..." value={this.state.textValue} onChange={this.changeText} />
        <i className="circular search icon" onClick={this.onClick} />
      </div>
      </div>
    );
  }
})

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
	  var link = encodeURI("http://search.nicovideo.jp/tag/" + this.props.tag);
    return(
      <a href={link}><div className="ui small basic button"><i className="info icon" /> {this.props.tag}</div></a>
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
      <img className="ui left medium rounded image" src={bookmark.thumbnail_url} />
      </div>
      <div className="content">
      <h2 className="teal header"><a href={watch_url}>{bookmark.title}</a></h2>
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
      <a className="calendar">
        <i className="calendar icon"></i> {bookmark.start_time}
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
      init: true,
      bookmarks: null,
      loaded: true
    };
  },

  componentDidMount() {
    //this.fetchData();
  },

  fetchData(keyword) {
    var q = {
      query: keyword,
      service: ['video'],
      search: ['title','description','tags'],
      join: ['cmsid','title','description','tags', 'thumbnail_url', 'view_counter', 'mylist_counter', 'start_time'],
      sort_by: '_popular',
      order: true,
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
      <p>Searching...</p>
      </div>
      </div>
    );
  },

  handleSubmit(d) {
    this.fetchData(d.keyword);
    this.setState({ bookmarks: null, init:false, loaded: false});
  },

  render() {
    var v;
    if (this.state.bookmarks)
      v = <IssueList bookmarks={this.state.bookmarks} onPressBookmark={this.openBookmark} />
    else if (this.state.init)
      v = <div />
    else
      v = this.renderLoadingView()

    return (
      <div>
      <Input onSearchSubmit={this.handleSubmit}/>
      {v}
      </div>
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
