
export interface SecurityGuard {
    id: number;
    isDeleted: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    nationalID: string;
    bloodType: BusinessTypeClass;
    gender: BusinessTypeClass;
    city: AreaCity;
    jobType: JobType;
    nationality: BusinessTypeClass;
    birthDate: string;
    appUserId: string;
    appUser: SecurityGuardAppUser;
    locations: string;
    lat: string;
    lng: string;
    isActive: boolean;
    photo: IDProofClass;
    bankName: string;
    bankOwner: string;
    idPhoto: IDProofClass;
    bankNumber: string;
    iban: string;
    jobTypeId: number;
  }

  
export interface SecurityGuardAppUser {
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
  
  export interface Country {
    id: number;
    name: string;
    prefixCode: string;
    nameEN: string;
    regex: string;
    ioS2: string;
    isDeleted?: boolean;
    status?: boolean;
  }
  
  export interface SecurityCompanyArea {
    id: number;
    name: string;
    nameEN: string;
    cityId: number;
    city: AreaCity;
    isDeleted: boolean;
  }
  
  export interface AreaCity {
    id: number;
    name: string;
    nameEN: string;
    isDeleted: boolean;
    countryId: number;
    country: Country;
  }
  
  export interface BusinessTypeClass {
    id: number;
    name: string;
    nameEN: string;
    isDeleted?: boolean;
    description?: string;
  }
  
  export interface IDProofClass {
    id: number;
    imageId: string;
    name: string;
    fullLink: string;
  }
  
  export interface PurpleCompanyAvilableContractType {
    id: string;
    contractTypeId: string;
    contractType: IncidentType;
  }
  
  export interface IncidentType {
    id: string;
    value: number;
    nameAr: string;
    nameEn: string;
    optionSet: OptionSet;
    color: string;
    isDefault: boolean;
  }
  
  export interface OptionSet {
    id: string;
    name: string;
    displayNameAr: string;
    displayNameEN: string;
    optionSetItems: null[];
    isDeleted?: boolean;
  }
  
  export interface PurpleCompanyAvilableShift {
    id: string;
    shiftTypeId: number;
    shiftType: BusinessTypeClass;
  }
  
  export interface PurpleSecuritCompanyAvailableService {
    id: number;
    availableServicesId: number;
    availableServices: BusinessTypeClass;
  }
  
  export interface SecurityCompanySecurityCompanyBranch {
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
    photo: IDProofClass;
    stauts: boolean;
    isMainBranch: boolean;
  }
  
  export interface PurpleSecurityCompanyClientAttachment {
    id: string;
    photoId: number;
    photo: IDProofClass;
  }
  
  export interface CompanySecurityGuardSecurityCompanyBranch {
    id: string;
    isDeleted: boolean;
    securityCompanyId: number;
    securityCompany: SecurityCompanyBranchSecurityCompany;
    name: string;
    nameEn: string;
    overview: string;
    overviewEn: string;
    address: string;
    locationLat: string;
    locationLng: string;
    photoId: number;
    photo: SecurityCompanyBranchPhoto;
    stauts: boolean;
    isMainBranch: boolean;
  }
  
  export interface SecurityCompanyBranchPhoto {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    imageId: string;
    name: string;
    isDeleted: boolean;
    appUserId: string;
  }
  
  export interface SecurityCompanyBranchSecurityCompany {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    isDeleted: boolean;
    name: string;
    city: ClientCompanyCity;
    cityId: number;
    area: CompanyLogoClass;
    areaId: number;
    companyStartDate: string;
    financeYear: CompanyLogoClass;
    financeYearId: number;
    timeZoneLookup: TimeZoneLookup;
    timeZoneLookupId: number;
    companyScale: CompanyLogoClass;
    companyScaleId: number;
    companyContactNumber: string;
    postalCode: number;
    website: string;
    socialMediaLink: string;
    socialMediaLink2: string;
    address: string;
    businessDescription: string;
    companyLogoId: number;
    companyLogo: CompanyLogoClass;
    commercialRegisterId: number;
    commercialRegister: SecurityCompanyBranchPhoto;
    accountHolderName: string;
    bankName: string;
    bankCode: string;
    taxNumber: string;
    accountName: string;
    bankBranch: string;
    iban: string;
    idProof: CompanyLogoClass;
    idProofId: number;
    appUserId: string;
    appUser: ClientCompanyAppUser;
    securitCompanyAvailableServices: FluffySecuritCompanyAvailableService[];
    firstName: string;
    lastName: string;
    email: string;
    profileImageId: number;
    profileImage: CompanyLogoClass;
    businessTypeId: number;
    businessType: PurpleBusinessType;
    isActive: boolean;
    isApproved: boolean;
    isRejected: boolean;
    locationLat: string;
    locationLng: string;
    companyAvilableShifts: FluffyCompanyAvilableShift[];
    companyAvilableContractTypes: FluffyCompanyAvilableContractType[];
    securityCompanyClients: SecurityCompanyClientElement[];
    overview: string;
    overviewEn: string;
    securityCompanyClientAttachment: FluffySecurityCompanyClientAttachment[];
  }
  
