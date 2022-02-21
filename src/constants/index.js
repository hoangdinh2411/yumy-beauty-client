import { FaEyeSlash, FaEye } from "react-icons/fa";
export const menuItems = [
  {
    id: 1,
    path: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    path: "/services",
    title: "Services",
  },
  {
    id: 3,
    path: "/categories",
    title: "Categories",
  },
  {
    id: 4,
    path: "/customers",
    title: "Customers",
  },
  {
    id: 5,
    path: "/orders",
    title: "Orders",
  },
  {
    id: 6,
    path: "/coupons",
    title: "Coupons",
  },
  {
    id: 7,
    path: "/staffs",
    title: "Staffs",
  },
  
];

export const formFields = {
  signInForm: [
    {
      id: 1,
      name: "username",
      type: "text",
      title: "Username",
      defaultValue: 'admin'
    },  
    {
      id: 2,
      name: "password",
      type: {
        hide: "password",
        show: "text",
      },
      title: "Password",
      defaultValue: '123123',
      icon: {
        hide: <FaEyeSlash />,
        show: <FaEye />,
      },
    },
  ],
  signUpForm: [
    {
      id: 1,
      name: "fullName",
      type: "text",
      title: "Full name",
    },
    {
      id: 2,
      name: "username",
      type: "text",
      title: "Username",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      title: "Email",
    },
    {
      id: 4,
      name: "password",
      type: {
        hide: "password",
        show: "text",
      },
      title: "Password ",
      icon: {
        hide: <FaEyeSlash />,
        show: <FaEye />,
      },
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      title: "Confirm password ",
    },
  ],
 
};

export const tableHeadersServices =["Image","Name","Categories","Price","Time to Up", "Staff","","",""];
export const tableHeadersStaffs =["Avatar","Full Name","Categories", "Phone","","",""];
export const tableHeadersCoupons =["Coupon Code","Campaign's Name","Percentage","Start date", "End Date","Expired","",""];
export const tableHeadersCategories =["Name","Created by","Updated by","","",""]

