import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateAssignmentMutation } from "../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../features/videos/videosApi";

function UpdateAssignmentForm({ assignment }) {
    const {
        title: oldTitle,
        video_id: oldVideo_id,
        video_title: oldVideo_title,
        totalMark: oldTotalMark,
        id,
    } = assignment;

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
    const [editAssignment, { isLoading, error }] =
        useUpdateAssignmentMutation();

    const [title, setTitle] = useState(oldTitle);
    const [video, setVideo] = useState(oldVideo);
    const [totalMark, setTotalMark] = useState(oldTotalMark);

    const handleSubmit = (e) => {
        e.preventDefault();
        editAssignment({
            id,
            data: {
                title,
                totalMark,
                video_id: video.id,
                video_title: video.title,
            },
        });

        navigate("/admin/assignments");
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="title" className="sr-only">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="name"
                        autoComplete="name"
                        required
                        className="login-input rounded-t-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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

                <div>
                    <label htmlFor="Marks" className="sr-only">
                        Total Marks
                    </label>
                    <input
                        id="marks"
                        name="marks"
                        type="number"
                        autoComplete="marks"
                        required
                        className="login-input rounded-b-md"
                        value={totalMark}
                        onChange={(e) => setTotalMark(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Update Assignment
                </button>
            </div>
            {<div style={{ color: "white" }}>{error !== "" && error}</div>}
        </form>
    );
}

export default UpdateAssignmentForm;
