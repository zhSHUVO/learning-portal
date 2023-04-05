import React, { useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../features/assignmentMarks/assignmentMarksApi";

function SingleAssignmentMark({ assignmentMark }) {
    const [marks, setMarks] = useState("100");
    const [editAssignmentMark] = useUpdateAssignmentMarkMutation();

    return (
        <tbody className="divide-y divide-slate-600/50">
            <tr>
                <td className="table-td">{assignmentMark.title}</td>
                <td className="table-td">
                    {`${new Date(
                        assignmentMark.createdAt
                    ).toLocaleDateString()} ${new Date(
                        assignmentMark.createdAt
                    ).toLocaleTimeString()}`}
                </td>
                <td className="table-td">{assignmentMark.student_name}</td>
                <td className="table-td">{assignmentMark.repo_link}</td>
                <td className="table-td input-mark">
                    {assignmentMark.status === "pending" ? (
                        <>
                            <input
                                max="100"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                            />
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                                onClick={(e) =>
                                    editAssignmentMark({
                                        id: assignmentMark.id,
                                        data: {
                                            ...assignmentMark,
                                            mark: parseInt(marks),
                                            status: "published",
                                        },
                                    })
                                }
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </>
                    ) : (
                        assignmentMark.mark
                    )}
                </td>
            </tr>
        </tbody>
    );
}

export default SingleAssignmentMark;
