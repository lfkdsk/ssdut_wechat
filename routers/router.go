package routers

import (
	"ssdut_wechat/controllers"
	"github.com/astaxie/beego"
)

func init() {

	//beego.SetStaticPath("static","public");

	beego.AutoRouter(&controllers.Controller{});

	beego.Router("/", &controllers.ContentController{});

	beego.Router("/content/?:id",
		&controllers.ContentController{},
		"*:Content");
	//beego.Router("/upload/?:id",
	//	&controllers.UploadControllers{},
	//	"get:GetPic");

	beego.Router("/admin/tokenget",
		&controllers.ContentController{},
		"post:TokenGet");

	beego.Router("/admin/login",
		&controllers.LoginController{},
		"get:Login");
	beego.Router("/admin/jump",
		&controllers.LoginController{},
		"post:Jump")

	beego.Router("/admin/index",
		&controllers.LoginController{},
		"*:Admin_Index");

	//beego.Router("/upload",
	//	&controllers.UploadControllers{},
	//	"*:UpLoad");

	beego.Router("/uploadfile",
		&controllers.UploadControllers{},
		"post:GetUploadFile")

	beego.Router("/gethistory",
		&controllers.ContentController{},
		"post:GetHistory");

	beego.Router("/execode",
		&controllers.ContentController{},
		"post:ExeCode");

	//beego.Router("/getfiletoken",
	//	&controllers.UploadControllers{},
	//	"get:GetFileToken");


}
