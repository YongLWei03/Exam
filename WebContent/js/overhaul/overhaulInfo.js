/**
 * 
 */
var break_open = false, user_open = false;// 用于记录两个模态框是否打开
// 添加员工
function el_addEmp() {
	$("#el_addEmp").modal();
}

// 表格上违章
function el_breakRulesCase() {
	$("#el_breakRulesCase").modal();
}
// alert("项目名字:"+contextPath+" "+haulId)
// 页面初始化函数
$(function() {
	queryHaulInfo();// 初始化的时候查询大修基本信息

	queryHaulUnit();
	
    // 违章模态框关闭设置全局变量为关闭
    $('#el_bRInfor').on('hidden.bs.modal', function() {
    	break_open = false;
    });
    // 违章模态框关闭设置全局变量为关闭
    $('#employeeModal').on('hidden.bs.modal', function() {
    	user_open = false;
    });
});

/** **S 初始化大修基本信息******* */
function queryHaulInfo() {
	$.post(contextPath + '/haul_getHaulinfoByHaulid.action', {
		'haulId' : haulId
	}, showHaulInfo, 'json');
}
var showHaulInfo = function(response) {
	if (response != null && response.haulinfo != null) {
		var haulinfo = response.haulinfo;
		$("#haulName").text(haulinfo.bigname);
		$("#haulTime").text(
				haulinfo.bigbegindate + "  到    " + haulinfo.bigenddate);
		$("#haulDesc").text(haulinfo.bigdescription);
		$("#haulStatus").text(haulinfo.bigstatus);
	}
}
/** **E 初始化大修基本信息******* */
/** ******E 模态框中操作以及保存单位******************** */
/** S 查询单位信息**************** */
//查询部门信息
function queryHaulUnit() {
	$.post(contextPath + '/unit_getHaulUnitPage.action',
			$("#queryHaulunitForm").serialize(), showUnitTale, 'json');
}
//添加信息到表格中
function showUnitTale(response) {
	// 如果为空结束方法
	if (response.pageBean == null) {
		return;
	}
	var currentPage = response.pageBean.currentPage;
	var currentCount = response.pageBean.currentCount;
	var totalCount = response.pageBean.totalCount;
	$("#haunUnitTbody").html("");// 清空表体
	var units = response.pageBean.productList;// 获取所有的单位
	for (var i = 0, length_1 = units.length; i < length_1; i++) {
		// 先列出所有的操作
		var delUpdate="--";
			if(hasOutunitOperating){
				delUpdate='<a href="javascript:void(0)" onclick="openUpdateModal(this)">修改</a>&nbsp;'
					+ ' <a href="javascript:void(0)" onclick="deleteUnit(this)">删除</a><br />';
			}
			
		// 如果大修已经结束就把操作隐藏掉
		var operation=units[i].bigStatus =="已结束"?"--":delUpdate;
		$("#haunUnitTbody")
				.append(
						'<tr><td><input type="radio" name="el_chooseDepart"	class="el_checks"/><input type="hidden" name="unitId" value="'
								+ units[i].unitId
								+ '"/><input type="hidden" name="bigId" value="'
								+ units[i].bigId
								+ '"/><input type="hidden" name="haulUnitId" value="'+units[i].unitBigId
								+'"/>'+ '</td><td>'
								+ units[i].name
								+ '</td><td>'
								+ units[i].bigName
								+ '</td><td>'
								+ units[i].manager
								+ '</td><td>'
								+ units[i].managerPhone
								+ '</td><td>'
								+ units[i].secure
								+ '</td><td>'
								+ units[i].securePhone
								+ '</td><td>'
								+ units[i].projectNames
								+ '</td><td><a href="javascript:void(0)" onclick="queryEmployeeBreakrule(this)">'
								+ units[i].unitMinisMum
								+ '</a></td><td><a href="javascript:void(0)" onclick="initVariable(this)">'
								+ units[i].personNum
								+ '</a></td><td>'+units[i].jiaquan+'</td><td>'
								+operation
								+ '</td></tr>');
	}
	// 动态开启分页组件
	page(currentPage, totalCount, currentCount);
}
//显示分页
function page(currentPage, totalCount, currentCount) {
	// 修改分页的基本属性
	$('#paginationIDU').pagination(
			{
				// 组件属性
				"total" : totalCount,// 数字 当分页建立时设置记录的总数量 1
				"pageSize" : currentCount,// 数字 每一页显示的数量 10
				"pageNumber" : currentPage,// 数字 当分页建立时，显示的页数 1
				"pageList" : [ 8,15,20 ],// 数组 用户可以修改每一页的大小，
				// 功能
				"layout" : [ 'list', 'sep', 'first', 'prev', 'manual', 'next',
						'last', 'links' ],
				"onSelectPage" : function(pageNumber, pageSize) {
					$("#currentPage").val(pageNumber);
					$("#currentCount").val(pageSize);
					// 查询检修
					queryHaulUnit();
				}
			});
}


