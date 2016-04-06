package controllers

import (
	"ssdut_wechat/models"
	"fmt"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego"
	"github.com/bitly/go-simplejson"
)

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

	user_sess := this.GetSession(request.RemoteAddr);

	fmt.Println(request.RemoteAddr);

	if user_sess != nil {
		this.TplName = "admin/index.html";
		return
	}else {
		this.Ctx.Redirect(302, "/admin/login");
		return
	}
}

func (this *LoginController)Jump() {
	o := orm.NewOrm();
	o.Using("User");

	request := this.Ctx.Request;
	request.ParseForm();

	fmt.Println(request.Form)
	msg, json_err := simplejson.NewJson(([] byte(request.Form["msg"][0])));
	fuck_error("json_error", json_err);

	username, username_error := msg.Get("username").String();
	fuck_error("username_error", username_error);

	user := models.User{Name:username};
	err := o.Read(&user, "Name");

	if err == orm.ErrNoRows {
		fmt.Println("cannot find him");
		this.Ctx.WriteString("fuck find");
		return
	}else {
		token, _ := msg.Get("token").String();
		psw, _ := msg.Get("password").String();

		fmt.Println(token)

		if (user.Psw == psw && token == models.Bm.Get(username)) {
			this.SetSession(request.RemoteAddr, models.GetSessionNum(username));
			this.Ctx.WriteString("1");
			this.Ctx.Redirect(302, "/admin/index");
			return
		} else {
			this.Ctx.WriteString("fuck psw");
			return
		}

	}
}

func fuck_error(error_name string, e error) {
	if e != nil {
		fmt.Println(error_name);
		fmt.Println(e);
		return
	}
}