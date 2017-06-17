import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import NotificationTopics from '../services/api/event/EventNotification/topics';

const {ipcRenderer} = require('electron');

export default class BarAction extends Component{

    constructor(props){
        super(props);
        this. _notificationSystem = null;
        this._magicCount = 0;
        var self = this;
        ipcRenderer.on(NotificationTopics.NOTIFICATION, (event, data)=> {
            var notification = JSON.parse(data);
            self._addNotification(notification);
        });
    }

    getInitialState() {
        return {
            allowHTML: false,
            viewHeight: null
        };
    }

    _notificationSystemInstance() {
        return this._notificationSystem;
    }

    _allowHTML(allow) {
        this.setState({ allowHTML: allow });
    }

    _addNotification(notification) {
        this._notificationSystem.addNotification(notification);
    }

    componentWillMount() {
        this.setState({ viewHeight: window.innerHeight });
    }

   componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    _showTheMagic() {
        var self = this;
        this._notificationsShowCase.forEach(function(notification) {
        var _notification = notification;
        if (self._magicCount > 0) {
            _notification.position = _getRandomPosition();
        }
        self._notificationSystem.addNotification(_notification);
        });
        this._magicCount++;
    }

    render(){
        return (
            <div>
                 <NotificationSystem ref="notificationSystem" allowHTML={ this.state.allowHTML } />
            </div>
        );
    }
}