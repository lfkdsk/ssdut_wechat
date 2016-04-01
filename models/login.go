package models

import "github.com/astaxie/beego/orm"

type User struct {
	Id   int `beedb:"PK"`
	Name string
	Psw  string
}

type Content struct {
	Id         int `beedb:"PK"`
	Type       string
	Istrue     bool
	Content    string
	ModifyTime string
}

func init() {
	orm.RegisterModel(new(User), new(Content));
}