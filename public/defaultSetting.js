/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/*
 * @Author: shen
 * @Date: 2022-10-15 19:52:38
 * @LastEditors: shen
 * @LastEditTime: 2022-10-15 22:29:19
 * @Description: 
 */
(function(win){
  // 此配置是为了不用编译发布，快速替换生产环境默认配置
  // 支持全量替换和部分配置替换，会合并配置
  // 例如：开启灰度模式，只需打开grayMode注释，并修改值为true即可
  var defaultSetting = {
    // themeColor:'#ff4d4f', //系统主题色
    // colorWeak: false, //色弱模式
    // grayMode: false, //灰度模式
    // pageStyle: 'light',
    // layout: 'side',
    // siderCollapsed: false,
    // fixedHeader: true,
    // fixSiderbar: true,
    // siderWidth: 208,
    // headerHeight: 48,
    // dragSidebar: false,
    // collapsePosition: 'top',
    // showHeader: true,
    // showSiderbar: true,
    // showBreadcrumbs: true,
    // showLogo: true,
    // showFooter: true,
    // showCollapseButton: true,
    // fullContent: false,
    // accordionMenu: true
  }

  // 清除用户setting缓存，保证用户使用最新的配置，打开注释默认执行，可以根据场景自行修改此方法
  // function clearSettingCache() {
  //   var checkCache = win.localStorage.getItem('__APP__CHECK__CACHE__')
  //   if(!checkCache) {
  //     win.localStorage.removeItem('__APP__SETTING__')
  //     win.localStorage.setItem('__APP__CHECK__CACHE__', 1)
  //   }
  // }
  
  // clearSettingCache()

  win.APP_DEFAULT_SETTING = defaultSetting || {}
})(window)