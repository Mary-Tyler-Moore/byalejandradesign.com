import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'smalldash';
// actions
import { updateContactForm, submitContactForm } from './contact-actions';
// components
import { Form } from 'njmyers-component-library';
// styles
import './contact.sass';

const Input = Form.Input;
Input.defaultProps = {
  ...Form.Input.defaultProps,
  required: true,
  block: 'contactFormItem',
};

const Submit = Form.Submit;
Submit.defaultProps = {
  ...Form.Submit.defaultProps,
  block: 'contactFormSubmit',
};

class Contact extends Component {
  render() {
    return (
      <section className="contact" onSubmit={this.props.onSubmit}>
        <h1 className="contact_heading">Contact Artetexture</h1>
        <form className="contactForm">
          <Input
            name="name"
            label="Full Name"
            placeholder="Nicholas"
            value={this.props.contact.name}
            onChange={this.props.onChange}
            focus={true}
          />
          <Input
            name="subject"
            placeholder="Customer Support"
            value={this.props.contact.subject}
            onChange={this.props.onChange}
          />
          <Input
            name="email"
            type="email"
            value={this.props.contact.email}
            placeholder="nick@artetexture.com"
            onChange={this.props.onChange}
          />
          <Form.TextArea
            block="contactFormTextArea"
            name="message"
            onChange={this.props.onChange}
            value={this.props.contact.message}
            rows={8}
            required={true}
          />
          {this.props.contact.status ? (
            <p className="message">{this.props.contact.status}</p>
          ) : (
            undefined
          )}
          <Submit value="&#xf1d8;" />
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  contact: state.contact,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (event) =>
    dispatch(updateContactForm(event.target.value, event.target.name)),
  onSubmit: (event) => {
    event.preventDefault();
    dispatch(submitContactForm());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Contact);
