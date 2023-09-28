import sys, os, shutil, json

path = r"C:\Users\marte\Haruki\Coding\personal\Summer_2023_Projects\Python\hoogle_calander_database\data_base"

num_args = len(sys.argv)
data = {}
if num_args != 8:
    data["status"] = "invalid arg c"
    print(json.dumps(data))
    exit()

fileContent = os.listdir(path)
if sys.argv[7] == "0":
    if str(sys.argv[1]) in fileContent:
        data["status"] = "Group Taken"
        print(json.dumps(data))
        exit()
    os.mkdir(path + "\\" + str(sys.argv[1]))
    path = path + "\\" + str(sys.argv[1])
    data = {}
    data['group'] = str(sys.argv[1])
    data["members"] = 1
    data["events"] = {}
    data["events"]['events_num'] = 0
    with open(path + "\\" + "group_json.json", 'w') as output:
        json.dump(data, output)
    data = {}
    data["username"] = sys.argv[2]
    data["password"] = sys.argv[6]
    data["first_name"] = sys.argv[3]
    data["last_name"] = sys.argv[4]
    data["email"] = sys.argv[5]
    data["events"] = {}
    data["events"]["events_num"] = 0
    with open(path + "\\" + str(sys.argv[2]) + "_json.json", 'w') as output:
        json.dump(data, output)
    data = {}
    data["status"] = "passed"
    data["group_data"] = {}
    data["user_data"] = {}
    with open(path + "\\" + "group_json.json", 'r') as output:
        data["group_data"] = json.load(output)
    with open(path + "\\" + sys.argv[2] + "_json.json", 'r') as output:
        data["user_data"] = json.load(output)
    print(json.dumps(data))
elif sys.argv[7] == "1":
    if str(sys.argv[1]) not in fileContent:
        data["status"] = "Group DNE"
        print(json.dumps(data))
        exit()
    path = path + "\\" + str(sys.argv[1])
    fileContent = os.listdir(path)
    if str(sys.argv[2]) + "_json.json" in fileContent:
        data["status"] = "User taken"
        print(json.dumps(data))
        exit()
    data = {}
    with open(path + "\\" + "group_json.json", 'r') as output:
        data = json.load(output)
    data["members"] = data["members"] + 1
    with open(path + "\\" + "group_json.json", 'w') as output:
        json.dump(data, output)
    data = {}
    data["username"] = sys.argv[2]
    data["password"] = sys.argv[6]
    data["first_name"] = sys.argv[3]
    data["last_name"] = sys.argv[4]
    data["email"] = sys.argv[5]
    data["events"] = {}
    data["events"]["events_num"] = 0
    with open(path + "\\" + str(sys.argv[2]) + "_json.json", 'w') as output:
        json.dump(data, output)
    data = {}
    data["status"] = "passed"
    data["group_data"] = {}
    data["user_data"] = {}
    with open(path + "\\" + "group_json.json", 'r') as output:
        data["group_data"] = json.load(output)
    with open(path + "\\" + sys.argv[2] + "_json.json", 'r') as output:
        data["user_data"] = json.load(output)
    print(json.dumps(data))
else:
    data["status"] = "failed"
    print(json.dumps(data))