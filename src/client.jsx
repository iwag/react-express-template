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

class Home extends React.Component {
   render() {
      return (
    <div className="column">
      <div className="ui segment">
        <h1 className="ui header">
          <span>Get to work!</span>
          <div className="sub header">
            Make sure to check out README.md for development notes.
          </div>
        </h1>
      </div>
    </div>
	  );
   }
}

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
        <Router.RouteHandler />
      </div>
    </div>
    );
    }
}

var Issue = React.createClass({
    displayName: 'Issue',
    onClick: function () {
        window.location = this.props.href;
    },
    render: function () {
        var bookmark = this.props.bookmark;
        return (
            <div className="ui container">
                <div className="ui label">{this.props.title}</div>
              <img
                src={this.props.profile_image_url}
                className="ui small image"
              />
              <div className="ui">
                <div className="ui">{this.props.user}</div>
                <img
                  src={this.props.favicon_url}
                  className="ui small image"
                />

              </div>
            </div>
        );

      }
})

var IssueList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
        <Issue
         title="Rebuild: 85: Virtual Reality, The Final Frontier (naan, hak)"
         link="http://rebuild.fm/85/"
         favicon_url= "http://favicon.st-hatena.com/?url=http://rebuild.fm/85/"
         comment=""
         count="7"
         datetime="2015-03-28T16:40:18+09:00"
         created_at="5時間前"
         profile_image_url= "http://www.st-hatena.com/users/mi/miyagawa/profile.gif"
         user="miyagawa"
        />
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
          <span>Get to work!</span>
          <div className="sub header">
            <IssueList />
          </div>
        </h1>
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
