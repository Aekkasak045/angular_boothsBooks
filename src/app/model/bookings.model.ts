// To parse this data:
//
//   import { Convert } from "./file";
//
//   const Bookings = Convert.toBookings(json);

export interface Bookings {
    booking_id:     string;
    booking_date:   string;
    payment_date:   null | string;
    booth_id:       string;
    booth_price:    string;
    payment_slip:   null | string;
    booking_status: string;
    product_info:   string;
    member_id:      string;
    event_id:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBookings(json: string): Bookings[] {
        return JSON.parse(json);
    }

    public static BookingsToJson(value: Bookings[]): string {
        return JSON.stringify(value);
    }
}