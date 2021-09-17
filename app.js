"use strict";

function reverseStr(str){
  return str.split('').reverse().join('');
}



function isPalindrome(str){
  var reverse=reverseStr(str);
  return str===reverse;
}


function convertDatetoStr(date){
  var dateStr={
    day:"",
    month:"",
    year:""
  }

  if(date.day<10){
    dateStr.day="0"+date.day;
  }
  else{
    dateStr.day=date.day.toString();
  }

  if(date.month<10){
    dateStr.month="0"+date.month;
  }
  else{
    dateStr.month=date.month.toString();
  }

  dateStr.year=date.year.toString();

  return dateStr;
}


function getDateFormats(date){
  var dateStr=convertDatetoStr(date);

  var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
  var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
  var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
  var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
  var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
  var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}



function checkPalindromeforAllFormats(date){
  var listofFormats=getDateFormats(date);
  var flag=false;

  for(var i=0;i<listofFormats.length;i++){
    if(isPalindrome(listofFormats[i])){
      flag=true;
      break;
    }
  }
  return flag;
}

function isleapYear(year){
  return ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0));
}


function getNextDate(date){
  var day=date.day+1;
  var month=date.month;
  var year=date.year;
  var daysInMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(month == 2){
    if(isleapYear(year)){
      if(day>29){
        day=1;
        month++;
      }
    }
    else{
      if(day>28){
        day=1;
        month++;
      }
    }
  }
  else{
    if(day>daysInMonth[month-1]){
      day=1;
      month++;
    }
  }

  if(month>12){
    month=1;
    year++;
  }

  return {
    day:day,
    month:month,
    year:year
  }
}


function getNextPalindromeDate(date){
  var nextcount=0;
  var nextDate=getNextDate(date);

  while(1){
    nextcount++;
    var palindrome=checkPalindromeforAllFormats(nextDate);
    if(palindrome){
      break;
    }
    nextDate=getNextDate(nextDate);
  }
  return [nextcount,nextDate];
}


var form=document.forms[0];
var message=document.querySelector("#output-message");
var inputElement=document.querySelector("#input-id");

function clickHandler(e){
  e.preventDefault();
  // message.innerText="hi"
  // console.log(inputElement.value);
  var bdayStr=inputElement.value;
  var bdayDate=bdayStr.split("-");
  var date={
    day:Number(bdayDate[2]),
    month:Number(bdayDate[1]),
    year:Number(bdayDate[0])
  }
  var isPalindrome=checkPalindromeforAllFormats(date);
  
  if(isPalindrome){
    message.innerText="Yay your birthday is a palindrome 🥳🥳"
  }
  else{
    var [nextcount,nextDate]=getNextPalindromeDate(date);
    message.innerText=`Your nearest palindrome birthday is ${nextDate.day}-${nextDate.month}-${nextDate.year} You missed it by ${nextcount} days `;
  }

}


form.addEventListener("submit",clickHandler)


