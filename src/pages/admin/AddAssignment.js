import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAssignmentMutation } from "../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../features/videos/videosApi";

function AddAssignment(props) {
    const navigate = useNavigate();

    const {
        data: videos,
        isLoading: videoIsLoading,
        isError: videoIsError,
    } = useGetVideosQuery();

    const [addAssignment, { isLoading }] = useAddAssignmentMutation();

    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [totalMark, setTotalMark] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        addAssignment({
            title,
            totalMark,
            video_id: video.id,
            video_title: video.title,
        });

        navigate("/admin/assignments");
    };
    return (
        <section className="py-6 bg-primary h-screen place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <h1 className="text-center	">Add Assignemtn</h1>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={(e) => handleSubmit(e)}
                >
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
                                placeholder="Assignment Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
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
                                            (video) =>
                                                video.title === e.target.value
                                        )
                                    )
                                }
                            >
                                <option value="" hidden defaultValue>
                                    Assignment for
                                </option>
                                {!videoIsLoading &&
                                    !videoIsError &&
                                    videos.map((video) => (
                                        <option key={video.id}>
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
                                placeholder="Total Marks"
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
                            Add Assignment
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AddAssignment;
