

// main에서 퀴즈 섹션으로 넘어가는 메서드
document.querySelector('#btn_quiz_start').addEventListener('click', function(){
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.con_qz_1').style.display = 'block';
});

// 다음 버튼
// explore에서는 돌아가지 않는 문법
// document.querySelectorAll('.btn_next')
// .forEach(function(Node1){
//     Node1.addEventListener('click', function(){
//         let status = false;
//         document.querySelectorAll('input[type=radio][name=qz' + current_idx + ']').forEach(function(Node2){
//             status = Node2.checked || status;
//         });
//         if (!status) {
//             alert('질문에 답해주세요.');
//             return false;
//         }
//         document.querySelector('.con_qz_' + current_idx).style.display='none';
//         document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
//     });
// })

// explore에서도 돌아가는 문법
let next = document.querySelectorAll('.btn_next') // 11개
for (let i = 0; i < next.length; i++){
    next[i].addEventListener('click', function(){
        // 라디오 체크했는지 확인
        let status = false;
        let checked = document.querySelectorAll('input[type=radio][name=qz' + current_idx + ']');
        for (let j = 0; j < checked.length; j++){
            status = status || checked[j].checked;
        }
        if (!status) {// 라디오 체크 x 라면
            alert('질문에 답해주세요.');
            return false;
        }
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
    });
}

// 이전 버튼
// 라디오에서는 체크가 안풀리는 것을 확인하여 굳이 넣을 필요 없을 것 같음
document.querySelectorAll('.btn_prev').forEach(function(o){
    o.addEventListener('click', function(){
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (--current_idx)).style.display='block';
    });
});
