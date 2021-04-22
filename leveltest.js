

// main에서 퀴즈 섹션으로 넘어가는 메서드
document.querySelector('#btn_quiz_start').addEventListener('click', function(){
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.con_qz_1').style.display = 'block';
});

// 다음 버튼
// explore에서는 돌아가지 않는 문법
// document.querySelectorAll('.btn_next')
// .forEach(function(o){
//     o.addEventListener('click', function(){
//         document.querySelector('.con_qz_' + current_idx).style.display='none';
//         document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
//     });
// })

// explore에서도 돌아가는 문법
let next = document.querySelectorAll('.btn_next') // 11개
for (let i = 0; i < next.length; i++){
    next[i].addEventListener('click', function(){
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (++current_idx)).style.display='block';
    });
}

// 이전 버튼
document.querySelectorAll('.btn_prev').forEach(function(o){
    o.addEventListener('click', function(){
        document.querySelector('.con_qz_' + current_idx).style.display='none';
        document.querySelector('.con_qz_' + (--current_idx)).style.display='block';
    });
});
