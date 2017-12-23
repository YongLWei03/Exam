package cn.xm.exam.action.haul;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

import cn.xm.exam.bean.haul.Haulinfo;
import cn.xm.exam.service.haul.HaulinfoService;
import cn.xm.exam.utils.DefaultValue;
import cn.xm.exam.utils.PageBean;
import cn.xm.exam.utils.ValidateCheck;

/**
 * 查询大修的Action
 * 
 * @author QiaoLiQiang
 * @time 2017年11月10日下午7:45:09
 */
@Controller
@Scope("prototype")
@SuppressWarnings("all")
public class FindHaulAction extends ActionSupport {
	private Logger logger = Logger.getLogger(FindHaulAction.class);// 日志记录器
	private Map<String, Object> response;// 用于包装返回结果的map
	@Resource
	private HaulinfoService haulinfoService;
	private String currentPage;// 当前页
	private String currentCount;// 页大小
	private String bigName;// 大修名称
	private String bigStatus;// 大修状态
	private String startMonth;// 创建月份
	private String haulId;// 大修ID，用于查询大修信息

	/**
	 * 查询大修部门树
	 * 
	 * @return
	 */
	public String getHaulUnitTree() {
		response = new HashMap<String, Object>();
		List<Map<String, Object>> departmentAndOverHaulTree = null;// 树数据
		try {
			departmentAndOverHaulTree = haulinfoService.getDepartmentAndOverHaulTree();
		} catch (SQLException e) {
			logger.warn("查询大修部门树出出错!", e);
		}
		response.put("departmentAndOverHaulTree", departmentAndOverHaulTree);
		return SUCCESS;
	}

	/**
	 * 分页查询大修
	 * 
	 * @return
	 */
	public String queryPageHaul() {
		response = new HashMap<String, Object>();
		Map<String, Object> condition = generateQueryHaulCondition();
		PageBean<Haulinfo> pageBean = null;
		try {
			pageBean = haulinfoService.getHaulinfoPageByCondition(Integer.valueOf(currentPage),
					Integer.valueOf(currentCount), condition);
		} catch (NumberFormatException e) {
			logger.error("数字格式化异常", e);
		} catch (SQLException e) {
			logger.error("查询大修SQL异常", e);
		}
		response.put("pageBean", pageBean);
		return SUCCESS;
	}

	/**
	 * 查询大修基本信息
	 * 
	 * @return
	 */
	public String getHaulinfoByHaulid() {
		response = new HashMap<String, Object>();
		Haulinfo haulinfo = null;
		try {
			if (ValidateCheck.isNotNull(haulId)) {
				haulinfo = haulinfoService.getHaulinfoByHaulId(haulId);
			}
		} catch (SQLException e) {
			logger.error("查询大修基本信息SQL异常", e);
		}
		response.put("haulinfo", haulinfo);
		return SUCCESS;
	}

	/**
	 * 查询未结束的大修的名字与ID
	 * 
	 * @return
	 * @throws SQLException
	 */
	public String getHaulNameAndIdsForExam() {
		response = new HashMap<String, Object>();
		List<Map<String, Object>> haulNameAndIds = null;
		try {
			haulNameAndIds = haulinfoService.getHaulNameAndIdsForExam();
		} catch (SQLException e) {
			logger.error("查修大修名字与ID的时候错误", e);
		}
		response.put("haulNameAndIds", haulNameAndIds);
		return SUCCESS;
	}

	/**
	 * 组装查询条件
	 * 
	 * @param condition
	 * @return
	 */
	private Map<String, Object> generateQueryHaulCondition() {
		Map<String, Object> condition = new HashMap<String, Object>();
		if (ValidateCheck.isNull(currentCount)) {
			currentCount = DefaultValue.PAGE_SIZE;
		}
		if (ValidateCheck.isNull(currentPage)) {
			currentPage = "1";
		}
		if (ValidateCheck.isNotNull(bigName)) {
			condition.put("bigName", bigName);
		}
		if (ValidateCheck.isNotNull(bigStatus)) {
			condition.put("bigStatus", bigStatus);
		}
		if (ValidateCheck.isNotNull(startMonth)) {
			condition.put("startMonth", startMonth);
		}
		return condition;
	}

	// get set
	public Map<String, Object> getResponse() {
		return response;
	}

	public void setResponse(Map<String, Object> response) {
		this.response = response;
	}

	public String getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(String currentPage) {
		this.currentPage = currentPage;
	}

	public String getCurrentCount() {
		return currentCount;
	}

	public void setCurrentCount(String currentCount) {
		this.currentCount = currentCount;
	}

	public String getBigName() {
		return bigName;
	}

	public void setBigName(String bigName) {
		this.bigName = bigName;
	}

	public String getBigStatus() {
		return bigStatus;
	}

	public void setBigStatus(String bigStatus) {
		this.bigStatus = bigStatus;
	}

	public String getStartMonth() {
		return startMonth;
	}

	public void setStartMonth(String startMonth) {
		this.startMonth = startMonth;
	}

	public String getHaulId() {
		return haulId;
	}

	public void setHaulId(String haulId) {
		this.haulId = haulId;
	}

}
