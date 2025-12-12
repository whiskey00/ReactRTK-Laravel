import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
	try {
		const stored = localStorage.getItem("auth");
		return stored ? JSON.parse(stored) : { token: null, user: null };
	} catch (err) {
		console.error("Failed to load auth from localStorage:", err);
		return { token: null, user: null };
	}
};

const authSlice = createSlice({
	name: "auth",
	initialState: loadAuthFromStorage(),
	reducers: {
		setCredentials: (state, action) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;

			localStorage.setItem("auth", JSON.stringify({ token, user }));
		},

		logout: (state) => {
			state.token = null;
			state.user = null;

			localStorage.removeItem("auth");
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
