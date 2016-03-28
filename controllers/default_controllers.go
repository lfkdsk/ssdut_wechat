package controllers

import (
	"github.com/astaxie/beego"
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

func (c *Controller)Content() {
	if c.Ctx.Input.Param(":id") == "" {
		c.TplName = "content/content.html";
	}else {
		c.TplName = "content/" + c.Ctx.Input.Param(":id") + ".html";
	}
}