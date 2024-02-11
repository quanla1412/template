import {RouterPermissionMappingModel} from '../../data/data-components/router-permission-mapping.model';

export const EMPLOYEE_PERMISSION_CODE = {
  LICENSE_MANAGEMENT: 'LICENSE_MANAGEMENT',
  COMPANY_MANAGEMENT: 'COMPANY_MANAGEMENT',
  ROLES_MANAGEMENT: 'ROLES_MANAGEMENT',
  EMPLOYEE_GROUP_MANAGEMENT: 'EMPLOYEE_GROUP_MANAGEMENT',
  EMPLOYEE_MANAGEMENT: 'EMPLOYEE_MANAGEMENT'
};

export const ROUTER_EMPLOYEE_PERMISSION_MAPPER = [
  new RouterPermissionMappingModel(
    {
      routerLink: '/',
      matchUrl: '',
      name: '',
      icon: '',
      permissions: [],
      sort: 16,
      isMenu: false
    }),
  new RouterPermissionMappingModel(
    {
      routerLink: '/dashboard',
      matchUrl: '',
      name: '',
      icon: '',
      permissions: [],
      sort: 16,
      isMenu: false
    }),
    new RouterPermissionMappingModel(
        {
            routerLink: '/job-single',
            matchUrl: '',
            name: '',
            icon: '',
            permissions: [],
            sort: 16,
            isMenu: false
        }),
  new RouterPermissionMappingModel(
    {
      routerLink: '/employee-group',
      matchUrl: '',
      name: 'Employee Groups',
      icon: 'fa-user-friends',
      permissions: [
        EMPLOYEE_PERMISSION_CODE.EMPLOYEE_GROUP_MANAGEMENT
      ],
      sort: 2,
      isMenu: true
    }),
  new RouterPermissionMappingModel(
    {
      routerLink: '/employee',
      matchUrl: '',
      name: 'Employees',
      icon: 'fa-user-friends',
      permissions: [
        EMPLOYEE_PERMISSION_CODE.EMPLOYEE_MANAGEMENT
      ],
      sort: 3,
      isMenu: true
    })
];
