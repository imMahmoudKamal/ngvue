angular.module('appModule').service('Employees', EmployeesService);

function EmployeesService($http) {
  const employeesUrl = 'https://fe-task.getsandbox.com/employees';

  const getEmployees = () => {
    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = (page) => {
    return $http.get(employeesUrl, { params: { page } });
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
