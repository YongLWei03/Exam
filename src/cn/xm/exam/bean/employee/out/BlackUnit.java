package cn.xm.exam.bean.employee.out;

import java.util.Date;

import org.apache.struts2.json.annotations.JSON;

public class BlackUnit {
    private Integer blackunitid;

    private String unitname;

    private String description;

    private Date addtime;

    public Integer getBlackunitid() {
        return blackunitid;
    }

    public void setBlackunitid(Integer blackunitid) {
        this.blackunitid = blackunitid;
    }

    public String getUnitname() {
        return unitname;
    }

    public void setUnitname(String unitname) {
        this.unitname = unitname == null ? null : unitname.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
    @JSON(format="yyyy-MM-dd hh:mm:ss")
    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }
}