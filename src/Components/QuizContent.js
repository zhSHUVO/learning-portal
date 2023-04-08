// import React from "react";
// import { useAddQuizMarkMutation } from "../features/quizzesMark/quizzesMark";

// function QuizContent({ quiz, index }) {
//     const concernedQuizes = quizzes?.filter(
//         (quiz) => quiz.video_id === video?.id
//     );
//     const [addQuizMark, { isLoading }] = useAddQuizMarkMutation();

//     function areEqual(arr1, arr2) {
//         let N = arr1.length;
//         let M = arr2.length;

//         if (N !== M) return false;

//         arr1.sort();
//         arr2.sort();

//         for (let i = 0; i < N; i++) if (arr1[i] !== arr2[i]) return false;

//         return true;
//     }

//     let quizMark = 0;
//     function calculateResult() {
//         concernedQuizes.forEach((quiz) => {
//             answerArray.forEach((answer) => {
//                 if (answer.question === quiz.question) {
//                     const rightAnswers = quiz.options.filter(
//                         (option) => option.isCorrect
//                     );
//                     areEqual(answer.options, rightAnswers)
//                         ? (quizMark += 5)
//                         : (quizMark += 0);
//                 }
//             });
//         });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         calculateResult();

//         addQuizMark({
//             student_id: studentId,
//             student_name: studentName,
//             video_id: parseInt(videoId),
//             video_title: video.title,
//             totalQuiz: concernedQuizes.length,
//             totalCorrect: quizMark / 5,
//             totalWrong: concernedQuizes.length - quizMark / 5,
//             totalMark: concernedQuizes.length * 5,
//             mark: quizMark,
//         });

//         navigate("/leaderboard");
//     };

//     let answerArray = [];
//     const handleChange = (e, question, providedOption) => {
//         let answerAvailable = answerArray.find(
//             (answer) => answer?.question === question
//         );
//         if (answerAvailable) {
//             let sameOptionAvailableAt = answerAvailable.options.findIndex(
//                 (option) => option.option === providedOption.option
//             );
//             sameOptionAvailableAt >= 0
//                 ? answerAvailable.options.splice(sameOptionAvailableAt, 1)
//                 : answerAvailable.options.push(providedOption);
//         } else {
//             answerArray.push({
//                 question,
//                 options: [providedOption],
//             });
//         }
//     };

//     const handleColorChange = (e) => {
//         e.target.style.backgroundColor =
//             e.target.style.backgroundColor === "" ? "#90EE90" : "";
//     };
//     return (
//         <div key={quiz.id} className="quiz">
//             <h4 className="question">
//                 Quiz {index + 1} - {quiz.question}
//             </h4>
//             <form className="quizOptions">
//                 <label
//                     for={`option1_q${index + 1}`}
//                     onClick={(e) => handleColorChange(e)}
//                 >
//                     <input
//                         type="checkbox"
//                         id={`option1_q${index + 1}`}
//                         onChange={(e) =>
//                             handleChange(
//                                 e.target.checked,
//                                 quiz.question,
//                                 quiz.options[0]
//                             )
//                         }
//                     />
//                     {quiz.options[0].option}
//                 </label>

//                 <label
//                     for={`option2_q${index + 1}`}
//                     onClick={(e) => handleColorChange(e)}
//                 >
//                     <input
//                         type="checkbox"
//                         id={`option2_q${index + 1}`}
//                         onChange={(e) =>
//                             handleChange(
//                                 e.target.checked,
//                                 quiz.question,
//                                 quiz.options[1]
//                             )
//                         }
//                     />
//                     {quiz.options[1].option}
//                 </label>

//                 <label
//                     for={`option3_q${index + 1}`}
//                     onClick={(e) => handleColorChange(e)}
//                 >
//                     <input
//                         type="checkbox"
//                         id={`option3_q${index + 1}`}
//                         onChange={(e) =>
//                             handleChange(
//                                 e.target.checked,
//                                 quiz.question,
//                                 quiz.options[2]
//                             )
//                         }
//                     />
//                     {quiz.options[2].option}
//                 </label>

//                 <label
//                     for={`option4_q${index + 1}`}
//                     onClick={(e) => handleColorChange(e)}
//                 >
//                     <input
//                         type="checkbox"
//                         id={`option4_q${index + 1}`}
//                         onChange={(e) =>
//                             handleChange(
//                                 e.target.checked,
//                                 quiz.question,
//                                 quiz.options[3]
//                             )
//                         }
//                     />
//                     {quiz.options[3].option}
//                 </label>
//             </form>
//         </div>
//     );
// }

// export default QuizContent;
