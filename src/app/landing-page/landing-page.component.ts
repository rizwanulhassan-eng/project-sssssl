import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  buses = [
    { id: 'BUS-5098', from: 'Mirpur', to: 'Motijheel', departure: '8:00 AM', seats: 15 },
    { id: 'BUS-5099', from: 'Uttara', to: 'Dhanmondi', departure: '9:00 AM', seats: 15 },
    { id: 'BUS-5100', from: 'Gulshan', to: 'Farmgate', departure: '5:00 PM', seats: 15 },
    { id: 'BUS-5101', from: 'Badda', to: 'Mohakhali', departure: '7:00 PM', seats: 15 },
    { id: 'BUS-5102', from: 'Shyamoli', to: 'Banani', departure: '10:00 AM', seats: 15 },
    { id: 'BUS-5103', from: 'Rampura', to: 'Karwan Bazar', departure: '3:00 PM', seats: 15 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if buses already exist in localStorage
    const existingBuses = localStorage.getItem('allBuses');
    if (!existingBuses) {
      // If not, save the bus data to localStorage
      localStorage.setItem('allBuses', JSON.stringify(this.buses));
    }
  }

  

  viewSeats(busId: string) {
    this.router.navigate([`/bus/${busId}`]);
  }
}
