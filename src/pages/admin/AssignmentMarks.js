import React from "react";
import SingleAssignmentMark from "../../Components/SingleAssignmentMark";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";

function AssignmentMarks(props) {
    const {
        data: assignmentMarks,
        isLoading,
        isError,
        error,
    } = useGetAssignmentMarksQuery();

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && assignmentMarks?.length === 0)
        content = <div>No Assignments to Mark!</div>;

    if (!isLoading && !isError && assignmentMarks?.length > 0) {
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Assignment</th>
                        <th className="table-th">Date</th>
                        <th className="table-th">Student Name</th>
                        <th className="table-th">Repo Link</th>
                        <th className="table-th">Mark</th>
                    </tr>
                </thead>
                {assignmentMarks.map((assignmentMark) => (
                    <SingleAssignmentMark
                        assignmentMark={assignmentMark}
                        key={assignmentMark.id}
                    />
                ))}
            </table>
        );
    }

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <ul className="assignment-status">
                        <li>
                            Total <span>4</span>
                        </li>
                        <li>
                            Pending <span>3</span>
                        </li>
                        <li>
                            Mark Sent <span>1</span>
                        </li>
                    </ul>
                    <div className="overflow-x-auto mt-4">{content}</div>
                </div>
            </div>
        </section>
    );
}

export default AssignmentMarks;
