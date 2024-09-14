const permissionHelper = (object,role) => {

  try {
    const current_user = JSON.parse(localStorage.getItem('user'));
   
    if(current_user) {
      const permissions = Object.assign({}, ...current_user?.role?.permission);
      if(permissions.hasOwnProperty(object)){
        return permissions[object] && permissions[object].filter(r => r.value === role).length > 0 
      }else{
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
} 

export default permissionHelper;

// use function
// permissionHelper('catastrophe','view_catastrophe')