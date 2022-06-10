angular
  .module('appModule')
  .controller('homeController', homePageController)
  .filter('highlight', highlightFilter);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.searchInput = $location.$$search.filter;

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }

  homePageVm.handleSearchEvent = function (input) {
    homePageVm.searchInput = input;

    if (input) {
      $location.path('/').search({ filter: input });
    } else {
      $location.url($location.path());
    }
  };
}

function highlightFilter($sce) {
  return function (text, phrase) {
    if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<mark>$1</mark>');

    return $sce.trustAsHtml(text);
  };
}
