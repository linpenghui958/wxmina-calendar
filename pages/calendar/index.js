//index.js
//获取应用实例
const app = getApp()

const DECEMBER = 12;
const JANUARY = 1;

import utils from '../../utils/util'

Page({
  data: {
    weeksCh: [ '一', '二', '三', '四', '五', '六', '日' ],
    monthArr: [],
    selectDay: null,
    calendarYear: null,
    calendarMonth: null,
    calendarTitle: null,
    startClientX: 0,
    state: '',
    // swiper配置
    circular: true,
    swiperArr: []
  },
  onLoad: function () {
    this._initSetDay()
    this._initCalendar()
  },
   _initSetDay() {
    const { year, month, str} = utils.getTodayStr()
    this.setData({
      selectDay: str,
      calendarYear: year,
      calendarMonth: month
    })
  },
  _initCalendar() {
    const year = this.data.calendarYear
    const month = this.data.calendarMonth
    const dateStr = `${year}-${month}`
    this.getMonthArr(dateStr)
    this._changeCalendarTitle()
  },
  _changeCalendarTitle () {
    const pickerStr = `${this.data.calendarYear}-${this.data.calendarMonth}`
    this.setData({
      calendarTitle: pickerStr
    })
  },
  getMonthArr(date) {
    const monthArr = utils.getMonthArr(date)
    this.setData({
      monthArr: monthArr
    })
    swiperArr[0] = monthArr.splice(0, 7)
    swiperArr[1] = monthArr.splice(0, 7)
    swiperArr[2] = monthArr.splice(0, 7)
  },
  tapDay(e) {
    const dayStr = e.currentTarget.dataset.val
    console.log(`选中的日期为${dayStr}`)
    this.setData({
      selectDay: dayStr
    })
  },
  // 前一个月
  bindLastMonth () {
    let lastMonth = this.data.calendarMonth - 1
    let year = this.data.calendarYear
    if (lastMonth > 0) {
      this.setData({
        calendarMonth: lastMonth
      })
    } else {
      this.setData({
        calendarMonth: DECEMBER,
        calendarYear: year - 1
      })
    }
    this._initCalendar()
  },
  // Next month
  bindNextMonth () {
    let nextMonth = this.data.calendarMonth + 1
    let year = this.data.calendarYear
    if (nextMonth < 12) {
      this.setData({
        calendarMonth: nextMonth
      })
    } else {
      this.setData({
        calendarMonth: JANUARY,
        calendarYear: year + 1
      })
    }
    this._initCalendar()
  },

  bindPickerChange(e) {
    console.log(e)
    const pickerStr = e.detail.value
    const arr = pickerStr.split('-')
    this.setData({
      calendarTitle: pickerStr,
      calendarMonth: arr[1],
      calendarYear: arr[0]
    })
    this._initCalendar()
  },

})
