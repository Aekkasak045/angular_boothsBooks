import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { Convert as zonesCvt, Zones } from '../../model/zones.model';
import { Convert as boothsCvt, Booths } from '../../model/booths.moel'; // Corrected import for booths.model
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditzoneComponent } from '../editzone/editzone.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatListModule,
    CommonModule,
    RouterModule,
    EditzoneComponent,
    MatDialogModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // Fixed the key here to styleUrls
})
export class MainComponent implements OnInit {
  zones: Zones[] = [];
  booths: Booths[] = [];
  selectedZone: any;

  constructor(private dataService: DataService, private http: HttpClient, private dialog: MatDialog) {
    this.http.get(this.dataService.apiEndpoint + '/get_zones/1').subscribe((data: any) => {
      this.zones = zonesCvt.toZones(JSON.stringify(data));
      console.log("Loaded Zones22222:", this.zones);
    }, error => {
      console.error("Error loading zones:", error);
    });
  }

  ngOnInit(): void {
    this.loadZones(); // Load zones when the component initializes
  }

  loadZones(): void {
    this.http.get(this.dataService.apiEndpoint + '/get_zones').subscribe((data: any) => {
      this.zones = zonesCvt.toZones(JSON.stringify(data));
      console.log("Loaded Zones:", this.zones);
    }, error => {
      console.error("Error loading zones:", error);
    });
  }

  viewDetail(zoneId: number): void {
    console.log("Selected Zone ID:", zoneId);
    this.http.get(`${this.dataService.apiEndpoint}/get_booths_by_zone/${zoneId}`).subscribe(
      (data: any) => {
        this.booths = boothsCvt.toBooths(JSON.stringify(data)); // Convert and store booth data
        console.log("Booths in Zone:", this.booths);
      },
      (error) => {
        console.error("Error fetching booths:", error);
      }
    );
  }

  editZone(zoneId: number): void {
    const dialogRef = this.dialog.open(EditzoneComponent, {
      data: { zoneId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'updated') {
        this.loadZones(); // Reload zones if the edit was successful
      }
    });
  }

  deleteZone(zoneId: number): void {
    const confirmDelete = confirm('คุณแน่ใจว่าต้องการลบโซนนี้หรือไม่?'); // Confirmation dialog

    if (confirmDelete) {
      const apiUrl = `${this.dataService.apiEndpoint}/delete_zone/${zoneId}`;
      this.http.delete(apiUrl).subscribe(
        () => {
          alert('ลบโซนสำเร็จ');
          this.zones = this.zones.filter(zone => zone.zone_id !== zoneId); // Remove deleted zone from the array
        },
        (error) => {
          console.error('Error deleting zone:', error);
          alert('เกิดข้อผิดพลาดในการลบโซน');
        }
      );
    }
  }

}

