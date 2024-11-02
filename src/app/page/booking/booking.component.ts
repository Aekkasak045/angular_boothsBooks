import { Component,OnInit} from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,HttpClientModule,HeaderComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookings: any[] = [];

  constructor(private dataService: DataService,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.http.get<any[]>(this.dataService.apiEndpoint+'/get_bookings').subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }
}
