import React from "react";
import { useParams } from "react-router-dom";
import UpdateAssignmentForm from "../../Components/UpdateAssignmentForm";
import { useGetSignleAssignmentQuery } from "../../features/assignments/assignmentsApi";
import Nav from "../../Components/Nav";

function UpdateAssignment() {
    const assignmentId = useParams();

    const {
        data: assignment,
        isLoading,
        isError,
        error,
    } = useGetSignleAssignmentQuery(assignmentId.id);

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && assignment?.id) {
        content = <UpdateAssignmentForm assignment={assignment} />;
    }

    return (
        <>
            <Nav />
            <section className="py-6 bg-primary h-screen place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <h1 className="text-center">Update Assignment</h1>
                    {content}
                </div>
            </section>
        </>
    );
}

export default UpdateAssignment;
