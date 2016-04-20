package controllers

import (
	"ssdut_wechat/models"
	"fmt"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego"
	"github.com/bitly/go-simplejson"
	"encoding/json"
)

type ContentController struct {
	beego.Controller
}

func (c *ContentController)Content() {
	//c.TplName = "content/" + c.Ctx.Input.Param(":id");
	fmt.Println(c.Ctx.Input.Param(":id"));
	if c.Ctx.Input.Param(":id") != "content.html" {
		c.Data["Content"] = models.GetContentTrueItem(c.Ctx.Input.Param(":id"))[0].Content;
		c.TplName = "content/content.html"
	}else {
		c.TplName = "content/content.html"
	}
	return
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

func (this *ContentController)GetHistory() {
	request := this.Ctx.Request;
	request.ParseForm();

	user_sess := this.GetSession(request.RemoteAddr);

	if user_sess != nil {
		label_name := request.Form["label"][0];
		contents := models.GetContentItem(label_name);
		res, err := json.Marshal(contents);
		fuck_error("gethistory", err);
		this.Ctx.WriteString(string(res));
	}
	return
}


/**
	{
		label:name,
		code:code_type,(update,add,delete,show)
		istrue:"0"/"1"
		content:{
			Id         int
			Type       string
			Istrue     int
			Content    string
			Modifytime string
		}
	}
 */
func (this *ContentController)ExeCode() {
	request := this.Ctx.Request;
	request.ParseForm();

	user_sess := this.GetSession(request.RemoteAddr);
	if user_sess != nil {
		fmt.Println(request.Body);
		// get label
		code_type := request.Form["code"][0];
		var content_temp models.Content;
		fuck_error("fuck json to content",
			json.Unmarshal([]byte(request.Form["content"][0]), &content_temp));
		switch code_type {
		case "add":
			_, e := models.InsertContentItem(&content_temp);
			return_code(e, this);
			break
		case "update":
			_, e := models.UpdateContentItem(&content_temp);
			return_code(e, this);
			break
		case "delete":
			fmt.Println(content_temp.Content);
			_, e := models.DeleteContentItem(&content_temp);
			return_code(e, this);
			break
		case "show":
			_, e := models.SetItemTrue(&content_temp);
			return_code(e, this);
			break
		}
		//if request.Form["code"][0] == "1" {
		//	models.SetItemTrue(&content_temp);
		//}
	} else {
		this.Ctx.WriteString("页面过期");
	}
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
	} else {
		this.Ctx.Redirect(302, "/admin/login");
		return
	}

}

func (this *LoginController)Jump() {
	o := orm.NewOrm();
	o.Using("User");

	request := this.Ctx.Request;
	request.ParseForm();

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
	} else {
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

func return_code(e error, this *ContentController) {
	if e != nil {
		this.Ctx.WriteString(`{"msg"="0"}`);
	} else {
		this.Ctx.WriteString(`{"msg"="1"}`);
	}
}