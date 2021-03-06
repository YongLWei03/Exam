package cn.xm.exam.service.impl.system;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.xm.exam.bean.system.Permission;
import cn.xm.exam.bean.system.User;
import cn.xm.exam.mapper.system.PermissionMapper;
import cn.xm.exam.service.system.PermissionService;
import cn.xm.exam.utils.PageBean;
import cn.xm.exam.utils.PageConstants;

@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {

	@Resource
	private PermissionMapper permissionMapper;
	
	/**
	 * 获取所有权限信息
	 */
	@Override
	public List<Permission> getAllpermission() {
		List<Permission> permission = null;
		try {
			permission = permissionMapper.getAllPermission();
			return permission;
		} catch (SQLException e) {
			return null;
		}
	}

	/**
	 * 更新权限信息：是否启用
	 */
	@Override
	public int updatePermission(Permission permission) {
		int i = 0;
		try {
			i = permissionMapper.updatePermission(permission);
			return i;
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * 获得启用的权限信息
	 */
	@Override
	public List<Permission> getAllIsusePermission() {
		List<Permission> permission = null;
		try {
			permission = permissionMapper.getAllIsusePermission();
			return permission;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return permission;
		}
		
	}

	/**
	 * 根据功能id查询功能
	 */
	@Override
	public Permission getPermissionById(String permissionid) {
		Permission permission=null;
		try {
			permission=permissionMapper.getPermissionById(permissionid);
			return permission;
		} catch (Exception e) {
			e.printStackTrace();
			return permission;
		}
		
	}

	/**
	 * 根据功能id 查询二级功能
	 */
	@Override
	public PageBean<Permission> getNextPermissionById(String permissionid,int currentPage,int currentCount) {
		PageBean<Permission> pageBean=new PageBean<>();
		PageConstants pageConstants=new PageConstants();
		try {
			int totalCount=permissionMapper.getCountBymenutopid(permissionid);
			pageBean.setTotalCount(totalCount);
			int rowBegin=(currentPage - 1) *currentCount;
			pageBean.setCurrentPage(currentPage);
			pageBean.setCurrentCount(currentCount);
			int totalPage=(totalCount - 1) / currentCount + 1;
			pageBean.setTotalPage(totalPage);
			List<Permission> permissions=permissionMapper.getNextPermissionById(permissionid, rowBegin, currentCount);
			pageBean.setProductList(permissions);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageBean;
		
	}
	
	/**
	 * 根据角色id查询其所拥有的权限集合
	 */
	@Override
	public List<Permission> getPermissionByRoleId(String roleid) {
		List<Permission> permission=null;
		try {
			permission=permissionMapper.getPermissionByRoleId(roleid);
			return permission;
		} catch (Exception e) {
			e.printStackTrace();
			return permission;
		}
	}

	@Override
	public List<Permission> selectDepartIsuserPermission() {
		List<Permission> permission=null;
		try {
			permission=permissionMapper.getDepartIsuserPermission();
			return permission;
		} catch (Exception e) {
			e.printStackTrace();
			return permission;
		}
		
	}

	@Override
	public List<Map<String, Object>> getMenutop() throws Exception {
		return permissionMapper.getMenutop();	
	}

	@Override
	public PageBean<Permission> getNextPermissionById_Without_ELSCOPE(String permissionid,int currentPage,int currentCount) throws Exception {
		PageBean<Permission> pageBean=new PageBean<>();
		PageConstants pageConstants=new PageConstants();
		try {
			int totalCount=permissionMapper.getCountById_Without_ELSCOPE(permissionid);
			pageBean.setTotalCount(totalCount);
			int rowBegin=pageConstants.getRecordNums(currentPage);
			pageBean.setCurrentPage(currentPage);
			pageBean.setCurrentCount(currentCount);
			int totalPage=pageConstants.getPages(totalCount);
			pageBean.setTotalPage(totalPage);
			List<Permission> permissions=permissionMapper.getNextPermissionById_Without_ELSCOPE(permissionid, rowBegin, currentCount);
			pageBean.setProductList(permissions);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageBean;
	}

	@Override
	public PageBean<Permission> getPermissioninfoByCondition(Map<String, Object> condition, int currentPage,
			int currentCount) throws Exception {
		PageBean<Permission> pageBean=new PageBean<>();
		PageConstants pageConstants=new PageConstants();
		try {
			int totalCount=permissionMapper.getCountByCondition(condition);
			pageBean.setTotalCount(totalCount);
			int rowBegin=pageConstants.getRecordNums(currentPage);
			pageBean.setCurrentPage(currentPage);
			pageBean.setCurrentCount(currentCount);
			int totalPage=pageConstants.getPages(totalCount);
			pageBean.setTotalPage(totalPage);
			List<Permission> permissions=permissionMapper.getPermissioninfoByCondition(condition, rowBegin, currentCount);
			pageBean.setProductList(permissions);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageBean;
	}

	@Override
	public boolean updatePermissionStatus(String permissionid, String permissionstatus) throws Exception {
		Permission permission=permissionMapper.getPermissionById(permissionid);
		
		Permission parentPermission=permissionMapper.getPermissionById(permission.getParentid());
		permissionMapper.updatePermissionStatus(permissionid, permissionstatus);
		if (parentPermission.getParentid()!=null && !"".equals(parentPermission.getParentid()) ) {		
			if ("0".equals(parentPermission.getStatus())) {
				permissionMapper.updatePermissionStatus(permission.getParentid(), "1");
			}
		}
		
		if ("menutop".equals(permission.getType())) {
			permissionMapper.updatePermissionStatusByParentid(permissionid, permissionstatus);
		}
		return true;
	}

	@Override
	public List<Map<String, Object>> getPermissionTree(String scope) throws Exception {
		return permissionMapper.getPermissionTree(scope);
		
	}
	

}
