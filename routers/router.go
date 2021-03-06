package routers

import (
	"ssdut_wechat/controllers"
	"github.com/astaxie/beego"
)

func init() {

	beego.AutoRouter(&controllers.Controller{});

	beego.Router("/", &controllers.ContentController{});

	beego.Router("/content/?:id",
		&controllers.ContentController{},
		"*:Content");

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

	beego.Router("/uploadfile",
		&controllers.UploadControllers{},
		"post:GetUploadFile")

	beego.Router("/gethistory",
		&controllers.ContentController{},
		"post:GetHistory");

	beego.Router("/execode",
		&controllers.ContentController{},
		"post:ExeCode");

	beego.Router("/changepsw",
		&controllers.ContentController{},
		"get:ChangePsw");

	beego.Router("/cpsw",
		&controllers.ContentController{},
		"post:Cpsw");

}
