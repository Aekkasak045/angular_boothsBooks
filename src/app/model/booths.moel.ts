// To parse this data:
//
//   import { Convert } from "./file";
//
//   const Booth = Convert.toBooth(json);

export interface Booth {
    booth_id:     number;
    booth_name:   string;
    booth_size:   string;
    booth_status: string;
    booth_price:  string;
    zone_id:      number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBooth(json: string): Booth[] {
        return JSON.parse(json);
    }

    public static BoothToJson(value: Booth[]): string {
        return JSON.stringify(value);
    }
}
