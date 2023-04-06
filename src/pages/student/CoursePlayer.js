import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSignleVideoQuery } from "../../features/videos/videosApi";

function CoursePlayer(props) {
    const { videoId } = useParams();
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        const { id } = JSON.parse(localStorage.auth).user;
        setStudentId(id);
    }, []);

    console.log("videoId", parseInt(videoId));
    console.log("studentId", studentId);

    const {
        data: selectedVideo,
        isLoading: selectedVideoIsLoading,
        isError: selectedVideoIsError,
    } = useGetSignleVideoQuery(parseInt(videoId));

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
                            <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                    />
                                </svg>
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-slate-50 text-sm font-medium">
                                            Things I wish I knew as a Junior Web
                                            Developer - Sumit Saha - BASIS
                                            SoftExpo 2023
                                        </p>
                                    </a>
                                    <div>
                                        <span className="text-gray-400 text-xs mt-1">
                                            34.5 Mins
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            {" "}
                                            |{" "}
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                    />
                                </svg>
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-slate-50 text-sm font-medium">
                                            Introduction to Couse
                                        </p>
                                    </a>
                                    <div>
                                        <span className="text-gray-400 text-xs mt-1">
                                            34.5 Mins
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            {" "}
                                            |{" "}
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                    />
                                </svg>
                                <div clas="flex flex-col w-full">
                                    <a href="#">
                                        <p className="text-slate-50 text-sm font-medium">
                                            Introduction to Couse
                                        </p>
                                    </a>
                                    <div>
                                        <span className="text-gray-400 text-xs mt-1">
                                            34.5 Mins
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            {" "}
                                            |{" "}
                                        </span>
                                        <span className="text-gray-400 text-xs mt-1">
                                            241K views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CoursePlayer;
