package controllers

import (
	"github.com/astaxie/beego"
)

type Controller struct {
	beego.Controller
}

func (c *Controller)Index() {
	c.TplName = "index.html"
}

func (c *Controller)Main() {
	c.TplName = "main.html"
}
