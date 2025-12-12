import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../components/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8000/api/",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		api.dispatch(logout());
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: credentials,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCredentials(data));
				} catch (err) {
					console.error("Login failed:", err);
				}
			},
		}),
		register: builder.mutation({
			query: (userData) => ({
				url: "/register",
				method: "POST",
				body: userData,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logout());
				} catch (err) {
					console.error("Logout failed:", err);
				}
			},
		}),
	}),
	tagTypes: ["Auth"],
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	apiSlice;
