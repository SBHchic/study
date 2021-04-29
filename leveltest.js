var total_select_answer = []; // 선택된 값을 넣고 정답과 비교하는 배열
// let set = new Set(); // 8~9번에서 사용함
let select_tmpkey8 = []; // 뒤로가기를 대비
let select_tmpvalue8 = []; // 뒤로가기를 대비
let select_tmpkey9 = []; // 뒤로가기를 대비
let select_tmpvalue9 = []; // 뒤로가기를 대비
let map = new Map(); // map에서 set으로 변경

// main에서 퀴즈 섹션으로 넘어가는 메서드
document.querySelector('#btn_quiz_start').addEventListener('click', function(){
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.con_qz_1').style.display = 'block';
});

// let select_answercheck = document.querySelectorAll('.con_qz_' + current_idx + ' .answer_check');
//             for (let i = 0; i < select_answercheck.length; i++){
//                 // 선택지를 클릭했을 때
//                 select_answercheck[i].addEventListener('click', function() {

//                     // 부모 클래스가 on 이라면 (이미 선택되어 있다면)
//                     if (this.parentNode.className == 'on'){
//                         this.parentNode.className = '';
//                         set.delete(this.text);
//                     } else { // 부모클래스가 on이 아니라면(선택이 안되어 있다면)
//                         this.parentNode.className += 'on';
//                         set.add(this.text);
//                     }
//                 })
//             }

// 1번문제에서만 되는 이유? - current_idx를 쓰는 순간 컴파일이 되서 저장이 된 상태이기 때문 -> current_idx 삭제
document.querySelectorAll('.answer_check').forEach(function(Node1){
    Node1.addEventListener('click', function(){
        // 부모 클래스가 on 이라면 (이미 선택되어 있다면)
        if (Node1.parentNode.className == 'on'){
            Node1.parentNode.className = '';
            // set.delete(Node1.text);
            map.delete(Node1.dataset.no);
        } else { // 부모클래스가 on이 아니라면(선택이 안되어 있다면)
            Node1.parentNode.className += 'on';
            map.set(Node1.dataset.no, Node1.text);
        }

        // set에 들어있는 것들을 라인에 출력
        document.querySelectorAll('.show_seq').forEach(function(Node2){
            Node2.innerText = [...map.values()].toString().replaceAll(',', ' ');
        })

        // set안에 요소가 있는지의 여부에 따라 placeholder 느낌의 텍스트 변환
        document.querySelectorAll('.txt').forEach(function(Node2){
            !!map.size ? Node2.style.display = 'none' : Node2.style.display = 'block';
        })
    })
})

