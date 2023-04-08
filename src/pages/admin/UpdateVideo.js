import React from "react";
import { useParams } from "react-router-dom";
import UpdateVideoForm from "../../Components/UpdateVideoForm";
import { useGetSignleVideoQuery } from "../../features/videos/videosApi";
import Nav from "../../Components/Nav";

function UpdateVideo() {
    const videoId = useParams();

    const {
        data: video,
        isLoading,
        isError,
        error,
    } = useGetSignleVideoQuery(videoId.id);

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && video?.id) {
        content = <UpdateVideoForm video={video} />;
    }

    return (
        <>
            <Nav />
            <section className="py-6 bg-primary h-screen place-items-center">
                <div className="mx-auto max-w-md px-5 lg:px-0">
                    <h1 className="text-center">Update Video</h1>
                    {content}
                </div>
            </section>
        </>
    );
}

export default UpdateVideo;
