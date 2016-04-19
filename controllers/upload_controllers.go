package controllers

import (
	"github.com/astaxie/beego"
	"ssdut_wechat/models"
	//"time"
)

type UploadControllers struct {
	beego.Controller
}

func (this *UploadControllers)UpLoad() {
	this.TplName = "upload.html";
}

func (this *UploadControllers)GetUploadFile() {
	f, h, _ := this.GetFile("image"); //获取上传的文件
	path := "./upload/" + h.Filename;
	f.Close()
	this.SaveToFile("image", path)
}

func (this *UploadControllers)GetFileToken() {
	this.Ctx.WriteString(`{"uptoken":` + `"` + models.GetQiNiuToken() + `"` + `}`);
}