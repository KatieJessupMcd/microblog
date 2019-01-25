import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    this.props.addNewComment(this.state, this.props.postId);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div className="CommentForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="text">Comment</label>
          <input
            defaultValue=""
            name="text"
            id="text"
            onChange={this.handleChange}
          />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
