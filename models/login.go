package models

import "github.com/astaxie/beego/orm"

type User struct {
	Id   int `orm:"PK"`
	Name string
	Psw  string
}

type Content struct {
	Id         int `orm:"PK"`
	Type       string
	Istrue     int
	Content    string
	Modifytime string
}

func init() {
	orm.RegisterModel(new(User), new(Content));
}