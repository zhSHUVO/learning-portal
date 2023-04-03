import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    })
                );
                dispatch(
                    userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    })
                );
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
