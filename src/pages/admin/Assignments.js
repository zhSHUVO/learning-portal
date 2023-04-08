import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import SingleAssignment from "../../Components/SingleAssignment";
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentsApi";

function Assignments() {
    const navigate = useNavigate();
    const {
        data: assignments,
        isLoading,
        isError,
        error,
    } = useGetAssignmentsQuery();

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && assignments?.length === 0)
        content = <div>No Assignment Found!</div>;

    if (!isLoading && !isError && assignments?.length > 0) {
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Mark</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>
                {assignments.map((assignment) => (
                    <SingleAssignment
                        assignment={assignment}
                        key={assignment.id}
                    />
                ))}
            </table>
        );
    }

    return (
        <>
            <Nav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button
                                onClick={(e) =>
                                    navigate("/admin/addAssignment")
                                }
                                className="btn ml-auto"
                            >
                                Add Assignment
                            </button>
                        </div>
                        <div className="overflow-x-auto mt-4">{content}</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Assignments;
