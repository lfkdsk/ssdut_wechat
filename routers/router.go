package routers

import (
	"ssdut_wechat/controllers"
	"github.com/astaxie/beego"
)

func init() {

	beego.AutoRouter(&controllers.Controller{})
	beego.Router("content/?:id", &controllers.ContentController{},
		"*:Content")
}
