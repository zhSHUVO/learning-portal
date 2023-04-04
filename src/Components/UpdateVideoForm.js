import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateVideoMutation } from "../features/videos/videosApi";

function UpdateVideoForm({ video }) {
    const navigate = useNavigate();

    const {
        id,
        title: oldTitle,
        description: oldDescription,
        url: oldUrl,
        views: oldViews,
        duration: oldDuration,
    } = video;

    const [updateVideo, { isLoading }] = useUpdateVideoMutation();

    const [title, setTitle] = useState(oldTitle);
    const [description, setDescription] = useState(oldDescription);
    const [url, setUrl] = useState(oldUrl);
    const [views, setViews] = useState(oldViews);
    const [duration, setDuration] = useState(oldDuration);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateVideo({
            id,
            data: { title, description, url, views, duration },
        });

        navigate("/admin/videos");
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="mt-8 space-y-6">
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
                    <label htmlFor="description" className="sr-only">
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
                        onChange={(e) => setDescription(e.target.value)}
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
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Update Video
                </button>
            </div>
        </form>
    );
}

export default UpdateVideoForm;
