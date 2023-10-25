export interface Contract {
  id: string;
  contractNumber: string;
  securityCompanyId: number;
  securityCompany: SecurityCompany;
  clientCompany: ClientCompany;
  startDate: string;
  startDateTime: string;
  startDateSinceTime: string;
  endDate: string;
  endDateTime: string;
  endDateSinceTime: string;
  contractType: ContractStatusClass;
  contractStatus: ContractStatusClass;
  securityCompanyBranchId: string;
  securityCompanyBranch: SecurityCompanyBranch;
  clientOrderId: any;
  clientOrder: any;
}

interface ClientCompany {
  id: number;
  name: string;
  companyTypeId: number;
  commercialRegistrationNo: number;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  appUserId: string;
  photoId: number;
}

interface ContractStatusClass {
  id: string;
  value: number;
  nameAr: string;
  nameEn: string;
  optionSet: OptionSet;
  color: string;
  isDefault: boolean;
}

interface OptionSet {
  id: string;
  name: string;
  displayNameAr: string;
  displayNameEN: string;
  optionSetItems: null[];
}

interface SecurityCompany {
  id: number;
  name: string;
  cityId: number;
  city: City;
  areaId: number;
  area: Area;
  companyStartDate: string;
  financeYearId: number;
  financeYear: BusinessType;
  timeZoneLookupId: number;
  timeZoneLookup: BusinessType;
  companyScaleId: number;
  companyScale: BusinessType;
  companyContactNumber: string;
  postalCode: number;
  website: string;
  socialMediaLink: string;
  socialMediaLink2: string;
  address: string;
  businessDescription: string;
  companyLogoId: number;
  companyLogo: CommercialRegister;
  commercialRegisterId: number;
  commercialRegister: CommercialRegister;
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  accountName: string;
  bankBranch: string;
  iban: string;
  idProofId: number;
  idProof: CommercialRegister;
  appUserId: string;
  appUser: AppUser;
  securitCompanyAvailableServices: SecuritCompanyAvailableService[];
  firstName: string;
  lastName: string;
  email: string;
  profileImageId: number;
  profileImage: CommercialRegister;
  businessTypeId: number;
  businessType: BusinessType;
  isApproved: boolean;
  isActive: boolean;
  isRejected: boolean;
  locationLat: string;
  locationLng: string;
  overview: string;
  overviewEn: string;
  securityCompanyBranch: SecurityCompanyBranch;
  companyAvilableShifts: CompanyAvilableShift[];
  companyAvilableContractTypes: CompanyAvilableContractType[];
  securityCompanyClientAttachments: SecurityCompanyClientAttachment[];
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

interface Country {
  id: number;
  name: string;
  prefixCode: string;
  nameEN: string;
  regex: string;
  ioS2: string;
}

interface Area {
  id: number;
  name: string;
  nameEN: string;
  cityId: number;
  city: City;
  isDeleted: boolean;
}

interface City {
  id: number;
  name: string;
  nameEN: string;
  isDeleted: boolean;
  countryId: number;
  country: Country;
}

interface BusinessType {
  id: number;
  name: string;
  nameEN: string;
  isDeleted?: boolean;
  description?: string;
}

interface CommercialRegister {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

interface CompanyAvilableContractType {
  id: string;
  contractTypeId: string;
  contractType: ContractStatusClass;
}

interface CompanyAvilableShift {
  id: string;
  shiftTypeId: number;
  shiftType: BusinessType;
}

interface SecuritCompanyAvailableService {
  id: number;
  availableServicesId: number;
  availableServices: BusinessType;
}

interface SecurityCompanyBranch {
  id: string;
  securityCompanyId: number;
  name: string;
  nameEn: string;
  overview: string;
  overviewEn: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photoId: number;
  photo: CommercialRegister;
  stauts: boolean;
  isMainBranch: boolean;
}

interface SecurityCompanyClientAttachment {
  id: string;
  photoId: number;
  photo: CommercialRegister;
}
