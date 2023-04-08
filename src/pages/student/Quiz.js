import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import { useAddQuizMarkMutation } from "../../features/quizzesMark/quizzesMarkApi";
import { useGetSignleVideoQuery } from "../../features/videos/videosApi";

function Quiz(props) {
    const navigate = useNavigate();

    const { name: studentName } = JSON.parse(localStorage.auth).user;

    const { videoId, studentId: studentIdFromParam } = useParams();
    useEffect(() => {
        const { id } = JSON.parse(localStorage.auth).user;
        setStudentId(id);
    }, [navigate, studentIdFromParam]);

    const [studentId, setStudentId] = useState(0);

    const {
        data: video,
        isLoading: videoIsLoading,
        isError: videoIsError,
    } = useGetSignleVideoQuery(videoId);

    const {
        data: quizzes,
        isLoading: quizzesIsLoading,
        isError: quizzesIsError,
    } = useGetQuizzesQuery();

    const [addQuizMark, { isLoading }] = useAddQuizMarkMutation();

    const concernedQuizes = quizzes?.filter(
        (quiz) => quiz.video_id === video?.id
    );

    let answerArray = [];
    const handleChange = (e, question, providedOption) => {
        let answerAvailable = answerArray.find(
            (answer) => answer?.question === question
        );
        if (answerAvailable) {
            let sameOptionAvailableAt = answerAvailable.options.findIndex(
                (option) => option.option === providedOption.option
            );
            sameOptionAvailableAt >= 0
                ? answerAvailable.options.splice(sameOptionAvailableAt, 1)
                : answerAvailable.options.push(providedOption);
        } else {
            answerArray.push({
                question,
                options: [providedOption],
            });
        }
    };

    function areEqual(arr1, arr2) {
        let N = arr1.length;
        let M = arr2.length;

        if (N !== M) return false;

        arr1.sort();
        arr2.sort();

        for (let i = 0; i < N; i++) if (arr1[i] !== arr2[i]) return false;

        return true;
    }

    let quizMark = 0;
    function calculateResult() {
        concernedQuizes.forEach((quiz) => {
            answerArray.forEach((answer) => {
                if (answer.question === quiz.question) {
                    const rightAnswers = quiz.options.filter(
                        (option) => option.isCorrect
                    );
                    areEqual(answer.options, rightAnswers)
                        ? (quizMark += 5)
                        : (quizMark += 0);
                }
            });
        });
    }

    const handleColorChange = (e) => {
        e.target.style.backgroundColor =
            e.target.style.backgroundColor === "" ? "#90EE90" : "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateResult();

        addQuizMark({
            student_id: studentId,
            student_name: studentName,
            video_id: parseInt(videoId),
            video_title: video.title,
            totalQuiz: concernedQuizes.length,
            totalCorrect: quizMark / 5,
            totalWrong: concernedQuizes.length - quizMark / 5,
            totalMark: concernedQuizes.length * 5,
            mark: quizMark,
        });

        navigate(`/courseplayer/${videoId}`);
    };

    let content = null;
    if (
        !videoIsLoading &&
        !videoIsError &&
        !quizzesIsLoading &&
        !quizzesIsError &&
        quizzes.length > 0
    ) {
        content = concernedQuizes.map((quiz, index) => (
            <>
                <div key={quiz.id} className="space-y-8">
                    <div className="quiz">
                        <h4 className="question">
                            Quiz {index + 1} - {quiz.question}
                        </h4>
                        <form className="quizOptions">
                            <label
                                htmlFor={`option1_q${index + 1}`}
                                onClick={(e) => handleColorChange(e)}
                            >
                                <input
                                    type="checkbox"
                                    id={`option1_q${index + 1}`}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.checked,
                                            quiz.question,
                                            quiz.options[0]
                                        )
                                    }
                                />
                                {quiz.options[0].option}
                            </label>

                            <label
                                htmlFor={`option2_q${index + 1}`}
                                onClick={(e) => handleColorChange(e)}
                            >
                                <input
                                    type="checkbox"
                                    id={`option2_q${index + 1}`}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.checked,
                                            quiz.question,
                                            quiz.options[1]
                                        )
                                    }
                                />
                                {quiz.options[1].option}
                            </label>

                            <label
                                htmlFor={`option3_q${index + 1}`}
                                onClick={(e) => handleColorChange(e)}
                            >
                                <input
                                    type="checkbox"
                                    id={`option3_q${index + 1}`}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.checked,
                                            quiz.question,
                                            quiz.options[2]
                                        )
                                    }
                                />
                                {quiz.options[2].option}
                            </label>

                            <label
                                htmlFor={`option4_q${index + 1}`}
                                onClick={(e) => handleColorChange(e)}
                            >
                                <input
                                    type="checkbox"
                                    id={`option4_q${index + 1}`}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.checked,
                                            quiz.question,
                                            quiz.options[3]
                                        )
                                    }
                                />
                                {quiz.options[3].option}
                            </label>
                        </form>
                    </div>
                </div>
            </>
        ));
    }
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">
                        Quizzes for "{video?.title}"
                    </h1>
                    <p className="text-sm text-slate-200">
                        Each question contains 5 Mark
                    </p>
                </div>
                {content}
                <button
                    disabled={isLoading}
                    onClick={(e) => handleSubmit(e)}
                    className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
                >
                    Submit
                </button>
            </div>
        </section>
    );
}

export default Quiz;
