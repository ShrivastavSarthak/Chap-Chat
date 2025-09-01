export interface UserInterface {
  mobile: {
    countryCode: string;
    number: string;
  };
  _id: string;
  email: string;
  organizationId: string;
  isDeleted: boolean;
  isActive: boolean;
  roles: string[];
  accessLevel: string;
  createdAt: string;
  departmentId: string;
  designationId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  points: number;
  id: string;
  departmentName: string;
  designationName: string;
  organizationName: string;
  [key: string]: any;
}
