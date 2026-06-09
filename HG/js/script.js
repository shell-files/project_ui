// 상단 가로 탭 전환 함수
function openPage(pageId, elmnt) {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) { pages[i].classList.remove("active"); }

    const navButtons = document.getElementsByClassName("nav-btn");
    for (let i = 0; i < navButtons.length; i++) { navButtons[i].classList.remove("active"); }

    document.getElementById(pageId).classList.add("active");
    elmnt.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    // 1. 공정별 배출량 차트 (기존 코드 보강 및 유지)
    const ctxBar = document.getElementById('carbonChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['용해/성형', '인장/절단', '시효경화', '피어싱/CNC', '정밀절단', '아노다이징', '윤활코팅', '세척'],
                datasets: [{
                    label: '탄소 배출량 (tCO2eq/yr)',
                    data: [128.55, 29.75, 68.91, 0.92, 13.4, 27.56, 9.2, 2.3],
                    backgroundColor: '#03a94d', // 시스템 테마 그린 컬러로 변경
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 2. 스코프별 배출 비율 차트 (새로 추가되는 도넛형 차트)
    const ctxPie = document.getElementById('scopePieChart');
    if (ctxPie) {
        new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: ['Scope 1 (직접배출)', 'Scope 2 (간접배출)'],
                datasets: [{
                    data: [68.91, 185.86],
                    backgroundColor: ['#dd6b20', '#03a94d'], // 오렌지 및 그린 톤 매핑
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, font: { size: 11 } }
                    }
                },
                cutout: '65%' // 도넛 두께 조절
            }
        });
    }
});;

document.addEventListener("DOMContentLoaded", function () {
    // 사이드바의 분기별, 월별 그룹 가져오기
    const quarterGroup = document.getElementById('group-quarter');
    const monthGroup = document.getElementById('group-month');

    const quarterLabel = quarterGroup.querySelector('.select_label');
    const monthLabel = monthGroup.querySelector('.select_label');

    const quarterContent = quarterGroup.querySelector('.toggle-content');
    const monthContent = monthGroup.querySelector('.toggle-content');

    // 1. 분기별 라벨 클릭 이벤트
    quarterLabel.addEventListener('click', function () {
        // 월별 영역은 무조건 닫기
        monthContent.style.display = 'none';
        monthLabel.querySelector('span').style.borderBottom = 'none';

        // 분기별 영역 토글 (열려있으면 닫고, 닫혀있으면 열기)
        if (quarterContent.style.display === 'block') {
            quarterContent.style.display = 'none';
            quarterLabel.querySelector('span').style.borderBottom = 'none';
        } else {
            quarterContent.style.display = 'block';
            quarterLabel.querySelector('span').style.borderBottom = '3px solid white'; // 시각적 활성화 효과
        }
    });

    // 2. 월별 라벨 클릭 이벤트
    monthLabel.addEventListener('click', function () {
        // 분기별 영역은 무조건 닫기
        quarterContent.style.display = 'none';
        quarterLabel.querySelector('span').style.borderBottom = 'none';

        // 월별 영역 토글
        if (monthContent.style.display === 'block') {
            monthContent.style.display = 'none';
            monthLabel.querySelector('span').style.borderBottom = 'none';
        } else {
            monthContent.style.display = 'block';
            monthLabel.querySelector('span').style.borderBottom = '3px solid white'; // 시각적 활성화 효과
        }
    });
});

// ASN 등록 팝업창 열기
function openAsnModal(){

    currentAsnNo = null;

    document.querySelector('#asn-register-modal .modal-header h3').innerText =
        '사전입고 통지(ASN) 등록';

    document.getElementById('btnAsnSave').style.display =
        'inline-block';

    document.getElementById('btnAsnEdit').style.display =
        'none';

    document
        .getElementById('asn-register-modal')
        .classList.add('active');
}

// ASN 등록 팝업창 닫기
function closeAsnModal() {
    const modal = document.getElementById('asn-register-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}


// 페이지 번호 변경 제어 핸들러 예시
document.addEventListener("DOMContentLoaded", function () {
    const pageButtons = document.querySelectorAll('.btn-page-num');

    pageButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 기존 active 클래스 제거 후 클릭 대상에 부여
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // TODO: 실제 프로젝트 연동 시 이 타이밍에 해당 페이지 인덱스로 테이블 rows 목록 갱신 처리
            console.log(`${this.textContent} 페이지로 데이터를 새로 조회합니다.`);
        });
    });
});



