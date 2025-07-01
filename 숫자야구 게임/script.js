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

const answer = MakeThreeRandomNumber(0, 9);

//게임 초기화 - html의 input과 결과창 내용 비움
const number1InputBox = document.getElementById('number1');
const number2InputBox = document.getElementById('number2');
const number3InputBox = document.getElementById('number3');
number1InputBox.value = "";
number2InputBox.value = "";
number3InputBox.value = "";

const resultDisplay = document.querySelector('.result-display');
resultDisplay.innerHTML = "";

//check_numbers() 구현

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
    let strike = 0;
    let ball = 0;
    let out = 0;
    const result = [0, 0, 0];

    const firstNum = Number(number1InputBox.value);
    const secondNum = Number(number2InputBox.value);
    const thirdNum = Number(number3InputBox.value);
    
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

    
    const checkResult = document.createElement("div");
    checkResult.className = "check-result";
    checkResult.style.height = "35px";
    
    const resultFirst = document.createElement("span");
    resultFirst.innerText = `${number1InputBox.value} ${number2InputBox.value} ${number3InputBox.value}`;
    checkResult.appendChild(resultFirst);
    
    const resultSecond = document.createElement("span");
    resultSecond.innerText = ":";
    checkResult.appendChild(resultSecond);

    

    const checkedResult = checkAnswer();
    //아웃인 경우
    if(checkedResult[2] === 3) {
        const resultThird = document.createElement("div");
        resultThird.innerText = " O ";
        resultThird.className = "out";
        resultThird.style.borderRadius = "50%";
        resultThird.style.width = "20px";
        resultThird.style.height = "30px";
        resultThird.style.display = "flex";
        resultThird.style.alignItems = "center";
        resultThird.style.justifyContent = "center";
        checkResult.appendChild(resultThird);
        resultDisplay.appendChild(checkResult);
        attempts -= 1;
        attemptsSpan.innerText = `${attempts}`;
        if(attempts === 0) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./fail.png";
        }
        return;
    }
    //아웃이 아닌 경우
    else {
        const resultThirdContainer = document.createElement("div");
        resultThirdContainer.style.width = "64px";
        resultThirdContainer.style.height = "35px";
        resultThirdContainer.style.display = "flex";
        resultThirdContainer.style.alignItems = "center";
        const resultThirdStrike = document.createElement("span");
        resultThirdStrike.innerText = String(checkedResult[0]);
        resultThirdContainer.appendChild(resultThirdStrike);

        const resultThirdStrikeIcon = document.createElement("span");
        resultThirdStrikeIcon.style.display = "flex";
        resultThirdStrikeIcon.style.justifyContent = "center";
        resultThirdStrikeIcon.style.alignItems = "center";
        resultThirdStrikeIcon.style.width = "20px";
        resultThirdStrikeIcon.style.height = "30px";
        resultThirdStrikeIcon.className = "strike";
        resultThirdStrikeIcon.innerText = " S ";
        resultThirdStrikeIcon.style.borderRadius = "50%";
        resultThirdContainer.appendChild(resultThirdStrikeIcon);

        const resultThirdBall = document.createElement("span");
        resultThirdBall.innerText = String(checkedResult[1]);
        resultThirdContainer.appendChild(resultThirdBall);

        const resultThirdBallIcon = document.createElement("span");
        resultThirdBallIcon.className = "ball";
        resultThirdBallIcon.innerText = " B ";
        resultThirdBallIcon.style.borderRadius = "50%";
        resultThirdBallIcon.style.display = "flex";
        resultThirdBallIcon.style.justifyContent = "center";
        resultThirdBallIcon.style.alignItems = "center";
        resultThirdBallIcon.style.width = "20px";
        resultThirdBallIcon.style.height = "30px";
        resultThirdContainer.appendChild(resultThirdBallIcon);

        checkResult.appendChild(resultThirdContainer);
        resultDisplay.appendChild(checkResult);
        attempts -= 1;
        attemptsSpan.innerText = `${attempts}`

        //성공한 경우
        if(checkedResult[0] === 3) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./success.png";
            const submitButton = document.querySelector(".submit-button");
            submitButton.disabled = true;
        }
        
        //성공하지 않았는데 시도 횟수가 모두 떨어진 경우
        if(attempts === 0) {
            const resultImg = document.getElementById("game-result-img");
            resultImg.src = "./fail.png";
        }
    }
}