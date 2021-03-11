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

function getUserInfo(channelToken, uId){
  var url = 'https://api.line.me/v2/bot/profile/' + uId;
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'get'};
  var res = UrlFetchApp.fetch(url, opt);
  console.log('User response:' + res);
  return JSON.parse(res);
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
        var sourceType = event.source.type;

        if(sourceType === 'user'){
          var userId = event.source.userId;

          var res = getUserInfo(channelToken, userId);
          var lang = res.language;
          var userName = res.displayName;
        }
        else{
          var lang = 'en';
          var userName = 'Users';
        }
        console.log('language: ', lang);

        switch(lang){
            case 'ja':
              var _help = '以下の単位をサポートできます：\n'+
              'メートル(m), センチメートル(cm), ヤード(yd), フィート(ft), インチ(in/inch), マイル(mi), キロメートル(km), ポンド(lb), '+
              'キログラム(kg), グラム(g), オンス(oz), 華氏(f), 摂氏(c), リットル(l), ミリリットル(ml), ガロン(gal)\n' + 
              '入力：数値 スペース 単位' + 
              '例えば：5 M，3 lb\n' + 
              'コマンド：!help, !units';
              var _units = 'メートル(m), センチメートル(cm), ヤード(yd), フィート(ft), インチ(in/inch), マイル(mi), キロメートル(km), ポンド(lb), ' +
                           'キログラム(kg), グラム(g), オンス(oz), 華氏(f), 摂氏(c), リットル(l), ミリリットル(ml), ガロン(gal)';
              var _hint = '使用した単位を識別できません。\n' + 
                          '!unitsを入力し、サポートされている単位を確認してください。\n' + 
                          'もしくは、\"スペース\"が抜けているかもしれません。\n' + 
                          'スペースが入力されているか確認してください。\n'
                          '例えば：5 M、3 lb';
              /*
              var _m = 'メートル';
              var _cm = 'センチ';
              var _yd = 'ヤード'
              var _ft = 'フィート';
              var _inch = 'インチ';
              var _km = 'キロメートル';
              var _mi = 'マイル';
              var _lb = 'ポンド';
              var _kg = 'キログラム';
              var _g = 'グラム';
              var _oz = 'オンス';
              var _f = '華氏';
              var _c = '摂氏';
              var _l = 'リットル';
              var _ml = 'ミリリットル';
              var _gal = 'ガロン';
              */

              var _m = 'm';
              var _cm = 'cm';
              var _yd = 'yd'
              var _ft = 'ft';
              var _inch = 'inch';
              var _km = 'km';
              var _mi = 'mi';
              var _lb = 'lb';
              var _kg = 'kg';
              var _g = 'g';
              var _oz = 'oz';
              var _f = '°f';
              var _c = '°c';
              var _l = 'l';
              var _ml = 'ml';
              var _gal = 'gal';
              break;
            case 'zh-Hant':
              var _help = "我的單位有:\n" + 
                          "公尺、公分、碼、英呎、英吋、公里、英里、磅、公斤、公克、盎司、華氏、攝氏、公升、毫升、加侖\n" + 
                          "跟我講\"數字 空白 單位(英文縮寫)\"\n" + 
                          "例如: 5 M，3 lb\n" + 
                          "指令: !help, !units";
              var _units = "公尺(m), 公分(cm), 碼(yd), 英呎(ft), 英吋(in/inch), 英里(mi), 公里(km), 磅(lb), 公斤(kg), 公克(g), 盎司(oz), 華氏(f), 攝氏(c), 公升(l), 毫升(ml), 加侖(gal)";
              var _join = '你哪個單位的?\n 蛤' + userName + '? 你哪個單位的?\n注意了還動阿 ?';
              var _hint = "對不起... 我不知道你哪個單位的 QQQQ...\n輸入指令!units看支援的單位\n或者是不是少了\"空格\"呢?\n例如: 5 M，3 lb";
              
              var _m = '公尺(m)';
              var _cm = '公分(cm)';
              var _yd = '碼(yd)';
              var _ft = '英呎(ft)';
              var _inch = '英吋(inch)';
              var _km = '公里(km)';
              var _mi = '英里(mi)';
              var _lb = '磅(lb)';
              var _kg = '公斤(kg)';
              var _g = '公克(g)';
              var _oz = '盎司(oz)';
              var _f = '華氏(°f)';
              var _c = '攝氏(°c)';
              var _l = '公升(l)';
              var _ml = '毫升(ml)';
              var _gal = '加侖(gal)';
              break;
            default :
              var _help = 'I support the following units:\n' + 
                          'meter, centimeter, yard, feet, inch, mile, kilometer, pound, kilogram, gram, ounce, fahrenheit, celsius, liter, millilitre, gallon\n' + 
                          'Type: \"number space unit(symbol)\"' + 
                          'e.g: 5 M, 3 lb' + 
                          'instruction: !help, !units';
              var _units = 'meter(m), centimeter(cm), yard(yd), feet(ft), inch(in/inch), mile(mi), kilometer(km), pound(lb), kilogram(kg), ' + 
                           'gram(g), ounce(oz), fahrenheit(f), celsius(c), liter(l), millilitre(ml), gallon(gal)';
              var _hint = 'I am sorry, I cannot recognize what is the unit you used...\nType !units to see the supported units,\n' + 
                          'or maybe a \"space\" is missing?\ne.g: 5 M, 3 lb';
              
              var _m = 'm';
              var _cm = 'cm';
              var _yd = 'yd'
              var _ft = 'ft';
              var _inch = 'inch';
              var _km = 'km';
              var _mi = 'mi';
              var _lb = 'lb';
              var _kg = 'kg';
              var _g = 'g';
              var _oz = 'oz';
              var _f = '°f';
              var _c = '°c';
              var _l = 'l';
              var _ml = 'ml';
              var _gal = 'gal';
              break;
          }
        /* unused variable
        var groupId = event.source.groupId;
        var timeStamp = event.timestamp;
        */
        var sourceId = LineHelpers.getSourceId(event.source);
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
              replyMsg(replyToken, _help, channelToken);
              break;
            }
            if(messageText.toLowerCase() === "!units"){
              replyMsg(replyToken, _units, channelToken);
              break;
            }

            if(messageText.indexOf(" ") === -1){
              if (res.length === 1 && /^[0-9A-Za-z]+$/.test(res[0])){
                replyMsg(replyToken, _hint, channelToken);
                break
              }
              break;
            }
            else if (res.length != 2 || isNaN(res[0]) || !/^[A-Za-z]+$/.test(res[1]) ){
              if (res.length === 1){
                replyMsg(replyToken, _hint, channelToken);
                break
              }
              if(!(unit === "ft" && /[‘“\"\']/.test(res[0])))
                break;
            }

            if (unit.toLowerCase() === "m"){
              var totalInchs = number * 39.3700787;
              var feets = totalInchs / 12;
              var inchs = ((feets - parseInt(feets)) * 12).toFixed(2);

              replyMessageText = number + ` ${_m} ` + "\n= " + parseInt(feets) + ` ${_ft} ` + inchs + ` ${_inch}\n= ` + 
              feets.toFixed(2) + ` ${_ft}\n= ` + totalInchs.toFixed(2) + ` ${_inch}`;
            }
            else if (unit.toLowerCase() === "cm"){
              var feets = number / 30.48;
              var totalInchs = number * 0.393700787;
              var inchs = ((feets - parseInt(feets)) * 12).toFixed(2);

              replyMessageText = number + ` ${_cm} \n= ` + parseInt(feets) + ` ${_ft} ` + inchs + ` ${_inch}\n= ` + 
              feets.toFixed(2) + ` ${_ft}\n= ` + totalInchs.toFixed(2) + ` ${_inch}`;
            }
            else if (unit.toLowerCase() === "yd"){
              var cm = number * 91.44;
              var ft = number * 3;
              var inch = ft * 12;
              replyMessageText = number + ` ${_yd} \n= ` + cm.toFixed(2) + ` ${_cm}\n= ` + ft + `${_ft}\n= ` + inch + ` ${_inch}`;
            }
            else if (unit.toLowerCase() === "ft"){
              if(/^[0-9]+$/.test(number)){
                var cm = number * 30.48;
                var inchs = number * 12;
                replyMessageText = number + ` ${_ft} \n= ` + inchs + ` ${_inch}\n= ` + cm.toFixed(2) + ` ${_cm}`;
              }
              else{
                number = number.split(/['“‘”\"]/);
                var feets = parseInt(number[0]);
                var inchs = parseInt(number[1]);
                if(isNaN(feets) || isNaN(inchs)){
                  replyMsg(replyToken, _hint, channelToken);
                  break;
                }
                var cm = (feets * 12 + inchs) * 2.54;
                replyMessageText = feets + ` ${_ft} ` + inchs + ` ${_inch} \n= ` + cm.toFixed(2) + ` ${_cm}`;
              }
              
            }
            else if (unit.toLowerCase() === "in" || unit.toLowerCase() === "inch"){
              var cm = number * 2.54;
              var feets = number / 12;
              replyMessageText = number + ` ${_inch}\n= ` + feets.toFixed(2) + ` ${_ft} \n= ` + cm.toFixed(2) + ` ${_cm}`;
            }
            else if (unit.toLowerCase() === "mi"){
              var km = number / 0.62137;
              replyMessageText = number + ` ${_mi} \n= ` + km.toFixed(2) + ` ${_km}`;
            }
            else if (unit.toLowerCase() === "km"){
              var km = number * 0.62137;
              replyMessageText = number + ` ${_km} \n= ` + km.toFixed(2) + ` ${_mi}`;
            }
            else if (unit.toLowerCase() === "lb"){
              var kg = number * 0.45359237;
              var oz = number * 16;
              var g = number * 453.59237;
              replyMessageText = number + ` ${_lb} \n= ` + kg.toFixed(2) + ` ${_kg}\n= ` + 
                oz.toFixed(2) + ` ${_oz}\n= ` + g.toFixed(2) + ` ${_g}`;
            }
            else if (unit.toLowerCase() === "kg"){
              var lb = number * 2.20462262;
              var oz = number * 35.2739619;
              replyMessageText = number + ` ${_kg} \n= ` + lb.toFixed(2) + ` ${_lb}\n= ` + 
                oz.toFixed(2) + ` ${_oz}`;
            }
            else if (unit.toLowerCase() === "g"){
              var lb = number * 0.0022046226;
              var oz = number * 0.0352739619;
              replyMessageText = number + ` ${_g} \n= ` + lb.toFixed(2) + ` ${_lb}\n= ` + 
                oz.toFixed(2) + ` ${_oz}`;
            }
            else if (unit.toLowerCase() === "oz"){
              var lb = number * 0.0625;
              var kg = number * 0.0283495231;
              var g = number * 28.3495231;
              var ml = number / 0.033814;
              replyMessageText = number + ` ${_oz} \n= ` + kg.toFixed(2) + ` ${_kg}\n= ` + 
                lb.toFixed(2) + ` ${_lb}\n= ` + g.toFixed(2) + ` ${_g}\n= ` + ml.toFixed(2) +` ${_ml}`;
            }
            else if (unit.toLowerCase() === "f"){
              var c = (number - 32) * 5 / 9;
              replyMessageText = number + ` ${_f} \n= ` + c.toFixed(2) + ` ${_c}`;
            }
            else if (unit.toLowerCase() === "c"){
              var f = number * 9 / 5 + 32;
              replyMessageText = number + ` ${_c} \n= ` + f.toFixed(2) + ` ${_f}`;
            }
            else if (unit.toLowerCase() === "l"){
              var gal = number * 0.26417;
              var oz = number * 33.814;
              replyMessageText = number + ` ${_l} \n= ` + gal.toFixed(2) + ` ${_gal}\n= ` + oz.toFixed(2) + ` ${_oz}`;
            }
            else if (unit.toLowerCase() === "ml"){
              var gal = number / 264.17;
              var oz = number * 0.033814;
              replyMessageText = number + ` ${_ml} \n= ` + gal.toFixed(2) + ` ${_gal}\n= ` + oz.toFixed(2) + ` ${_oz}`;
            }
            else if (unit.toLowerCase() === "gal"){
              var l = number / 0.26417;
              var ml = l / 1000;
              var oz = l * 33.814;
              replyMessageText = number + ` ${_gal} \n= ` + l.toFixed(2) + ` ${_l}\n= ` + ml.toFixed(2) 
              + ` ${_ml}\n= ` + oz.toFixed(2) + ` ${_oz}`;
            }
            else{
              replyMessageText = _hint;
              console.log('User Type :' + messageText);
            }
            console.log('Reply: ' + replyMessageText);
            replyMsg(replyToken, replyMessageText, channelToken);
            break;
          case 'join':
            if(lang === 'zh-Hant')
              pushMsg(channelToken, _join, sourceId);

            pushMsg(channelToken, _help, sourceId);
            pushMsg(channelToken, _units, sourceId);
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
            if(lang === 'zh-Hant')
              pushMsg(channelToken, _join, sourceId);

            pushMsg(channelToken, _help, sourceId);
            pushMsg(channelToken, _units, sourceId);
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

