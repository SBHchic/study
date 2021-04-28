var total_select_answer = []; // 선택된 값을 넣고 정답과 비교하는 배열

// main에서 퀴즈 섹션으로 넘어가는 메서드
document.querySelector('#btn_quiz_start').addEventListener('click', function(){
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.con_qz_1').style.display = 'block';
});

// 다음 버튼
// explore에서는 돌아가지 않는 문법 (돌아감)
document.querySelectorAll('.btn_next')
.forEach(function(Node1){
    Node1.addEventListener('click', function(){
        // let status = false;
        // document.querySelectorAll('input[type=radio][name=qz' + current_idx + ']').forEach(function(Node2){
        //     status = Node2.checked || status;
        // });
        // if (!status) {
        //     alert('질문에 답해주세요.');
        //     return false;
        // }

        // current_idx가 1~7, 10에서 동작
        if (0 < current_idx && current_idx < 8 || current_idx == 10) {
            // 위의 코드 리팩토링
            let checked = document.querySelectorAll('input[type=radio][name=qz'+current_idx+']:checked');
            if (checked.length === 0){
                alert('질문에 답해주세요.');
                return false;
            }

            // 선택한 값이 정답인지 아닌지 저장하는 배열에 값 넣기
            document.querySelectorAll('input[type=radio][name=qz' + current_idx + ']:checked').forEach(function(Node2){

                // 선택된 값을 선택 배열에 넣기
                total_select_answer[current_idx - 1] = Node2.value;

                // 정답 여부랑 점수는 맨 마지막에 처리하기

                // if (total_select_answer[current_idx - 1] == quiz_str[current_idx-1].answer_que){
                //     test_result[current_idx-1] = true;
                //     // 정답이라면 그 점수만큼 더하기
                //     result_score += quiz_str[current_idx - 1].score;
                // } else {
                //     test_result[current_idx-1] = false;
                // }
            });

        } else if (8 <=current_idx && current_idx < 10){ // current_idx가 8~9일 때 동작

        }

        // 페이지 바뀜
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
    });
});

// explore에서도 돌아가는 문법 (위에도 돌아감)
// let next = document.querySelectorAll('.btn_next') // 11개
// for (let i = 0; i < next.length; i++){
//     next[i].addEventListener('click', function(){
//         // 라디오 체크했는지 확인
//         // let status = false;
//         // let checked = document.querySelectorAll('input[type=radio][name=qz' + current_idx + ']');
//         // for (let j = 0; j < checked.length; j++){
//         //     status = status || checked[j].checked;
//         // }
//         // if (!status) {// 라디오 체크 x 라면
//         //     alert('질문에 답해주세요.');
//         //     return false;
//         // }

//         // 위의 코드 리팩토링
//         let checked = document.querySelectorAll('input[type=radio][name=qz'+current_idx+']:checked');
//         if (checked.length === 0){
//             alert('질문에 답해주세요.');
//             return false;
//         }

//         // 선택한 것을 선택 배열에 넣기
//         total_select_answer[current_idx - 1] = checked[0].value;

//         // 선택한 값이 정답인지 아닌지 저장하는 배열에 값 넣기
//         if (total_select_answer[current_idx - 1] == quiz_str[current_idx -1].answer_que){
//             test_result[current_idx -1] = true;
//             // 정답이라면 그 점수만큼 더하기
//             result_score += quiz_str[current_idx - 1].score;
//         } else{
//             test_result[current_idx -1] = false;
//         }

//         document.querySelector('.con_qz_' + current_idx).style.display='none';
//         document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
//     });
// }

// 이전 버튼
// 라디오에서는 체크가 안풀리는 것을 확인하여 굳이 넣을 필요 없을 것 같음
document.querySelectorAll('.btn_prev').forEach(function(o){
    o.addEventListener('click', function(){

        // 뒤로갈 때 이전 문제가 정답이었다면 그 점수만큼 빼기 - 마지막에 처리

        // if (test_result[current_idx - 2]){
        //     result_score -= quiz_str[current_idx - 2].score;
        // }
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (--current_idx)).style.display='block';
    });
});

// 결과 확인하기 버튼 구현
let answer_check = document.querySelectorAll('.answer_check');
answer_check[answer_check.length -1].addEventListener('click', function(){
    document.querySelector('.con_qz_12').style.display = 'none';
    document.querySelector('.con_login').style.display = 'block';
});



// 메서드 빼오기 refactoring
