package models

import (
	"github.com/qiniu/api.v7/conf"
	"fmt"
	"github.com/qiniu/api.v7/kodo"
	"github.com/qiniu/api.v7/kodocli"
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

func UpFile(filepath string) PutRet {
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

	//构建一个uploader
	zone := 0
	uploader := kodocli.NewUploader(zone, nil)

	var ret PutRet
	//调用PutFileWithoutKey方式上传，没有设置saveasKey以文件的hash命名
	res := uploader.PutFileWithoutKey(nil, &ret, token, filepath, nil)
	//打印返回的信息
	fmt.Println("http://7xsnz4.com2.z0.glb.qiniucdn.com/" + ret.Key)
	//打印出错信息
	if res != nil {
		fmt.Println("io.Put failed:", res)
		return ret;
	}
	return ret;
}