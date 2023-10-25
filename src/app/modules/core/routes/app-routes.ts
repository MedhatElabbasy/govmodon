import { AgentsRoutes } from '../../agents/routes/agents-routes.enum';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';
import { ContractsRoutes } from '../../contracts/routes/contracts-routes';
import { DashboardRoutes } from '../../dashboard/routes/dashboard-routes.enum';
import { IndividualsRoutes } from '../../individuals/routes/individuals-routes.enum';
import { LookupsRoutes } from '../../lookups/routes/lookup-routes';
import { SecurityCompaniesRoutes } from '../../security-companies/routes/security-companies-routes.enum';
import { UsersRoutes } from '../../users/routes/users-routes.enum';

export interface RoutingConfiguration {
  module: string;
  children: any;
}

export const Routing = {
  auth: {
    module: 'auth',
    children: AuthRoutes,
  },
  companies: {
    module: 'security-companies',
    children: SecurityCompaniesRoutes,
  },
  lookups: {
    module: 'lookups',
    children: LookupsRoutes,
  },
  users: {
    module: 'users',
    children: UsersRoutes,
  },
  agents: {
    module: 'agents',
    children: AgentsRoutes,
  },

  contracts: {
    module: 'contracts',
    children: ContractsRoutes,
  },
  dashboard: {
    module: 'dashboard',
    children: DashboardRoutes,
  },
  individuals:{
    module:'individuals',
    children:IndividualsRoutes,
  },
  accident: {
    module: 'accident',
    children: null,
  },

  clients: 'clients',
  settings: 'settings',
  home: 'home',
  unauthorized: '401',
  notFound: '404',
};
