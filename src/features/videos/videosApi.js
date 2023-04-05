import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
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
        getSignleVideo: builder.query({
            query: (id) => `/videos/${id}`,
        }),
        updateVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedVideo } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getVideos",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(
                                    (video) => video.id === arg.id
                                );
                                draft[index] = updatedVideo;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getVideo",
                            arg.id.toString(),
                            (draft) => {
                                return updatedVideo;
                            }
                        )
                    );
                } catch {}
            },
        }),
    }),
});

export const {
    useGetVideosQuery,
    useAddVideoMutation,
    useDeleteVideoMutation,
    useGetSignleVideoQuery,
    useUpdateVideoMutation,
} = videosApi;
