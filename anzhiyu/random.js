var posts=["2024/08/30/yashandb/yashandb_install/","2024/08/30/linux/centos_openSSL/","2024/08/30/linux/centos_yum/","2024/08/08/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };