import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";
import { useAddVideoMutation } from "../../features/videos/videosApi";

function AddVideo(props) {
    const [addVideo, { isLoading }] = useAddVideoMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [views, setViews] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addVideo({
            title,
            description,
            url,
            views,
            duration,
            createdAt: new Date().toISOString(),
        });

        navigate("/admin/videos");
    };
    return (
        <>
            <Nav />
            <section className="py-6 bg-primary h-screen place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <h1 className="text-center	">Add Video</h1>
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
                                    placeholder="Video Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="sr-only"
                                >
                                    Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="description"
                                    autoComplete="description"
                                    required
                                    className="login-input h-60	"
                                    placeholder="Video Description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="url" className="sr-only">
                                    Url
                                </label>
                                <input
                                    id="url"
                                    name="url"
                                    type="url"
                                    autoComplete="url"
                                    required
                                    className="login-input h-60	"
                                    placeholder="Video Url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="Views" className="sr-only">
                                    Views
                                </label>
                                <input
                                    id="views"
                                    name="views"
                                    type="text"
                                    autoComplete="views"
                                    required
                                    className="login-input h-60	"
                                    placeholder="Views"
                                    value={views}
                                    onChange={(e) => setViews(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="Duration" className="sr-only">
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    name="duration"
                                    type="name"
                                    autoComplete="duration"
                                    required
                                    className="login-input rounded-b-md  h-60	"
                                    placeholder="Video Duration"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Add Video
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default AddVideo;
