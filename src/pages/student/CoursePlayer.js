import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoursePlayerRelatedVideos from "../../Components/CoursePlayerRelatedVideos";
import {
    useGetSignleVideoQuery,
    useGetVideosQuery,
} from "../../features/videos/videosApi";

function CoursePlayer(props) {
    const { videoId } = useParams();
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        const { id } = JSON.parse(localStorage.auth).user;
        setStudentId(id);
    }, []);

    // getting all videos info for related videos
    const {
        data: videos,
        isLoading: videosIsLoading,
        isError: videosIsError,
        error: videosError,
    } = useGetVideosQuery();

    // getting video infos
    const {
        data: selectedVideo,
        isLoading: selectedVideoIsLoading,
        isError: selectedVideoIsError,
    } = useGetSignleVideoQuery(parseInt(videoId));

    // loading related videos
    let content = null;

    if (videosIsLoading) content = <div>Loading...</div>;
    if (!videosIsLoading && videosIsError) content = <div>{videosError}</div>;
    if (!videosIsLoading && !videosIsError && videos?.length === 0)
        content = <div>No Videos Found!</div>;

    if (!videosIsLoading && !videosIsError && videos?.length > 0) {
        content = videos.map((video) => (
            <CoursePlayerRelatedVideos key={video.id} video={video} />
        ));
    }

    return (
        <div>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            <iframe
                                width="100%"
                                className="aspect-video"
                                src={selectedVideo?.url}
                                title={selectedVideo?.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            <div>
                                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                                    {selectedVideo?.title}
                                </h1>
                                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                                    Uploaded on
                                    {new Date(
                                        selectedVideo?.createdAt
                                    ).toLocaleDateString()}
                                </h2>

                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                                    >
                                        এসাইনমেন্ট
                                    </a>

                                    <a
                                        href="./Quiz.html"
                                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                                    >
                                        কুইজে অংশগ্রহণ করুন
                                    </a>
                                </div>
                                <p className="mt-4 text-sm text-slate-400 leading-6">
                                    {selectedVideo?.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
                            {content}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CoursePlayer;
