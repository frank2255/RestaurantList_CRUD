#餐廳清單
=======

## **環境建置與需求**

for windows, MacOS

* Visual Studio Code - 開發環境
* Express: ^4.17.1 - 應用程式架構
* Express-Handlebars: ^3.1.0 - 模板引擎
* MongoDB 4.0.13- https://www.mongodb.com/try/download/community
	
## **安裝與執行步驟**

1.在github下載RestaurantList_CRUD專案

	git clone https://github.com/frank2255/RestaurantList_CRUD.git 

2.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

	$ cd Restaurant_list 
	
	$ npm packages

	$ npm install
	
3.上傳餐廳名單seeds到資料庫
	
	$ npm run seeder
	
	> db connected!
	> restaurantLists are created!

4.執行App

	$ npm run dev

	> App is running
	> mongodb connected!

5.開啟網址 http://localhost:3000

## 系統網址
Heroku
	IP Address
	https://frozen-castle-92890.herokuapp.com/


## **功能描述**

#### 餐廳清單

使用者可以在首頁看到所有餐廳與它們的簡單資料以及新增：
* 餐廳照片
* 餐廳名稱
* 餐廳分類
* 餐廳評分


使用者可以再點進去看餐廳的詳細資訊並編輯或刪除：
* 類別
* 地址
* 電話
* 描述
* 圖片

