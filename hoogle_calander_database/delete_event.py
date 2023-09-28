import sys, os, json, copy

path = r"C:\Users\marte\Haruki\Coding\personal\Summer_2023_Projects\Python\hoogle_calander_database\data_base"


def deleteEvent(index, type):
    eventHolder = {}
    with open(path + "\\" + type + "_json.json", 'r') as output:
        eventHolder = json.load(output)
    del eventHolder['events']['event_' + index]
    eventHolder['events']['events_num'] = int(eventHolder['events']['events_num']) - 1
    x = 0
    output = {}
    output['events_num'] = eventHolder['events']['events_num']
    while(x < int(index)):
         output['event_' + str(x)] = copy.deepcopy(eventHolder['events']['event_' + str(x)])
         x = x + 1
    x = int(index)
    while(x < eventHolder['events']['events_num']):
        output['event_' + str(x)] = copy.deepcopy(eventHolder['events']['event_' + str(x + 1)])
        x = x + 1
    eventHolder['events'] = copy.deepcopy(output)
    with open(path + "\\" + type + "_json.json", 'w') as output:
        json.dump(eventHolder, output)

returnData = {}
if len(sys.argv) != 4:
    returnData['status'] = "failed"
    print(json.dumps(returnData))
    exit()
path = path + "\\" + sys.argv[1]
deleteEvent(sys.argv[3], sys.argv[2])
returnData['status'] = "Passed"
updated_data = {}
with open(path + "\\" + sys.argv[2] + "_json.json", 'r') as output:
        updated_data = json.load(output)
returnData['updated_data'] = updated_data
print(json.dumps(returnData))