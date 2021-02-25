var channelToken = 'YOUR CHANNEL ACCESS TOKEN';

function replyMsg(replyToken, userMsg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{'type': 'text', 'text': userMsg}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function pushMsg(channelToken, message, usrId) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': usrId,
      'messages': [{'type': 'text', 'text': message}]
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
  console.log('info:' + e.postData.contents);
  var value = JSON.parse(e.postData.contents);
  try {
    var events = value.events;
    if (events != null) {
      for (var i in events) {
        var event = events[i];
        var type = event.type;
        var replyToken = event.replyToken;
        /* unused variable
        var sourceType = event.source.type;
        var sourceId = LineHelpers.getSourceId(event.source);
        var userId = event.source.userId; 
        var groupId = event.source.groupId;
        var timeStamp = event.timestamp;
        */
        switch (type) {
          case 'postback':
            break;
          case 'message':
            /* unused variable
            var messageType = event.message.type;
            var messageId = event.message.id;
            */
            var messageText = event.message.text; 
            var res = messageText.split(" ");
            var number = res[0];
            var unit = res[1] + "";
            if(messageText.toLowerCase() === "!help"){
            replyMessageText = "我的單位有:\n" + 
            "公尺、公分、英呎、英吋、公里、英里、磅、公斤、公克、盎司、華式、攝氏、公升、毫升、加侖\n" + 
            "跟我講數字 空白 單位(英文縮寫)\n" + 
            "例如: 5 M，3 lb\n" + 
            "指令: !help, !units";

            replyMsg(replyToken, replyMessageText, channelToken);
            break;
            }
            if(messageText.toLowerCase() === "!units"){
              replyMessageText = "公尺(m), 公分(cm), 英呎(ft), 英吋(inch), 英里(mi), 公里(km), 磅(lb), 公斤(kg), 公克(g), 盎司(oz), 華式(f), 攝氏(c), 公升(l), 毫升(ml), 加侖(gal)";
            replyMsg(replyToken, replyMessageText, channelToken);
            break;
            }

            if (res.length != 2 || isNaN(parseInt(res[0])) || !/^[A-Za-z]+$/.test(res[1]) ){
              break;
            }
            if (unit.toLowerCase() === "m"){
              var totalInchs = number * 39.3700787;
              var feets = totalInchs / 12;
              var inchs = ((feets - parseInt(feets)) * 12).toFixed(2);

              replyMessageText = number + " 公尺(m) 大約" + "\n= " + parseInt(feets) + " 英呎(ft)又" + inchs + " 英吋(inch)\n= " + 
              feets.toFixed(2) + " 英呎(ft)\n= " + totalInchs.toFixed(2) + " 英吋(inch)";
            }
            else if (unit.toLowerCase() === "cm"){
              var feets = number / 30.48;
              var totalInchs = number * 0.393700787;
              var inchs = ((feets - parseInt(feets)) * 12).toFixed(2);

              replyMessageText = number + " 公分(cm) 大約\n= " + parseInt(feets) + " 英呎(ft)又" + inchs + " 英吋(inch)\n= " + 
              feets.toFixed(2) + " 英呎(ft)\n= " + totalInchs.toFixed(2) + " 英吋(inch)";
            }
            else if (unit.toLowerCase() === "ft"){
              if(/^[0-9]+$/.test(number)){
                var cm = number * 30.48;
                var inchs = number * 12;
                replyMessageText = number + "英呎(ft)" + "大約\n= " + inchs + "英吋(inch)\n= " + cm.toFixed(2) + "公分(cm)";
              }
              else{
                number = number.split(/[“ ‘”\"]/);
                var feets = parseInt(number[0]);
                var inchs = parseInt(number[1]);
                var cm = (feets * 12 + inchs) * 2.54;

                replyMessageText = feets + "英呎(ft)" + inchs + "英吋(inch) 大約\n= " + cm.toFixed(2) + "公分(cm)";
              }
              
            }
            else if (unit.toLowerCase() === "in" || unit.toLowerCase() === "inch"){
              var cm = number * 2.54;
              var feets = number / 12;
              replyMessageText = number + "英吋(inch)" + inchs.toFixed(2) + "英呎(ft) 大約\n= " + cm.toFixed(2) + "公分(cm)";
            }
            else if (unit.toLowerCase() === "mi"){
              var km = number / 0.62137;
              replyMessageText = number + " 英里(mi) 大約\n= " + km.toFixed(2) + "公里(km)";
            }
            else if (unit.toLowerCase() === "km"){
              var km = number * 0.62137;
              replyMessageText = number + " 公里(km) 大約\n= " + km.toFixed(2) + "英里(mi)";
            }
            else if (unit.toLowerCase() === "lb"){
              var kg = number * 0.45359237;
              var oz = number * 16;
              var g = number * 453.59237;
              replyMessageText = number + " 磅(lb) 大約\n= " + kg.toFixed(2) + "公斤(kg)\n= " + 
                oz.toFixed(2) + "盎司(oz)\n= " + g.toFixed(2) + "公克(g)";
            }
            else if (unit.toLowerCase() === "kg"){
              var lb = number * 2.20462262;
              var oz = number * 35.2739619;
              replyMessageText = number + " 公斤(kg) 大約\n= " + lb.toFixed(2) + "磅(lb)\n= " + 
                oz.toFixed(2) + "盎司(oz)";
            }
            else if (unit.toLowerCase() === "g"){
              var lb = number * 0.0022046226;
              var oz = number * 0.0352739619;
              replyMessageText = number + " 公克(g) 大約\n= " + lb.toFixed(2) + "磅(lb)\n= " + 
                oz.toFixed(2) + "盎司(oz)";
            }
            else if (unit.toLowerCase() === "oz"){
              var lb = number * 0.0625;
              var kg = number * 0.0283495231;
              var g = number * 28.3495231;
              var ml = number / 0.033814;
              replyMessageText = number + " 盎司(oz) 大約\n= " + kg.toFixed(2) + "公斤(kg)\n= " + 
                lb.toFixed(2) + "磅(lb)\n= " + g.toFixed(2) + "公克(g)\n= " + ml.toFixed(2) +"毫升";
            }
            else if (unit.toLowerCase() === "f"){
              var c = (number - 32) * 5 / 9;
              replyMessageText = number + "華式(f) 大約\n= " + c.toFixed(2) + "攝氏(c)";
            }
            else if (unit.toLowerCase() === "c"){
              var f = number * 9 / 5 + 32;
              replyMessageText = number + "攝氏(c) 大約\n= " + f.toFixed(2) + "華氏(f)";
            }
            else if (unit.toLowerCase() === "l"){
              var gal = number * 0.26417;
              var oz = number * 33.814;
              replyMessageText = number + "公升(l) 大約\n= " + gal.toFixed(2) + "加侖(gal)\n= " + oz.toFixed(2) + "盎司(oz)";
            }
            else if (unit.toLowerCase() === "ml"){
              var gal = number / 264.17;
              var oz = number * 0.033814;
              replyMessageText = number + "毫升(ml) 大約\n= " + gal.toFixed(2) + "加侖(gal)\n= " + oz.toFixed(2) + "盎司(oz)";
            }
            else if (unit.toLowerCase() === "gal"){
              var l = number / 0.26417;
              var ml = l / 1000;
              var oz = l * 33.814;
              replyMessageText = number + "加侖(gal) 大約\n= " + l.toFixed(2) + "公升(l)\n= " + ml.toFixed(2) 
              + "毫升(ml)\n= " + oz.toFixed(2) + "盎司(oz)";
            }
            else{
              replyMessageText = "對不起... 我不知道你哪個單位的 QQQQ...\n輸入指令!units看支援的單位\n" + messageText;
              console.log(messageText);
            }
            replyMsg(replyToken, replyMessageText, channelToken);
            break;
          case 'join':
            replyMessageText = "我的單位有:\n" + 
            "公尺、公分、英呎、英吋、公里、英里、磅、公斤、盎司、華式、攝氏、公升、毫升、加侖\n" + 
            "跟我講數字 空白 單位(英文縮寫)\n" + 
            "例如: 5 M，3 lb\n" + 
            "指令: !help, !units";
            pushMsg(channelToken, replyMessageText, sourceId);
            replyMessageText = "公尺(m), 公分(cm), 英呎(ft), 英吋(inch), 英里(mi), 公里(km), 磅(lb), 公斤(kg), 盎司(oz), 華式(f), 攝氏(c), 公升(l), 毫升(ml), 加侖(gal)";
            pushMsg(channelToken, replyMessageText, sourceId);
            break;
          case 'leave':
            //pushMsg(channelToken, replyMessageText, sourceId);
            break;
          case 'memberLeft':
            //pushMsg(channelToken, replyMessageText, sourceId);
            break;
          case 'memberJoined':
            //pushMsg(channelToken, replyMessageText, sourceId);
            break;
          case 'follow':
            //pushMsg(channelToken, replyMessageText, sourceId);
            break;
          case 'unfollow':
            //pushMsg(channelToken, replyMessageText, sourceId);
            break;
          default:
            break;
        }
      }
    }
  } catch(ex) {
    console.log(ex);
  }
}

/*
var LineHelpers = (function (helpers) {
  'use strict';
  helpers.getSourceId = function (source) {
    try {
      switch (source.type) {
        case 'user':
          return source.userId;
          break;
        case 'group':
          return source.groupId;
          break;
        case 'room':
          return source.roomId;
          break;
        default:
          console.log('LineHelpers, getSourceId, invalid source type!');
          break;
      }
    } catch (ex) {
      console.log('LineHelpers, getSourceId, ex = ' + ex);
    }
  }; 
  return helpers;
})(LineHelpers || {});
*/
