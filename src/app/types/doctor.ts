type SlotsByDate = Record<string, string[]>;

export type Doctor = {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fees: number;
  address: {
    line1: string;
    line2: string;
  };
  date: number;
  slots_booked: SlotsByDate;
  __v: number;
};

export type Doctors = Doctor[];