/** E 查询单位信息**************** */
/** *S 修改单位信息** */
// 联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone", function(value, element) {
	var length = value.length;
	var mobile = /^((([0-9]{1})|([0-9]{1}))+\d{5})$/;
	var tel = /^\d{3,4}-?\d{5,6}$/;
	return this.optional(element) || (tel.test(value) || mobile.test(value));

}, "请正确填写您的联系电话");
function openUpdateModal(obj) {
	// $("label.error").remove();
	// $(".clearFormInput").val("");
	var $tds = $(obj).parent().parent().children();
	var update_unitid = $($tds[0]).children("input:hidden:eq(0)").val();// 获取到部门ID
	var update_haulUnitid = $($tds[0]).children("input:hidden:eq(2)").val();// 获取到大修部门ID
	var update_name = $($tds[1]).text();// 获取到部门名称
	var update_big = $($tds[2]).text();// 获取到部门违章记分
	var update_manager = $($tds[3]).text();// 获取到部门地址
	var update_managerphone = $($tds[4]).text();// 获取到部门联系人
	var update_secure = $($tds[5]).text();// 获取到部门电话
	var update_securephone = $($tds[6]).text();// 获取到检修名称
	var update_projectnames = $($tds[7]).text();// 获取到部门违章记分
	var update_nuitMinus = $($tds[8]).text();// 获取到部门违章记分
	$("#update_big").val(update_big);
	$("#update_unitid").val(update_unitid);
	$("#update_haulUnitid").val(update_haulUnitid);
	$("#update_name").val(update_name);
	$("#update_manager").val(update_manager);
	$("#update_managerphone").val(update_managerphone);
	$("#update_secure").val(update_secure);
	$("#update_securephone").val(update_securephone);
	$("#update_nuitMinus").val(update_nuitMinus);
	$("#update_projectnames").val(update_projectnames);
	$("#myModal2").modal({
		backdrop : 'static',
		keyboard : false
	}); // 手动开启
}
function updateUnit() {
	var isNotNull = $("#updateForm").validate({
		ignore : [],
		rules : {
			"name" : {
				required : true
			},// 发现日期
			"haulUnit.manager" : {
				required : true
			},
			"haulUnit.managerphone" : "required",// 验证文本框的。前边是 name 属性
			"haulUnit.secure" : {
				required : true
			},
			"haulUnit.securephone" : {
				"isPhone" : true,
				minlength : 5,
				required : true
			},
			"haulUnit.projectnames" : {
				required : true
			}
		},
		messages : {
			"name" : {
				required : "单位名称不能为空"
			},// 发现日期
			"haulUnit.manager" : {
				required : "项目经理不能为空"
			},
			"haulUnit.managerphone" : "项目经理电话不能为空",// 验证文本框的。前边是 name 属性
			"haulUnit.secure" : {
				required : "安全员不能为空"
			},
			"haulUnit.securephone" : {
				"isPhone" : "请输入合法的电话号码",
				minlength : "电话最短5位",
				required : "电话号码不能为空"
			},
			"haulUnit.projectnames" : {
				required : "工程名字不能为空"
			}
		}
	});
	// 验证通过进行保存
	if (isNotNull.form()) {
		if (!confirm("确认修改?")) {
			return;
		}

		$.post(contextPath + '/updateUnit.action',
				$("#updateForm").serialize(), function(response) {
					if (response != null && response.updateResult != null) {
						alert(response.updateResult);
						if (response.updateResult == '修改成功!') {
							window.location.reload();
						}
					}
				}, 'json')
	}
}
/** *E 修改单位信息** */
/** *S 根据单位与大修编号查询人数*** */
//初始化数据
function initVariable(obj){
	var $tds = $(obj).parent().parent().children();
	var unitid = $($tds[0]).children("input:hidden:eq(0)").val();// 获取到部门ID
	var bigid = $($tds[0]).children("input:hidden:eq(1)").val();// 获取到部门ID
	$("#q_bigId").val(bigid);
	$("#q_unitId").val(unitid);
	queryEmployeeOut();
}
//查询内部员工
function queryEmployeeOut() {
	$.post(contextPath + '/unit_getEmployeesByHaulidAndUnitId.action', {
		"currentPage":$("#currentPage2").val(),
		"currentCount":$("#currentCount2").val(),
		"bigId" : 	$("#q_bigId").val(),
		"unitId" : $("#q_unitId").val()
	}, showEmployeeModal, 'json')
}

