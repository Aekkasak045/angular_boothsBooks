import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editzone',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './editzone.component.html',
  styleUrls: ['./editzone.component.scss']
})
export class EditzoneComponent implements OnInit {
  zoneData = { zone_name: '', zone_info: '', booth_count: 0 };

  constructor(
    public dialogRef: MatDialogRef<EditzoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { zoneId: number },
    private dataService: DataService,
    private http: HttpClient
  ) {}


  
  ngOnInit(): void {
    console.log("Received Zone ID:", this.data.zoneId); // ตรวจสอบว่า zoneId ถูกส่งมาถูกต้องหรือไม่
    if (this.data.zoneId) {
      this.loadZoneData(this.data.zoneId);
    } else {
      alert("ไม่พบ zoneId กรุณาลองใหม่อีกครั้ง");
    }
  }
  
  loadZoneData(zoneId: number): void {
    console.log("API URL:", `${this.dataService.apiEndpoint}/get_zone/${zoneId}`);
    
    // เรียก API เพื่อโหลดข้อมูลโซนตาม zoneId
    this.http.get(`${this.dataService.apiEndpoint}/get_zone/${zoneId}`).subscribe(
      (data: any) => {
        console.log("Loaded Zone Data:", data);
        
        // ตรวจสอบว่า data มีข้อมูลที่ถูกต้องหรือไม่
        if (data && typeof data === 'object' && 'zone_name' in data && 'zone_info' in data) {
          this.zoneData = { ...data }; // ใช้การกระจายข้อมูลเพื่อป้องกันกรณีไม่มีค่าที่ต้องการ
        } else {
          console.error("Unexpected data format:", data);
          alert("รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง");
        }
      },
      (error) => {
        console.error("Error loading zone data:", error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลโซน");
      }
    );
}


  save(): void {
    console.log("Zone Data to save:", this.zoneData); // ใช้ console log ตรวจสอบค่า zoneData
    this.http.put(`${this.dataService.apiEndpoint}/update_zone/${this.data.zoneId}`, this.zoneData).subscribe(
      () => {
        alert('แก้ไขโซนสำเร็จ');
        this.dialogRef.close('updated');
      },
      (error) => {
        console.error('Error updating zone:', error);
        alert('เกิดข้อผิดพลาดในการแก้ไขโซน');
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
