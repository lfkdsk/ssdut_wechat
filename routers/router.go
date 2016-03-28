package routers

import (
	"ssdut_wechat/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.Controller{})
	beego.Router("/main.html", &controllers.MainController{})
}
