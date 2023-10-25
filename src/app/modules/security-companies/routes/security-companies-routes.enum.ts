import { MenuItem } from "../../core/models/menu-item";

export enum SecurityCompaniesRoutes {
  companies = 'companies',
  companyDetails='company-details',
  clients = 'clients',
  guards = 'guards',
  supervisors = 'supervisors',
  companyAgents='company-agents',
  clientDetails = 'client-details',
  generalInfo='general-info',
  location = 'location',
  clientGuard = 'client-guard',
  guardCard = 'guard-card',
  statistics='statistics',
  ClientStatistics='ClientStatistics'
}

export const COMPANY_DETAILS_LIST: MenuItem[] = [
  {
    name: 'clients',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.clients,
    children: null,
  },
  {
    name: 'guards',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.guards,
    children: null,
  },
  {
    name: 'supervisors',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.supervisors,
    children: null,
  },
  {
    name: 'agents',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.companyAgents,
    children: null,
  },
  {
    name: 'statistics',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.statistics,
    children: null,
  }
];


export const CLIENT_DETAILS_LIST: MenuItem[] = [
  {
    name: 'general-info',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.generalInfo,
    children: null,
  },
  {
    name: 'location',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.location,
    children: null,
  },
  {
    name: 'client-guards',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.clientGuard,
    children: null,
  },
  {
    name: 'ClientStatistics',
    icon: null,
    image: null,
    link: SecurityCompaniesRoutes.ClientStatistics,
    children: null,
  }
];
