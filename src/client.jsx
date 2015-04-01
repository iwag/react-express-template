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

var Home = React.createClass({
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
    });

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
        <Router.RouteHandler />
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

