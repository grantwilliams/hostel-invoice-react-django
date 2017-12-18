import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import moment from 'moment'
import momentLocaliser from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment)

class NewInvoiceModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      roomTypes: [
      '---Select Room Type---', '2 Bed Priv', '3 Bed Priv', '4 Bed Mix Ens', '4 Bed Mix', '6 Bed Mix', '8 Bed Mix', '8 Bed Mix Ens'
    ]
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  renderField = ({ input, label, type, meta: { touched, error }, ...custom }) =>
    <div className="form-group row no-gutters">
      <label className="col-4 col-form-label">{label}</label>
      <input {...input} {...custom} className="form-control col-7" type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>

  renderDateTimePicker = ({ input: { onChange, value }, showTime, label, meta: { touched, error } }) =>
    <div className="form-group row no-gutters">
      <label className="col-4 col-form-label">{label}</label>
      <DateTimePicker
        onChange={onChange}
        format="YYYY-MM-DD"
        time={showTime}
        className="col-7"
        value={!value ? null : new Date(value)}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>

  renderDropdownList = ({ input, data, label, meta: { touched, error } }) =>
    <div className="form-group row no-gutters">
      <label className="col-4 col-form-label">{label}</label>
      <DropdownList
        data={data}
        defaultValue={this.props.newInvoice ? data[0] : this.props.booking.room_names}
        readOnly={data[0]}
        onChange={input.onChange}
        className="col-7"
      />
      {touched && error && <span className="error">{error}</span>}
    </div>

  toNumber = value => value && parseFloat(value)
  dateToString = value => value && moment(value).format("YYYY-MM-DD")

  handleSaveBooking = formProps => {
    this.props.editAllBooking(formProps)
    this.toggle()
  }

  render() {
    const { handleSubmit, reset, pristine, submitting, valid } = this.props;
    return (
      <span>
        <button className="btn btn-danger hidden-print" onClick={this.toggle}>{this.props.buttonText}</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonText}</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(this.handleSaveBooking)}>
              <Field name="first_name" component={this.renderField} type="text" label="First Name" />
              <Field name="last_name" component={this.renderField} type="text" label="Last Name" />
              <Field name="email" component={this.renderField} type="text" label="Email" />
              <Field name="company" component={this.renderField} type="text" label="Company" />
              <Field name="street" component={this.renderField} type="text" label="Street / No" />
              <Field name="city" component={this.renderField} type="text" label="Post Code / City" />
              <Field name="country" component={this.renderField} type="text" label="Country" />
              <Field name="booking_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} label="Booking Date" />
              <Field name="arrival_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} label="Arrival Date" />
              <Field name="departure_date" component={this.renderDateTimePicker} showTime={false} type="text" normalize={this.dateToString} label="Departure Date" />
              <Field name="room_names" component={this.renderDropdownList} data={this.state.roomTypes} label="Room Type" />
              <Field name="total_price" component={this.renderField} type="text" label="Total Price" />
              <Field name="deposit" component={this.renderField} type="text" label="Deposit Paid" />
              <Field name="nights" component={this.renderField} type="number" normalize={this.toNumber} min={1} label="Nights" />
              <Field name="pax" component={this.renderField} type="number" normalize={this.toNumber} min={1} label="Guests" />
              <ModalFooter>
                <button type="submit" className="btn btn-success" disabled={!valid || submitting}>Save</button>
                <button type="button" className="btn btn-danger" onClick={() => this.props.reset()} disabled={pristine || submitting}>Reset</button>
                <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

function validate(formProps) {
  const errors = {}

  if(!formProps.first_name) {
    errors.first_name = 'Please enter a First Name'
  }
  if(!formProps.last_name) {
    errors.last_name = 'Please enter a Last Name'
  }
  if(!formProps.booking_date) {
    errors.booking_date = 'Please enter a Booking Date'
  }
  if(!formProps.arrival_date) {
    errors.arrival_date = 'Please enter a Arrival Date'
  }
  if(!formProps.departure_date) {
    errors.departure_date = 'Please enter a Departure Date'
  }
  if(!formProps.room_names) {
    errors.room_names = 'Please choose a Room Type'
  }
  if(!formProps.total_price) {
    errors.total_price = 'Please enter a Total Price'
  }
  if(!formProps.deposit && formProps.deposit != 0) {
    errors.deposit = 'Please enter a Deposit amount (can be 0)'
  }
  if(!formProps.nights) {
    errors.nights = 'Please enter a number of Nights'
  }
  if(!formProps.pax) {
    errors.pax = 'Please enter a number of Guests'
  }

  return errors
}

const mapStateToProps = ({ booking }) => ({
  booking: booking.booking, address: booking.address, initialValues: booking.booking
})

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'new-invoice',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(NewInvoiceModal));