function showEmployeeModal(response) {
	$("#employeeTbody").html("");
	if (response != null && response.pageBean != null) {
		var currentPage = response.pageBean.currentPage;
		var currentCount = response.pageBean.currentCount;
		var totalCount = response.pageBean.totalCount;
		var employees = response.pageBean.productList;
		for (var i = 0; employees != null && i < employees.length; i++) {
			var sex = (employees[i].sex == '1') ? "男" : "女";
			// 对员工的扣分进行非空处理
			var minusNum = (employees[i].minusNum == null || employees[i].minusNum == undefined) ? '0'
					: employees[i].minusNum;
			$("#employeeTbody").append(
					'<tr><td>' + employees[i].name + '</td><td>'
							+ employees[i].idCode + '</td><td>' + sex
							+ '</td><td>' + employees[i].address + '</td><td>'
							+ employees[i].empType + '</td></tr>');
			/* + '</td><td>' + minusNum */
		}
	}
	page3(currentPage, totalCount, currentCount);
	if(!user_open){
		$("#employeeModal").modal({
			keyboard : false,
			backdrop : 'static'
		});
	}
}

//显示分页
function page3(currentPage, totalCount, currentCount) {
	// 修改分页的基本属性
	$('#paginationIDU2').pagination(
			{
				// 组件属性
				"total" : totalCount,// 数字 当分页建立时设置记录的总数量 1
				"pageSize" : currentCount,// 数字 每一页显示的数量 10
				"pageNumber" : currentPage,// 数字 当分页建立时，显示的页数 1
				"pageList" : [ 8,15,20 ],// 数组 用户可以修改每一页的大小，
				// 功能
				"layout" : [ 'list', 'sep', 'first', 'prev', 'manual', 'next',
						'last', 'links' ],
				"onSelectPage" : function(pageNumber, pageSize) {
					$("#currentPage2").val(pageNumber);
					$("#currentCount2").val(pageSize);
					// 查询检修员工
					queryEmployeeOut();
				}
			});
}

