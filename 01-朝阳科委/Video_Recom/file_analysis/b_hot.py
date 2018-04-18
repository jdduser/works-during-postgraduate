#-*-coding:utf-8 -*-

# b_hot.html页
# 1、对爱奇艺热门标签进行统计，将出现的数目作为热度准则

import pandas as pd
import numpy as np
import re
import os
import math

#对字典里面的数值进行计算
def union_dict(*objs):  
    _keys = set(sum([obj.keys() for obj in objs],[]))  
    _total = {}  
    for _key in _keys:  
        _total[_key] = sum([obj.get(_key,0) for obj in objs])  
    return _total


def aiqiyi_all_items(aiqiyi_file_url):
    def del_redundant_symbol(df):
        for i in range(len(df)):
            for col in ['provinces','gender','age','cons','edu','interests']:
                try:
                    df.loc[i,col] = df.loc[i,col].replace('[','')
                    df.loc[i,col] = df.loc[i,col].replace(']','')
                    df.set_value(i,col,eval(df.loc[i,col]))
                except:
                    print 'del-re-symbol---problem'
                    df.loc[i,col] = 0
        return df
    aiqiyi_df = del_redundant_symbol(pd.read_csv(aiqiyi_file_url))
    #return aiqiyi_df
    #aiqiyi_df的某些列已经为dict，不再为‘str’

    #接下来挑选前10个最热门标签，然后统计其每一个属性    
    all_aiqiyi_label_list = []
    for aiqiyi_item in range(len(aiqiyi_df)):
        raw_aiqiyi_label = aiqiyi_df['label'][aiqiyi_item]
        label_list_of_every_item = re.findall("'(.*?)'",raw_aiqiyi_label,re.S)
        for i in label_list_of_every_item:
            all_aiqiyi_label_list.append(i.decode('unicode_escape').encode('utf-8'))
        #all_aiqiyi_label_list中存储的为所有的标签,将带有‘分钟’的标签删除，有重复，下一步就是统计每个标签出现的次数
     
    for t in range(len(all_aiqiyi_label_list)):
        if '分钟' in all_aiqiyi_label_list[t]:
            all_aiqiyi_label_list[t] = '无'
                
    all_label_count = {}
        #记录每个标签出现的次数
    for i in set(all_aiqiyi_label_list):
        all_label_count[i] = all_aiqiyi_label_list.count(i)
        #return all_label_count
    all_label_count_sorted = sorted(all_label_count.iteritems(), key=lambda d:d[1], reverse = True)
        #return all_label_count_sorted
    
    sub = 0
    all_sorted_list = [0] * 20
    for i in range(20):
        try:
            if all_label_count_sorted[i][0] == '无':
                sub+=1
                continue
            all_sorted_list[i*2-sub*2] = all_label_count_sorted[i][0]
            all_sorted_list[i*2+1-sub*2] = str(all_label_count_sorted[i][1])+'%'
        except:
            print 'all-sorted-list  problem'
            continue
    #print all_sorted_list
    #return all_sorted_list
        #all_sorted_list为一个list，偶数位置为类型名称，其后跟出现数量百分比
    
    
    #下面根据在all_sorted_list中出现的标签顺序，开始统计其他属性
    
    #首先将label转换能识别的格式
    
    def transfer_label():
        final_label_list = []
        for i in range(len(aiqiyi_df)):
            temp = aiqiyi_df.loc[i,'label'].replace('[','')
            temp = temp.replace(']','')
            #print temp
            final_label_list.append(temp.decode('unicode_escape').encode('utf-8'))
        return final_label_list
    aiqiyi_df['label'] = transfer_label()
    
    
    all_items_JSON = {}
    all_items_JSON['label'] = []
    for top_label_index in [0,2,4,6,8,10,12,14,16,18]:
        rows = []
        for row in range(len(aiqiyi_df)):
            #记录某一个标签出现的行数
            if all_sorted_list[top_label_index] in aiqiyi_df.loc[row,'label']:
                rows.append(row)
        #rows中已经放置了当前标签出现的所有行数
        
        #为每一个类别配置一个list，list中为每一个小项的dict
        cur_label_list = [0]*7
        #七个小项
        
        #1、百分比
        cur_label_list[0] = {'percent':all_sorted_list[top_label_index+1]}
        
       
        temp_provinces = {}
        temp_gender = {}
        temp_cons = {}
        temp_age = {}
        temp_edu = {}
        temp_interests = {}
        for row in rows:
            #2、省份
            try:
                temp_provinces = union_dict(temp_provinces,aiqiyi_df.loc[row,'provinces'])
            except:
                pass
             #3、性别
            try:
                temp_gender = union_dict(temp_gender,aiqiyi_df.loc[row,'gender'])
            except:
                pass  
            #4、星座
            try:
                temp_cons = union_dict(temp_cons,aiqiyi_df.loc[row,'cons'])
            except:
                pass
            #5、年龄
            try:
                if aiqiyi_df.loc[row,'age']['35+'] > 10000:
                    temp_dic = aiqiyi_df.loc[row,'age']
                    temp_dic['35+'] = int(aiqiyi_df.loc[row,'age']/10000)
                    temp_age = union_dict(temp_age,temp_dic)
                else:
                    temp_age = union_dict(temp_age,aiqiyi_df.loc[row,'age'])
            except:
                pass
            #6、教育
            try:
                temp_edu = union_dict(temp_edu,aiqiyi_df.loc[row,'edu'])
            except:
                pass
            #7、兴趣
            try:
                temp_interests = union_dict(temp_interests,aiqiyi_df.loc[row,'interests'])
            except:
                pass
                
        cur_label_list[1] = temp_provinces
        cur_label_list[2] = temp_gender
        cur_label_list[3] = temp_cons
        cur_label_list[4] = temp_age
        cur_label_list[5] = temp_edu
        cur_label_list[6] = temp_interests
       
        all_items_JSON[all_sorted_list[top_label_index]] = cur_label_list
        
        #用单独的key来记录标签
        all_items_JSON['label'].append(all_sorted_list[top_label_index])
    
    
    return all_items_JSON
        
        
        
        


#print aiqiyi_label_count(aiqiyi_file_url = '..\\static\\files\\aiqiyi\\aiqiyi.csv')









