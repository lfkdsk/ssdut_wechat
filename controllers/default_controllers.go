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
	request := this.Ctx.Request;
	request.ParseForm();
	username := request.Form["username"][0];
	token := models.GetToken(username);
	fmt.Println(username);
	fmt.Println(token);
	models.Bm.Put(username, token, 60);

	if models.Bm.IsExist(username) {
		fmt.Println("fuck");
	}


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

	request := this.Ctx.Request;
	request.ParseForm();
	username := request.Form["username"][0];
	user := models.User{Name:username};
	err := o.Read(&user, "Name");

	if err == orm.ErrNoRows {
		fmt.Println("cannot find him");
		this.Ctx.WriteString("fuck find");
		return
	}else {
		//token := request.Form["token"][0];
		psw := request.Form["password"][0];

		//fmt.Println("token " + token + " stoken " +
		//reflect.ValueOf(models.Bm.Get(username)).Elem().Field(0).String());

		fmt.Println(username);


		if models.Bm.IsExist(username) {
			fmt.Println("fuck");
		}


		fmt.Println("psw " + psw + " spsw " + user.Psw);

		if (user.Psw == psw) {
			this.Ctx.WriteString("1");
			this.Ctx.Redirect(302, "/admin/index");
		} else {
			this.Ctx.WriteString("fuck psw");
			return
		}

	}
}