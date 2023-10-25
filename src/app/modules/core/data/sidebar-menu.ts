import { MenuItem } from '../models/menu-item';
import { Routing } from '../routes/app-routes';

export const SIDEBAR_LIST: MenuItem[] = [
  {
    name: 'dashboard',
    link: Routing.dashboard.module,
    icon: null,
    image: 'assets/images/svgs/Group_1452.svg',
    children: null,
  },
  {
    name: 'security_companies',
    link: Routing.companies.module,
    icon: null,
    image: 'assets/images/svgs/building.svg',
    children: null,
  },
  {
    name: 'clients',
    link: Routing.clients,
    icon: 'people',
    image: null,
    children: null,
  },
  {
    name: 'agents',
    link: Routing.agents.module,
    icon: 'people',
    image: null,
    children: null,
  },
  {
    name: 'Individuals',
    link: Routing.individuals.module,
    icon: null,
    image: 'assets/images/svgs/user.svg',
    children: null,
  },
  {
    name: 'contract_management',
    link: Routing.contracts.module,
    icon: null,
    image: 'assets/images/svgs/dash.svg',
    children: null,
  },
  {
    name: 'accident',
    link: Routing.accident.module,
    icon: null,
    image: 'assets/images/svgs/accident.svg',
    children: null,
  },

  {
    name: 'users_management',
    link: Routing.users.module,
    icon: null,
    image: 'assets/images/svgs/user.svg',
    children: null,
  },
  {
    name: 'monitor',
    link: Routing.lookups.module,
    icon: null,
    image: 'assets/images/svgs/rasd.svg',
    children: [
      {
        name: 'Monitor_clients',
        link: Routing.lookups.children.customerManagement,
        icon: 'person',
        image: null,
        children: null,
      },
      {
        name: 'MonitoringComplaints',
        link: Routing.lookups.children.MonitoringComplaints,
        icon: 'aperture',
        image: null,
        children: null,
      },
    ],
  },
];
