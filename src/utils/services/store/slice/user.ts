import { UserInterface } from "@/src/utils/interface/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserInterface = {
  mobile: {
    countryCode: "",
    number: "",
  },
  _id: "",
  email: "",
  organizationId: "",
  isDeleted: false,
  isActive: false,
  roles: [],
  accessLevel: "",
  createdAt: "",
  departmentId: "",
  designationId: "",
  name: "",
  dateOfBirth: "",
  gender: "",
  points: 0,
  id: "",
  departmentName: "",
  designationName: "",
  organizationName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserInterface>) => {
      return action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
