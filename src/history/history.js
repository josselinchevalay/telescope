import React, { Component } from 'react';
import TelescopTopics from '../services/api/event/EventTelescop/topics';

const moment = require('moment');
const d3 = require('d3');
const _ = require('lodash');
const { ipcRenderer } = require('electron');

const styleActionBtn = {
    marginLeft: "15px"
};

export default class HistoryPage extends Component {

    constructor(props) {
        super(props);
        var state = {
            file: this.props.application.state.file,
            currentCommit: this.props.application.state.file.latestCid,
            zoomX: 0,
            zoomY: 0,
            zoomK: 1,
            zoomSpeed: 50,
            zoomMax: -1 * (this.props.application.state.file.cids.length * 150),
            application: props.application
        };
        this.state = state;
        this.saveHandler = this.saveClickHandler.bind(this);
        this.changeHandler = this.commitMessageChange.bind(this);
        this.revertHandler = this.revertClickHandler.bind(this);
        this.shareHandler = this.shareClickHandler.bind(this);
        this.trackCommitHandler = this.trackCommitClick.bind(this);
    }

    componentDidMount() {
        this.drawGraphic();
    }

    commitMessageChange(event) {
        var state = this.state;
        state.currentCommit.commitMessage = event.target.value;
        this.setState(state);
    }

    trackCommitClick(event) {
        this.state.application.setState({ context: "Tracker", file: this.state.file, parent: this.state.currentCommit.hash });
    }

    shareClickHandler(event) {
        var state = this.state;
        ipcRenderer.send(TelescopTopics.SHARE_IPFS, this.state.currentCommit.hash);
    }

    saveClickHandler(event) {
        var state = this.state;
        ipcRenderer.send(TelescopTopics.UPDATE_COMMIT, JSON.stringify({ file: state.file.path, commit: state.currentCommit.hash, commitMessage: state.currentCommit.commitMessage }))
    }

    revertClickHandler() {
        var state = this.state;
        console.log("revert");
        ipcRenderer.send(TelescopTopics.REVERT_FILE, JSON.stringify({ file: state.file.path, commit: state.currentCommit.hash }));
    }

    drawGraphic() {
        var self = this;
        var treeData = this.unflattern(this.state.file.cids);
        var margin = { top: 20, right: 90, bottom: 30, left: 90 },
            width = 520 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#chartHistory svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .on('mousewheel', zoom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function zoom() {
            var state = self.state;
            var deltaY = event.deltaY;
            if (deltaY > 0) {
                state.zoomX = (state.zoomX <= state.zoomMax) ? state.zoomMax : state.zoomX - state.zoomSpeed;
            } else {
                state.zoomX = (state.zoomX >= 25) ? 25 : state.zoomX + state.zoomSpeed;
            }
            svg.attr('transform', 'translate(' + state.zoomX + ',' + state.zoomY + ') scale(' + state.zoomK + ')');
            self.setState(state)
        }

        var i = 0,
            duration = 750,
            root;

        // declares a tree layout and assigns the size
        var treemap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth
        root = d3.hierarchy(treeData, function (d) { return (d.children) ? d.children : d; });
        root.x0 = height / 2;
        root.y0 = 0;

        update(root);

        function update(source) {

            // Assigns the x and y position for the nodes
            var treeData = treemap(root);

            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180 });

            // ****************** Nodes section ***************************

            // Update the nodes...
            var node = svg.selectAll('g.node')
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr("transform", function (d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on('dblclick', doubleclickHandler)
                .on('click', clikcHandler);

            // Add Circle for the nodes
            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
                .style("fill", function (d) {
                    return d._children ? "red" : "#fff";
                });

            // Add labels for the nodes
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function (d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function (d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function (d) { return (d.data.commitMessage) ? d.data.commitMessage.substring(0, 10) : ""; });

            // UPDATE
            var nodeUpdate = nodeEnter.merge(node);

            // Transition to the proper position for the node
            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            // Update the node attributes and style
            nodeUpdate.select('circle.node')
                .attr('r', 10)
                .style("fill", function (d) {
                    if (self.state.currentCommit.hash === d.data.hash)
                        return "#0f0";
                    else
                        return "#fff";
                })
                .attr('cursor', 'pointer');


            // Remove any exiting nodes
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            // On exit reduce the node circles size to 0
            nodeExit.select('circle')
                .attr('r', 1e-6);

            // On exit reduce the opacity of text labels
            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            // ****************** links section ***************************

            // Update the links...
            var link = svg.selectAll('path.link')
                .data(links, function (d) { return d.id; });

            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .attr('d', function (d) {
                    var o = { x: source.x0, y: source.y0 }
                    return diagonal(o, o)
                });

            // UPDATE
            var linkUpdate = linkEnter.merge(link);

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function (d) { return diagonal(d, d.parent) });

            // Remove any exiting links
            var linkExit = link.exit().transition()
                .duration(duration)
                .attr('d', function (d) {
                    var o = { x: source.x, y: source.y }
                    return diagonal(o, o)
                })
                .remove();

            // Store the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            // Creates a curved (diagonal) path from parent to the child nodes
            function diagonal(s, d) {

                var path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

                return path
            }

            // Toggle children on click.
            function doubleclickHandler(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }

            function clikcHandler(d) {
                var state = self.state;
                state.currentCommit = d.data;
                self.setState(state);
                update(d);
            }
        }
    }

    unflattern(array, parent, tree) {
        var self = this;
        tree = typeof tree !== 'undefined' ? tree : [array[0]];
        parent = typeof parent !== 'undefined' ? parent : array[0];

        var children = _.filter(array, function (child) { return child.parent == parent.hash && (child.parent !== child.hash); });
        if (!_.isEmpty(children)) {
            if (parent.parent == parent.hash) {
                tree[tree.indexOf(parent)]['children'] = children;
            } else {
                parent['children'] = children;
            }
            _.each(children, function (child) { self.unflattern(array, child, tree); });
        }
        console.log(tree);
        return tree;
    }


    render() {
        return (
            <div>
                <h1>
                    History {this.state.file.name}
                    <span className="glyphicon glyphicon-plus pull-right" onClick={this.trackCommitHandler}></span>
                </h1>
                <div id="chartHistory">
                    <svg></svg>
                </div>
                <div className={`${this.state.currentCommit !== "" ? 'show' : 'hide'}`}>
                    <div className="form-group row">
                        <label> hash </label> {this.state.currentCommit.hash}
                    </div>
                    <div className="form-group row">
                        <label> parent </label> {this.state.currentCommit.parent}
                    </div>
                    <div className="form-group row">
                        <label> checksum </label> {this.state.currentCommit.checksum}
                    </div>
                    <div className="form-group row">
                        <label> date </label> {moment(this.state.currentCommit.createdAt).format('YYYY/MM/DD H:mm:ss')}
                    </div>
                    <div className="form-group row">
                        <label for="message" className="col-2 col-form-label"> meassge </label>
                        <div className="">
                            <input id="message" size="200" className="form-control" type="text" value={this.state.currentCommit.commitMessage} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <a href="#" className="btn btn-success" onClick={this.saveHandler} style={styleActionBtn}>Save</a>
                        <a href="#" className="btn btn-primary" onClick={this.revertHandler} style={styleActionBtn}>Revert</a>
                        <a href="#" className="btn btn-primary" onClick={this.shareHandler} style={styleActionBtn}>Share</a>
                    </div>
                </div>
            </div>
        );
    }
}