import React from "react";
import SingleQuiz from "../../Components/SingleQuiz";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";

function Quizzes(props) {
    const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && quizzes?.length === 0)
        content = <div>No Quiz Found!</div>;

    if (!isLoading && !isError && quizzes?.length > 0) {
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Question</th>
                        <th className="table-th">Video</th>
                        <th className="table-th justify-center">Action</th>
                    </tr>
                </thead>
                {quizzes.map((quiz) => (
                    <SingleQuiz quiz={quiz} key={quiz.id} />
                ))}
            </table>
        );
    }

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn ml-auto">Add Quiz</button>
                    </div>
                    <div className="overflow-x-auto mt-4">{content}</div>
                </div>
            </div>
        </section>
    );
}

export default Quizzes;
