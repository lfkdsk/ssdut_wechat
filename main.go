package main

import (
	_ "ssdut_wechat/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "ssdut_wechat/models"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)

	orm.RegisterDataBase("default", "mysql", "root:19960206A@/defa?charset=utf8")

	orm.RegisterDataBase("User", "mysql", "root:19960206A@/defa?charset=utf8")

	orm.RunSyncdb("default", false, true)
}

func main() {

	//o := orm.NewOrm();
	//
	//o.Using("User");
	//


	beego.Run();
}


