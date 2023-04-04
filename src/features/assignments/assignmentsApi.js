import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => "/assignments",
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data: newAssignments } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            draft.push(newAssignments);
                        }
                    )
                );
            },
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (assignment) => assignment.id === arg
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
        getSignleAssignment: builder.query({
            query: (id) => `/assignments/${id}`,
        }),
        updateAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data: updatedAssignments } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            const index = draft.findIndex(
                                (assignment) => assignment.id === arg.id
                            );
                            draft[index] = updatedAssignments;
                        }
                    )
                );
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
                        arg.id.toString(),
                        (draft) => {
                            return updatedAssignments;
                        }
                    )
                );
            },
        }),
    }),
});

export const {
    useAddAssignmentMutation,
    useDeleteAssignmentMutation,
    useGetSignleAssignmentQuery,
    useUpdateAssignmentMutation,
    useGetAssignmentsQuery,
} = assignmentsApi;
