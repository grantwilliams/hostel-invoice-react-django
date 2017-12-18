import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';

class InvoiceData extends Component{
  renderItems() {
    const { booking } = this.props
    return [
      <tr className="row no-gutters" key={0}>
        <td className="col-9">
          <div className="hidden-print">
            <button onClick={() => this.props.subtractNight('start')} className="btn btn-sm btn-danger nights-button">Subtract night start</button>
            <button onClick={() => this.props.subtractNight('end')} className="btn btn-sm btn-danger nights-button">Subtract night end</button>
          </div>
          <strong>{booking.room_names}</strong> room from {booking.arrival_date} to {booking.departure_date}<br />
          {booking.pax} person(s) for {booking.nights} nights<br />
          Price per person per night <strong>{booking.pricePerNight.toFixed(2)}€</strong>
          <div className="hidden-print">
            <button onClick={() => this.props.addNight('start')} className="btn btn-sm btn-success nights-button">Add night start</button>
            <button onClick={() => this.props.addNight('end')} className="btn btn-sm btn-success nights-button">Add night end</button>
          </div>
        </td>
        <td className="col-2 text-center">{booking.vat.toFixed(2)}€</td>
        <td className="col-1 text-center">{booking.total_price.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={1}>
        <td className="col-11">
          <strong>City Tax</strong> charged at 5%
        </td>
        <td className="col-1 text-center">{booking.cityTax.toFixed(2)}€</td>
      </tr>,<tr className="row no-gutters" key={2}><td className="col-12"></td></tr>,
      <tr className="row no-gutters" key={3}>
        <td className="col-11">
          <strong>Deposit Paid</strong> online on {booking.booking_date}
        </td>
        <td className="col-1 text-center">{booking.deposit.toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={4}>
        <td className="col-11">
          <strong>Balance Paid</strong> on {booking.invoiceDate}
        </td>
        <td className="col-1 text-center">{(booking.total_price - booking.deposit + booking.cityTax).toFixed(2)}€</td>
      </tr>,
      <tr className="row no-gutters" key={5}>
        <td className="col-11">
          <strong>Total Paid</strong>
        </td>
        <td className="col-1 text-center"><strong>{(booking.total_price + booking.cityTax).toFixed(2)}€</strong></td>
      </tr>
    ]
  }

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <h5 className="col-6">Reservation No: {this.props.booking.booking_id}</h5>
          <h5 className="col-6 text-right">Invoice Date: {this.props.booking.invoiceDate}</h5>
        </div>
        <hr />
        <table className="table">
          <thead>
            <tr className="row no-gutters">
              <td className="col-9"><strong>Description and Quantity</strong></td>
              <td className="col-2 text-center"><strong>VAT inc (7%)</strong></td>
              <td className="col-1 text-center"><strong>Total</strong></td>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
};

const mapStateToProps = ({ booking }) => ({ booking: booking.booking })

export default connect(mapStateToProps, actions)(InvoiceData);