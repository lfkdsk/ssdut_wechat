package main

import (
	_ "ssdut_wechat/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "ssdut_wechat/models"
	"ssdut_wechat/models"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)

	orm.RegisterDataBase("User", "mysql", "root:19960206A@/defa?charset=utf8");

	orm.RegisterDataBase("Content", "mysql", "root:19960206A@/defa?charset=utf8");

	orm.RegisterDataBase("default", "mysql", "root:19960206A@/defa?charset=utf8");

}

func main() {

	o := orm.NewOrm();
	o.Using("Content");

	con := new(models.Content);
	con.Istrue = 1;
	con.Type = "about_college";
	con.Content = `
    <h3>大连理工大学软件学院概况</h3>
    <p>大连理工大学软件学院成立于2000年12月，是大连理工大学直属的学院之一，
        是经国家教育部和国家计委联合批准成立的首批国家示范性软件学院之一。
        目前，学院拥有软件工程一级学科博士点，建有辽宁省泛在网络与服务软件重点
        实验室及辽宁省省级实验教学示范中心，并依托软件学院建立了大连理工大学—立命馆大学国
        际信息与软件学院以及大连理工大学软件工程研究院，形成了一区三院的发展格局。</p>
    <p>学院拥有独立的现代化校园，校区占地78万平方米，建筑面积15万平方米。
        现有教职工184人，在籍学生5100余人。校园环境优美、功能齐全、设备先进、办学条件一流。</p>
    <p>学院坚持以培养精英型软件人才为目标，以提高人才培养质量为核心，积极打造科学研究与学科发展的平台，
        实现人才培养与科学研究协调发展。全院师生员工正在不懈奋斗，努力将学院建设成为高端交叉学科和应用
        技术研究基地、高端科学技术成果孵化和转化基地，高端国际人才培养基地。</p>
    <p><strong>1、校园环境</strong></p>
    <p>教学楼3.9万㎡；宿舍5.1万㎡；图书馆1.9万㎡体育馆1万㎡；创新实践、实验中心、中日国际软件学院1.7万㎡；产学研合作大楼1.4万㎡；综合楼、研究生工作站1.5万㎡。</p>
    <p><strong>2、学生规模</strong></p>
    <img src="../static/media/img/college_content/p1.jpg" alt="">
    <p><strong>3、师资队伍</strong></p>
    <img src="../static/media/img/college_content/p2.jpg" alt="">
    <p><strong>4、“一区三院”的办学格局及目标</strong></p>
    <img src="../static/media/img/college_content/p3.jpg" alt="">
    <p><strong>5、大连理工大学软件学院实验教学中心</strong></p>
    <img src="../static/media/img/college_content/p4.jpg" alt="">
    <p><strong>6、大连理工大学软件工程研究院建设</strong></p>
    <p>研究院位于大连理工大学软件学院内，建筑面积14,000㎡。</p>
    <p>2012年2月，本着”府校合作、共享共赢”的原则，大连金州新区和大连理工大学签署了
        《大连金州新区-大连理工大学共建国家大学科技园战略合作协议》。金州新区首批支持资金700万元，
        软件大厦孵化器补贴100万元（连续三年给予研究院不低于350万元/年的运营支持），
        科技创新平台、公共技术服务平台建设费用：300万元。</p>
    <img src="../static/media/img/college_content/p5.jpg" alt="">
    <p><strong>7、国际化软件人才培养-中日国际软件学院</strong></p>
    <img src="../static/media/img/college_content/p6.jpg" alt="">
    <img src="../static/media/img/college_content/p7.jpg" alt="">
    <p><strong>8、软件学院学生就业情况</strong></p>
    <img src="../static/media/img/college_content/p8.jpg" alt="">
    <img src="../static/media/img/college_content/p9.jpg" alt="">
    <p><strong>9、学科建设与科研</strong></p>
    <img src="../static/media/img/college_content/p10.jpg" alt="">
    <p><strong>10、科研平台</strong></p>
    <img src="../static/media/img/college_content/p11.jpg" alt="">
    <img src="../static/media/img/college_content/p12.jpg" alt="">
    <img src="../static/media/img/college_content/p13.jpg" alt="">
    <p><strong>11、科研团队</strong></p>
    <img src="../static/media/img/college_content/p14.jpg" alt="">
`;

	o.Insert(con);
	beego.Run();
}