  export interface ClientCompanyAppUser {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    firstName: string;
    middleName: string;
    lastName: string;
    countryId: number;
    country: Country;
    isActive: boolean;
  }
  
  export interface CompanyLogoClass {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    nameEN?: string;
    cityId?: number;
    city?: CompanyLogoClass;
    isDeleted: boolean;
    countryId?: number;
    country?: Country;
    imageId?: string;
    appUserId?: string;
    description?: string;
  }
  
  export interface PurpleBusinessType {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    nameEN: string;
    isDeleted: boolean;
  }
  
  export interface ClientCompanyCity {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    name: string;
    nameEN: string;
    isDeleted: boolean;
    countryId: number;
    country: Country;
  }
  
  export interface FluffyCompanyAvilableContractType {
    id: string;
    isDeleted: boolean;
    contractTypeId: string;
    contractType: ContractType;
    securityCompanyId: number;
  }
  
  export interface ContractType {
    id: string;
    isDeleted: boolean;
    value: number;
    nameAr: string;
    nameEn: string;
    optionSetId: string;
    optionSet: OptionSet;
    color: string;
    isDefault: boolean;
  }
  
  export interface FluffyCompanyAvilableShift {
    id: string;
    isDeleted: boolean;
    shiftTypeId: number;
    shiftType: CompanyLogoClass;
    securityCompanyId: number;
  }
  
  export interface FluffySecuritCompanyAvailableService {
    id: number;
    isDeleted: boolean;
    securityCompanyId: number;
    availableServicesId: number;
    availableServices: PurpleBusinessType;
  }
  
  export interface FluffySecurityCompanyClientAttachment {
    id: string;
    isDeleted: boolean;
    securityCompanyId: number;
    photoId: number;
    photo: CompanyLogoClass;
  }
  
  export interface SecurityCompanyClientElement {
    id: string;
    isDeleted: boolean;
    clientCompanyId: number;
    clientCompany: PurpleClientCompany;
    securityCompanyId: number;
    securityCompanyBranchId: string;
  }
  
  export interface PurpleClientCompany {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    isDeleted: boolean;
    name: string;
    companyTypeId: number;
    companyTypes: PurpleBusinessType;
    activityType: string;
    email: string;
    nationalAddress: string;
    chargePerson: string;
    chargePersonPhoneNumber: string;
    cityId: number;
    city: ClientCompanyCity;
    appUserId: string;
    appUser: ClientCompanyAppUser;
    photoId: number;
    photo: SecurityCompanyBranchPhoto;
    commercialRegistrationNumber: string;
  }
  
  export interface TimeZoneLookup {
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    id: number;
    isDeleted: boolean;
    name: string;
    nameEN: string;
    description: string;
  }
  
  export interface SecurityGuard {
    id: number;
    isDeleted: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    nationalID: string;
    bloodType: BusinessTypeClass;
    gender: BusinessTypeClass;
    city: AreaCity;
    jobType: JobType;
    nationality: BusinessTypeClass;
    birthDate: string;
    appUserId: string;
    appUser: SecurityGuardAppUser;
    locations: string;
    lat: string;
    lng: string;
    isActive: boolean;
    photo: IDProofClass;
    bankName: string;
    bankOwner: string;
    idPhoto: IDProofClass;
    bankNumber: string;
    iban: string;
    jobTypeId: number;
  }
  
  export interface JobType {
    id: number;
    name: string;
    nameEN: string;
    fName: string;
    fNameEN: string;
    isDeleted: boolean;
  }
  
  export interface IncidentAttachment {
    id: string;
    attachmentId: number;
    attachment: IDProofClass;
  }
  
  
  export interface BreakScheduling {
    id: string;
    restPaymentTypeId: string;
    restPaymentType: IncidentType;
    name: string;
    nameEn: string;
    breakTime: string;
  }
  

  

  