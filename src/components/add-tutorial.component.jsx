import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.state = {
            id: null,
            title: "",
            description: "",
        };
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    async saveTutorial() {
        const data = {
            title: this.state.title,
            description: this.state.description
        };
        const res = await TutorialDataService.create(data)
            if(res){
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description
                });
                alert('Creación realizada con éxito');
                this.props.history.push('/tutorials')
            };
    }
    render() {
        return (
            <div className="submit-form">
                {
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>
                            <button onClick={this.saveTutorial} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                }
            </div>
        )
    }
}
