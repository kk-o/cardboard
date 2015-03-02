angular.module('cardboard.directives')

.directive('ctrlClick',['$parse',function($parse){
    return{
        restrict: 'A',
        scope: {
            url: '=',
            beforeClick: '&'
        },
        link: function(scope, element, attrs){
            var beforeClick = scope.beforeClick || angular.noop;

            element.bind('click', function(event){
                beforeClick();

                // if link is an app we use the appropriate method
                if(scope.$parent.app && scope.$parent.app.launchType == "OPEN_AS_WINDOW")
                    chrome.management.launchApp(scope.$parent.app.id);

                // else open url
                else if(scope.url){
                    // in background tab if ctrl or cmd key is held
                    if(event.ctrlKey || event.metaKey)
                        chrome.tabs.create({
                            url: scope.url,
                            active: false
                        });
                    // in current tab otherwise
                    else
                        chrome.tabs.update({
                            url: scope.url
                        });
                }
            });
        }
    }
}]);
