### 微信小程序日历
---
##### 如何生成一个日历
1. 获取当月的天数
2. 获取当月第一天是星期几
3. 获得当月的数组

1. 获取当月的天数

首先判断是不是闰年

	// 是否闰年
	const _isLeapYear = (year) => {
	  return (((year % 4) === 0 ) && ((year % 100) !== 0)) || (((year % 100) === 0) && ((year % 400) === 0))
	}
	// 获取当月对应总天数
	const month_days = (year) => {
      //     1月     2月                 3月  4月 5月 6月 7月 8月 9月 10月11月12月
	  return [31, 28 + _isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	}

2. 当月第一天是星期几

	// 返回每个月第一天星期几  date = year - month
	const _firstMonth = (yearMonth) => {
	  return new Date(yearMonth + '-01').getDay()
	}

3. 获取当月的数组

第一天前面的全是为空
	
	// 获取每个月的总天数arr   date = year - month
	const getMonthArr = (date) => {
	  let arr = date.split('-')
	  let year = arr[0]
	  let month = arr[1] - 0
	  let monthArr = []
	
	  let totalLength = month_days(year)[month - 1]
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

4. 跨年的上一个月，下一个月
	判断月份是否超过12，以及是否小于1