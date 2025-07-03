//게임 초기화 - 시도 가능 횟수 설정
let attempts = 9;
const attemptsSpan = document.getElementById("attempts");
attemptsSpan.innerText = "9";

//게임 초기화 - 중복되지 않는 3개의 랜덤 숫자 생성
function MakeThreeRandomNumber(max, min) {
    const numbers = [];
    while (numbers.length < 3) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

const answer = MakeThreeRandomNumber(0, 9); //정답인 3개의 숫자 배열

//게임 초기화 - html의 input과 결과창 내용 비움
const number1InputBox = document.getElementById('number1');
const number2InputBox = document.getElementById('number2');
const number3InputBox = document.getElementById('number3');
number1InputBox.value = "";
number2InputBox.value = "";
number3InputBox.value = "";
const resultDisplay = document.querySelector('.result-display');
resultDisplay.innerHTML = "";


//여기부터 check_numbers() 구현

//3개의 input을 체크하고 빈 값이 없으면 true, 빈 값이 있으면 false 리턴
function checkInputBoxes() {
    if(number1InputBox.value === "" || number2InputBox.value === "" || number3InputBox.value === "") {
        return false;
    }
    return true;
}

//position 번째 input이 strike 인지 ball 인지 out 인지 검사
function checkOneAnswer(position, userInput) {
    if(answer[position] === userInput) {return "S";}
    else if(answer.includes(userInput)) {return "B";}
    else {return "O";}
}

//입력 검사 후 배열에 S, B, O 가 순서대로 몇 개 있는지 담아서 반환
function checkAnswer() {
    const result = [0, 0, 0]; // [S, B, O]
    const firstNum = Number(number1InputBox.value);
    const secondNum = Number(number2InputBox.value);
    const thirdNum = Number(number3InputBox.value);
    
    //각 자리의 숫자와 정답을 비교하여 result 업데이트
    if(checkOneAnswer(0, firstNum) === "S") {result[0] += 1;}
    else if(checkOneAnswer(0, firstNum) === "B") {result[1] += 1;}
    else {result[2] += 1;}

    if(checkOneAnswer(1, secondNum) === "S") {result[0] += 1;}
    else if(checkOneAnswer(1, secondNum) === "B") {result[1] += 1;}
    else {result[2] += 1;}

    if(checkOneAnswer(2, thirdNum) === "S") {result[0] += 1;}
    else if(checkOneAnswer(2, thirdNum) === "B") {result[1] += 1;}
    else {result[2] += 1;}

    return result;
}

function check_numbers() {
    //입력 되지 않은 input이 있는 경우, 숫자를 확인하지 않고 input 창을 비움.
    if(!checkInputBoxes()) {
        number1InputBox.value = "";
        number2InputBox.value = "";
        number3InputBox.value = "";
        return;
    }

    //check-result 클래스인 div를 구성하여 result-display에 append 해야함
    const checkResult = document.createElement("div");
    checkResult.className = "check-result";
    checkResult.style.height = "35px";
    
    const resultFirst = document.createElement("span"); //result-display에 유저 인풋이 나타나는 부분
    resultFirst.innerText = `${number1InputBox.value} ${number2InputBox.value} ${number3InputBox.value}`;
    checkResult.appendChild(resultFirst);
    
    const resultSecond = document.createElement("span"); //result-display에 ":" 이 나타나는 부분
    resultSecond.innerText = ":";
    checkResult.appendChild(resultSecond);

    

    const checkedResult = checkAnswer();    //[S, B, O] 배열
    const submitButton = document.querySelector(".submit-button"); //확인 버튼
    //아웃인 경우
    if(checkedResult[2] === 3) {
        const resultThird = document.createElement("div"); //아웃 아이콘이 들어갈 div
        resultThird.innerText = " O ";
        resultThird.className = "out";
        //여기부터--------------------------------------------
        resultThird.style.borderRadius = "50%";
        resultThird.style.width = "20px";
        resultThird.style.height = "30px";
        resultThird.style.display = "flex";
        resultThird.style.alignItems = "center";
        resultThird.style.justifyContent = "center";
        //여기까지는 스타일링----------------------------------
        checkResult.appendChild(resultThird);
        //checkResult를 모두 구성했으므로 resultDisplay에 append하여 결과를 전시한다
        resultDisplay.appendChild(checkResult);
        attempts -= 1; //시도 횟수 1회 차감
        attemptsSpan.innerText = `${attempts}`; //html 업데이트
        //아웃인데 시도횟수가 끝남 => 패배
        if(attempts === 0) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./fail.png";
            submitButton.disabled = true; //패배시 버튼 비활성화
        }
        return;
    }

    //아웃이 아닌 경우
    else {
        const resultThirdContainer = document.createElement("div"); //nS nB 가 들어갈 div
        //여기부터-----------------------------------------------------
        resultThirdContainer.style.width = "64px";
        resultThirdContainer.style.height = "35px";
        resultThirdContainer.style.display = "flex";
        resultThirdContainer.style.alignItems = "center";
        //여기까지 스타일링 --------------------------------------------
        const resultThirdStrike = document.createElement("span"); //Strike 개수
        resultThirdStrike.innerText = String(checkedResult[0]);
        resultThirdContainer.appendChild(resultThirdStrike);

        const resultThirdStrikeIcon = document.createElement("span"); //S 아이콘
        //여기부터-------------------------------------------------------
        resultThirdStrikeIcon.style.display = "flex";
        resultThirdStrikeIcon.style.justifyContent = "center";
        resultThirdStrikeIcon.style.alignItems = "center";
        resultThirdStrikeIcon.style.width = "20px";
        resultThirdStrikeIcon.style.height = "30px";
        resultThirdStrikeIcon.style.borderRadius = "50%";
        //여기까지 스타일링-----------------------------------------------
        resultThirdStrikeIcon.className = "strike";
        resultThirdStrikeIcon.innerText = " S ";
        resultThirdContainer.appendChild(resultThirdStrikeIcon);

        const resultThirdBall = document.createElement("span"); //Ball 개수
        resultThirdBall.innerText = String(checkedResult[1]);
        resultThirdContainer.appendChild(resultThirdBall);

        const resultThirdBallIcon = document.createElement("span"); //Ball 아이콘
        resultThirdBallIcon.className = "ball";
        resultThirdBallIcon.innerText = " B ";
        //여기부터-----------------------------------------------------
        resultThirdBallIcon.style.borderRadius = "50%";
        resultThirdBallIcon.style.display = "flex";
        resultThirdBallIcon.style.justifyContent = "center";
        resultThirdBallIcon.style.alignItems = "center";
        resultThirdBallIcon.style.width = "20px";
        resultThirdBallIcon.style.height = "30px";
        //여기까지 스타일링 --------------------------------------------
        resultThirdContainer.appendChild(resultThirdBallIcon);

        checkResult.appendChild(resultThirdContainer);
        resultDisplay.appendChild(checkResult);
        attempts -= 1; //시도 횟수 1회 차감
        attemptsSpan.innerText = `${attempts}` //html 업데이트

        //성공한 경우
        if(checkedResult[0] === 3) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./success.png"; //성공 이미지 출력
            submitButton.disabled = true; //확인하기 버튼 비활성화
        }
        
        //성공하지 않았는데 시도 횟수가 모두 떨어진 경우 => 패배
        if(attempts === 0) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./fail.png"; //패배 이미지 출력
            submitButton.disabled = true; //확인하기 버튼 비활성화
        }
    }
}