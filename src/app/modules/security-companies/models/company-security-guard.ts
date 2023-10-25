import { SecurityGuard } from './../../core/models/security-guard';


export interface CompanySecurityGuard {
    id: string;
    securityGuardId: number;
    securityGuard: SecurityGuard;
    isActive: boolean;
    guardStatusId: null;
    guardStatus: null;
    username?: string;
  }

  export interface Agent {
    id: string;
    mobileNumber: string;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    idNumber: null | string;
    email: string;
    photo: Photo;
    idPhoto: Photo;
    appUser: AppUser;
    isActive: boolean;
    securityCompany:securityCompany;
  }

  export interface AppUser {
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
  
  export  interface Photo {
    id: number;
    imageId: string;
    name: string;
    fullLink: string;
  }
  
  export interface securityCompany{
    id: number;
    name: string;
    cityId: number;
    city: null;
    areaId: number;
    area: null;
    companyStartDate: string;
    financeYearId: number;
    financeYear: null;
    timeZoneLookupId: number;
    timeZoneLookup: null;
    companyScaleId: number;
    companyScale: null;
    companyContactNumber: string;
    postalCode: number;
    website: string;
    socialMediaLink: string;
    socialMediaLink2: string;
    address: string;
    businessDescription: string;
    companyLogoId: number;
    commercialRegisterId: number;
    commercialRegister: null;
    accountHolderName: string;
    bankName: string;
    bankCode: string;
    taxNumber: string;
    accountName: string;
    bankBranch: string;
    iban: string;
    idProofId: number;
    idProof: null;
    appUserId: string;
    appUser: null;
    securitCompanyAvailableServices: any[];
    firstName: string;
    lastName: string;
    email: string;
    profileImageId: number;
    profileImage: null;
    businessTypeId: number;
    businessType: null;
    isApproved: boolean;
    isActive: boolean;
    isRejected: boolean;
    locationLat: string;
    locationLng: string;
    overview: null | string;
    overviewEn: null | string;
    securityCompanyBranch: null;
    companyAvilableShifts: any[];
    companyAvilableContractTypes: any[];
    securityCompanyClientAttachments: any[];
  }