import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }
    async componentDidMount() {
        this.retrieveTutorials().finally();
    }
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    async retrieveTutorials() {
        const res = await TutorialDataService.getAll();
        if(res){
            this.setState({
                tutorials: res.data
            });
        };
    }
    async refreshList() {
        await this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }
    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }
    async searchTitle() {
        const res = await TutorialDataService.findByTitle(this.state.searchTitle);
        if(res){
            this.setState({
                tutorials: res
            });
        };
    }
    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
