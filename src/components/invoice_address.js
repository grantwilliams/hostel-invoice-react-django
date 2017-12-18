import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { reduxForm, Field } from 'redux-form';

class InvoiceAddress extends Component {
  handleSaveAddress = (formProps) => {
    this.props.saveAddress(formProps)
  }

  renderAddress = () => {
    const { address, addressSaved, booking, handleSubmit } = this.props
    if(addressSaved) {
      return (
        <div className="col-7">
        <h4>{booking.first_name} {booking.last_name}</h4>
        <h6>{booking.email}</h6>
        <h6>{address.company}</h6>
        <h6>{address.street}</h6>
        <h6>{address.city}</h6>
        <h6>{address.country}</h6>
        </div>
      )
    }
    return (
      <div className="col-7">
        <h4>{booking.first_name} {booking.last_name}</h4>
        <h6>{booking.email}</h6>
        <form className="no-gutters hidden-print" onSubmit={handleSubmit(this.handleSaveAddress)}>
          <fieldset className="form-control-sm col-6">
            <Field name="company" className="form-control" component="input" type="text" placeholder="Company" />
          </fieldset>
          <fieldset className="form-control-sm col-6">
            <Field name="street" className="form-control" component="input" type="text" placeholder="Street / No" />
          </fieldset>
          <fieldset className="form-control-sm col-6">
            <Field name="city" className="form-control" component="input" type="text" placeholder="Post Code / City" />
          </fieldset>
          <fieldset className="form-control-sm col-4">
            <Field name="country" className="form-control" component="input" type="text" placeholder="Country" />
          </fieldset>
          <button type="submit" className="btn btn-success">Save</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="row address">
        {this.renderAddress()}
        <div className="col-5 text-right">
          <h5>Bank Account</h5>
          <p>Deutsche Bank<br/>
          BLZ: 100 700 24<br/>
          Account#: 1444835<br/>
          IBAN: DE47 1007 0024 0144 4835 00<br/>
          Tax#: 18/451/51469</p>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ booking }) => ({
  booking: booking.booking, address: booking.address, addressSaved: booking.addressSaved
})

InvoiceAddress = connect(mapStateToProps, actions)(InvoiceAddress);

export default reduxForm({
  form: 'address'
})(InvoiceAddress);