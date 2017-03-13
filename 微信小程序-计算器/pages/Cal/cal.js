Page({
  data: {
    //String1
    result: "0",
    // result:[0],
    btn1: "back",
    btn2: "clear",
    btn3: "isPositive",
    btn4: "history",
    btn5: "9",
    btn6: "8",
    btn7: "7",
    btn8: "+",
    btn9: "6",
    btn10: "5",
    btn11: "4",
    btn12: "-",
    btn13: "3",
    btn14: "2",
    btn15: "1",
    btn16: "*",
    btn17: "0",
    btn18: ".",
    btn19: "=",
    btn20: "/",
    isNumber: true,
    isStart: true,
    numb: [],
    operator: [],
    expression: [],
    Cal_logs: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    //String2
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    //String3
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    //String4
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    //String5
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    //String6
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    //String7
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    //String8
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    // return {
    //   title: 'title', // 分享标题
    //   desc: 'desc', // 分享描述
    //   path: 'path' // 分享路径
    // }
  },
  click: function (event) {
    if (event.target.id == this.data.btn1) {
      //退格
      console.log(event.target.id);
      if (this.data.result.length > 1) {
        this.setData({
          result: this.data.result.substr(0, this.data.result.length - 1)
        });
        var sd = this.data.result.substr(this.data.result.length - 1, this.data.result.length)
        if (sd == '+' || sd == "-" || sd == "*" || sd == "/") {
          this.setData({
            isNumber: false
          });
        } else {
          this.setData({
            isNumber: true
          });
        }
      } else {
        this.setData({
          result: "0",
          isNumber: true
        });
      }

    } else if (event.target.id == this.data.btn2) {
      //清屏
      console.log(event.target.id);
      this.setData({
        result: "0",
        isNumber: true
      });
    } else if (event.target.id == this.data.btn3) {
      //正负号
      if(this.data.result.substr(0,1)!='-'){
        if(this.data.result.substr(0,1)=='0'){
          return;
        }
        console.log("正")
        this.setData({result:"-"+this.data.result})
      }else{
        console.log("负")
        this.setData({result:this.data.result.substr(1)});
      }   
      console.log(event.target.id);
    } else if (event.target.id == this.data.btn4) {
      //历史
      console.log(event.target.id);
    } else if (event.target.id == this.data.btn8) {
      //加
      console.log(event.target.id);
      if (!this.data.isNumber) {
        return;
      }
      var sd = this.data.result + event.target.id;
      this.setData({ result: sd, isNumber: false })

    } else if (event.target.id == this.data.btn12) {
      //减
      console.log(event.target.id);
      if (!this.data.isNumber) {
        return;
      }
      var sd = this.data.result + event.target.id;
      this.setData({ result: sd, isNumber: false })
    } else if (event.target.id == this.data.btn16) {
      //乘
      console.log(event.target.id);
      if (!this.data.isNumber) {
        return;
      }
      var sd = this.data.result + event.target.id;
      this.setData({ result: sd, isNumber: false })
    } else if (event.target.id == this.data.btn19) {
      //等于
      console.log(event.target.id);
      if (!this.data.isNumber||this.data.result=="0") {
        return;
      }
      var sd = this.data.result + event.target.id;
      this.setData({ result: sd, isNumber: false })
      //表达式
      var num = "";
      var cal;
      var isNum = true;
      var isPositive=true;
      if(this.data.result.substr(0,1)=='-'){
        isPositive=false;
        this.setData({result:this.data.result.substr(1)});
      }
      for (var i = 0; i < this.data.result.length; i++) {
        if (this.data.result[i] == '+' || this.data.result[i] == '-' || this.data.result[i] == '*' || this.data.result[i] == '/') {
          //加
          if (isNum && num != "") {
            //上个字符是数字
            this.data.expression.push(Number(num));
          }
          this.data.expression.push(this.data.result[i]);
          isNum = false;
        } else if (this.data.result[i] == "=") {
          //等号
          if (isNum && num != "") {
            //上个字符是数字
            this.data.expression.push(Number(num));
          }
          isNum = false;
        } else {
          //数字
          if (isNum) {
            //上个字符是数字
            num = num + this.data.result[i];
            isNum = true;
          } else {
            //上个字符是运算符
            num = this.data.result[i];
            isNum = true;
          }
          // console.log("当前数字：" + num);
        }
      }
     
      console.log("表达式：" + this.data.expression);
      //计算-1
      var numb1, numb2;
      for (var i = 0; i < this.data.expression.length; i++) {
        if(i==1){
           if(!isPositive){
        // 首个数字是负数
        this.data.numb.unshift(-this.data.numb.shift());
      }
        }
        console.log("表达式当前字符：" + this.data.expression[i]);
        if (typeof (this.data.expression[i]) == "number") {
          //表达式当前字符是数字
          this.data.numb.push(this.data.expression[i]);
        } else if (this.data.expression[i] == "+") {
          //加-入栈
          this.data.operator.push(this.data.expression[i]);
        } else if (this.data.expression[i] == "-") {
          //减-入栈
          this.data.operator.push(this.data.expression[i]);
        } else if (this.data.expression[i] == "*") {
          //乘-直接计算
          numb1 = this.data.numb.pop();
          numb2 = this.data.expression[i + 1];
          this.data.numb.push(numb1 * numb2);
          i++;
        } else if (this.data.expression[i] == "/") {
          //除-直接计算(被除数是零的情况未考虑)
          numb1 = this.data.numb.pop();
          numb2 = this.data.expression[i + 1];
          this.data.numb.push(numb1 / numb2);
          i++;
        }
      }
      //计算-2
      while (this.data.numb.length > 1) {
        if (this.data.operator.pop() == "+") {
          //加
          numb2 = this.data.numb.pop();
          numb1 = this.data.numb.pop();
          this.data.numb.push(numb1 + numb2);

        } else {
          //减
          numb2 = this.data.numb.pop();
          numb1 = this.data.numb.pop();
          this.data.numb.push(numb1 - numb2);
        }
      }
      //结果保存
      var Cal_logs = wx.getStorageSync('Cal_logs') || []
      Cal_logs.unshift(this.data.result + this.data.numb[0]);
      wx.setStorageSync('Cal_logs', Cal_logs);

      //结果输出
      this.setData({
        result: this.data.numb.pop().toString(),
        isNumber: true,
        operator: [],
        expression: [],
        numb: []
      });
    } else if (event.target.id == this.data.btn20) {
      //除
      console.log(event.target.id);
      if (!this.data.isNumber || this.data.result == "0") {
        return;
      }
      var sd = this.data.result + event.target.id;
      this.setData({ result: sd, isNumber: false })
    } else {
      //数字
      if (typeof (this.data.result) == "number") {
        this.setData({ result: "0" });
      }
      if (this.data.result.substr(this.data.result.length - 1, this.data.result.length) == "=") {
        return;
      }
      console.log(event.target.id);
      var sd;
      if (this.data.result == '0') {
        sd = event.target.id;
      } else {
        sd = this.data.result + event.target.id;
      }
      this.setData({
        result: sd,
        isNumber: true
      });
    }
  },
  history: function (event) {
    //计算历史
    wx.navigateTo({
      url: '../list/list'
      // success: function (res) {
      //   // success
      // },
      // fail: function () {
      //   // fail
      // },
      // complete: function () {
      //   // complete
      // }
    })
  }
})