// 다음 버튼
// explore에서는 돌아가지 않는 문법 (querySelectorAll - explore에서는 NodeList로 인식해서 forEach메서드가 존재하지 않음)
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

            // 5개 선택지 이므로 5개 전부 체크가 되지 않았다면 넘어가지 못함
            if (map.size !== 5){
                alert('질문에 답해주세요.');
                return false;
            }

            // set을 배열으로 destructuring 하여 배열에 넣음
            if (current_idx === 8){
                select_tmpkey8 = [...map.keys()];
                select_tmpvalue8 = [...map.values()];
            } else if (current_idx === 9){
                select_tmpkey9 = [...map.keys()];
                select_tmpvalue9 = [...map.values()];
            }
            select_answer = [...map.keys()];
            total_select_answer[current_idx - 1] = select_answer;
            
        }

        // 페이지 바뀜
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
        map.clear();

        // 임시 저장했던걸 들고옴
        if (current_idx === 8 && !!select_tmpkey8){
            for (let i = 0; i < select_tmpkey8.length; i++){
                map.set(select_tmpkey8[i], select_tmpvalue8[i]);
            }
        } else if (current_idx === 9 && !!select_tmpkey9){
            for (let i = 0; i < select_tmpkey9.length; i++){
                map.set(select_tmpkey9[i], select_tmpvalue9);
            }
        }

        // set에 들어있는 것들을 라인에 출력
        document.querySelectorAll('.show_seq').forEach(function(Node2){
            Node2.innerText = [...map.values()].toString().replaceAll(',', ' ');
        })

        // set안에 요소가 있는지의 여부에 따라 placeholder 느낌의 텍스트 변환
        document.querySelectorAll('.txt').forEach(function(Node2){
            !!map.size ? Node2.style.display = 'none' : Node2.style.display = 'block';
        })
        

        // current_idx가 8~9에서 선택지를 클릭 했을 때 버튼 클래스를 바꿔주면서 선택 배열에 넣고, 그 글자가 화면에 나와야 함

        // if (8 <= current_idx && current_idx < 10){
        //     let select_answercheck = document.querySelectorAll('.con_qz_' + current_idx + ' .answer_check');
        //     for (let i = 0; i < select_answercheck.length; i++){
        //         // 선택지를 클릭했을 때
        //         select_answercheck[i].addEventListener('click', function() {

        //             // 부모 클래스가 on 이라면 (이미 선택되어 있다면)
        //             if (this.parentNode.className == 'on'){
        //                 this.parentNode.className = '';
        //                 set.delete(this.text);
        //             } else { // 부모클래스가 on이 아니라면(선택이 안되어 있다면)
        //                 this.parentNode.className += 'on';
        //                 set.add(this.text);
        //             }
        //         })
        //     }
        // }
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

        // 8, 9번의 경우 임시저장
        if (current_idx === 9){
            select_tmpkey9 = [...map.keys()];
            select_tmpvalue9 = [...map.values()];
        } else if (current_idx === 8){
            select_tmpkey8 = [...map.keys()];
            select_tmpvalue8 = [...map.values()];
        }

        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (--current_idx)).style.display='block';

        set.clear();

        // 임시 저장했던걸 들고옴
        if (current_idx === 8 && !!select_tmpkey8){
            for (let i = 0; i < select_tmpkey8.length; i++){
                map.set(select_tmpkey8[i], select_tmpvalue8[i]);
            }
        } else if (current_idx === 9 && !!select_tmpkey9){
            for (let i = 0; i < select_tmpkey9.length; i++){
                map.set(select_tmpkey9[i], select_tmpvalue9[i]);
            }
        }

        // set에 들어있는 것들을 라인에 출력
        document.querySelectorAll('.show_seq').forEach(function(Node2){
            Node2.innerText = [...map.values()].toString().replaceAll(',', ' ');
        })

        // set안에 요소가 있는지의 여부에 따라 placeholder 느낌의 텍스트 변환
        document.querySelectorAll('.txt').forEach(function(Node2){
            !!map.size ? Node2.style.display = 'none' : Node2.style.display = 'block';
        })

        //     let select_answercheck = document.querySelectorAll('.con_qz_' + current_idx + ' .answer_check');
        //     for (let i = 0; i < select_answercheck.length; i++){
        //         // 선택지를 클릭했을 때
        //         select_answercheck[i].addEventListener('click', function() {

        //             // 부모 클래스가 on 이라면 (이미 선택되어 있다면)
        //             if (this.parentNode.className == 'on'){
        //                 this.parentNode.className = '';
        //                 set.delete(this.text);
        //             } else { // 부모클래스가 on이 아니라면(선택이 안되어 있다면)
        //                 this.parentNode.className += 'on';
        //                 set.add(this.text);
        //             }
        //         })
        //     }
        // }
    });
});

// 결과 확인하기 버튼 구현
let answer_check = document.querySelectorAll('.answer_check');
answer_check[answer_check.length -1].addEventListener('click', function(){
    document.querySelector('.con_qz_12').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    for (let i = 0; i < total_select_answer.length; i++){
        test_result[i] = quiz_str[i].answer_que == total_select_answer[i].toString();
        result_score += (test_result[i] ? quiz_str[i].score : 0);
    }

    document.querySelector('.re_score span').innerText = result_score*2;
    document.querySelector('.re_level img').src = "https://gscdn.hackers.co.kr/champ/img/chobo/event/2016/16120101/v2/renew/v11/level_"+ getLevel(result_score*2) +".jpg";

    let recommend = document.querySelector('#reccommend_lec'+getLevel(result_score*2)).children;
    for (let i = 0; i < recommend.length; i++){
        recommend[i].style.display = 'block';
    }

    // 번호에 정답 유무 체크
    let check = document.querySelectorAll('.ans_result .inner .mb80 tbody tr');
    for (let i = 0; i < check.length; i++){
        test_result[i] ? check[i].firstElementChild.className = 'check_o' : check[i].firstElementChild.className = 'check_x';
    }
});



// 메서드 빼오기 refactoring
function getLevel(score){
    switch(score / 20){
        case 5:
            return 5;
        default:
            return parseInt(score / 20 + 1);
    }
}