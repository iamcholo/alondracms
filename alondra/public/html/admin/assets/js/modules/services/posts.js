define(['angular'],function(angular){

angular.module('app.services.posts', [] )
.service('Posts', [ 
    '$q', '$http',  '$rootScope', '$cookies',
    function ($q, $http, $rootScope,$cookies) 
  {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {
        
        'API_URL': '/api',
        'request': function(args) 
        {
            params = args.params || {}
            args = args || {};
            var deferred = $q.defer(),
                url = this.API_URL + args.url,
                method = args.method || "GET",
                params = params,
                data = args.data || {};
            
            return  $http({
                url: url,
                withCredentials: this.use_session,
                method: method.toUpperCase(),
                //headers: {'X-CSRFToken': $cookies['csrftoken']},
                headers: {
                    'Authorization': 'Token ' + $cookies.get('access_token'),
                    'Content-Type': 'application/json'
                },
                params: params,
                data: data
            });
        },

        'list': function(page){
            return this.request({
                'method': "POST",
                'url': "/posts/",
                'data': {'post_type':'post','page':page}              
            });
        },
        'search': function(query,page){
            return this.request({
                'method': "POST",
                'url': "/posts/search/",
                'data': {'post_type':'post','page':page,'query':query}              
            });
        },
        'New': function(data){
          
            return this.request({
                'method': "POST",
                'url': "/post/",
                'data': data              
            });
        },
        'Update': function(data){
            return this.request({
                'method': "PUT",
                'url': "/post/",
                'data': data       
            });
        },
        'Get': function(id){
            return this.request({
                'method': "POST",
                'url': "/post/details/",
                'data': {'id':id,}                 
            });
        },
        'Delete': function(id){
            return this.request({
                'method': "DELETE",
                'url': "/post/", 
                'data': {'id':id}             
            });
        },
           
        'initialize': function(url){
            this.API_URL = url;         
        }

    }
    return service;
  }]);




});


