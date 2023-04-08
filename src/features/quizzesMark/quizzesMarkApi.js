import { apiSlice } from "../api/apiSlice";

export const quizzesMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzesMarks: builder.query({
            query: () => "/quizMark/",
        }),

        addQuizMark: builder.mutation({
            query: (data) => ({
                url: "/quizMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newQuizMark } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizMarks",
                            undefined,
                            (draft) => {
                                draft.push(newQuizMark);
                            }
                        )
                    );
                } catch {}
            },
        }),
        getSingleQuizMark: builder.query({
            query: (id) => `/quizMark/${id}`,
        }),
        editQuizMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizMark/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedQuizMark } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizMarks",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(
                                    (quiz) => quiz.id === arg.id
                                );
                                draft[index] = updatedQuizMark;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getQuizMark",
                            arg.id.toString(),
                            (draft) => {
                                return updatedQuizMark;
                            }
                        )
                    );
                } catch {}
            },
        }),
        deleteQuizMark: builder.mutation({
            query: (id) => ({
                url: `/quizMark/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getQuizMarks",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (quiz) => quiz.id === arg
                            );
                            draft.splice(index, 1);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useAddQuizMarkMutation,
    useEditQuizMarkMutation,
    useGetQuizzesMarksQuery,
    useGetSingleQuizMarkQuery,
    useDeleteQuizMarkMutation,
} = quizzesMarkApi;
