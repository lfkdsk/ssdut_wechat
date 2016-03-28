package controllers

import (
	"github.com/astaxie/beego"
)

type Controller struct {
	beego.Controller
}

func (c *Controller) Get() {
	c.TplName = "index.html"
}

type MainController struct {
	beego.Controller
}

func (c *MainController)Get()  {
	c.TplName = "main.html"
}