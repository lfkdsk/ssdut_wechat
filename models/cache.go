package models

import (
	"github.com/astaxie/beego/cache"
	"fmt"
)

var Bm, err = cache.NewCache("memory", `{"interval":60}`);

func init() {
	if err != nil {
		fmt.Println("init cache error");
	}else {
		Bm.ClearAll();
	}
}
