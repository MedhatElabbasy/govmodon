import { Area } from './../../core/models/area';
import { City } from './../../core/models/city';
import { Country } from './../../users/models/country';
import { Lookup } from '../../core/models/lookup';
import { OptionSetItems } from './../../core/models/option-set-items';



export interface Company {
  id: number;
  name: string;
  cityId: number;
  city: City;
  areaId: number;
  area: Area;
  companyStartDate: string;
  financeYearId: number;
  financeYear: Lookup;
  timeZoneLookupId: number;
  timeZoneLookup: Lookup;
  companyScaleId: number;
  companyScale: Lookup;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: FileObject;
  commercialRegisterId: number;
  commercialRegister: FileObject;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProofId: number;
  idProof: FileObject;
  appUserId: string;
  appUser: AppUser;
  securitCompanyAvailableServices: SecuritCompanyAvailableService[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: FileObject;
  businessTypeId: number;
  businessType: Lookup;
  isApproved: boolean;
  isActive: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  companyAvilableShifts: CompanyAvilableShift[];
  companyAvilableContractTypes: CompanyAvilableContractType[];
  licenseNumber:string;
  licenseEndDate:string;
  licenseImageId:string;
  licenseImage:string;
}

interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  countryId: number;
  country: Country;
  nationality: string;
  userName: string;
  isActive: boolean;
  roles: string[];
  email: string;
}

export interface BusinessType {
  id: number;
  isDeleted?: boolean;
  name: string;
  nameEN: string;
  description?: string;
}

export interface CompanyAvilableContractType {
  id: string;
  contractTypeId: string;
  contractType: OptionSetItems;
}

export interface CompanyAvilableShift {
  id: string;
  shiftTypeId: number;
  shiftType: BusinessType;
}

export interface SecuritCompanyAvailableService {
  id: number;
  availableServicesId: number;
  availableServices: BusinessType;
}

export interface FileObject {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

export interface ClientSite {
  id: string;
  isDeleted: boolean;
  securityCompanyClientId: string;
  siteName: string;
  siteAddress: string;
  siteLat: string;
  siteLong: string;
  siteHight: number;
  sitePhotoId: number;
  sitePhoto: IDProofClass;
  enableGeolocation: boolean;
  geolocationLenghtInMetter: number;
  siteDescription: string;
  totalNumberOfGurds: number;
  statusId: string;
  siteSupervisorShifts: null[];
  siteLocations: SiteLocation[];
}
export interface SiteLocation {
  id: string;
  name: string;
  numberOfGuards: number;
  photoId: number;
  statusId: string;
  clientSiteId: string;
  locationAddress: string;
  locationLat: string;
  locationLong: string;
  locationHight: number;
  //photo: FileObject;
}

export interface IDProofClass {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}