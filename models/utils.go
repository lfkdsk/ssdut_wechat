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

func GetSessionNum(username string) string {
	current_time := time.Now().Unix();
	h := md5.New();
	h.Write([]byte(username + string(current_time)));
	return hex.EncodeToString(h.Sum(nil));}

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

func UpdateContentItem(content *Content) (int64, error) {
	o := orm.NewOrm();
	o.Using("Content");
	num, err := o.Update(content);
	return getError(num, err);
}

func InsertContentItem(content *Content) (int64, error) {
	o := orm.NewOrm();
	o.Using("Content");
	num, err := o.Insert(content);
	return getError(num, err);
}

func DeleteContentItem(content *Content) (int64, error) {
	o := orm.NewOrm();
	o.Using("Content");
	num, err := o.Delete(content);
	return getError(num, err);
}

func SetItemTrue(content *Content) (int64, error) {
	o := orm.NewOrm();
	o.Using("Content");
	num, err := o.QueryTable("Content").Filter("Type", content.Type).Update(orm.Params{"Istrue":0});
	if err != nil {
		return getError(num, err);
	}else {
		content.Istrue = 1;
		number, errol := UpdateContentItem(content);
		return getError(number, errol);
	}
}

func getError(num int64, err error) (int64, error) {
	if err != nil {
		fmt.Println(err);
		return 0, err;
	}else {
		fmt.Println(string(num));
		return num, nil;
	}
}