export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
  };
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  __v: number;
};
