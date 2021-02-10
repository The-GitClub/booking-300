export interface Booking {
    _id: string;
    date: { year: number,
        month: number,
        day: number;
    },
        time: String;
        name: String;
        email: String;
        phone: String;

        allergy: String;
        
        guests: number;
        customer: string;
}
