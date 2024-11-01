import { Component, NgZone, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as boothsCvt,Booths } from '../../model/booths.moel';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EditBoothComponent } from '../editbooth/editbooth.component';
@Component({
  selector: 'app-boothpage',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatListModule,
    CommonModule,
  RouterModule],
  templateUrl: './boothpage.component.html',
  styleUrl: './boothpage.component.scss'
})
export class BoothpageComponent {
  booths: Booths[] = [];
  zoneId: number | null = null;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private route: ActivatedRoute, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.zoneId = params['zone_id'] ? +params['zone_id'] : null;
      this.loadBooths();
    });
  }

  loadBooths(): void {
    let url = `${this.dataService.apiEndpoint}/get_booths`;
    if (this.zoneId) {
      url += `?zone_id=${this.zoneId}`;
    }

    this.http.get(url).subscribe(
      (data: any) => {
        this.booths = boothsCvt.toBooths(JSON.stringify(data));
        console.log("Loaded booths:", this.booths);
      },
      (error) => {
        console.error("Error loading booths:", error);
      }
    );
  }
  editBooth(boothId: number): void {
    const dialogRef = this.dialog.open(EditBoothComponent, {
      data: { boothId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadBooths(); // โหลดข้อมูลบูธใหม่หลังจากการแก้ไข
      }
    });
  }
  deleteBooth(boothId: number): void {
    if (confirm("คุณแน่ใจหรือไม่ว่าจะลบบูธนี้?")) {
      this.http.delete(`${this.dataService.apiEndpoint}/delete_booth/${boothId}`).subscribe(
        () => {
          alert('ลบบูธเรียบร้อย');
          this.loadBooths(); // โหลดข้อมูลบูธใหม่หลังจากการลบ
        },
        (error) => {
          console.error("Error deleting booth:", error);
          alert('เกิดข้อผิดพลาดในการลบบูธ');
        }
      );
    }
  }
}
