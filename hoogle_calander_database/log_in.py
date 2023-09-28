import sys, os, json

path = r"C:\Users\marte\Haruki\Coding\personal\Summer_2023_Projects\Python\hoogle_calander_database\data_base"

num_args = len(sys.argv)
returnObject = {}
if num_args != 4:
    returnObject['status'] = "Client Error"
    print(json.dumps(returnObject))
    exit()
fileContent = os.listdir(path)
if str(sys.argv[1]) not in fileContent:
    returnObject['status'] = "Group DNE"
    print(json.dumps(returnObject))
    exit()
returnObject['user_data'] = {}
returnObject['group_data'] = {}
path = path + "\\" + str(sys.argv[1])
fileContent = os.listdir(path)
if str(sys.argv[2]) + '_json.json' not in fileContent:
    returnObject = {}
    returnObject['status'] = "Username DNE"
    print(json.dumps(returnObject))
    exit()
with open(path + "\\" + str(sys.argv[2]) + '_json.json', 'r') as data:
    returnObject['user_data'] = json.load(data)
with open(path + "\\" + "group" + '_json.json', 'r') as data:
    returnObject['group_data'] = json.load(data)
if returnObject['user_data']['password'] != str(sys.argv[3]):
    returnObject = {}
    returnObject['status'] = "Password DNE"
    print(json.dumps(returnObject))
    exit()
returnObject['status'] = "passed"
print(json.dumps(returnObject))