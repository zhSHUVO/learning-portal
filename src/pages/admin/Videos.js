import React from "react";
import { useNavigate } from "react-router-dom";
import SingleVideo from "../../Components/SingleVideo";
import { useGetVideosQuery } from "../../features/videos/videosApi";

function Videos(props) {
    const navigate = useNavigate();

    const { data: videos, isLoading, isError, error } = useGetVideosQuery();

    let content;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && videos?.length === 0)
        content = <div>No Videos Found!</div>;

    if (!isLoading && !isError && videos?.length > 0) {
        content = (
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Description</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>
                {videos.map((video) => (
                    <SingleVideo video={video} key={video.id} />
                ))}
            </table>
        );
    }

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button
                            onClick={(e) => navigate("/admin/addVideo")}
                            className="btn ml-auto"
                        >
                            Add Video
                        </button>
                    </div>
                    <div className="overflow-x-auto mt-4">{content}</div>
                </div>
            </div>
        </section>
    );
}

export default Videos;
