import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewInvoiceModal from './new_invoice_modal';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  handleInputChange = event => {
    this.setState({ term: event.target.value });
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.searchBookings(this.state.term)
  }

  handleTodayOnClick = event => {
    event.preventDefault()
    console.log('pressed')
    this.props.fetchTodaysArrivals()
  }

  render() {
    return (
      <div className="row no-gutters">
        <NewInvoiceModal buttonText="New Invoice" newInvoice={true} />
        <button onClick={this.handleTodayOnClick} className="btn btn-primary">Show Todays arrivals only</button>
        <form onSubmit={this.handleOnSubmit} className="form-inline search-bar col-5">
          <div className="input-group">
            <input
            type="text"
            className="form-control"
            placeholder="Search bookings..."
            value={this.state.term}
            onChange={this.handleInputChange} />
            <button type="submit" className="input-group-addon"><i className="fa fa-search"></i></button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(SearchBar);