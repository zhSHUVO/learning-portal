import React from "react";
import { useParams } from "react-router-dom";
import UpdateQuizForm from "../../Components/UpdateQuizForm";
import { useGetSingleQuizQuery } from "../../features/quizzes/quizzesApi";

function UpdateQuiz(props) {
    const quizId = useParams();

    const {
        data: quiz,
        isLoading,
        isError,
        error,
    } = useGetSingleQuizQuery(quizId.id);

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && quiz?.id) {
        content = <UpdateQuizForm quiz={quiz} />;
    }
    return (
        <section className="py-6 bg-primary h-screen place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <h1 className="text-center">Update Quiz</h1>
                {content}
            </div>
        </section>
    );
}

export default UpdateQuiz;
