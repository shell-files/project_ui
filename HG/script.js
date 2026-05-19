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
    // 1. 공정별 배출량 차트
    new Chart(document.getElementById('carbonChart'), {
        type: 'bar',
        data: {
            labels: ['용해/성형', '인장/절단', '시효경화', '피어싱/CNC', '정밀절단', '아노다이징', '윤활코팅', '세척'],
            datasets: [{
                label: '탄소 배출량 (tCO2eq/yr)',
                data: [128.55, 29.75, 68.91, 0.92, 13.4, 27.56, 9.2, 2.3],
                backgroundColor: '#1f77b4',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 2. 지사별 분담률 도넛 차트
    new Chart(document.getElementById('locationChart'), {
        type: 'doughnut',
        data: {
            labels: ['포항지사 (압출)', '울산지사 (후가공)'],
            datasets: [{
                data: [158.3, 122.29],
                backgroundColor: ['#1f77b4', '#aec7e8']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 3. 고형 폐기물 원형 차트
    new Chart(document.getElementById('solidWasteChart'), {
        type: 'pie',
        data: {
            labels: ['알루미늄 스케일', '인발 스크랩', 'CNC 칩', '정밀절단 스크랩', '기타 부산물'],
            datasets: [{
                data: [500, 10360, 100, 31018, 130],
                backgroundColor: ['#cbd5e0', '#a0aec0', '#718096', '#4a5568', '#2d3748']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 4. 액체 폐기물 차트
    new Chart(document.getElementById('liquidWasteChart'), {
        type: 'bar',
        data: {
            labels: ['포항 폐유압유 (L)', '울산 폐절삭유 (L)', '아노다이징 폐수 (L)'],
            datasets: [{
                label: '연간 액체 배출량',
                data: [8, 10, 100],
                backgroundColor: '#e53e3e',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 5. 누적 PCF 차트
    new Chart(document.getElementById('pcfWaterfall'), {
        type: 'line',
        data: {
            labels: ['원재료 입고', '1. 압출 공정 완료', '2. 열처리 완료', '3. 정밀 가공 완료', '4. 표면처리 완료'],
            datasets: [{
                label: '누적 탄소 영향 가중치',
                data: [0, 158.3, 227.21, 241.53, 280.59],
                borderColor: '#00b050',
                backgroundColor: 'rgba(0, 176, 80, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 6. CBAM 배출 강도 차트 (수평바)
    new Chart(document.getElementById('cbamRouteChart'), {
        type: 'bar',
        data: {
            labels: ['포항 압출', '울산 열처리', '울산 표면처리'],
            datasets: [{
                label: '고유 내재 배출 원단위',
                data: [0.158, 0.069, 0.054],
                backgroundColor: '#2f855a',
                borderRadius: 4
            }]
        },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
    });

    // 7. 실시간 이상치 탐지 시계열 차트
    new Chart(document.getElementById('realtimeAnomalyChart'), {
        type: 'line',
        data: {
            labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
            datasets: [
                {
                    label: '정상 가동 범위(신뢰 상하한)',
                    data: [120, 122, 121, 125, 123, 124, 122, 125, 126, 123],
                    borderColor: '#cbd5e0',
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: '실시간 전력 배출량(kW)',
                    data: [122, 125, 120, 185, 130, 122, 124, 121, 125, 123],
                    borderColor: '#4299e1',
                    pointBackgroundColor: function (context) {
                        return context.dataset.data[context.dataIndex] > 150 ? '#e53e3e' : '#4299e1';
                    },
                    pointRadius: function (context) {
                        return context.dataset.data[context.dataIndex] > 150 ? 8 : 4;
                    },
                    tension: 0.2
                }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 8. 이상치 누적 빈도 바 차트
    new Chart(document.getElementById('anomalyFrequencyChart'), {
        type: 'bar',
        data: {
            labels: ['포항 용해로', '포항 인발기', '울산 시효로', '울산 CNC', '울산 아노다이징', '울산 코팅기'],
            datasets: [{
                label: '이상 임계치 초과 횟수',
                data: [14, 2, 5, 1, 19, 3],
                backgroundColor: '#dd6b20',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
});

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