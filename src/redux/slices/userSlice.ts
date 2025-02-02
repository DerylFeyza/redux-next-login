import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	name: string;
	email: string;
	password: string;
}

interface UserState {
	users: User[];
	loggedInUser: User | null;
	status: "loggedIn" | "loggedOut";
}

const initialState: UserState = {
	users: [],
	loggedInUser: null,
	status: "loggedOut",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		register: (state, action: PayloadAction<User>) => {
			const { name, email, password } = action.payload;
			const user = state.users.find(
				(user: User) =>
					user.email === action.payload.email &&
					user.password === action.payload.password
			);
			if (!user) {
				state.users.push({ name, email, password });
			}
		},
		login: (state, action) => {
			const user = state.users.find(
				(user: User) =>
					user.email === action.payload.email &&
					user.password === action.payload.password
			);
			if (user) {
				state.loggedInUser = user;
				state.status = "loggedIn";
			}
		},
		logout: (state) => {
			state.loggedInUser = null;
			state.status = "loggedOut";
		},
	},
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;
