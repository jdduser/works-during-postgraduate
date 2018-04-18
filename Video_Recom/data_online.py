#-*-coding:utf-8 -*-
import requests
import re
import sys
import random
reload(sys)
sys.setdefaultencoding('utf-8')

header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'}
def crawl_vvideo(page):
    total_vvideo_list = [[], [], [], [], [], []]
    for i in range(page):
        html_vvideo = requests.get('http://www.vmovier.com/index/index/p/'+str(i+1),headers = header)
        html_vvideo.encoding = 'utf-8'
   
        html_vvideo = re.findall('<div class="index-main">(.*?)<div class="post-right',html_vvideo.text,re.S)[0]
        html_vvideo_each = re.findall('<li class="clearfix" data-id="(.*?)<a href="javascript:;" class="post-share-btn" id="post-share-btn"></a>',html_vvideo,re.S)
        main_index_vvideo = 'http://www.vmovier.com/'
# html_vvideo_each中为每一个影片粗粒度的信息，要进一步的提取

        for i in html_vvideo_each:
            if u"<span class='mark mark-green'>专题</span>"  in i:
                del  html_vvideo_each[html_vvideo_each.index(i)]
                continue
            if u"出品发行" in i:
                del html_vvideo_each[html_vvideo_each.index(i)]
                continue
            if u'系列' in i:
                del html_vvideo_each[html_vvideo_each.index(i)]
                continue
# 将“专题\广告”等内容删除，得到进一步净化的html_vvideo_each
        


# 定义了一个[]，记录全部视频的信息

        each_vvideo_dic = {'name':None,'sub':None,'source':None,'score':None,'rank':None,'link':None}
# 定义了一个{}，记录每一个视频的名称、主题、来源、评分、排名

        for item in html_vvideo_each:
            each_vvideo_dic['name'] = re.findall(' title="(.*?)" class="index-img">',item,re.S)[0]
            # each_vvideo_dic['sub'] = re.findall('&nbsp;<span>(.*?)</span>', item, re.S)[0]
            each_vvideo_dic['sub'] = [re.findall('&nbsp;<span>(.*?)</span>', item, re.S)[0]]
            each_vvideo_dic['source'] = 'v电影'
            each_vvideo_dic['score'] = re.findall('data-score="(.*?)"></div>', item, re.S)[0]
            each_vvideo_dic['link'] = main_index_vvideo+re.findall('href="(.*?)"', item, re.S)[0]
            total_vvideo_list[0].append(each_vvideo_dic['name'])
            total_vvideo_list[1].append(each_vvideo_dic['sub'])
            total_vvideo_list[2].append(each_vvideo_dic['source'])
            total_vvideo_list[3].append(each_vvideo_dic['score'])
            total_vvideo_list[4].append(0)
            total_vvideo_list[5].append(each_vvideo_dic['link'])
    return total_vvideo_list
    # print total_vvideo_list[1][0][0]
    

def crawl_aiqiyi(page):
    link = []
    total_list = [[],[],[],[],[],[]]
    # 在v电影中total_list[4]为记录的评分，而在爱奇艺中，total_list[4]为播放量，为了便于统一，最后全部叫做"score"
    for i in range(page):
        html_aiqiyi = requests.get('http://list.iqiyi.com/www/16/-------------4-'+str(i+1)+'-2--1-.html',headers = header)
        html_aiqiyi.encoding = 'utf-8'
        html_aiqiyi = re.findall('class="site-piclist_info_title">(.*?)/p>',html_aiqiyi.text,re.S)
        for j in range(html_aiqiyi.__len__()):
            link.append(re.findall('href="(.*?)"',html_aiqiyi[j],re.S)[0])
# #         link中存储的为首页每个视频的链接，接下来要做的时打开每一个连接获取到相关的视频信息
#     total_list[5] = temp_link
#     先把link赋值给tital_list[5]
#     下面对每一个视频的详情页面进行处理
    del_link_list = []
    for i in range(link.__len__()):
        html_aiqiyi = requests.get(link[i],headers = header)
        html_aiqiyi.encoding = 'utf-8'
        # 首先要判断点进去的网页是否存在，此处的判断方法为看name是否为空以及sub_entire是否为空;之后还得判断是否有标签项

        name = re.findall('"og:title"content="(.*?)"/>',html_aiqiyi.text,re.S)
        if name.__len__() == 0:
            del_link_list.append(link[i])
            # 记录需要删除的链接
            continue
        else:
            name = name[0]
            sub_entire = re.findall('<span class="mod-tags_item(.*?)</span>', html_aiqiyi.text,re.S)
            if sub_entire.__len__() == 0:
                del_link_list.append(link[i])
                continue
            else:
                sub_entire = sub_entire[0]
                sub = re.findall('title="(.*?)"',sub_entire,re.S)
                # sub此时为一个数组，里面直接存储主题,下面要做的事把带有‘分钟’、‘国语’的标签去掉
                del_sub_list = ['国语','分钟']
                sub_del_index = []
                # sub_del_index中记录的是sub中需要删除的序列，下面通过循环将其删除
                for j in range(sub.__len__()):
                    for k in range(del_sub_list.__len__()):
                        if del_sub_list[k] in sub[j]:
                            sub_del_index.append(j)
                for j in sub_del_index:
                    if j ==0:
                        del sub[j]
                    else:
                        del sub[j-1]
                total_list[0].append(name)
                total_list[1].append(sub)
                source = '爱奇艺'
                # score_entire = re.findall('data-playcount-albumname=(.*?)<b><b>',html_aiqiyi.text,re.S)
                # score爬不下来，待解决，此处先付给其随机数
                score = random.randint(5, 400)
                rank = 0;
                # 所有数据获取完毕，需要添加进total_list中
                total_list[2].append(source)
                total_list[3].append(score)
                total_list[4].append(rank)
    #            接下来将link中无效的链接删除
    for i in del_link_list:
        link.remove(i)
    total_list[5] = link
    return total_list


def vvideo_aiqiyi(vvideo_page,aiqiyi_page):
    total_list = [[],[],[],[],[],[]]
    for i in range(6):
        total_list[i] = crawl_vvideo(vvideo_page)[i] + crawl_aiqiyi(aiqiyi_page)[i]
    return total_list
