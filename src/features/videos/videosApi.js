import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "videos",
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data: newVideo } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getVideos",
                        undefined,
                        (draft) => {
                            draft.push(newVideo);
                        }
                    )
                );
            },
        }),
    }),
});

export const { useGetVideosQuery, useAddVideoMutation } = videosApi;
