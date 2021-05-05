# 18house-app

- v1.1.1(展示用專案)  
  *修正在不同尺寸下 slider box 定位問題  
  *將 form 改為 controll component form  
  *加入 lazy loading  
  *將 fill item 與 input item 功能界定  
  \*嘗試將原先 codeing style 簡化 減少 node 深度

- 使用工具  
  套件管理工具 npm  
  Create React App  
  內建 webpack babel scss  
  Single-page Application  
  Client-side Render

- 使用 React 相關  
  reactJS v17  
  Function Component  
  Hook

- 使用主要套件  
  react-router  
  react-redux  
  reduxjs/toolkit

- 測試資料使用  
  Cloud Firestore

### 資料夾結構

- src

  - adapters
    　　將 api 回傳的資料, 轉成 components 支援的格式

  - apis
    　　 api 集合

  - common
    　　通用函數

  - components + combo
    　　內含其他 component

  - page
    　　主要頁面

  - reducers
    　　 reduce 與 store

  - route.js
    　　 for react-router

### HTML 撰寫風格

class = {通用名稱}\_{層級名稱} stylenum = {功能樣式(可省略)}

> class="list_item" stylenum="header_menu"

層級名稱 : block > box > item

> 層級可包含同層, 但不可包含大於之層數

### 其他命名規則

- 檔案名稱  
  Component 以"大駝峰式"命名方式(自動建立除外)  
  其餘 JS 以"小駝峰式"命名方式(包含 reducer)

- 變數名稱  
  javascript variable 名稱 以"小駝峰式"命名方式

### RWD 相關

window 劃分 以 Bootstrap(ver4) 為主

_by Solomon_
