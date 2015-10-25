import random
from decimal import *


items =  {'bluepen': 5.35, 'waterbottle': 2.35,'notebook':10.46,'eraser':30.94,'bobba':15.12,'lego':1.94,'tsum_tsum':10.05,'baseballbat':4.45,'stich_pillow':3.12,'chocolate':20.52,'soymilk':7.25,'susan':10.75,'andrew':3.32,'paola':25.01}
levels = 10
current_level = 10 #takes 2 items , shows only one item of each. quantity == level
num_answers = 4 # number of results show. 


def random_select(level,items):
    ''' Makes random selection of dictionary keys
        generates a random quantity based on the level 
    '''

    selection = []
    keys = random.sample(items.keys(),level+1)

    for key in keys:

        value = items[key]
        quantity = random.randint(1,level)
        selection.append((key,value,quantity))
        # print i, key, value

    return selection


def add_values(selection):
    '''Adds values in selection list
    generates correct answers

    '''
    add = 0
    for i in selection:
        print i[0],i[1],i[2]
        val = i[1] * i[2]
        add = add + val
    print 'total',add

    return add


def generate_wrong_results(correct_result, answers):
    '''Generates 3 wrong results to mix with correct_result
        Takes the correct result and 
        the number of answers / options the player has

    '''



    incorrect = set()
    # for i in range(answers-1): 
    incorrect.add(round(correct_result,2))


    while len(incorrect)<answers:
        dec = random.random()
        print dec
        rand = random.randint(1,answers)
        rs = round(correct_result+rand+dec,2)
        incorrect.add(rs)


    print 'incorrect', incorrect
    return incorrect



rand_select = random_select(current_level,items)
result = add_values(rand_select)

generate_wrong_results(result,num_answers)

# print '*' * 10
# print random.sample(items.keys(),2)
