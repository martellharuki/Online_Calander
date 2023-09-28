import sys, os, shutil, json, copy

path = r"C:\Users\marte\Haruki\Coding\personal\Summer_2023_Projects\Python\hoogle_calander_database\data_base"

def returnJson(index):
    output = {}
    monthList = ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    output['title'] = sys.argv[4]
    output['month'] = str(monthList.index(sys.argv[5]))
    output['day'] = str(sys.argv[6])
    output['year'] = str(sys.argv[7])
    output['start_time'] = {}
    output['start_time']['hour'] = str(sys.argv[8])
    output['start_time']['minute'] = str(sys.argv[9])
    output['start_time']["AMPM"] = str(sys.argv[10])
    output['end_time'] = {}
    output['end_time']['hour'] = str(sys.argv[11])
    output['end_time']['minute'] = str(sys.argv[12])
    output['end_time']["AMPM"] = str(sys.argv[13])
    output['attend'] = parseList(sys.argv[14])
    output['coord']  = parseList(sys.argv[15])
    output['location'] = sys.argv[16]
    output['description'] = sys.argv[17]
    output['event'] = str(index)
    return output

def checkDateOrder(origin, added):
    if(int(origin['year']) == int(added['year'])):
        if(int(origin['month']) == int(added['month'])):
            if(int(origin['day']) == int(added['day'])):
                if(origin['start_time']['AMPM'] == added['start_time']['AMPM']):
                    if(int(origin['start_time']['hour']) == int(added['start_time']['hour'])):
                        if(int(origin['start_time']['minute']) == int(added['start_time']['minute'])):
                            pass
                        elif(int(origin['start_time']['minute']) > int(added['start_time']['minute'])):
                             return False
                        else:
                            return True
                    elif(int(origin['start_time']['hour']) > int(added['start_time']['hour'])):
                        return False
                    else:
                        return True
                elif(origin['start_time']['AMPM'] == "PM"):
                    return False
                else:
                    return True
            elif(int(origin['day']) > int(added['day'])):
                return False
            else:
                return True
        elif(int(origin['month']) > int(added['month'])):
            return False
        else:
            return True
    elif(int(origin['year']) > int(added['year'])):
        return False
    else:
        return True

def sortedJson(origin, added):
    output = {}
    output['group'] = origin['group']
    output['members'] = origin['members']
    output['events'] = {}
    contCheck = True
    temp = int(origin['events']['events_num'])
    output['events']['events_num'] = copy.deepcopy(int(origin['events']['events_num'] + 1))
    offset = 0
    for i in range(temp):
        if checkDateOrder(origin['events']['event_' + str(i)], added) or offset != 0:
            output['events']['event_' + str(i)] = copy.deepcopy(origin['events']['event_' + str(i - offset)])
        else:
            output['events']['event_' + str(i)] = copy.deepcopy(added)
            offset = 1
            temp = temp + 1
    if offset == 0:
        output['events']['event_' + str(origin['events']['events_num'])] = copy.deepcopy(added)
    else:
        output['events']['event_' + str(origin['events']['events_num'])] = copy.deepcopy(origin['events']['event_' + str(int(origin['events']['events_num']) - 1)])
    return output

def sortedUserJson(origin, added):
    output = {}
    output['events'] = {}
    output['events']['events_num'] = copy.deepcopy(int(origin['events']['events_num'] + 1))
    contCheck = True
    temp = int(origin['events']['events_num'])
    offset = 0
    for i in range(temp):
        if checkDateOrder(origin['events']['event_' + str(i)], added) or offset != 0:
            output['events']['event_' + str(i)] = copy.deepcopy(origin['events']['event_' + str(i - offset)])
        else:
            output['events']['event_' + str(i)] = copy.deepcopy(added)
            offset = 1
            temp = temp + 1
    if offset == 0:
        output['events']['event_' + str(origin['events']['events_num'])] = copy.deepcopy(added)
    else:
        output['events']['event_' + str(origin['events']['events_num'])] = copy.deepcopy(origin['events']['event_' + str(int(origin['events']['events_num']) - 1)])
    return (output['events'])

def parseList(string):
    output = []
    contCheck = True
    while contCheck:
        if ":" in string:
            output.append(string[:string.index(":")])
            string = string[string.index(":") + 1:]
        else:
            output.append(string[:string.index("!")])
            contCheck = False
    return output

num_args = len(sys.argv)
output_json = {}
if num_args != 18:
    output_json['status'] = "invalid argc"
    print(json.dumps(output_json))
    exit()

path = path + "\\" + sys.argv[1]
group_json = {}
with open(path + "\\" + "group_json.json", 'r') as output:
    group_json = json.load(output)
user_json = {}
with open(path + "\\" + sys.argv[2] + "_json.json", 'r') as output:
    user_json = json.load(output)
if sys.argv[3] == "true":
    input = returnJson(int(group_json['events']['events_num']))
    group_json = copy.deepcopy(sortedJson(group_json, input))
    with open(path + "\\group_json.json", 'w') as output:
        json.dump(group_json, output)
else:
    input = returnJson(int(user_json['events']['events_num']))
    user_json['events'] = copy.deepcopy(sortedUserJson(user_json, input))
    with open(path + "\\" + str(sys.argv[2]) + "_json.json", 'w') as output:
        json.dump(user_json, output)
output_json = {}
output_json['calData'] = {}
output_json['calData']['group_data'] = group_json
output_json['calData']['user_data'] = user_json
output_json['status'] = "Passed"
print(json.dumps(output_json))



