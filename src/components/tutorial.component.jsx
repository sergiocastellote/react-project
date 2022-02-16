import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);
        this.state = {
            currentTutorial: {
                id: null,
                title: "",
                description: ""
            }
        };
    }
    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }
    onChangeTitle(e) {
        const title = e.target.value;
        this.setState(function(prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title
                }
            };
        });
    }
    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description
            }
        }));
    }
    async getTutorial(id) {
        const res = await TutorialDataService.get(id);
        if(res){
            this.setState({
                currentTutorial: res.data
            });
        }
    }
    async updateTutorial() {
        const res = await TutorialDataService.update(this.state.currentTutorial);
        if(res){
            alert('Actualización realizada con éxito');
            this.props.history.push('/tutorials')
        }
    }
    async deleteTutorial() {
        const res = await TutorialDataService.delete(this.state.currentTutorial.id);
        if(res){
            alert('Eliminación realizada con éxito');
            this.props.history.push('/tutorials')
        }
    }
    render() {
        const { currentTutorial } = this.state;
        return (
            <div>
                {currentTutorial ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTutorial.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTutorial.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                        </form>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTutorial}
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTutorial}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}
