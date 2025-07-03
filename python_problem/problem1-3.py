#1단계
num = 0

#2단계
user_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")

#3단계
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

