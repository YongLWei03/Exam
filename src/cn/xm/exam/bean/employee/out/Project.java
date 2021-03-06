package cn.xm.exam.bean.employee.out;

import java.util.Date;

import org.apache.struts2.json.annotations.JSON;

public class Project {
    private Integer projectid;

    private String unitbigid;

    private String unitid;

    private String name;

    private Date startdate;

    private Date enddate;

    private String contactperson;

    private String phone;

    private String status;

    private String description;

    public Integer getProjectid() {
        return projectid;
    }

    public void setProjectid(Integer projectid) {
        this.projectid = projectid;
    }

    public String getUnitbigid() {
        return unitbigid;
    }

    public void setUnitbigid(String unitbigid) {
        this.unitbigid = unitbigid == null ? null : unitbigid.trim();
    }

    public String getUnitid() {
        return unitid;
    }

    public void setUnitid(String unitid) {
        this.unitid = unitid == null ? null : unitid.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }
    @JSON(format = "yyyy-MM-dd")
    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }
    @JSON(format = "yyyy-MM-dd")
    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getContactperson() {
        return contactperson;
    }

    public void setContactperson(String contactperson) {
        this.contactperson = contactperson == null ? null : contactperson.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}