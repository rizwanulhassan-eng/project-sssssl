import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bus-seating',
  templateUrl: './bus-seating.component.html',
  styleUrls: ['./bus-seating.component.css']
})
export class BusSeatingComponent implements OnInit {
  busId: string = '';
  seats: any[] = [];
  selectedSeat: any = null;
  toasterMessage: string = '';  // For the toast notification message
  bookingData = {
    name: '',
    busNo: '',
    seatNo: '',
    destination: '',
    departure: ''
  };

  busDetails: any = null; // To store the bus details
  destinations: string[] = []; // To store destination options
  allBuses: any[] = []; // To store all buses from localStorage
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.busId = this.route.snapshot.paramMap.get('id') || '';

    const buses = localStorage.getItem('allBuses');
    if (buses) {
      this.allBuses = JSON.parse(buses);
    }
    this.busDetails = this.allBuses.find(bus => bus.id === this.busId);
    if (this.busDetails) {
      this.bookingData.busNo = this.busDetails.id;
      this.bookingData.departure = this.busDetails.departure;
      this.destinations = this.allBuses
        .filter(bus => bus.id === this.busId) // Get the destination options for this bus
        .map(bus => bus.to);
    }
    const storedSeats = localStorage.getItem(this.busId);
    if (storedSeats) {
      this.seats = JSON.parse(storedSeats);
    } else {
      this.seats = [
        { id: 'A1', status: 'available' },
        { id: 'A2', status: 'available' },
        { id: 'A3', status: 'available' },
        { id: 'B1', status: 'available' },
        { id: 'B2', status: 'available' },
        { id: 'B3', status: 'available' },
        { id: 'C1', status: 'available' },
        { id: 'C2', status: 'available' },
        { id: 'C3', status: 'available' },
        { id: 'D1', status: 'available' },
        { id: 'D2', status: 'available' },
        { id: 'D3', status: 'available' },
        { id: 'E1', status: 'available' },
        { id: 'E2', status: 'available' },
        { id: 'E3', status: 'available' },
      ];
      localStorage.setItem(this.busId, JSON.stringify(this.seats));
    }
  }

  getSeatRows() {
    const rows = [];
    let row = [];
    for (let i = 0; i < this.seats.length; i++) {
      row.push(this.seats[i]);
      if (row.length === 3) {
        rows.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      rows.push(row);
    }
    return rows;
  }

  selectSeat(seat: any) {
    if (seat.status === 'available') {
      this.selectedSeat = seat;
      this.seats.forEach((s) => {
        if (s.status === 'selected') {
          s.status = 'available';
        }
      });

      seat.status = 'selected';
      this.bookingData.seatNo = seat.id;
      this.saveSeatsToLocalStorage();
      
    } else if (seat.status === 'booked') {
      this.toasterMessage = `Seat ${seat.id} is already booked!`; // Show toast message
      setTimeout(() => {
        this.toasterMessage = ''; // Hide toast message after 3 seconds
      }, 3000);
    }
  }

  saveSeatsToLocalStorage() {
    localStorage.setItem(this.busId, JSON.stringify(this.seats));
  }

  cancelBooking() {
    if (this.selectedSeat) {
      this.selectedSeat.status = 'available';
      this.selectedSeat = null;
      this.saveSeatsToLocalStorage();
    }
  }

  bookSeat(event: Event) {
    event.preventDefault();
    if (this.selectedSeat && this.bookingData.name && this.bookingData.busNo && this.bookingData.destination) {
      this.selectedSeat.status = 'booked';
      const userBooking = {
        userId: this.bookingData.name,
        busId: this.busId,  // This is the current bus ID
        seatNo: this.selectedSeat.id,
        busNo: this.bookingData.busNo,
        destination: this.bookingData.destination,
        departure: this.bookingData.departure
      };
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      // Add the new booking to the users array
      users.push(userBooking);
  
      // Save the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Reset the selected seat and show success message
      this.selectedSeat = null;
      this.bookingData = {
        name: '',
        busNo: this.busDetails.id,
        seatNo: '',
        destination: '',
        departure: this.busDetails.departure
      };
  
      // Update the toaster message
      this.toasterMessage = `Seat ${this.bookingData.seatNo} booked successfully!`;
      setTimeout(() => {
        this.toasterMessage = ''; // Hide toast message after 3 seconds
      }, 3000);
    }
  }
}
