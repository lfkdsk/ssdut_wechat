package controllers

import (
	"ssdut_wechat/models"
	"fmt"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego"
)

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
	err := models.Bm.Put(username, token, 60 * 1e9);

	if err != nil {
		fmt.Println("put value error");
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
	request := this.Ctx.Request;
	request.ParseForm();
	username := request.Form["username"];
	if username != nil {
		sess := this.GetSession(username[0]);
		if sess != nil {
			this.TplName = "admin/index.html";
		}else {
			this.Ctx.Redirect(302, "/admin/login");
		}
	}else {
		this.Ctx.Redirect(302, "/admin/login");
	}
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
		token := request.Form["token"][0];
		psw := request.Form["password"][0];

		if (user.Psw == psw && token == models.Bm.Get(username)) {
			this.SetSession(username, models.GetSessionNum(username));
			this.Ctx.WriteString("1");
			this.Ctx.Redirect(302, "/admin/index?username:" + username);
			return
		} else {
			this.Ctx.WriteString("fuck psw");
			return
		}

	}
}
