import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
	renderField(field) {
		//first const destructures meta off of field object, then destructures touched & error off of meta object
		const { meta: {touched, error} } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label><strong>{field.label}</strong></label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">{touched ? error: ''}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/'); //navigates to another route programmatically
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field 
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field 
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	//Validate the inputs from 'values'
	if (!values.title) {
		errors.title = 'Enter a title!';
	} 
	
	if (!values.categories) {
		errors.categories = 'Enter some categories';
	} 

	if (!values.content) {
		errors.content = 'Enter some content please';
	}

	//if errors is empty, the form will submit
	// else if errors has any properties, redux form assumes invalidity
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
connect(null,{createPost})(PostsNew)
);