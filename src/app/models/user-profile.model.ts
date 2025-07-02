export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: string; // ISO string
  gender: string;
  address: string;
  profilePictureUrl: string;
  latitude?: number;
  longitude?: number;
}
