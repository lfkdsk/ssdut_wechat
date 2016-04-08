package models

import (
	"github.com/qiniu/api.v7/conf"
	"github.com/qiniu/api.v7/kodo"
)

var (
//设置上传到的空间
	bucket = "lfkdsk"
)

type PutRet struct {
	Hash string `json:"hash"`
	Key  string `json:"key"`
}

func init() {
	conf.ACCESS_KEY = "nBoSJzs-AzZY4xW_1-VS7zO5oAtCvN3K_9lAEsUY"
	conf.SECRET_KEY = "cNPJtgok0CkRLpKflkZsj0BMc8-yK1rCr41aQroV"
	kodo.SetMac(conf.ACCESS_KEY, conf.SECRET_KEY)
}

func GetQiNiuToken() string {
	//创建一个Client
	c := kodo.New(0, nil)
	//设置上传的策略
	policy := &kodo.PutPolicy{
		Scope:   bucket,
		//设置Token过期时间
		Expires: 3600,
	}
	//生成一个上传token
	token := c.MakeUptoken(policy);
	//fmt.Println(token);
	return token;
}