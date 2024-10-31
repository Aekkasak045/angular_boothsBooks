// To parse this data:
//
//   import { Convert } from "./file";
//
//   const Zone = Convert.toZone(json);

export interface Zone {
    zone_id:     string;
    zone_name:   string;
    zone_info:   string;
    booth_count: string;
    event_id:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toZone(json: string): Zone[] {
        return JSON.parse(json);
    }

    public static ZoneToJson(value: Zone[]): string {
        return JSON.stringify(value);
    }
}
