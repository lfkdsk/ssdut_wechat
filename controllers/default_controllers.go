package controllers

import (
	"github.com/astaxie/beego"
	"ssdut_wechat/models"
	"fmt"
	"github.com/astaxie/beego/orm"
)

type Controller struct {
	beego.Controller;
}

func (c *Controller)Index() {
	c.TplName = "index.html";
}

func (c *Controller)Main() {
	c.TplName = "main.html";
}

// content

type ContentController struct {
	beego.Controller
}

func (c *ContentController)Content() {
	c.TplName = "content/" + c.Ctx.Input.Param(":id");
}

func (c *ContentController)Get() {
	c.TplName = "index.html";
}

func (this *ContentController)TokenGet() {
	fmt.Print(this.GetString("username"));
	token := models.GetToken(this.GetString("username"));
	fmt.Println(token);
	models.Bm.Put(this.GetString("username"), token, 60);
	this.Ctx.WriteString(token);
	return
}

type LoginController struct {
	beego.Controller
}

func (c *LoginController)Login() {
	c.TplName = "admin/login.html";
}

func (this *LoginController)Admin_Index() {
	this.TplName = "admin/index.html";
}

func (this *LoginController)Jump() {
	o := orm.NewOrm();
	o.Using("User");

	fmt.Println(this.GetString("username"))
	username := this.GetString("username");
	user := models.User{Name:username};
	err := o.Read(&user, "Name");
	if err == orm.ErrNoRows {
		fmt.Println("cannot find him");
		this.Ctx.WriteString("fuck find")
		return
	}else {
		token := this.GetString("token");
		psw := this.GetString("password");
		if (user.Psw == psw &&
		models.Bm.Get(username) == token) {
			this.Ctx.Redirect(302, "/admin/index");
		} else {
			this.Ctx.WriteString("fuck psw");
			return
		}

	}
}