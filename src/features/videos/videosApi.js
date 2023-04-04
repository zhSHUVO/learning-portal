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
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        "getVideos",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (video) => video.id === arg
                            );
                            draft.splice(index, 1);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    result.undo();
                }
            },
        }),
    }),
});

export const {
    useGetVideosQuery,
    useAddVideoMutation,
    useDeleteVideoMutation,
} = videosApi;
