package models

import (
	"time"
	"crypto/md5"
	"encoding/hex"
)

func GetToken(username string) string {
	current_time := time.Now().Unix();
	h := md5.New();
	h.Write([]byte(username + string(current_time)));
	return hex.EncodeToString(h.Sum(nil));
}

