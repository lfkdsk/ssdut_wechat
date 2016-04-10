package main

import (
	_ "ssdut_wechat/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "ssdut_wechat/models"
	//"ssdut_wechat/models"
	//"fmt"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)

	orm.RegisterDataBase("User", "mysql", "root:19960206A@/defa?charset=utf8");

	orm.RegisterDataBase("Content", "mysql", "root:19960206A@/defa?charset=utf8");

	orm.RegisterDataBase("default", "mysql", "root:19960206A@/defa?charset=utf8");

}

func main() {

	//var cons []models.Content = models.GetContentItem("about_college");
	//
	//fmt.Println(cons);
	//
	//models.SetItemTrue(&cons[0]);

	beego.Run();
}


