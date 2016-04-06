package controllers

import (
	"github.com/astaxie/beego"
	"ssdut_wechat/models"

)

type UploadControllers struct {
	beego.Controller
}

func (this *UploadControllers)UpLoad() {
	this.TplName = "upload.html";
}

func (this *UploadControllers)UpLoadFile() {
	return
}

func (this *UploadControllers)GetFileToken() {
	this.Ctx.WriteString(`{"uptoken":` + `"` + models.GetQiNiuToken() + `"` + `}`);
}