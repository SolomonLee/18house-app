# 18house-app
  
  
###資料夾結構  
+ src
    + adapters
	　　將 api 回傳的資料, 轉成 components 支援的格式  
	
    + apis
	　　api 集合
	
    + common
	　　通用函數
	+ components
    	+ combo
		　　內含其他 component
		+ page
		　　主要頁面
  
  
###HTML 撰寫風格  
class = {通用名稱}_{層級名稱} {功能名稱} {功能樣式(可省略)}  
>"list_item menu_list menu_list_style2"  

層級名稱 : block > box > item  
>層級可包含同層, 但不可包含大於之層數  
  
  
###其他命名規則
檔案名稱 以"大駝峰式"命名方式(自動建立除外)  
javascript variable 名稱 以"小駝峰式"命名方式


###RWD 相關
以 Bootstrap(ver4) 為主
  
  
   
*by Solomon*