export interface UserInfo {
  id:             string;
  phoneNumer:     string;
  userName:       string;
  firstName:      string;
  middleName:     string;
  lastName:       string;
  idNumber:       string;
  email:          string;
  photo:          Photo;
  idPhoto:        Photo;
  appUser:        AppUser;
  changePassword: boolean;
  isActive:       boolean;
}

export interface AppUser {
  id:          string;
  firstName:   string;
  lastName:    string;
  countryId:   number;
  country:     Country;
  nationality: string;
  userName:    string;
  isActive:    boolean;
  roles:       string[];
  email:       string;
}

export interface Country {
  id:         number;
  name:       string;
  prefixCode: string;
  nameEN:     string;
  regex:      string;
  ioS2:       string;
}

export interface Photo {
  id:       number;
  imageId:  string;
  name:     string;
  fullLink: string;
}
