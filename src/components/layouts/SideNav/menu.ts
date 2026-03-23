import type { IconType } from 'react-icons/lib';
import {
  LuCalendar1,
  LuCircuitBoard,
  LuClipboardList,
  LuCodesandbox,
  LuFileText,
  LuFingerprint,
  LuLayoutDashboard,
  LuLayoutPanelLeft,
  LuLock,
  LuMail,
  LuMessagesSquare,
  LuMonitorDot,
  LuPackage,
  LuPictureInPicture2,
  LuShare2,
  LuShieldCheck,
  LuShoppingBag,
  LuSquareUserRound,
} from 'react-icons/lu';

export type MenuItemType = {
  key: string;
  label: string;
  isTitle?: boolean;
  href?: string;
  children?: MenuItemType[];
  icon?: IconType;
  parentKey?: string;
  target?: string;
  isDisabled?: boolean;
};

export const menuItemsData: MenuItemType[] = [
  {
    key: 'Overview',
    label: 'Overview',
    isTitle: true,
  },
  {
    key: 'Dashboards',
    label: 'Bảng điều khiển',
    icon: LuMonitorDot,
    children: [
      { key: 'Analytics', label: 'Thống kê', href: '/admin/analytics',
        children: [
          { key: 'COPD', label: 'COPD', href: '/admin/analytics/copd' },
          { key: 'equipment', label: 'Tài sản', href: '/admin/analytics/equipment' },
        ],
       },
      // { key: 'Ecommerce', label: 'Ecommerce', href: '/index' },
      // { key: 'Email', label: 'Email', href: '/email' },
      // { key: 'HR', label: 'HR', href: '/hr' },
    ],
  },
  {
    key: 'Trang thông tin',
    label: 'Trang thông tin',
    icon: LuPictureInPicture2,
    children: [
      { key: 'One Page', label: 'Trang cổng thông tin', href: '/', target: '_blank' },
      // { key: 'Product', label: 'Product', href: '/product-landing', target: '_blank' },
    ],
  },
  {
    key: 'Apps',
    label: 'Apps',
    isTitle: true,
  },
   {
    key: 'Quản lý tài sản',
    label: 'Quản lý tài sản',
    icon: LuLayoutDashboard,
    children: [
      { key: 'equipment', label: 'Tài sản', href: '/admin/equipment' },
      { key: 'maintenance', label: 'Quản lý sửa chữa', href: '/admin/maintenance' },
      {
        key: 'category-equipment',
        label: 'Quản lý nhóm tài sản',
        href: '/admin/category-equipment',
      },
    ],
  },
   {
    key: 'Quản lý bệnh nhân',
    label: 'Quản lý bệnh nhân',
    icon: LuLayoutDashboard,
    children: [
      { key: 'copd', label: 'Quản lý bệnh nhân COPD', href: '/admin/copd' },
    ],
  },
  {
    key: 'Quản lý người dùng',
    label: 'Quản lý người dùng',
    icon: LuCircuitBoard,
    children: [
      { key: 'Employee List', label: 'Danh sách tài khoản', href: '/users-list' },
      {
        key: 'roles',
        label: 'Quản lý vai trò',
        href: '#',
        children: [
          { key: 'Employee Salary', label: 'Danh sách vai trò', href: '/payroll-employee-salary' },
          { key: 'Payslip', label: 'Phân vai trò', href: '/payroll-payslip' },
        ],
      },
      {
        key: 'Permission',
        label: 'Phân quyền',
        href: '#',
        children: [
          { key: 'Employee Salary', label: 'Danh sách quyền', href: '/payroll-employee-salary' },
          { key: 'Payslip', label: 'Phân quyền', href: '/payroll-payslip' },
        ],
      },
    ],
  },
  {
    key: 'Quản lý nhân sự',
    label: 'Quản lý nhân sự',
    icon: LuCircuitBoard,
    children: [
      { key: 'Employee List', label: 'Danh sách nhân viên', href: '/employee' },
      { key: 'Holidays', label: 'Danh sách nghỉ phép', href: '/holidays' },
      {
        key: 'Leave Manage',
        label: 'Quản lý nghỉ phép',
        href: '#',
        children: [
          { key: 'By Employee', label: 'Theo Nhân viên', href: '/leave-employee' },
          {
            key: 'Add Leave(Employee)',
            label: 'Thêm ngày nghỉ phép (Nhân viên)',
            href: '/create-leave-employee',
          },
          { key: 'By HR', label: 'Theo nhân sự', href: '/leave' },
          { key: 'Add Leave(HR)', label: 'Thêm ngày nghỉ phép (Nhân sự)', href: '/create-leave' },
        ],
      },
      {
        key: 'Attendance',
        label: 'Chấm công',
        href: '#',
        children: [
          { key: 'Attendance(HR)', label: 'Chấm công (HR)', href: '/attendance' },
          { key: 'Main Attendance', label: 'Bảng chấm công', href: '/attendance-main' },
        ],
      },
      { key: 'Department', label: 'Phòng/Ban', href: '/admin/departments' },
      {
        key: 'Sales',
        label: 'Kinh doanh',
        href: '#',
        children: [
          { key: 'Estimates', label: 'Ước tính thời gian', href: '/sales-estimates' },
          { key: 'Payments', label: 'Thanh toán', href: '/sales-payments' },
          { key: 'Expenses', label: 'Chi phí', href: '/sales-expenses' },
        ],
      },
      {
        key: 'Payroll',
        label: 'Lương',
        href: '#',
        children: [
          { key: 'Employee Salary', label: 'Lương nhân viên', href: '/payroll-employee-salary' },
          { key: 'Payslip', label: 'Phiếu lương', href: '/payroll-payslip' },
          { key: 'Create Payslip', label: 'Tạo phiếu lương', href: '/create-payslip' },
        ],
      },
    ],
  },
  // {
  //   key: 'Chat',
  //   label: 'Chat',
  //   icon: LuMessagesSquare,
  //   href: '/chat',
  // },
  {
    key: 'Calendar',
    label: 'Lịch',
    icon: LuCalendar1,
    href: '/calendar',
  },
  // {
  //   key: 'Email',
  //   label: 'Email',
  //   icon: LuMail,
  //   href: '/mailbox',
  // },
  // {
  //   key: 'Notes',
  //   label: 'Ghi chú',
  //   icon: LuClipboardList,
  //   href: '/notes',
  // },
 
 
  
  // {
  //   key: 'Invoice',
  //   label: 'Hóa đơn',
  //   icon: LuFileText,
  //   children: [
  //     { key: 'Overview', label: 'Tổng quan', href: '/overview' },
  //     { key: 'List Invoice', label: 'Danh sách hóa đơn', href: '/list' },
  //     { key: 'Add Invoice', label: 'Thêm hóa đơn', href: '/add-new' },
  //   ],
  // },
 
  // {
  //   key: 'Extra',
  //   label: 'Extra',
  //   isTitle: true,
  // },
  // {
  //   key: 'Pages',
  //   label: 'Pages',
  //   icon: LuCodesandbox,
  //   children: [
  //     { key: 'Starter Page', label: 'Starter Page', href: '/starter' },
  //     { key: 'Pricing', label: 'Pricing', href: '/pricing' },
  //     { key: 'FAQ', label: 'FAQ', href: '/faqs' },
  //     { key: 'Maintenance', label: 'Maintenance', href: '/maintenance' },
  //     { key: 'Timeline', label: 'Timeline', href: '/timeline' },
  //     { key: 'Coming Soon', label: 'Coming Soon', href: '/coming-soon' },
  //     { key: '404', label: '404', href: '/404' },
  //     { key: '403', label: '403', href: '/403' },
  //     { key: 'Offline', label: 'Offline', href: '/offline' },
  //   ],
  // },
  // {
  //   key: 'Basic Auth',
  //   label: 'Basic Auth',
  //   icon: LuLock,
  //   children: [
  //     { key: 'Login', label: 'Login', href: '/basic-login' },
  //     { key: 'Register', label: 'Register', href: '/basic-register' },
  //     { key: 'Verify Email', label: 'Verify Email', href: '/basic-verify-email' },
  //     { key: 'Two Steps', label: 'Two Steps', href: '/basic-two-steps' },
  //     { key: 'Logout', label: 'Logout', href: '/basic-logout' },
  //     { key: 'Reset Password', label: 'Reset Password', href: '/basic-reset-password' },
  //     { key: 'Create Password', label: 'Create Password', href: '/basic-create-password' },
  //   ],
  // },
  // {
  //   key: 'Cover Auth',
  //   label: 'Cover Auth',
  //   icon: LuShieldCheck,
  //   children: [
  //     { key: 'Login', label: 'Login', href: '/cover-login' },
  //     { key: 'Register', label: 'Register', href: '/cover-register' },
  //     { key: 'Verify Email', label: 'Verify Email', href: '/cover-verify-email' },
  //     { key: 'Two Steps', label: 'Two Steps', href: '/cover-two-steps' },
  //     { key: 'Logout', label: 'Logout', href: '/cover-logout' },
  //     { key: 'Reset Password', label: 'Reset Password', href: '/cover-reset-password' },
  //     { key: 'Create Password', label: 'Create Password', href: '/cover-create-password' },
  //   ],
  // },
  // {
  //   key: 'Boxed Auth',
  //   label: 'Boxed Auth',
  //   icon: LuPackage,
  //   children: [
  //     { key: 'Login', label: 'Login', href: '/boxed-login' },
  //     { key: 'Register', label: 'Register', href: '/boxed-register' },
  //     { key: 'Verify Email', label: 'Verify Email', href: '/boxed-verify-email' },
  //     { key: 'Two Steps', label: 'Two Steps', href: '/boxed-two-steps' },
  //     { key: 'Logout', label: 'Logout', href: '/boxed-logout' },
  //     { key: 'Reset Password', label: 'Reset Password', href: '/boxed-reset-password' },
  //     { key: 'Create Password', label: 'Create Password', href: '/boxed-create-password' },
  //   ],
  // },
  // {
  //   key: 'Modern Auth',
  //   label: 'Modern Auth',
  //   icon: LuFingerprint,
  //   children: [
  //     { key: 'Login', label: 'Login', href: '/modern-login' },
  //     { key: 'Register', label: 'Register', href: '/modern-register' },
  //     { key: 'Verify Email', label: 'Verify Email', href: '/modern-verify-email' },
  //     { key: 'Two Steps', label: 'Two Steps', href: '/modern-two-steps' },
  //     { key: 'Logout', label: 'Logout', href: '/modern-logout' },
  //     { key: 'Reset Password', label: 'Reset Password', href: '/modern-reset-password' },
  //     { key: 'Create Password', label: 'Create Password', href: '/modern-create-password' },
  //   ],
  // },
  // {
  //   key: 'Layouts',
  //   label: 'Layouts',
  //   icon: LuLayoutPanelLeft,
  //   children: [
  //     { key: 'Hover Sidenav', label: 'Hover Sidenav', href: '/sidenav-hover', target: '_blank' },
  //     {
  //       key: 'Hover Active Sidenav',
  //       label: 'Hover Active Sidenav',
  //       href: '/sidenav-hover-active',
  //       target: '_blank',
  //     },
  //     { key: 'Small Sidenav', label: 'Small Sidenav', href: '/sidenav-small', target: '_blank' },
  //     {
  //       key: 'Compact Sidenav',
  //       label: 'Compact Sidenav',
  //       href: '/sidenav-compact',
  //       target: '_blank',
  //     },
  //     {
  //       key: 'Offcanvas Sidenav',
  //       label: 'Offcanvas Sidenav',
  //       href: '/sidenav-offcanvas',
  //       target: '_blank',
  //     },
  //     { key: 'Hidden Sidenav', label: 'Hidden Sidenav', href: '/sidenav-hidden', target: '_blank' },
  //     { key: 'Dark Sidenav', label: 'Dark Sidenav', href: '/sidenav-dark', target: '_blank' },
  //     { key: 'Dark Mode', label: 'Dark Mode', href: '/dark-mode', target: '_blank' },
  //     { key: 'RTL Mode', label: 'RTL Mode', href: '/rtl-mode', target: '_blank' },
  //   ],
  // },
  // {
  //   key: 'Multi Level',
  //   label: 'Multi Level',
  //   icon: LuShare2,
  //   children: [
  //     { key: 'Item 1', label: 'Item 1', href: '#' },
  //     { key: 'Item 2', label: 'Item 2', href: '#' },
  //   ],
  // },
];
