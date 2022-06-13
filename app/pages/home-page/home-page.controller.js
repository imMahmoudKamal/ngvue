angular
  .module('appModule')
  .controller('homeController', homePageController)
  .filter('highlight', highlightFilter);

function homePageController(Employees, $location) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.searchInput = $location.$$search.filter;
  homePageVm.totalPages = 0;
  homePageVm.currentPage = 0;
  homePageVm.isLoading = false;

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.currentPage = data.current_page;
        homePageVm.totalPages = data.pages;

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

  homePageVm.handleLoadMoreEvent = function () {
    if (homePageVm.currentPage < homePageVm.totalPages) {
      homePageVm.isLoading = true;

      Employees.loadMoreEmployees(++homePageVm.currentPage)
        .then(({ data }) => {
          if (data) {
            homePageVm.isLoading = false;
            homePageVm.employees = homePageVm.employees.concat(data.employees);
          }
        });
    }
  };
}

function highlightFilter($sce) {
  return function (text, phrase) {
    if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<mark>$1</mark>');

    return $sce.trustAsHtml(text);
  };
}
