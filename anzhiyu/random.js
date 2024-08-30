var posts=["2024/08/30/CentOS安装OpenSSL/","2024/08/08/blog/","2024/08/08/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };