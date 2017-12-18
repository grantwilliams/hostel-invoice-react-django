import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class BookingsList extends Component {
  constructor(props){
    super(props)

    this.state = {
      offset: 0
    }
  }

  componentWillMount() {
    this.props.fetchAllBookings()
  }

  componentWillReceiveProps(nextProps) {
    // resets offset and currentPage when page is reloaded
    this.setState({
      offset: 0,
      currentPage: 0
    });
  }

  handleOnClick = booking_id => {
    this.props.history.push(`/booking/${booking_id}`)
  }

  handleOnPageChange = ({ selected }) => {
    this.setState({
      offset: selected * 10,
      currentPage: selected
    });
  }

  renderTable = () => {
    if(!this.props.bookings) { return [<tr key={0}></tr>] }

    const bookingsSlice = this.props.bookings.slice(this.state.offset, this.state.offset + 10)
    return bookingsSlice.map(booking => {
      return (
        <tr onClick={() => this.handleOnClick(booking.booking_id)} className="text-center" key={booking.booking_id}>
          <td>{booking.channel}</td>
          <td><a href={`/booking/${booking.booking_id}`}>{booking.booking_id}</a></td>
          <td>{booking.booking_date}</td>
          <td>{`${booking.last_name}, ${booking.first_name}`}</td>
          <td>{booking.arrival_date}</td>
          <td>{booking.nights}</td>
          <td>{booking.departure_date}</td>
          <td>{booking.pax}</td>
        </tr>
      )
    })
  } 

  render() {
    return (
      <div>
        <table className="table table-hover table-striped booking-list">
          <thead className="thead-default">
            <tr className="text-center">
              <td>Channel</td>
              <td>Booking ID</td>
              <td>Booking Date</td>
              <td>Name</td>
              <td>Arrival Date</td>
              <td>Nights</td>
              <td>Departure Date</td>
              <td>Guests</td>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"page-link"}
          pageCount={this.props.pageCount}
          onPageChange={this.handleOnPageChange}
          forcePage={this.state.currentPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => ({ bookings: search.bookings, pageCount: search.pageCount })

export default withRouter(connect(mapStateToProps, actions)(BookingsList));