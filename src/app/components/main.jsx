var React = require('react');
var Bootstrap = require('react-bootstrap');

var Navigation = require('./navigation.jsx');
var Home = require('./home-container.jsx')
var Headroom = require('react-headroom');

var Main = React.createClass({

    getInitialState: function () {
        return {
            tabList: tabList,
            currentTab: 0
        };
    },

    changeTab: function(index) {
        this.setState({ currentTab: index });
    },

    render: function () {
        return (
            <div>
                <Headroom>
                    <Navigation projectName="Somellier" changeTab={this.changeTab} tabList={this.state.tabList}/>
                </Headroom>
                <div className="starter-template">
                    {this.state.tabList[this.state.currentTab].content}
                </div>
            </div>
        );
    }
});

var tabList = [
    {
        'content':
                <Home />
    },
    {
        'content':
                <img src="http://s.mlkshk.com/r/103AG" />
    },
    {
        'content':
                <img src="http://s.mlkshk.com/r/JAUD" />
    },
    {
        'content':
            <div className="leo">
                <img src="http://s.mlkshk.com/r/ZJPL" />
            </div>
    }
];

module.exports = Main;