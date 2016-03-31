package controllers

import (
	"github.com/astaxie/beego"
	"ssdut_wechat/models"
	"fmt"
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
	fmt.Println(this.Ctx.Input);
	//user := models.User{Name:this.GetString("username")};
	//
	//o := orm.NewOrm();
	//
	//o.Using("User");
	//
	//err := o.Read(user, "Name");
	//
	//o = nil;
	//
	//if err == orm.ErrNoRows {
	//	this.Ctx.WriteString("Cannot find user");
	//	return
	//}else {
	token := models.GetToken("");
	fmt.Println(token);
	this.Ctx.WriteString(token);
	//models.User_Token[token] = user.Name;
	return
	//}
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
	this.Ctx.Redirect(302, "/admin/index");
}