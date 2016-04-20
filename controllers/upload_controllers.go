package controllers

import (
	"github.com/astaxie/beego"
	"fmt"
)

type UploadControllers struct {
	beego.Controller
}

func (this *UploadControllers)GetUploadFile() {
	fmt.Println(this.Ctx.Request.Form);
	f, h, _ := this.GetFile("file"); //获取上传的文件
	//if err != nil {
	//	fmt.Println("fuck");
	//} else {
	//	fmt.Println("good");
	//}
	//fmt.Println(h.);
	f.Close();
	e := this.SaveToFile("file", "/Users/liufengkai/Documents/gowork/src/ssdut_wechat/static/media/img/" + h.Filename);
	//fmt.Println(e);
	if e != nil {
		this.Ctx.WriteString(`{"msg"="0"}`);
	} else {
		this.Ctx.WriteString(`http://localhost:8080/static/media/img/` + h.Filename);
	}
	return
}


