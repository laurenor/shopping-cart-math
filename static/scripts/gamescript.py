import random

items =  {'bluepen': 5.0, 'waterbottle': 2.0,'notebook':10.0,'eraser':30.0,'bobba':15.0,'lego':1.0,'tsum_tsum':10.0,'baseballbat':4.0,'stich_pillow':3.0,'chocolate':20.0,'soymilk':7.0,'susan':10.0,'andrew':3.0,'paola':25.0}
levels = 10
current_level = 1 #takes 2 items , shows only one item of each. quantity == level
num_answers = 4 # number of results show. 


def random_select(level,items):
    ''' Makes random selection of dictionary keys
        generates a random quantity based on the level 
    '''

    selection = []
    keys = random.sample(items.keys(),2)

    # for i in range(level+1):
    for key in keys:

        # key = random.choice(items.keys())
        value = items[key]
        quantity = random.randint(1,level)
        selection.append((key,value,quantity))
        #MAKE IT DOESN'T PICK THE SAME ITEM.
        # print i, key, value



    return selection


def add_values(selection):
    '''Adds values in selection list'''
    add = 0
    for i in selection:
        print i[0],i[1],i[2]
        add = add + i[1]
    print 'total',add

    return add


def generate_wrong_results(correct_result, answers):
    '''Generates 3 wrong results to mix with correct_result
        Takes the correct result and 
        the number of answers / options the player has

    '''

    for i in range(answers-1): 
        div = correct_result/2
        print 'div',div



rand_select = random_select(current_level,items)
result = add_values(rand_select)

generate_wrong_results(result,num_answers)

# print '*' * 10
# print random.sample(items.keys(),2)
