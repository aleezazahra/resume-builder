print("enter 1 for + ,enter 2 for -, enter 3 for multiplication and 4 for division")
op=int(input("enter your operator: "))

def calculator(a,b):
    if op==1:
        print(f'sum of {a} and {b} is',a+b)

    elif op==2:
        print(f'difference of {a} and {b} is',a-b)
    elif op==3:
        print(f'product of {a} and {b}',a*b)
    elif op==4:
        print(f'divison of {a} and {b}',a/b)

    else:
        print("enter a correct operator")

calculator(2,3)
    
#check for a palindrome string
text=input("enter a string")
if text==text[::-1]:
    print("palindrome")
else:
    print("not palindrome")




#factorial of a number
a=int(input("enter a number"))

fact=1
if a<0:
    print("factorial for negative doesnt exist")
elif a==0:
    print("factorial of 0 is 1")
else:
    for i in range(1,a+1):
        fact=fact*i
    print(f"factorial of {a} is",fact)


# multiplication of number taken by user
num=int(input("enter a nmber"))
for i in range(1,11):
    print(f'{num} x {i}=',num*i)




#reversse of a string
str=str(input("enter a string: "))
print(str[::-1])

