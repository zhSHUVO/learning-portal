import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateQuizMutation } from "../features/quizzes/quizzesApi";
import { useGetVideosQuery } from "../features/videos/videosApi";

function UpdateQuizForm({ quiz }) {
    const {
        question: oldQuestion,
        video_id: oldVideo_id,
        video_title: oldVideo_title,
        options: oldOptions,
        id,
    } = quiz;

    const {
        data: videos,
        isLoading: videoIsLoading,
        isError: videoIsError,
    } = useGetVideosQuery();

    let oldVideo;
    if (!videoIsLoading && !videoIsError) {
        oldVideo = videos.find(
            (video) =>
                video.id === oldVideo_id && video.title === oldVideo_title
        );
    } else oldVideo = {};

    const navigate = useNavigate();
    const [editQuiz, { isLoading, error }] = useUpdateQuizMutation();

    const [question, setQuestion] = useState(oldQuestion);
    const [video, setVideo] = useState(oldVideo);

    const [options1, setOptions1] = useState(oldOptions[0]);
    const [options2, setOptions2] = useState(oldOptions[1]);
    const [options3, setOptions3] = useState(oldOptions[2]);
    const [options4, setOptions4] = useState(oldOptions[3]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editQuiz({
            id,
            data: {
                question,
                video_id: video.id,
                video_title: video.title,
                options: [options1, options2, options3, options4],
            },
        });

        navigate("/admin/quizzes");
    };
    return (
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="title" className="sr-only">
                        Question
                    </label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        autoComplete="question"
                        required
                        className="login-input rounded-t-md"
                        defaultValue={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="video" className="sr-only">
                        Associated Video
                    </label>
                    <select
                        name="associatedVideo"
                        required
                        style={{
                            color: "white",
                            width: "100%",
                            backgroundColor:
                                "rgb(30 41 59 / var(--tw-bg-opacity))",
                            height: "40px",
                            fontSize: "0.875rem",
                        }}
                        onChange={(e) =>
                            setVideo(
                                videos.find(
                                    (video) => video.title === e.target.value
                                )
                            )
                        }
                    >
                        {!videoIsLoading &&
                            !videoIsError &&
                            videos.map((video) => (
                                <option
                                    key={video.id}
                                    selected={
                                        video.title === oldVideo_title
                                            ? "selected"
                                            : null
                                    }
                                >
                                    {video.title}
                                </option>
                            ))}
                    </select>
                </div>

                <div
                    style={{
                        display: "flex",
                        backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity))",
                    }}
                    onChange={(e) =>
                        setOptions1((prev) => ({
                            id: 1,
                            option:
                                e.target.type === "text"
                                    ? e.target.value
                                    : prev.option,
                            isCorrect:
                                e.target.type === "checkbox" && e.target.checked
                                    ? true
                                    : false,
                        }))
                    }
                >
                    <label htmlFor="Marks" className="sr-only">
                        Options 1
                    </label>
                    <input
                        id="options"
                        name="options 1"
                        type="text"
                        autoComplete="options 1"
                        required
                        className="login-input rounded-b-md"
                        defaultValue={options1.option}
                    />
                    <input
                        defaultChecked={options1.isCorrect}
                        type="checkbox"
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity))",
                    }}
                    onChange={(e) =>
                        setOptions2((prev) => ({
                            id: 1,
                            option:
                                e.target.type === "text"
                                    ? e.target.value
                                    : prev.option,
                            isCorrect:
                                e.target.type === "checkbox" && e.target.checked
                                    ? true
                                    : false,
                        }))
                    }
                >
                    <label htmlFor="Marks" className="sr-only">
                        Options 2
                    </label>
                    <input
                        id="options"
                        name="options 2"
                        type="text"
                        autoComplete="options 2"
                        required
                        className="login-input rounded-b-md"
                        defaultValue={options2.option}
                    />
                    <input
                        defaultChecked={options2.isCorrect}
                        type="checkbox"
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity))",
                    }}
                    onChange={(e) =>
                        setOptions3((prev) => ({
                            id: 1,
                            option:
                                e.target.type === "text"
                                    ? e.target.value
                                    : prev.option,
                            isCorrect:
                                e.target.type === "checkbox" && e.target.checked
                                    ? true
                                    : false,
                        }))
                    }
                >
                    <label htmlFor="Marks" className="sr-only">
                        Options 3
                    </label>
                    <input
                        id="options"
                        name="options 3"
                        type="text"
                        autoComplete="options 3"
                        required
                        className="login-input rounded-b-md"
                        defaultValue={options3.option}
                    />
                    <input
                        defaultChecked={options3.isCorrect}
                        type="checkbox"
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity))",
                    }}
                    onChange={(e) =>
                        setOptions4((prev) => ({
                            id: 1,
                            option:
                                e.target.type === "text"
                                    ? e.target.value
                                    : prev.option,
                            isCorrect:
                                e.target.type === "checkbox" && e.target.checked
                                    ? true
                                    : false,
                        }))
                    }
                >
                    <label htmlFor="Marks" className="sr-only">
                        Options 4
                    </label>
                    <input
                        id="options"
                        name="options 4"
                        type="text"
                        autoComplete="options 4"
                        required
                        className="login-input rounded-b-md"
                        defaultValue={options4.option}
                    />
                    <input
                        defaultChecked={options4.isCorrect}
                        type="checkbox"
                    />
                </div>
            </div>

            {/* options end here */}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Update Quiz
                </button>
            </div>
            {<div style={{ color: "white" }}>{error !== "" && error}</div>}
        </form>
    );
}

export default UpdateQuizForm;
