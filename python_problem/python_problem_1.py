#1단계
num = 0

#2단계
userA_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")

#3단계
while True:
    try:
        userA_call = int(userA_input)
    except:
        print("정수를 입력하세요")
        userA_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
        continue
    if userA_call != 1 and userA_call != 2 and userA_call != 3:
        print("1,2,3 중 하나를 입력하세요")
        userA_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
        continue
    break

#4단계
for i in range(userA_call):
    num += 1
    print(f'playerA : {num}')

#5단계
userB_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")

while True:
    try:
        userB_call = int(userB_input)
    except:
        print("정수를 입력하세요")
        userB_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
        continue
    if userB_call != 1 and userB_call != 2 and userB_call != 3:
        print("1,2,3 중 하나를 입력하세요")
        userB_input = input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) :")
        continue
    break

for i in range(userB_call):
    num += 1
    print(f'playerB : {num}')
