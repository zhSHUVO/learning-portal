import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentModal from "../../Components/AssignmentModal";
import CoursePlayerRelatedVideos from "../../Components/CoursePlayerRelatedVideos";
import {
    useGetAssignmentsQuery,
    useGetSignleAssignmentQuery,
} from "../../features/assignments/assignmentsApi";
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

    // loading assignment

    const {
        data: assignments,
        isLoading: assignmentsIsLoading,
        isError: assignmentsIsError,
    } = useGetAssignmentsQuery();

    const {
        data: assignmentMarks,
        isLoading: assignmentMarksIsLoading,
        isError: assignmentMarksIsError,
    } = useGetSignleAssignmentQuery();

    const decideAssignmentButton = (assignment) => {
        const { id: assignment_id } = assignment;
        console.log(assignment_id);

        if (
            !assignmentMarksIsLoading &&
            !assignmentMarksIsError &&
            assignmentMarks?.length > 0
        ) {
            const cancelSubmission = assignmentMarks.find(
                (assignment) =>
                    assignment.assignment_id === assignment_id &&
                    assignment.student_id === studentId
            );
            return cancelSubmission ? true : false;
        }
    };

    const [selectedAssignment, setSelectedAssignment] = useState({});
    const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);

    const controlAssignmentModal = (assignment) => {
        setAssignmentModalOpened((prevState) => !prevState);
        setSelectedAssignment(assignment);
    };

    let assignmentButton = null;

    if (
        !selectedVideoIsLoading &&
        !selectedVideoIsError &&
        !assignmentsIsLoading &&
        !assignmentsIsError &&
        assignments?.length > 0
    ) {
        const selectedAssignment = assignments.find(
            (assignment) => assignment.video_id === selectedVideo.id
        );

        let decision;
        if (selectedAssignment)
            decision = decideAssignmentButton(selectedAssignment);

        assignmentButton = selectedAssignment ? (
            <button
                onClick={() => controlAssignmentModal(selectedAssignment)}
                disabled={decision}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
                এসাইনমেন্ট
            </button>
        ) : null;
    }

    return (
        <div>
            <AssignmentModal
                open={assignmentModalOpened}
                control={controlAssignmentModal}
                assignment={selectedAssignment}
            />
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
                                    {assignmentButton}
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
