export interface UserData {
  id: string;
  phoneNumer: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: null | string;
  email: string;
  photo: Photo;
  idPhoto: Photo;
  appUser: AppUser;
  changePassword: boolean;
  isActive: boolean;
  isTakidSuperAdmin: boolean;
}

interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  countryId: null;
  country: null;
  nationality: null;
  userName: string;
  isActive: boolean;
  roles: null;
  email: string;
}

interface Photo {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}
