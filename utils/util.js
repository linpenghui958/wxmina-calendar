const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const month_days = (year) => {
      //  1月     2月                 3月  4月 5月 6月 7月 8月 9月 10月11月12月
  return [31, 28 + _isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

// 是否闰年
const _isLeapYear = (year) => {
  return (((year % 4) === 0 ) && ((year % 100) !== 0)) || (((year % 100) === 0) && ((year % 400) === 0))
}

// 返回每个月第一天星期几  date = year - month
const _firstMonth = (yearMonth) => {
  return new Date(yearMonth + '-01').getDay()
}

// 获取每个月的总天数arr   date = year - month
const _getMonthArr = (date) => {
  let arr = date.split('-')
  let year = arr[0]
  let month = arr[1] - 0
  let monthArr = []

  let totalLength = month_days(year)[month]
  let emptyLength = _firstMonth(`${year}-${month}`) 
  emptyLength =  emptyLength > 0 ? emptyLength - 1 : 6

  for (let i = 0; i < emptyLength; i++) {
    monthArr.push({
      num: '',
      val: ''
    })
  }

  for (let i = 1; i < totalLength + 1; i++) {
    let val = `${year}-${formatNumber(month)}-${formatNumber(i)}`
    monthArr.push({
      num: i,
      val: val
    })
  }
  
  return monthArr
}

module.exports = {
  formatTime: formatTime,
  _isLeapYear,
  _firstMonth,
  _getMonthArr
}
