#-*-coding:utf-8 -*-

from flask import Flask,render_template,json,request,jsonify
from data_online import crawl_vvideo,crawl_aiqiyi
from file_analysis.b_hot import aiqiyi_all_items
import os
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
reload(sys)
sys.setdefaultencoding("utf8")
root_path = os.getcwd()
#print os.path.abspath('.')

app = Flask(__name__)


@app.route('/',methods=['POST', 'GET'])
def index():
    return render_template('index.html')
@app.route('/index.html')
def index_():
    return render_template('index.html')
@app.route('/b_hot.html')
def b_hot():
    return render_template('b_hot.html')
@app.route('/table.html')
def table():
    return render_template('table.html')
@app.route('/index_data')
def add():
    index_data = crawl_vvideo(3)
#    index_data = crawl_vvideo(1,1)
    # index_data = vvideo_aiqiyi(1,1)
    return jsonify(result=index_data)


@app.route('/b_hot_aiqiyi_label')
def b_hot_aiqiyi_label():
    all_items_JSON = aiqiyi_all_items('static\\files\\aiqiyi\\aiqiyi.csv')
    return jsonify(result=all_items_JSON)
    #return b_hot_aiqiyi_label_count
#print b_hot_aiqiyi_label()



#
if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    app.run(port=4100)
#print b_hot_aiqiyi_label()







