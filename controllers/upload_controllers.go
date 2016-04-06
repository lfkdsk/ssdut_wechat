package controllers

import (
	"github.com/astaxie/beego"
	"ssdut_wechat/models"
)

type UploadControllers struct {
	beego.Controller
}

func (this *UploadControllers)UpLoadFile() {
	models.UpFile("/Users/liufengkai/Downloads/js-sdk-master/demo/views/index.html");
	return
}

func (this *UploadControllers)GetFileToken() {
	this.Ctx.WriteString(`{
    "uptoken": "0MLvWPnyya1WtPnXFy9KLyGHyFPNdZceomL..."
}`);
}