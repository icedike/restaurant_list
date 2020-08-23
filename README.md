# 我的餐廳清單
一個使用 Node.js + Express 打造的餐廳美食網站，此專案提供使用者查看餐廳訊息，並可透過餐廳名稱尋找餐廳資訊，例如:餐廳類別、地址、評分、描述等

## 功能清單
* 依照餐廳名稱或分類進行搜尋
* 依照餐廳名稱、分類與位置進行排序
* 檢視餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
* 點選"我的餐廳清單"返回首頁瀏覽全部餐廳資料
* 點選照片查看餐廳詳細資料
* 點選加號新增餐廳資料
* 點選刪除來刪除餐廳
* 點選編輯來編輯餐廳資料
* 使用者可以用Facebook 或 Email 註冊登入

## 環境建置與需求
* Node.js v13.12.0
* Express v4.17.1
* Express-Handlebars v5.1.0
* Body-parser v1.19.0
* Mongoose v5.9.25
* bcryptjs v2.4.3
* body-parser v1.19.0
* connect-flash v0.1.1
* dotenv v8.2.0
* express-session v1.17.1
* method-override v3.0.0
* passport v0.4.1
* passport-facebook v3.0.0
* passport-local v1.0.0

## 啟動方式
* 將專案clone到本地端

```
git clone https://github.com/icedike/restaurant_list.git
```

* 切至專案資料夾
```
cd restaurant_list
```

* 安裝套件

```
npm install
```

* 創造DB資料

```
npm run seed
```

* 開啟程式

```
npm run start
```

* 請至 <http://localhost:3000> 開始使用