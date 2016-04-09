# SSDUT_WeChat

## Route 路由

| Router        | Function 		 |params|
| ------------- | ------------- |
| '/'		        | 直接主界面GET   |---|
| '/content/?:id' | 匹配内容       |id匹配内容|
| '/admin/login'| 登陆     |---|   
|'/admin/jump"'|	跳转	|username|
|'/admin/index'| 管理页面|靠自动跳转|
|'/upload'|上传图片路径|msg:{username,token,password}|
|'/gethistory'|获取历史|label类型|
|'/getfiletoken'|获取文件上传token|---|
|'index','main'|页面 |使用了自动路由|

data type
>{label: name, code: code_type(update, add, delete)content: {Id: , Type: , Istrue: , Content: ,Modifytime: }}
## Check方法