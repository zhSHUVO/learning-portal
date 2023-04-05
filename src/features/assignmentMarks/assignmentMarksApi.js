import { apiSlice } from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignmentMarks: builder.query({
            query: () => "/assignmentMark",
        }),
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: "/assignmentMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data: newAssignmentMark } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignmentMarks",
                        undefined,
                        (draft) => {
                            draft.push(newAssignmentMark);
                        }
                    )
                );
            },
        }),
        getSigleAssignmentMark: builder.query({
            query: (id) => `/assignmentMark/${id}`,
        }),
        updateAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedAssignmentMark } =
                        await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignmentMarks",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(
                                    (assignment) => assignment.id === arg.id
                                );
                                draft[index] = updatedAssignmentMark;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            "getAssignmentMark",
                            arg.id.toString(),
                            (draft) => {
                                return updatedAssignmentMark;
                            }
                        )
                    );
                } catch {}
            },
        }),
    }),
});

export const {
    useAddAssignmentMarkMutation,
    useGetAssignmentMarksQuery,
    useGetSigleAssignmentMarkQuery,
    useUpdateAssignmentMarkMutation,
} = assignmentMarksApi;
