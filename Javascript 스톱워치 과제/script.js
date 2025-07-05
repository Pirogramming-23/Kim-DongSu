let startTime = 0; //시작 시간
let elapsedTime = 0; // 경과/남은 시간
let timerInterval = null; //setInterval 실행 시 반환받는 값
let totalTimerTime = 0; // 타이머 시작 시 입력받는 전체 시간(ms 단위)
let mode = 'stopwatch'; // 기본 모드

const timeDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-button');
const stopBtn = document.getElementById('stop-button');
const resetBtn = document.getElementById('reset-button');
const allSelectBtn = document.getElementById('all-select-btn');
const trashBtn = document.getElementById('trash');
const toggleBtn = document.getElementById('toggle-mode-btn');

//스톱워치, 타이머 모드를 바꾸는 버튼 구현
toggleBtn.addEventListener('click', () => {
  // 기존 interval 제거
  // reset을 하지 않은 채 모드를 바꾸는 경우, timerInterval을 null로 초기화해줘야 이전 모드에서 실행되던 기능이 중지된다.
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    //스톱워치 상태에서 모드 전환을 누른 경우
    if (mode === 'stopwatch') {
        mode = 'timer'; //타이머로 모드 변경
        toggleBtn.textContent = 'stopwatch'; //버튼 표기를 stopwatch로 변경
        elapsedTime = 0; //경과한 시간 0으로 초기화
        timeDisplay.textContent = "00:00"; //표기되는 시간 00:00 으로 초기화
    }
    //타이머 상태에서 모드 전환을 누른 경우
    else {
        mode = 'stopwatch'; //스톱워치로 모드 변경
        toggleBtn.textContent = 'timer'; //버튼 표기를 timer로 변경
        elapsedTime = 0; //경과한 시간 0으로 초기화
        timeDisplay.textContent = "00:00"; //표기되는 시간 00:00으로 초기화
    }
});

//time을 ms단위로 입력받으면 SS:(ms)(ms) format에 맞춰 문자열을 반환하는 함수
function timeToString(time) {
    const totalSeconds = Math.floor(time / 1000); //ms단위를 s단위로 바꿈
    const ms = Math.floor((time % 1000) / 10); // s로 바꾸고 남은 ms 단위의 시간

    const formattedSS = totalSeconds.toString().padStart(2, '0');
    const formattedMS = ms.toString().padStart(2, '0');

    return `${formattedSS}:${formattedMS}`;
}

//start 버튼 구현
function start() {
    //timerInterval이 null이 아니라는 것은 이미 어떤 기능이 실행중이라는 뜻이다.
    //따라서 start 버튼은 할 기능이 없으므로 바로 return 한다.
    if (timerInterval !== null) return;

    //스톱워치 모드인 경우
    if (mode === 'stopwatch') {
        startTime = Date.now() - elapsedTime; //현재 시간에서 경과한 시간을 빼면 버튼을 누른 시각이 나온다.
        //10ms에 한번씩 시간 표기를 업데이트한다.
        timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime; //현재 시간에서 start를 누른 시간을 빼면 경과한 시간이 나온다.
        timeDisplay.textContent = timeToString(elapsedTime); //현재 스톱워치 모드이므로 경과한 시간 자체를 display 한다.
        }, 10);
    } 
    
    //타이머 모드인 경우
    else if (mode === 'timer') {
        // 처음 실행일 때만 입력 받기
        if (elapsedTime === 0) {
            const input = prompt('타이머 시간을 초 단위로 입력하세요:');
            const seconds = parseInt(input); //입력받은 시간

            //입력이 올바른지 검사
            if (isNaN(seconds) || seconds <= 0) {
                alert('올바른 시간을 입력해주세요.');
                return;
            }

            totalTimerTime = seconds * 1000; //ms 단위로 흘러야하는 시간을 계산
            elapsedTime = totalTimerTime; //여기서 elapsedTime은 남은 시간
        }

        const endTime = Date.now() + elapsedTime; //타이머가 끝나야 하는 시각

        timerInterval = setInterval(() => {
            const remaining = endTime - Date.now(); //남은 시간

            //만약 남은 시간이 0ms 이하로 떨어졌다면 타이머가 끝나야 한다.
            if (remaining <= 0) {
                clearInterval(timerInterval); //timerInterval clear하기
                timerInterval = null;
                elapsedTime = 0; //남은시간 0으로 초기화
                timeDisplay.textContent = "00:00"; //display 되는 시간도 초기화
                alert("⏰ 타이머 종료!"); //유저에게 타이머 종료 알리기
            } 
            //아직 시간이 남은 경우
            else {
                elapsedTime = remaining; //남은 시간 저장
                timeDisplay.textContent = timeToString(remaining);
            }
        }, 10);
    }
}

//stop 버튼 구현
function stop() {
    //timerInterval이 null 이라면 기능이 돌아가고 있지 않다는 뜻이다.
    //즉 stop 버튼은 할 일이 없다.
    if(timerInterval === null) {return;}
    clearInterval(timerInterval);
    timerInterval = null;

    const intervalContainer = document.querySelector(".interval-container");

    const Interval = document.createElement("div");
    Interval.className = "interval";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "select-interval";
    const timeText = document.createElement("span");
    const lapTime = timeToString(elapsedTime);
    timeText.innerText = lapTime;
    const emptySpan = document.createElement("span");
    emptySpan.style.width = "30px";
    emptySpan.style.height = "30px";

    Interval.appendChild(checkBox);
    Interval.appendChild(timeText);
    Interval.appendChild(emptySpan);

    intervalContainer.appendChild(Interval);
}

//reset 버튼 구현
function reset() {
    //timerInterval 초기화
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    elapsedTime = 0; //경과 시간(또는 남은 시간) 초기화
    totalTimerTime = 0; //타이머 전체 시간 초기화
    timeDisplay.textContent = "00:00"; //display 되는 시간 초기화
}

//전체 선택 버튼 구현
let onoff = false; //버튼이 checked 인지 !checked 인지 저장하는 변수
function allSelection() {
    onoff = !onoff; //onoff 업데이트
    
    const checkBoxes = document.querySelectorAll(".select-interval"); //현재 기록된 구간들 전부 가져오기
    //모든 체크박스 체크 활성화 or 비활성화
    checkBoxes.forEach((box) => {
        if(onoff) {box.checked = true;}
        else {box.checked = false;}
    })
}

//trash 버튼 구현 (선택된 구간만 삭제)
function selectionDelete() {
    
    const intervals = document.querySelectorAll(".interval"); //기록된 모든 구간 가져옴
    //box가 checked일 경우 remove
    intervals.forEach((container) => {
        const box = container.querySelector(".select-interval");
        if(box.checked) {container.remove();}
    })
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
allSelectBtn.addEventListener('change', allSelection);
trashBtn.addEventListener('click', selectionDelete);