/** *E 根据单位与大修编号查询人数*** */
/** *S 根据单位与大修编号查询违章员工信息*** */
/** *S 根据单位与检修编号查询违章员工信息*** */
function queryEmployeeBreakrule(obj) {
	var $tds = $(obj).parent().parent().children();
	var unitid = $($tds[0]).children("input:hidden:eq(0)").val();// 获取到部门ID
	var bigid = $($tds[0]).children("input:hidden:eq(1)").val();// 获取到部门ID
	var fstarttime=$("[name='fstarttime']").val();
	var fendtime=$("[name='fendtime']").val();
	$("#query_unitid").val(unitid);
	$("#query_bigid").val(bigid);
	$("#query_fstarttime").val(fstarttime);
	$("#query_fendtime").val(fendtime);
	query_break();
}
function query_break(){
	$.post(contextPath
			+ '/unit_getEmployeeOutsBreakrulesByUaulIdAndUnitId.action',$("#query_break_form").serialize(), showEmployeeBreakrulesModal, 'json')
}
function showEmployeeBreakrulesModal(response) {
	var currentPage=response.pageBean.currentPage;
	var currentCount=response.pageBean.currentCount;
	var totalCount=response.pageBean.totalCount;
	$("#breakrulesTbody").html("");
	if (response != null && response.pageBean != null) {
		var employeeBreakrules = response.pageBean.productList;
		for (var i = 0; employeeBreakrules != null
				&& i < employeeBreakrules.length; i++) {
			var sex = (employeeBreakrules[i].sex == '1') ? "男" : "女";
			$("#breakrulesTbody").append(
					'<tr><td>'
							+ employeeBreakrules[i].name
							+ '</td><td>'
							+ sex
							+ '</td><td>'
							+ employeeBreakrules[i].idCode
							+ '</td><td>'
							+ employeeBreakrules[i].breakContent
							+ '</td><td>'
							+ Format(new Date(employeeBreakrules[i].breakTime.replace(/T/g," ").replace(/-/g,"/")),
									"yyyy-MM-dd") + '</td><td>'
							+ employeeBreakrules[i].minusNum + '</td></tr>');

		}
	}
	
	
	page1(currentPage, totalCount, currentCount);
	if(!break_open){
		$("#el_bRInfor").modal({
			keyboard : false,
			backdrop : 'static'
		});
	}
}
// 显示分页
function page1(currentPage, totalCount, currentCount) {
	// 修改分页的基本属性
	$('#paginationIDU1').pagination(
			{
				// 组件属性
				"total" : totalCount,// 数字 当分页建立时设置记录的总数量 1
				"pageSize" : currentCount,// 数字 每一页显示的数量 10
				"pageNumber" : currentPage,// 数字 当分页建立时，显示的页数 1
				"pageList" : [ 8,15,20 ],// 数组 用户可以修改每一页的大小，
				// 功能
				"layout" : [ 'list', 'sep', 'first', 'prev', 'manual', 'next',
						'last', 'links' ],
				"onSelectPage" : function(pageNumber, pageSize) {
					$("#currentPage1").val(pageNumber);
					$("#currentCount1").val(pageSize);
					// 查询检修
					query_break();
				}
			});
}

/** *E 根据单位与大修编号查询违章员工信息*** */
/** ****S 删除检修单位********* */
// 打开删除模态框
function deleteUnit(obj) {
	var $tds = $(obj).parent().parent().children();
	var unitid = $($tds[0]).children("input:hidden:eq(0)").val();// 获取到部门ID
	var bigid = $($tds[0]).children("input:hidden:eq(1)").val();// 获取到检修ID
	$("#deleteBigId").val(bigid);
	$("#deleteUnitId").val(unitid);
	// 打开删除模态框
	$('#delcfmModel').modal({
		backdrop : 'static',
		keyboard : false
	});
}
// 开始删除
function deleteSubmit() {
	$.post(contextPath + "/deleteUnit.action",
			$("#deleteUnitForm").serialize(), function(response) {
				if (response != null && response.deleteResult != null) {
					alert(response.deleteResult);
					if (response.deleteResult == '删除成功!') {
						window.location.reload();
					}
				}
			}, 'json');
}
/** ****E 删除检修单位********* */
