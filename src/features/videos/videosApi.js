import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "videos",
        }),
    }),
});

export const { useGetVideosQuery } = videosApi;
