import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getUsers: builders.query({
            query: () => "/users",
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
