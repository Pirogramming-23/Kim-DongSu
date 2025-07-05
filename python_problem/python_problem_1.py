#9단계
import random

#여기부터 brGame -------------------------------------------------------------------------------------------
#player가 opposite_player를 상대로 숫자를 부른다.
def brGame(player, opposite_player):
    global num
    #computer가 부르는 경우
    if(player == "computer"):
        user_call = random.randint(1, 3)
    #player가 부르는 경우
    else:
        user_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")

        while True:
            try:
                user_call = int(user_input)
            except:
                print("정수를 입력하세요")
                user_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
                continue
            if user_call != 1 and user_call != 2 and user_call != 3:
                print("1,2,3 중 하나를 입력하세요")
                user_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
                continue
            break

    for i in range(user_call):
        num += 1
        print(f'{player} : {num}')
        #31을 불렀을 경우 게임 끝
        if num == 31:
            print(f'{opposite_player} win!')
            return
#여기까지 brGame -------------------------------------------------------------------------------------------

num = 0 #num은 글로벌 변수로 선언
while num != 31 :
    #여기부터 playerA가 숫자를 부르는 코드
    brGame("computer", "player")
    #여기까지 playerA가 숫자를 부르는 코드

    if num == 31: break #playerA가 숫자를 부르고 게임이 끝났다면 B에게 차례를 넘기지 않고 종료

    #여기부터 playerB가 숫자를 부르는 코드
    brGame("player", "computer")
    #여기까지 playerB가 숫자를 부르는 코드