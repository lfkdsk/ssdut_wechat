package models

import (
	"time"
	"crypto/md5"
	"encoding/hex"
	"github.com/astaxie/beego/orm"
	"fmt"
)

func GetToken(username string) string {
	current_time := time.Now().Unix();
	h := md5.New();
	h.Write([]byte(username + string(current_time)));
	return hex.EncodeToString(h.Sum(nil));
}

func GetContentItem(typename string) []Content {
	o := orm.NewOrm();
	var contents []Content;
	num, err := o.QueryTable("Content").Filter("Type", typename).All(&contents);

	if err != nil {
		fmt.Println("error in qs" + typename);
		return nil;
	}else {
		fmt.Println(num);
		return contents;
	}
}

func UpdateContentItem(content *Content) {
	o := orm.NewOrm();
	o.Using("Content");
	num, err := o.Update(content);
	if err != nil {
		fmt.Println(err);
	}else {
		fmt.Println("update" + string(num));
	}
}
