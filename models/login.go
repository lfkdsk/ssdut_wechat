package models

import "github.com/astaxie/beego/orm"

type User struct {
	Id   int `beedb:"PK"`
	Name string
	Psw  string
}

var User_Token map[string]string;

func init() {
	orm.RegisterModel(new(User))
	User_Token = make(map[string]string);
}