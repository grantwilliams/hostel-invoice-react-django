import React, { Component } from 'react';
import Header from '../components/header';
import SearchBar from './search_bar';
import BookingList from './bookings_list';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchBar />
        <BookingList />
        {this.props.children}
      </div>
    );
  }
}

export default App;